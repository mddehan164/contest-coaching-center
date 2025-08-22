// src/main.jsx
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux-rtk/store/store.jsx'
import { ContextProvider } from './context/ContextProvider.jsx'
import { LoaderProvider } from './context/LoaderContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LoaderProvider>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </LoaderProvider>
  </Provider>
)

window.addEventListener('load', () => {
  const init = document.getElementById('initial-loader');
  init?.remove();
})