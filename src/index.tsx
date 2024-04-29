import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './clean_style.css';
import './normalize.css';
import './index.css';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import Layout from "./components/layout";
import {isSystemThemeDark} from "./components/dashboard/const";
import {saveToLS} from "./components/dashboard/utils";

const queryClient = new QueryClient();

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    const {worker} = await import('./mocks/browser');
    return worker.start();
}

enableMocking().then(() => {
    const root = document.getElementById('root');
    if (root !== null) {
        const rootDOM = ReactDOM.createRoot(root);
        rootDOM.render(
            <QueryClientProvider client={queryClient}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </QueryClientProvider>
        );
    } else {
        return <div>something broken</div>;
    }
});

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(isSystemThemeDark)
    const setBodyColor = ({color}: any) => {
        document.documentElement.style.setProperty('--bodyColor', color)
    }
    const changeDarkThemeState = () => {
        setIsDarkTheme(!isDarkTheme)
        saveToLS('isDarkTheme', !isDarkTheme)
    }
    useEffect(() => {
        setBodyColor({color: (isDarkTheme ? '#43494c' : '#d3d3d3')})
    }, [isDarkTheme]);
    return (
        <Layout
            isDarkTheme={isDarkTheme}
            changeDarkThemeState={changeDarkThemeState}
            setIsDarkTheme={setIsDarkTheme}
        />
    );
};

reportWebVitals();
