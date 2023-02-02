import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme, ColorModeScript, type ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig = {
  initialColorMode: 'dark', // 'system' | 'light'
}
const theme = extendTheme({config})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </ChakraProvider>
  </React.StrictMode>
)
