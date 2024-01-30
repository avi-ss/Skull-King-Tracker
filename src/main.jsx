import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GameProvider } from './context/GameContext'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const basename = import.meta.env.VITE_BASE_URL || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <GameProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='*' element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  </ChakraProvider>,
)
