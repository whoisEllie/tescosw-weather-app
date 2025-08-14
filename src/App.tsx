import Header from "./components/Header"
import FiveDayForecastTable from "./components/FiveDayForecastTable"
import DailyForecastTable from "./components/DailyForecastTable"
import CurrentConditions from "./components/CurrentConditions"
import WindConditions from "./components/WindConditions"


function App() {

	return (
		<div className='mainWrapper'>
			<Header />
			<div className="body">
				<CurrentConditions />
				<FiveDayForecastTable />
				<DailyForecastTable />
				<WindConditions />
			</div>
		</div>
	)
}

export default App
