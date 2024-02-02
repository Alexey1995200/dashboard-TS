import React, {} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './clean_style.css'
import './normalize.css'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

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
        <QueryClientProvider client={queryClient}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </QueryClientProvider>
    );
})
reportWebVitals();
