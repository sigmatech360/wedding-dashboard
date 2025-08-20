import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";
import { useDispatch } from './store';
import { initializeUser } from './store/slices/user';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUser());
    
  }, [dispatch]);
  return (
    <AdminRouter />
  );
}

export default App;
