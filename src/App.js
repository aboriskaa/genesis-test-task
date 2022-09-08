import './App.css';
import React, { useState, useEffect } from 'react'
import Calendar from './pages/Calendar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import moment from "moment";




function App() {

  const [today, setToday] = useState(moment());


  useEffect(() => {
    if (localStorage.getItem('today')) {
      setToday(moment(localStorage.getItem('today')).clone())
    }
    if (!localStorage.getItem('ideas')) {
      localStorage.setItem('ideas', '[]');
    }

  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{}}>
        <Header today={today} setToday={setToday} />
        <Calendar today={today} />
      </Container>
    </>

  );
}

export default App;
