import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchFiveDayForecast, type ForecastEntry } from '../../api/weatherApi';

interface Coords {
	lat: number,
	lon: number,
}

interface HourlyData {
	date: string,
	temp: {
		temperature: number,
		feelsLike: number,
		minTemp: number,
		maxTemp: number,
	},
	pressure: number,
	humidity: number,
	details: {
		description: string,
		icon: string,
	},
	wind: {
		speed: number,
		gusts: number,
		direction: number,
	},
	precipitation: {
		rain: number | undefined,
		snow: number | undefined,
		probability: number,
	},
	visibility: number
}

export interface DailyForecast {
	date: string,
	temp: {
		avgTemp: number,
		minTemp: number,
		maxTemp: number,
	},
	avgHumidity: number,
	avgPressure: number,
	details: {
		description: string,
		icon: string,
	},
	wind: {
		avgSpeed: number,
		avgGusts: number,
		avgDirection: number,
	},
	precipitation: {
		avgRain: number | undefined,
		avgSnow: number | undefined,
		avgProbability: number,
	},
	hourly: HourlyData[]
}

interface ForecastState {
	city: {
		id: number;
		name: string;
		country: string;
	} | null;
	daily: DailyForecast[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

interface CachedValues {
	detailAggregate: string[],
	temperatureAggregate: number[],
}

function mode(array: string[]) {
	if (array.length == 0)
		return null;
	const modeMap = new Map<string, number>();
	let maxElement: string = array[0];
	let maxCount: number = 1;
	for (let i = 0; i < array.length; i++) {
		const element = array[i]
		if (modeMap.get(element) == null)
			modeMap.set(element, 1);
		else
			modeMap.set(element, (modeMap.get(element) ?? 0) + 1);
		if ((modeMap.get(element) ?? 0) > maxCount) {
			maxElement = element;
			maxCount = modeMap.get(element)!;
		}
	}
	return maxElement;
}


export const fetchForecast = createAsyncThunk(
	'forecast/fetchForecast',
	async (coords: Coords) => {
		const raw = await fetchFiveDayForecast(coords.lat, coords.lon);

		//TODO: Better type-ing of coords

		const daysMap: Record<string, DailyForecast> = {};
		const cacheMap: Record<string, CachedValues> = {};

		raw.list.forEach((item: ForecastEntry) => {
			const dateKey = new Date(item.date).toLocaleDateString(undefined, {
				weekday: 'short',
				month: 'short',
				day: 'numeric',
			});
			const dateObj = new Date(item.date);

			const hourlyData: HourlyData = {
				date: new Date(item.date).toISOString(),
				temp: item.temp,
				pressure: item.pressure,
				humidity: item.humidity,
				details: item.details,
				wind: item.wind,
				precipitation: item.precipitation,
				visibility: item.visibility,
			};

			if (!cacheMap[dateKey]) {
				cacheMap[dateKey] = {
					detailAggregate: [],
					temperatureAggregate: [],
				}
			}

			//TODO: Use sunrise/sunset times for more accurate daylight calc
			// Check only during daylight hours
			if (dateObj.getHours() > 6 && dateObj.getHours() < 21) {
				cacheMap[dateKey].detailAggregate.push(`${item.details.description};${item.details.icon}`);
				cacheMap[dateKey].temperatureAggregate.push(item.temp.temperature);
			}

			if (!daysMap[dateKey]) {
				daysMap[dateKey] = {
					date: dateObj.toISOString(),
					temp: {
						avgTemp: item.temp.temperature,
						minTemp: item.temp.minTemp,
						maxTemp: item.temp.maxTemp,
					},
					avgHumidity: item.humidity,
					avgPressure: item.pressure,
					details: {
						description: "",
						icon: "",
					},
					wind: {
						avgSpeed: item.wind.speed,
						avgGusts: item.wind.speed,
						avgDirection: item.wind.direction,
					},
					precipitation: {
						avgRain: item.precipitation.rain,
						avgSnow: item.precipitation.snow,
						avgProbability: item.precipitation.probability,
					},
					hourly: [hourlyData]
				};
			} else {
				const day = daysMap[dateKey];
				day.temp.minTemp = Math.min(day.temp.minTemp, item.temp.temperature)
				day.temp.maxTemp = Math.max(day.temp.maxTemp, item.temp.temperature)
				day.avgHumidity =
					(day.avgHumidity * day.hourly.length + item.humidity) /
					(day.hourly.length + 1);
				day.avgPressure =
					(day.avgPressure * day.hourly.length + item.pressure) /
					(day.hourly.length + 1);
				day.hourly.push(hourlyData)
			}
		});

		Object.entries(cacheMap).forEach(([key, value]) => {
			const day = daysMap[key];
			const [description = "Error", icon = "01a"] = mode(value.detailAggregate)?.split(";") ?? [];
			day.details.description = description;
			day.details.icon = icon;
			day.temp.avgTemp = (value.temperatureAggregate.reduce((a, b) => a + b, 0)) / value.temperatureAggregate.length;
		})


		return {
			city: {
				id: raw.city.id,
				name: raw.city.name,
				country: raw.city.country,
			},
			daily: Object.values(daysMap),
		};
	}
);

const initialState: ForecastState = {
	city: null,
	daily: [],
	status: 'idle',
	error: null,
};

const forecastSlice = createSlice({
	name: 'forecast',
	initialState,
	reducers: {
		clearForecast(state) {
			state.city = null;
			state.daily = [];
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchForecast.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchForecast.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.city = action.payload.city;
				state.daily = action.payload.daily;
			})
			.addCase(fetchForecast.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch forecast';
			});
	},
});

export const { clearForecast } = forecastSlice.actions;
export default forecastSlice.reducer;

export const selectForecast = (state: RootState) => state.forecast;
