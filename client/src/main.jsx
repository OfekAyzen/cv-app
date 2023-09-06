import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from './ApiContext'
import UserProvider from './UserContext'
import 'globalthis/auto';


import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserProvider>
            <ApiProvider>
                <App />
            </ApiProvider>
        </UserProvider>
    </React.StrictMode>
);
