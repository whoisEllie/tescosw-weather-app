// src/components/ForecastTable/ForecastTable.tsx
import { useSelector } from 'react-redux';
import { selectForecast } from '../state/forecast/forecastSlice';
import type { DailyForecast } from '../state/forecast/forecastSlice'
import { t } from '../utils/localization';

export default function ForecastTable() {
	const forecast = useSelector(selectForecast);

	if (forecast.status === 'loading') {
		return <p>Loading forecast...</p>;
	}

	if (forecast.status === 'failed') {
		return <p style={{ color: 'red' }}>Error: {forecast.error}</p>;
	}

	if (forecast.status === 'idle' || forecast.daily.length === 0) {
		return <p>{t("noforecast")}</p>;
	}

	return (
		<div>
			<table border={1} cellPadding={4} style={{ borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th>Date</th>
						<th>Min °C</th>
						<th>Max °C</th>
						<th>Avg °C</th>
						<th>Humidity</th>
						<th>Pressure</th>
						<th>Condition</th>
						<th>Icon</th>
					</tr>
				</thead>
				<tbody>
					{forecast.daily.map((day: DailyForecast, idx: number) => (
						<tr key={idx}>
							<td>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</td>
							<td>{day.temp.minTemp.toFixed(1)}</td>
							<td>{day.temp.maxTemp.toFixed(1)}</td>
							<td>{day.temp.avgTemp.toFixed(1)}</td>
							<td>{day.avgHumidity.toFixed(0)}</td>
							<td>{day.avgPressure.toFixed(0)}</td>
							<td>{day.details.description}</td>
							<td>
								<img
									src={`https://openweathermap.org/img/wn/${day.details.icon}@2x.png`}
									width={32}
									alt={day.details.description}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
