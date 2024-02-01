import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './clean_style.css'
import './normalize.css'
import Grid from "./Grid";
import Header from "./components/header";
import SideBar from "./components/sideBar";


async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }
    const {worker} = await import('./mocks/browser')
    return worker.start()
}

enableMocking().then(() => {

    // @ts-ignore
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
})
reportWebVitals();
