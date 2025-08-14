import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { selectCity } from "../state/search/searchSlice";
import type { City } from "../state/search/searchSlice";
import { t } from "../utils/localization";

function SearchBar() {
	const dispatch = useDispatch();
	const [cities, setCities] = useState<City[]>([]);
	const [query, setQuery] = useState("");
	const [placeholder, setPlaceholder] = useState("Enter a city...");

	useEffect(() => {
		fetch("/cities.json")
			.then((res) => {
				if (!res.ok) throw new Error("Unable to load cities.json");
				return res.json();
			})
			.then((data: City[]) => {
				setCities(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	// basic search
	const results = useMemo(() => {
		const trimmedQuery = query.trim().toLowerCase();
		if (!trimmedQuery) return [];
		return cities
			.filter((c) =>
				`${c.name} ${c.state ?? ""} ${c.country}`
					.toLowerCase()
					.includes(trimmedQuery)
			)
			.slice(0, 5);
	}, [query, cities]);

	return (
		<div>
			<div className="searchGroup">
				<form onSubmit={event => {
					dispatch(selectCity(results[0]))
					setPlaceholder(results[0].name);
					setQuery("");
					event.preventDefault();
					event.stopPropagation();
				}}>
					<input
						type="text"
						value={query}
						placeholder={placeholder}
						onChange={(e) => setQuery(e.target.value)}
						className="searchBar"
					/>
				</form>
				<button className="geolocate" onClick={() => {
					navigator.geolocation.getCurrentPosition((position) => {
						const { latitude, longitude } = position.coords;

						let mockCity = {
							id: 0,
							name: "",
							state: undefined,
							country: "",
							coord: { lon: longitude, lat: latitude }
						}
						dispatch(selectCity(mockCity))
					});
				}}><img src="/public/icons/pin.svg" /></button>
			</div>

			<div className="resultsCard">
				{results.map((city) => (
					<button
						key={city.id}
						onClick={() => {
							dispatch(selectCity(city));
							setQuery("");
							setPlaceholder(city.name);
						}}
					>
						{city.name}, {city.state ? `${city.state},` : ""} {city.country}
					</button>
				))}

				{query && results.length === 0 && (
					<div>{t("nomatches")}</div>
				)}
			</div>
		</div >
	);
}

export default SearchBar
