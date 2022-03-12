import React from "react"
import { Appearance, useColorScheme } from "react-native"

export const ThemeContext = React.createContext()

const ThemeContextProvider = ({ children }) => {

	const initial_theme = useColorScheme() === 'dark' ? 'dark' : 'light'

	const [theme, setTheme] = React.useState([...initial_theme].join(''))

	const onThemeChange = ({ colorScheme }) => {
		setTheme(colorScheme === 'dark' ? 'dark' : 'light')
	}

	React.useEffect(()=>{
		const theme_listener = Appearance.addChangeListener(onThemeChange)

		return ()=> theme_listener?.remove()
	}, [])

	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider