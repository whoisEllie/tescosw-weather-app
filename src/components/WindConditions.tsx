import { useSelector } from "react-redux";
import { selectForecast } from '../state/forecast/forecastSlice';
import { t } from '../utils/localization';

export default function WindConditions() {
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

		return (
			<div className="wind-widget">
				<div className="card-title">{t("wind-forecast")}</div>
				<div className="wind-compass">
					<div className="compass-circle">
						<div className="compass-label north">N</div>
						<div className="compass-label east">E</div>
						<div className="compass-label south">S</div>
						<div className="compass-label west">W</div>
						<div
							className="compass-pointer"
							style={{ transform: `rotate(${forecast.daily[0].hourly[0].wind.direction}deg)` }}
						/>
						<div className="compass-center">

							<div className="wind-info">
								<div className="wind-row">
									<div className="info-title">{t("speed")}:</div>
									<div>{forecast.daily[0].hourly[0].wind.speed} km/h</div>
								</div>
								<div className="wind-row">
									<div className="info-title">{t("gusts")}:</div>
									<div>{forecast.daily[0].hourly[0].wind.gusts} km/h</div>
								</div>
								<div className="wind-row">
									<div className="info-title">{t("direction")}:</div>
									<div>{forecast.daily[0].hourly[0].wind.direction}° {degToCompass(forecast.daily[0].hourly[0].wind.direction)}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function degToCompass(num: number) {
	const val = Math.floor((num / 45) + 0.5);
	const arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	return arr[val % 8];
}
