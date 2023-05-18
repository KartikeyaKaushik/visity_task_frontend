import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Main from './components/main.js';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
        </Routes>
      </Router>
    </>
  )
}
export default App;