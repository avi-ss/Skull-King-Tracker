import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GameProvider } from './context/GameContext'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </ChakraProvider>,
)
