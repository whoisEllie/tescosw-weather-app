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
		noforecast: "No forecast available. Please select a city.",
		nomatches: "No matches found",
		'current-conditions': "Current Conditions",
		'five-day-forecast': "Five Day Forecast",
		'daily-forecast': "Hourly Forecast",
		'wind-forecast': "Wind Conditions",
		speed: "speed",
		gusts: "gusts",
		direction: "direction"
	},
	de: {
		noforecast: "Keine Vorhersage verfügbar. Bitte wählen Sie eine Stadt.",
		nomatches: "Keine Treffer gefunden",
		'current-conditions': "Aktuelle Bedingungen",
		'five-day-forecast': "Fünf-Tage-Vorhersage",
		'daily-forecast': "Stündliche Vorhersage",
		'wind-forecast': "Windbedingungen",
		speed: "Geschwindigkeit",
		gusts: "Böen",
		direction: "Richtung"
	},
	fr: {
		noforecast: "Aucune prévision disponible. Veuillez sélectionner une ville.",
		nomatches: "Aucune correspondance trouvée",
		'current-conditions': "Conditions actuelles",
		'five-day-forecast': "Prévisions sur cinq jours",
		'daily-forecast': "Prévisions horaires",
		'wind-forecast': "Conditions du vent",
		speed: "vitesse",
		gusts: "rafales",
		direction: "direction"
	},
	it: {
		noforecast: "Nessuna previsione disponibile. Seleziona una città.",
		nomatches: "Nessun risultato trovato",
		'current-conditions': "Condizioni attuali",
		'five-day-forecast': "Previsioni a cinque giorni",
		'daily-forecast': "Previsioni orarie",
		'wind-forecast': "Condizioni del vento",
		speed: "velocità",
		gusts: "raffiche",
		direction: "direzione"
	},
	es: {
		noforecast: "No hay pronóstico disponible. Por favor, seleccione una ciudad.",
		nomatches: "No se encontraron coincidencias",
		'current-conditions': "Condiciones actuales",
		'five-day-forecast': "Pronóstico de cinco días",
		'daily-forecast': "Pronóstico por horas",
		'wind-forecast': "Condiciones del viento",
		speed: "velocidad",
		gusts: "ráfagas",
		direction: "dirección"
	},
	cs: {
		noforecast: "Předpověď není k dispozici. Vyberte prosím město.",
		nomatches: "Nebyly nalezeny žádné shody",
		'current-conditions': "Aktuální podmínky",
		'five-day-forecast': "Pětidení předpověď",
		'daily-forecast': "Hodinová předpověď",
		'wind-forecast': "Podmínky větru",
		speed: "rychlost",
		gusts: "nárazy",
		direction: "směr"
	},
	sk: {
		noforecast: "Predpoveď nie je k dispozícii. Prosím, vyberte mesto.",
		nomatches: "Nenašli sa žiadne zhody",
		'current-conditions': "Aktuálne podmienky",
		'five-day-forecast': "Päťdňová predpoveď",
		'daily-forecast': "Hodinová predpoveď",
		'wind-forecast': "Podmienky vetra",
		speed: "rýchlosť",
		gusts: "nárazy",
		direction: "smer"
	}
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
