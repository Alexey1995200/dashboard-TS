import React, {} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './clean_style.css'
import './normalize.css'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import './global.scss'

const queryClient = new QueryClient()

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }
    const {worker} = await import('./mocks/browser')
    return worker.start()
}

enableMocking().then(() => {

    const root = document.getElementById('root')

    if (root !== null) {
        const rootDOM = ReactDOM.createRoot(root);
        rootDOM.render(
            <QueryClientProvider client={queryClient}>
                <React.StrictMode>
                    <Layout/>
                </React.StrictMode>
            </QueryClientProvider>
        );
    } else {
        return <div>something broken</div>
    }
})
reportWebVitals();
