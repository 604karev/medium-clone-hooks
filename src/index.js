import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import TopBar from 'components/topBar'
import { CurrentUserProvider } from 'contexts/currentUser';
import Router from 'pages/routes'
import { CurrentUserChecker } from 'components/currentUserChecker';
import './main.css';
import './new.css';

const App = () => {
    return (
        <CurrentUserProvider>
            <CurrentUserChecker>
                <BrowserRouter basename='/medium-clone-hooks/build/'>
                    <TopBar />
                    <Router />
                </BrowserRouter>
            </CurrentUserChecker>
        </CurrentUserProvider>
    )
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


