import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AppRouter from './Routes/AppRouter';
import { LogIn, selectUser } from './store/slices/UserSlice';
import { useEffect } from 'react';
import {  fetchGetUser } from './store/slices/API';

function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedProfile) {
      dispatch(LogIn(JSON.parse(savedProfile))); 

    } else {
      dispatch(fetchGetUser()); 
    }
  }, [dispatch]);
  
  
  
  return ( 
  <AppRouter/>
  )
}

export default App;
