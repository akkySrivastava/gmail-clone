import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './components/auth/Login';
import Gmail from './components/Gmail';
import { login, logout, selectUser } from './features/userSlice';
import {auth} from './firebase'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
    if(authUser){
      dispatch(login({
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName ? authUser.displayName : authUser.email.toString().split("@")[0].trim(),
        photo: authUser.photoURL ? authUser.photoURL : "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
        emailVerified: authUser.emailVerified
      }  
      ))
      console.log(authUser)
    } else {
      dispatch(logout())
    }
  })
  }, [dispatch])

  

  return (
    <div className="App">
      {
        user ? (<Gmail />) : (<Login />)
      }
      
    </div>
  );
}

export default App;
