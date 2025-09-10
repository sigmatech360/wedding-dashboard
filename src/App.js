import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";
import { useDispatch } from './store';
import { initializeUser } from './store/slices/user';
import { useEffect } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import Notifications from './Components/Notifications';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUser());
    
  }, [dispatch]);
  return (
    <NotificationProvider>
      {/* <Notifications/> */}
      <AdminRouter />

    </NotificationProvider>
  );
}

export default App;
