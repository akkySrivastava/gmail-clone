import React, { useState } from 'react'
import './Login.css'
import {auth, provider} from '../../firebase'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            alert('Registered successfully!!!')
            //console.log(auth)
        }).catch((e) => alert(e.message))
    }

    const handleSignIn = () => {
        auth.signInWithPopup(provider).catch((e) => alert(e.message))
    }

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            alert('Signed In successfully')
        }).catch((err) => alert(err.message))
    }
    const[register, setRegister] = useState(false)

    return (
        <div className = "login">
            {
                register ? (<>
                <div className = "loginContainer">
                <div className = "logo">
                    <img 
                        src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"
                        alt = "logo"
                    />
                    <h3>Register </h3>
                    <p>Create Account to continue with Gmail Clone</p>
                </div>
                <div className = "loginContent">
                    <input 
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        type = "text"
                        placeholder = "Email"
                    />
                    <input 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        type = "password"
                        placeholder = "Password"
                    />
                    <button type = 'submit' onClick = {handleRegister}>Register</button>
                    <button onClick = {handleSignIn}>Continue using Google</button>
                    
                </div>     
                <p onClick = {() => setRegister(false)}>Login?</p>
            </div>
                </>) : (<>
                    <div className = "loginContainer">
                <div className = "logo">
                    <img 
                        src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"
                        alt = "logo"
                    />
                    <h3>Sign in </h3>
                    <p>to continue to Gmail Clone</p>
                </div>
                <div className = "loginContent">
                    <input 
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        type = "text"
                        placeholder = "Email"
                    />
                    <input 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        type = "password"
                        placeholder = "Password"
                    />
                    <button type = "submit" onClick = {handleLogin}>Login</button>
                    <button onClick = {handleSignIn}>Continue using Google</button>
                    
                </div>     
                <p onClick = {() => setRegister(true)}>Register?</p>
            </div>
                    </>) 
            }
            
        </div>
    )
}

export default Login
