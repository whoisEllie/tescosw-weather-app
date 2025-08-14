import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { selectCity } from "../state/search/searchSlice";
import type { City } from "../state/search/searchSlice";
import { t } from "../utils/localization";

function SearchBar() {
	const dispatch = useDispatch();
	const [cities, setCities] = useState<City[]>([]);
	const [query, setQuery] = useState("");

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
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="searchBar"
			/>

			<div className="resultsCard">
				{results.map((city) => (
					<button
						key={city.id}
						onClick={() => {
							dispatch(selectCity(city));
							setQuery("");
						}}
					>
						{city.name}, {city.state ? `${city.state},` : ""} {city.country}
					</button>
				))}

				{query && results.length === 0 && (
					<div>{t("nomatches")}</div>
				)}
			</div>
		</div>
	);
}

export default SearchBar
