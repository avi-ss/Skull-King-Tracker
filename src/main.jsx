import React from 'react'
import { I18nextProvider } from 'react-i18next';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GameProvider } from './context/GameContext'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import theme from './utils/theme.js';
import i18n from './utils/i18n.js';

const basename = import.meta.env.VITE_BASE_URL || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <GameProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='*' element={<Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </I18nextProvider>
  </ChakraProvider>,
)
