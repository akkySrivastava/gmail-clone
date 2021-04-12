import React, {useState } from 'react'
import './Login.css'
import {auth, provider} from '../../firebase'

function Login() {

    const [email, setEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : "")
    const [password, setPassword] = useState(localStorage.getItem('password') ? localStorage.getItem('password') : "")
    const [loading, setLoading] = useState(true)

    const handleRegister = (e) => {
        setLoading(false)
        e.preventDefault()
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        if(email && password){
            auth.createUserWithEmailAndPassword(email, password).then((auth) => {
                setLoading(true)
            alert('Registered successfully!!!')
            //console.log(auth)
        }).catch((e) => alert(e.message))
        } else {
            alert('Please fill all required field')
        }
        
    }

    const handleSignIn = () => {
        setLoading(false)
        auth.signInWithPopup(provider).then((auth) => {
            setLoading(true)
            alert('Signed in successfully')
        }).catch((e) => alert(e.message))
    }

    const handleLogin = () => {
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        if(email && password){
            setLoading(false)
            auth.signInWithEmailAndPassword(email, password).then((auth) => {
                setLoading(true)
            alert('Signed In successfully')
            
        }).catch((err) => alert(err.message))
        } else{
            alert('Please fill all required field')
        }
        
    }
    const[register, setRegister] = useState(false)

    return (
        <div className = "login">
            {
                loading ? (<>
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
                        required = {true}
                        onChange = {(e) => setEmail(e.target.value)}
                        type = "text"
                        placeholder = "Email"
                    />
                    <input 
                        value = {password}
                        required = {true}
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
                </>) : (<>
                    <div className = "loading">
                        <img 
                        src = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif"
                        alt = ""
                    />
                    <h1>Please Wait...</h1>
                    </div>
                    
                </>)
}
        </div>
    )
}

export default Login
