import React, {useEffect} from 'react';
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
import ThemeProvider, {useTheme} from "./context/themeProvider";
import {setBodyColor} from "./components/dashboard/const";
import {palette} from "./assets/colors";

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
    const rootDOM = ReactDOM.createRoot(root)
    rootDOM.render(
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <ThemeProvider>
            <DashboardApp/>
          </ThemeProvider>
        </React.StrictMode>
      </QueryClientProvider>
    );
  } else {
    return <div>something broken</div>
  }
});
const DashboardApp = () => {
  const {currentTheme} = useTheme()
  useEffect(() => {
    setBodyColor({color: (currentTheme === 'dark' ? palette.littleBlackDress : palette.pinball)})
  }, [currentTheme])
  return (
    <Layout/>
  )
}
reportWebVitals()
