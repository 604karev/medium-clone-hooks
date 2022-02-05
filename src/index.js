import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import TopBar from 'components/topBar'
import { CurrentUserProvider } from 'contexts/currentUser';
import Router from 'pages/routes'




const App = () => {

    return (
        <CurrentUserProvider>
            <BrowserRouter>
                <TopBar />
                <Router />
            </BrowserRouter>
        </CurrentUserProvider>
    )
};


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


