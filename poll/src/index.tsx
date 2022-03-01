import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.scss';
import NavBar from './components/navbar/Navbar';
import App from './App';
import SignIn from './views/signIn/signIn';
import SignUp from './views/signUp/signUp';
import Footer from './components/footer/Footer';
import Poll from './views/poll/home/poll';
import PollResult from './views/poll/result/result';
import MyPolls from './views/myPolls/myPolls';
import EditPoll from './views/poll/edit/edit';
import ProtectedRoute from './utils/ProtectedRoute';
import AuthProvider from './contexts/auth.context';
import SignOut from './views/signOut/signOut';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
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
            <Route path="/" element={<App />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="/signOut" element={<ProtectedRoute {...{authentiactionPath: "/", target: <SignOut />}} />} /> 
            <Route path="MyPolls" element={<ProtectedRoute {...{authentiactionPath: "/signIn", target: <MyPolls />}} />} />
            <Route path="poll" element={<Navigate to="/" />} />
            <Route path="poll/:id" element={<Poll />} />
            <Route path="poll/:id/result" element={<PollResult />} />
            <Route path="poll/:id/edit" element={<EditPoll />} />
          </Routes>
          <Footer/>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
