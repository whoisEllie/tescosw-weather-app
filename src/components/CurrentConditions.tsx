import { useSelector } from "react-redux";
import { selectForecast } from '../state/forecast/forecastSlice';
import { t } from '../utils/localization';


export default function CurrentConditions() {
	const forecast = useSelector(selectForecast);

	if (forecast.status === 'loading') {

		return (
			<div className="loading-wrapper" style={{ padding: 0, display: 'block', color: 'red' }}>
				<div className='error'>
					<span className="loader"></span>
				</div>
			</div >
		);
	}

	if (forecast.status === 'failed') {
		return (
			<div className="loading-wrapper">
				<div className='error'>
					<p style={{ color: 'red' }}>Error: {forecast.error}</p>;
				</div>
			</div>
		);
	}

	if (forecast.status === 'idle' || forecast.daily.length === 0) {

		return (
			<div className="loading-wrapper">
				<div className="error">
					{t("noforecast")}
				</div>
			</div >
		);
	}

	if (forecast.status === 'succeeded') {

		const now = forecast.daily[0].hourly[0]

		return (
			<div className="current-wrapper">
				<div className="card-title">{t("current-conditions")}</div>
				<div className="current-temperature">
					{Math.round(now.temp.temperature)}°
				</div>
				<img className='current-icon' src={`/icons/${now.details.icon}.png`} />
				<div className="current-details">
					<div className="current-city">
						{forecast.city?.name}
					</div>
					<div className="current-description">
						{now.details.description}
					</div>
				</div>
			</div>
		);

	}

};
