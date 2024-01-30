import React from 'react';
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
            <div className={'wrapper'} style={{display:"flex", flexDirection:"column"}}>
                <Header/>
                <div className={'body'} style={{
                    display: 'grid',
                    gridTemplateColumns: '200px 1fr',
                }}>
                    <SideBar/>
                    <Grid/>
                </div>
            </div>
        </React.StrictMode>
    );
})
reportWebVitals();
