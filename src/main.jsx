import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GameProvider } from './context/GameContext'
import { ChakraProvider } from '@chakra-ui/react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  </ChakraProvider>,
)
