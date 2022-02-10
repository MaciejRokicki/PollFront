import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import NavBar from './components/navbar/Navbar';
import App from './App';
import SignIn from './views/signIn/signIn';
import SignUp from './views/signUp/signUp';
import Footer from './components/footer/Footer';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <NavBar />
        <div className="header">
          <div className="container">
            <h1>Poll</h1>
            <div>
              <h2>Twórz ankiety bez zakładania konta</h2>
            </div>
          </div>
        </div>
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
