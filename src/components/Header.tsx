import SearchBar from './SearchBar'

function Header() {
	return (
		<div className="header">
			<button>Settings</button>
			<SearchBar />
			<button>Dark/Light</button>
		</div>
	)
}

export default Header
