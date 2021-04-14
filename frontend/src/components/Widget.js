import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import './css/Widget.css'

function Widget() {

    const user = useSelector(selectUser)
    const handleClickCalender = () => {
        if(user.emailVerified){
            window.open('https://calendar.google.com', '_blank', 'noopener noreferrer')
        }
        else {
            alert('Please sign in using google account to access this feature')
            if(window.confirm('Would you like to continue with google account')){
                auth.signOut()
        }
            
    }
           
} 

const handleClickKeep = () => {
    if(user.emailVerified){
        window.open('https://keep.google.com', '_blank', 'noopener noreferrer')
    }
    else {
        alert('Please sign in using google account to access this feature')
        if(window.confirm('Would you like to continue with google account')){
            auth.signOut()
    }
        
}

}

const handleClickTasks = () => {
    if(user.emailVerified){
        window.open('https://tasksboard.app', '_blank', 'noopener noreferrer')
    }
    else {
        alert('Please sign in using google account to access this feature')
        if(window.confirm('Would you like to continue with google account')){
            auth.signOut()
    }
        
}

}

const handleClickContacts = () => {
    if(user.emailVerified){
        window.open('https://contacts.google.com', '_blank', 'noopener noreferrer')
    }
    else {
        alert('Please sign in using google account to access this feature')
        if(window.confirm('Would you like to continue with google account')){
            auth.signOut()
    }
        
}
       
} 
    return (
        <div className = "widget">
            <div className = "widgetOptions">
                    <img 
                    onClick = {handleClickCalender}
                    src = "https://www.gstatic.com/companion/icon_assets/calendar_2020q4_2x.png"
                    alt = "calender"
                />
                </div>
                <div className = "widgetOptions">
                <img 
                    onClick = {handleClickKeep}
                    src = "https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png"
                    alt = "calender"
                />
                </div>
                <div className = "widgetOptions">
                <img 
                    onClick = {handleClickTasks}
                    src = "https://www.gstatic.com/companion/icon_assets/tasks2_2x.png"
                    alt = "tasks"
                />
                </div>
                <div className = "widgetOptions">
                <img 
                    onClick = {handleClickContacts}
                    src = "https://www.gstatic.com/companion/icon_assets/contacts_2x.png"
                    alt = "contacts"
                />
                </div>
                <hr />
                <div className = "widgetOptions">
                <img 
                    
                    src = "https://www.gstatic.com/images/icons/material/system/1x/add_white_24dp.png"
                    alt = "add"
                />
                </div>
            
        </div>
    )
}

export default Widget
