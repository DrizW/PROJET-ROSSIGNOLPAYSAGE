import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import '../assets/styles/normalize.css'
import '../assets/styles/Dashboard.scss'
import '../assets/styles/HomePage.scss'
import '../assets/styles/LoginPage.scss'
import '../assets/styles/Realisations.scss'
import '../assets/styles/Services.scss'
import '../assets/styles/AboutPage.scss'
import '../assets/styles/Contact.scss'
import '../src/components/footer.scss'
import '../src/components/header.scss'
import './index.scss'
import '../assets/styles/LegalMentions.scss'
import { Provider } from 'react-redux'
import store from './app/store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
