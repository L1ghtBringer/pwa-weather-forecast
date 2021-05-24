import React from 'react'
import Forecast from 'pages/Forecast/Forecast'
import { AppWrapper, LoveMercury } from './App.styles'

const App: React.FC = () => {
  return <AppWrapper>
    <Forecast/>
    <LoveMercury>C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT</LoveMercury>
  </AppWrapper>
}

export default App
