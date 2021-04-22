import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './App.css';
import Content from './Content';

function App() {
  return (
    <div class="wrapper">
        <Header />
        <Sidebar />
        <Content />
    </div>
  );
}

export default App;
