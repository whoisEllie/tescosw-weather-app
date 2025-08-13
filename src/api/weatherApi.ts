export interface ForecastEntry {
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

export interface ForecastResponse {
	city: {
		id: number;
		name: string;
		country: string;
		coord: { lat: number; lon: number };
	};
	list: ForecastEntry[];
}


export interface ForecastEntryApiResponse {
	dt: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
		temp_kf: number;
	};
	weather: WeatherDescription[];
	clouds: {
		all: number;
	};
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	visibility: number;
	pop: number; // probability of precipitation
	rain?: {
		"3h": number; // mm of rain in the last 3 hours
	};
	snow?: {
		"3h": number; // mm of snow in the last 3 hours
	};
	sys: {
		pod: string; // "d" for day, "n" for night
	};
	dt_txt: string; // date/time string
}

export interface WeatherDescription {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface CityInfo {
	id: number;
	name: string;
	coord: {
		lat: number;
		lon: number;
	};
	country: string;
	population: number;
	timezone: number;
	sunrise: number; // unix timestamp
	sunset: number; // unix timestamp
}


export async function fetchFiveDayForecast(lat: number, lon: number): Promise<ForecastResponse> {
	const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
	if (!apiKey) {
		throw new Error('Missing OpenWeatherMap API key.');
	}

	//TODO: Configure automatic langauge detection

	const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${"cz"}&units=metric&appid=${apiKey}`;

	const res = await fetch(endpoint);

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(`OpenWeatherMap API error (${res.status}): ${errorText}`);
	}

	const data = await res.json();

	return {
		city: {
			id: data.city.id,
			name: data.city.name,
			country: data.city.country,
			coord: {
				lat: data.city.coord.lat,
				lon: data.city.coord.lon
			}
		},
		list: data.list.map((item: ForecastEntryApiResponse) => ({
			date: new Date(item.dt * 1000).toISOString(),
			temp: {
				temperature: item.main.temp,
				feelsLike: item.main.feels_like,
				minTemp: item.main.temp_min,
				maxTemp: item.main.temp_max,
			},
			pressure: item.main.pressure,
			humidity: item.main.humidity,
			details: {
				description: item.weather?.[0]?.description ?? '',
				icon: item.weather?.[0]?.icon ?? ''
			},
			wind: {
				speed: item.wind.speed,
				gusts: item.wind.gust,
				direction: item.wind.deg,
			},
			precipitation: {
				rain: item.rain?.['3h'] ?? undefined,
				snow: item.snow?.['3h'] ?? undefined,
				probability: item.pop,

			},
			visibility: item.visibility,
		}))
	};
}
