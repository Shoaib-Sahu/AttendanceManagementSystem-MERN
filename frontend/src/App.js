import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import ViewAttendance from './components/ViewAttendance/ViewAttendance';
import Admin from './pages/Admin/Admin';

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      {/* <Admin /> */}
      <Routes>
        <Route path='/' element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />

        <Route path='/home' element={user ? <Home /> : <Navigate to='../auth' />} />

        <Route path='/auth' element={user ? <Navigate to='../home' /> : <Auth />} />

        <Route path='/details' element={user ? <ViewAttendance /> : <Navigate to='../auth' />} />
      </Routes>

    </div>
  );
}

export default App;