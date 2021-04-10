import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import './css/Gmail.css'
import Mail from './Mail'
import Widget from './Widget'

function Gmail() {
    return (
        <div className = "gmail">
            <Header />
            <div className = "gmailOptions">
                <Sidebar />
                <Mail />
                <Widget />
            </div>    
        </div>
    )
}

export default Gmail
