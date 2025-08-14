import { useSelector } from 'react-redux';
import { selectForecast } from '../state/forecast/forecastSlice';
import type { HourlyData } from '../state/forecast/forecastSlice'
import { t } from '../utils/localization';

export default function DailyForecastTable() {
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


	if (forecast.status === 'succeeded') {

		const upcomingForecast: HourlyData[] = [];
		forecast.daily[0].hourly.forEach((item) => {
			upcomingForecast.push(item)
		})
		forecast.daily[1].hourly.forEach((item) => {
			upcomingForecast.push(item)
		})


		return (
			<div className='daily-forecast-wrapper'>
				<div className="card-title">{t("daily-forecast")}</div>
				{upcomingForecast.slice(0, 8).map((hour: HourlyData, idx: number) => (
					<div key={idx} className='daily-weather-card'>
						<div className='align'>
							{
								new Date(hour.date).getHours()}:00
						</div>
						<img className='icon' src={`/icons/${hour.details.icon}.png`} />
						<div className='align'>
							<div>{hour.details.description}</div>
							<div className='small'>{hour.temp.temperature.toFixed(0)}°</div>
							<div className="daily-precipitation">
								<img src='/icons/08_wet_color.png' width={12} height={12} />
								<div className='small'>{hour.precipitation.probability.toFixed(1)}%</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);

	}

}
