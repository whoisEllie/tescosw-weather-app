import Header from "./components/Header"
import { useSelector } from "react-redux"
import type { RootState } from "./state/store"

function App() {

	const selectedCity = useSelector((state: RootState) => state.search.selectedCity)

	return (
		<div className='mainWrapper'>
			<Header />
			<div className="tempCity">
				{selectedCity?.name}
			</div>

		</div>
	)
}

export default App
