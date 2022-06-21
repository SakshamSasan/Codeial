
import { useEffect, useState } from 'react';
import Home from './Home';
import Loader from './Loader'
import NavBar from './NavBar'
import Login from './Login'
import Signup from './Signup'
import SearchResults from './SearchResults'
import Settings from './Settings'
import {Routes,Route,Navigate} from 'react-router-dom'
import { useAuth } from './providers/ProvideAuth';
import UserProfile from './UserProfile';

function PrivateRoute({children,...rest}) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/Codeial/login" />;

}

function Page404() {
  return (
    <>
      <h1 className="d-block mt-4 text-center">404</h1>
      <p className="d-block mt-3 text-center">Such page doesn't exist</p>
    </>
    
  )
}

function App() {
  //state for getting a user's posts
  var auth = useAuth();

  
  //if still loading, then render the loader, else our home page
  if(auth.loading) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
      
    )
  }
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path = '/Codeial' element={<PrivateRoute>< Home /></PrivateRoute>}>
        </Route>
        <Route exact path = '/Codeial/login' element={<Login />}>
        </Route>
        <Route exact path = '/Codeial/signup' element={<Signup />}>
        </Route>
        <Route exact path = '/Codeial/user/:userId' element={<PrivateRoute><UserProfile /></PrivateRoute>}>
        </Route>
        <Route exact path = '/Codeial/settings' element={<PrivateRoute><Settings /></PrivateRoute>}>
        </Route>
        <Route exact path = '/Codeial/results' element={<PrivateRoute><SearchResults /></PrivateRoute>}>
        </Route>
        <Route path = "*" element={<Page404 />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
