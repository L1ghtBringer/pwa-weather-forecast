import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import backgroundDown from 'assets/backgroundDown.svg'
import backgroundDownLow from 'assets/backgroundDownLow.svg'
import backgroundUp from 'assets/backgroundUp.svg'
import backgroundUpLow from 'assets/backgroundUpLow.svg'
import { theme } from './styled'
import './font.css'

const Global = createGlobalStyle`
*,
::after,
::before{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  overflow-x:hidden;
  margin-right: calc(-1 * (100vw - 100%));
  background: url(${backgroundUp}) top center no-repeat, url(${backgroundDown}) bottom center no-repeat #373af5;;
  background-size: 100%, 100%, cover;
  @media ${theme.media.phone}{
    background: url(${backgroundUpLow}) top center no-repeat, url(${backgroundDownLow}) bottom center no-repeat #373af5;
    background-size: 100%, 100%, cover;
  }
}
`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
