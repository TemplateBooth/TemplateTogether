import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import TemplatesReducer from "./store/reducers/templates";
import CodeReducer from "./store/reducers/code";
import TemplateReducer from "./store/reducers/template";

const middleware = [thunk];

const rootReducer = combineReducers(
    {
        auth: authReducer,
        templates: TemplatesReducer,
        code: CodeReducer,
        template: TemplateReducer
    }
)

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)


const app = ( 
    <React.StrictMode >
        <Provider store={store}>
            <BrowserRouter >
                <App / >
            </BrowserRouter>  
        </Provider>
    </React.StrictMode >
);


ReactDOM.render(
    app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();