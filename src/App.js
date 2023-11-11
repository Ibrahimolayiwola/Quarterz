import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Offers from './pages/Offers';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import CreateList from './pages/CreateList';
import EditList from './pages/EditList';

function App() {
  return (
    <>
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<PrivateRoute />}>
         <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/create-list' element={<PrivateRoute />}>
          <Route path='/create-list' element={<CreateList />} />
        </Route>
        <Route path='/edit-list' element={<PrivateRoute />}>
          <Route path='/edit-list/:listingId' element={<EditList />} />
        </Route>
      </Routes>
     </Router>
     <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
     
  );
}

export default App;
