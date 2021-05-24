import React from 'react'
import Forecast from 'pages/Forecast/Forecast'
import { Snackbar } from 'components'
import { AppWrapper, LoveMercury } from './App.styles'

const App: React.FC = () => {
  return <AppWrapper>
    <Snackbar message={{ text: 'The application can work offline' }} success={true}/>
    <Forecast/>
    <LoveMercury>C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT</LoveMercury>
  </AppWrapper>
}

export default App
