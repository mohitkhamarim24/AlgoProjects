import React, { useState } from "react";
import "./App.css";
import Home from './Home'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
function App() {
  return (
    <div className="App">
    <Home/>
    </div>
  );
}

export default App;
