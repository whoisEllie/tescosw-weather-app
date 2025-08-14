import { useSelector } from 'react-redux';
import { selectForecast } from '../state/forecast/forecastSlice';
import type { DailyForecast } from '../state/forecast/forecastSlice'
import { t } from '../utils/localization';

export default function FiveDayForecastTable() {
	const forecast = useSelector(selectForecast);

	if (forecast.status === 'loading') {

		return (
			<div className='daily-forecast-wrapper'>
				<div className='error'>
					<span className="loader"></span>
				</div>
			</div>
		)
	}

	if (forecast.status === 'failed') {

		return (
			<div className='daily-forecast-wrapper'>
				<div className='error'>
					<p style={{ color: 'red' }}>Error: {forecast.error}</p>;
				</div>
			</div>
		)
	}

	if (forecast.status === 'idle' || forecast.daily.length === 0) {

		return (
			<div className='daily-forecast-wrapper'>
				<div className='error'>
					{t("noforecast")}
				</div>
			</div>
		)
	}

	return (
		<div className='forecast-wrapper'>
			<div className="card-title">{t("five-day-forecast")}</div>
			{forecast.daily.slice(0, 5).map((day: DailyForecast, idx: number) => (
				<div key={idx} className='weather-card'>
					<div className='align'>
						<div>{
							new Date(day.date).toLocaleDateString(undefined, {
								weekday: 'long',
							})}
						</div>
						<div className='small'>{
							new Date(day.date).toLocaleDateString(undefined, {
								month: 'long',
								day: 'numeric',
							})}
						</div>

					</div>
					<img className='icon' src={`/icons/${day.details.icon}.png`} />
					<div className='align'>
						<div>{day.details.description}</div>
						<div className='small'>{day.temp.minTemp.toFixed(0)}-{day.temp.maxTemp.toFixed(0)}°C</div>
					</div>
				</div>
			))}
		</div>
	);
}
