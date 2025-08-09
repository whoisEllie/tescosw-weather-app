import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cities from "./data/cities.json"
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './state/counter/counterSlice.js'

function App() {
	const count = useSelector((state) => state.counter.value)
	const dispatch = useDispatch()

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => dispatch(increment())}>
					increment
				</button>
				{count}
				<button onClick={() => dispatch(decrement())}>
					decrement
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
