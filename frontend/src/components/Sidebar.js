import React, { useState } from 'react'
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SendIcon from '@material-ui/icons/Send';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LabelImportantSharpIcon from '@material-ui/icons/LabelImportantSharp';
import VideocamIcon from '@material-ui/icons/Videocam';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { Avatar, IconButton } from '@material-ui/core';
import './css/Sidebar.css'
import Modal from 'react-modal'
import TextFormatIcon from '@material-ui/icons/TextFormat';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import PhotoIcon from '@material-ui/icons/Photo';
import ScreenLockRotationIcon from '@material-ui/icons/ScreenLockRotation';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import firebase from 'firebase'
import axios from 'axios'

Modal.setAppElement('#root')

function Sidebar() {

    const user = useSelector(selectUser)
    const [modalOpen, setModalOpen] = useState(false)
    const [focus, setFocus] = useState(false)

    const [recipient, setRecipient] = useState("")
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const sender = user.email

    const shareMeet = () => {
        if(user.emailVerified){
            window.open('https://meet.google.com/getalink?hs=202')
        }
        else {
            alert('Please sign in using google account to access this feature')
            if(window.confirm('Would you like to continue with google account')){
            auth.signOut()
        }
    }
}
    const sendMail = async (e) => {
        e.preventDefault()

        if(recipient && subject && content !== ""){
            db.collection('sentMails').add({
            from: user.email,
            to: recipient,
            subject: subject,
            content: content,
            user: user,
            sent: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setModalOpen(false)
        alert('Mail Sent Successfully...')
        console.log({recipient, content, subject, sender})

        const body = {
            sender,
            recipient,
            subject,
            content,
        }

        await axios.post('/mail', body, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => {
            alert('Email delievered successfully')
        }).catch((e) => {
            console.log(e)
        })
        setContent("")
        setRecipient("")
        setSubject("")
        
        }
        

        
    }

    function openModal(){
        setModalOpen(true)
    }
    function closeModal(){
        setModalOpen(false)
    }

    const handleLogout = () => {
        if(window.confirm('Are you sure to logout?')){
            auth.signOut()
        }
    }

    return (
        <div className = "sidebar">
            <div className = "sidebarOptionsTop">
                <div 
                className = "sidebarOption">
                    <img 
                        onClick = {openModal}
                        src = "https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"
                        alt = "compose"
                    />
                    <Modal
                        isOpen={modalOpen}
                        onRequestClose = {() => setModalOpen(false)}
                        shouldCloseOnOverlayClick={false}
                        style={{
                        overlay: {
                        width: 680,
                        height: "auto",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        zIndex: "1000",
                        top: "50%",
                        left: "50%",
                        marginTop: "-250px",
                        marginLeft: "-350px",
                        borderRadius: "none"
                    },
                    content: {
                        margin: 0,
                        padding: 0,
                        border: "none"
                    }
                    }}
              >
                  <div className = "modalContainer">
                      <div className = "modalContainerTop">
                            <div className = "modalHeader">
                      <p>New Message</p>
                      <div 
                      className = "modalHeaderIcons">  
                          <IconButton onClick = {closeModal}>
                              <CloseIcon />
                          </IconButton>
                      </div>
                  </div>
                  <div onClick = {() => setFocus(true)} className = "modalRecipient">
                      <input
                        style = {{
                            display: "none"
                        }} 
                        id = "sender"
                        value = {sender}
                      />
                      <p>{focus ? "To" : "Recipients"}</p>
                      <input 
                        id = "recipient"
                        value = {recipient}
                        onChange = {(e) => setRecipient(e.target.value)}
                        type = "text"
                      />
                  </div>
                  <div className = "modalRecipient">
                      <input 
                        id = "subject"
                        value = {subject}
                        onChange = {(e) => setSubject(e.target.value)}
                        type = "text"
                        placeholder = "Subject"
                      />
                  </div>
                  <div className = "quill">
                      <ReactQuill 
                      id = "content"
                      value = {content}
                      onChange = {(value) => setContent(value)}
                      placeholder = "Compose Your mail..."
                      />
                  </div>
                </div>
                    <div className = "modalContainerBottom">
                        <div className = "modalBottom">
                        <button onClick = {sendMail}>Send</button>
                        <TextFormatIcon />
                        <AttachFileIcon />
                        <LinkIcon />
                        <SentimentSatisfiedIcon />
                        <PhotoIcon />
                        <ScreenLockRotationIcon />
                        <div className = "modalBottomLast">
                            <MoreVertIcon />
                            <DeleteIcon />
                        </div>
                      </div>
                    </div>
                  
                  </div>
                  
              </Modal>
                </div>
                <div className = "sidebarOptionIcon">
                    <InboxOutlinedIcon />
                </div>
                <div className = "sidebarOptionIcon">
                    <StarOutlinedIcon />
                </div>
                <div className = "sidebarOptionIcon">
                    <WatchLaterIcon />
                </div>
                <div className = "sidebarOptionIcon">
                    <SendIcon />
                </div>
                <div className = "sidebarOptionIcon">
                    <InsertDriveFileIcon />
                </div>
                <div className = "sidebarOptionIcon">
                    <LabelImportantSharpIcon />
                </div>
            </div>
            <div className = "sidebarOptionsBottom">
                <div className = "sidebarOptions">
                    <div className = "sidebarOptionIcon">
                        <img 
                            src = 'https://www.gstatic.com/images/icons/material/system/1x/meet_white_20dp.png'
                            alt = "meet"
                        />
                    </div>
                        <div onClick = {shareMeet} className = "sidebarOptionIcon">
                        <VideocamIcon />
                    </div>
                    <div className = "sidebarOptionIcon">
                        <KeyboardIcon />
                    </div>
            </div>
            <div className = "sidebarBottomLast">
                <div className = "sidebarOptions">
                    <div className = "sidebarOptionBottom">
                        <img 
                            src = "https://www.gstatic.com/images/icons/material/system/1x/hangout_white_20dp.png"
                            alt = 'hangout'
                        />
                    </div>
                    <div style = {{
                        cursor: "pointer"
                    }} onClick = {handleLogout} className = "sidebarOption">
                        <Avatar
                            src = {user.photo}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Sidebar
