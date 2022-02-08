import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import TopBar from './components/topbar/topbar';
import App from './App';
import SignIn from './views/signIn/signIn';
import SignUp from './views/signUp/signUp';
import Footer from './components/footer/footer';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="signIn" element={<SignIn/>} />
          <Route path="signUp" element={<SignUp/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
