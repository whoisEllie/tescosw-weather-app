import { createSlice } from "@reduxjs/toolkit";

export interface City {
	id: number | string;
	name: string;
	state?: string;
	country: string;
	coord: { lon: number; lat: number };
};

interface SearchState {
	selectedCity: City | null;
}

const initialState: SearchState = {
	selectedCity: null,
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		selectCity(state, action) {
			console.log(action.payload)
			state.selectedCity = action.payload;
		},
		clearSelectedCity(state) {
			state.selectedCity = null;
		},
	},
});

export const { selectCity, clearSelectedCity } = searchSlice.actions;
export default searchSlice.reducer;
