import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import searchReducer, { selectCity } from "./search/searchSlice"
import forecastReducer, { fetchForecast } from './forecast/forecastSlice'

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: selectCity,
	effect: async (action, listenerApi) => {
		await listenerApi.dispatch(fetchForecast(action.payload.coord));
	}
})

export const store = configureStore({
	reducer: {
		search: searchReducer,
		forecast: forecastReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
