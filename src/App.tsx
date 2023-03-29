import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

import NavBar, { SecondNavBarTime } from './components/navbar';
import { Card, Col, Container, Row } from 'react-bootstrap';
import  Footer  from './components/footer';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom"
import { Homepage } from './pages/homepage';
import Login, {ChangePassword, Register} from './pages/login';
import { Profile } from './pages/profile';
import Case from './pages/case';
import AddNote from './pages/addNote';
import AddSafeguardingNote from './pages/addSafeguardingNote';
import Search from './pages/search';
import Cases from './pages/staffCases';
import { addTokenHeader, getPersonId, hasJWT } from './glue/Auth';
import FourOhFour from './pages/404';
import axios from 'axios';
import { GetUserProfile } from './glue/DBConnector';
axios.defaults.withCredentials = true

export const AuthenticatedRoute = (props: any) => {
  if (!hasJWT())
  {
    return <Navigate to="/login" replace />
  }
  return props['children'] ? props['children'] : <Outlet />
}

export function LogoutComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    Logout()
  .then(
    () => navigate("/"));}, []);
  
  return <></>
}


export async function Logout() {

  const config = {
    headers: addTokenHeader()
  }

  
  console.log("hello")
  const res = await axios.put('http://localhost/api/logout', {}, {headers: addTokenHeader()})
  localStorage.removeItem("access_token_cookie") 
  return true

}

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<AuthenticatedRoute><Homepage /></AuthenticatedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout/" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
      <Route path="/profile/change-password/" element={<AuthenticatedRoute><ChangePassword /></AuthenticatedRoute>} />

      <Route path="/profile/:id" element={<AuthenticatedRoute><Profile hasCase={false} /></AuthenticatedRoute>} />
      <Route path="/profile" element={<AuthenticatedRoute><Profile hasCase={false} self={true} /></AuthenticatedRoute>} />
      <Route path="/case/:id" element={<AuthenticatedRoute><Case /></AuthenticatedRoute>} />
      <Route path="/cases/" element={<AuthenticatedRoute><Cases /></AuthenticatedRoute>} />
      <Route path="/note/user/:id" element={<AuthenticatedRoute><AddNote /></AuthenticatedRoute>} />
      <Route path="/search/" element={<AuthenticatedRoute><Search /></AuthenticatedRoute>} />
      <Route path="/safeguarding/add" element={<AuthenticatedRoute><AddSafeguardingNote /></AuthenticatedRoute>} />
      <Route path='*' element={<FourOhFour />}/>
    </Routes>
  )}


export default App;

