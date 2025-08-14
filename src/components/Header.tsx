import { t } from '../utils/localization'
import SearchBar from './SearchBar'

function Header() {
	return (
		<div className="header">
			<button>{t("settings")}</button>
			< SearchBar />
			<button>{t("darklight")}</button>
		</div>
	)
}

export default Header
