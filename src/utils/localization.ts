export function getOWMLanguage(): string {
	const browserLang = navigator.language.toLowerCase();
	const base = browserLang.split("-")[0];

	const specialCases: Record<string, string> = {
		cs: "cz",
		ko: "kr",
		lv: "la",
		es: "sp",
		sv: "se",
		uk: "ua",
	};

	return specialCases[base] || base;
}

const translations: Record<string, Record<string, string>> = {
	en: {
		settings: "Settings",
		darklight: "Dark/Light",
		noforecast: "No forecast available. Please select a city.",
		nomatches: "No matches found",
	},
	fr: {
		settings: "Paramètres",
		darklight: "Clair/Sombre",
		noforecast: "Aucune prévision disponible. Veuillez sélectionner une ville.",
		nomatches: "Aucun résultat trouvé",
	},
	de: {
		settings: "Einstellungen",
		darklight: "Hell/Dunkel",
		noforecast: "Keine Vorhersage verfügbar. Bitte wählen Sie eine Stadt aus.",
		nomatches: "Keine Treffer gefunden",
	},
	es: {
		settings: "Configuración",
		darklight: "Claro/Oscuro",
		noforecast: "No hay pronóstico disponible. Por favor seleccione una ciudad.",
		nomatches: "No se encontraron coincidencias",
	},
	it: {
		settings: "Impostazioni",
		darklight: "Chiaro/Scuro",
		noforecast: "Nessuna previsione disponibile. Seleziona una città.",
		nomatches: "Nessun risultato trovato",
	},
	pt: {
		settings: "Definições",
		darklight: "Claro/Escuro",
		noforecast: "Nenhuma previsão disponível. Por favor, selecione uma cidade.",
		nomatches: "Nenhum resultado encontrado",
	},
	nl: {
		settings: "Instellingen",
		darklight: "Licht/Donker",
		noforecast: "Geen weersverwachting beschikbaar. Selecteer een stad.",
		nomatches: "Geen resultaten gevonden",
	},
	pl: {
		settings: "Ustawienia",
		darklight: "Jasny/Ciemny",
		noforecast: "Brak dostępnej prognozy. Proszę wybrać miasto.",
		nomatches: "Nie znaleziono wyników",
	},
	cs: {
		settings: "Nastavení",
		darklight: "Světle/Tmavě",
		noforecast: "Žádná předpověď není k dispozici. Vyberte město.",
		nomatches: "Nebyly nalezeny žádné shody",
	},
	sk: {
		settings: "Nastavenia",
		darklight: "Svetlé/Tmavé",
		noforecast: "Predpoveď nie je k dispozícii. Vyberte mesto.",
		nomatches: "Nenašli sa žiadne zhodné výsledky",
	},
};

export function getUILanguage(): string {
	const lang = navigator.language.toLowerCase();
	return translations[lang]
		? lang
		: translations[lang.split("-")[0]]
			? lang.split("-")[0]
			: "en";
}

export function t(key: string): string {
	const lang = getUILanguage();
	return translations[lang]?.[key] || translations["en"][key] || key;
}
