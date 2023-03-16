import React, { useState } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

import NavBar, { SecondNavBarTime } from './components/navbar';
import { Card, Col, Container, Row } from 'react-bootstrap';
import  Footer  from './components/footer';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Homepage } from './pages/homepage';
import Login, {Register} from './pages/login';
import { Profile } from './pages/profile';
import Case from './pages/case';
import AddNote from './pages/addNote';
import AddSafeguardingNote from './pages/addSafeguardingNote';
import Search from './pages/search';
import Cases from './pages/staffCases';





function App() {


  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/" element={<Profile />} />
      <Route path="/case/" element={<Case />} />
      <Route path="/cases/" element={<Cases />} />
      <Route path="/note/" element={<AddNote />} />
      <Route path="/search/" element={<Search />} />
      <Route path="/safeguarding/add" element={<AddSafeguardingNote />} />
    </Routes>
  )}


export default App;

