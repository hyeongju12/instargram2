import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
// import App from 'App';
import reportWebVitals from 'reportWebVitals';
import Root from 'pages';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, BrowserRouter
} from "react-router-dom";
import 'antd/dist/antd.min.css';
import {AppProvider} from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppProvider>
            <React.StrictMode>
                <Root />
            </React.StrictMode>
        </AppProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
