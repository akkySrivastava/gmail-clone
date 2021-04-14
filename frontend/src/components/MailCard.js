import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { CheckBox, MoreVert, Star } from '@material-ui/icons';
import PrintIcon from '@material-ui/icons/Print';
import LaunchIcon from '@material-ui/icons/Launch';
import ReplyIcon from '@material-ui/icons/Reply';

import './css/MailCard.css'
import ForwardIcon from '@material-ui/icons/Forward';
import { Avatar, IconButton } from '@material-ui/core';
import db from '../firebase';
import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser'
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
import { selectMailId, setMailId } from '../features/replySlice';
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    color: "#fff",
    marginLeft: "5px",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 400,
  },
}));

function SimpleAccordion({key,Id, mail}) {
  const classes = useStyles();
  //console.log(id, mail)

  const user = useSelector(selectUser)
  const [modalOpen, setModalOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [forward, setForward] = useState(false)

  const [recipient, setRecipient] = useState(mail.to)
  const [subject, setSubject] = useState(mail.subject)
  const [content, setContent] = useState("")
  const dispatch = useDispatch()
  const [repliedMails, setRepliedMails] = useState([])
  const [fwdMails, setFwdMails] = useState([])
  const [replied, setReplied] = useState(false)
  const [fwd, setFwd] = useState(false)

  const mailId = useSelector(selectMailId)

  const sendMail = (id) => {
    forward ?  addForward(id) : addReply(id) 
  }

  useEffect(() => {
    if(mailId?.mailId){
      db.collection('sentMails').doc(mailId.mailId).collection('fowardedMails').orderBy('timestamp' ,'desc').onSnapshot((snapshot) => setFwdMails(snapshot.docs.map((doc) => ({id: doc.id, fwdMail: doc.data()}))))

      setFwd(true)
    }
  }, [mailId])

  useEffect(() => {
    if(mailId?.mailId){
      db.collection('sentMails').doc(mailId.mailId).collection('repliedMails').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setRepliedMails(snapshot.docs.map((doc) => ({id: doc.id, reMail: doc.data()}))))

      setReplied(true)
    }
    //console.log(repliedMails)
  }, [mailId])

  const addReply = (id) => {
    console.log(id)
    if(id.mailId){
      db.collection('sentMails').doc(id.mailId).collection('repliedMails').add({
        from : user.email,
        to : recipient,
        subject : `re<${subject}>`, 
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: content,
        replied: true,
        id: id,
        user: user
      })
      alert('Mail replied successfully...')
      setModalOpen(false)
    }
  }

  const addForward = (id) => {
    
    console.log(id)
    if(id){
        db.collection('sentMails').doc(id.mailId).collection('fowardedMails').add({
        from: user.email,
        to: recipient,
        subject: `fwd<${subject}>`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: content,
        forwarded: true,
        id: id,
        user: user
      })
      alert('Mail forwarded successfully...')
      setModalOpen(false)
    }
  }

  const handleForward = () => {
    setModalOpen(true)
    setForward(true)
  }

  const handleReply = () => {
    setModalOpen(true)
    setForward(false)
  }

  return (
    <div className={classes.root}>
      <Accordion onClick = {() => dispatch(
        setMailId({
          mailId: Id
        })
      )} key = {key}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            
            <div className = "accordMid">
            <div className = "accordLeft">
                <CheckBox />
                <Star />
                <Typography className={classes.heading}>{mail.user.email === user.email ? "me" : mail.from.toString().split('@')[0].trim()}</Typography>
            </div>
            <div className = "accordMidMain">
                
                <Typography className = {classes.heading}>
                    {mail.subject}
                </Typography>
                <p className = {classes.heading}>Click Here to see Mail Content</p></div>
                <div className = "accordMidDate">
                <Typography className = {classes.heading}>{new Date(mail.timestamp?.toDate()).toLocaleString()}</Typography>
            
            </div>
            
            </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className = "accordDetails">
            <div className = "accordDetailsTop">
              <p>{mail.subject}</p>
              <div className = "accordDetailsTopRight">
                <PrintIcon />
                <LaunchIcon />
              </div>
            </div>
            
              <div className = "accordDetailsInfo">
                <Avatar 
                  src = {mail.user.photo}
                />
                <div className = "sendersInfo">
                  <h4>{mail.user.displayName}<small>{mail.from}</small></h4>
                  <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
                </div>
                <div className = "sendersInfoDate">
                  <div className = "sendersInfoDateOption">
                    <small>{new Date(mail.timestamp?.toDate()).toLocaleString()}</small>
                    <Star />
                    <ReplyIcon />
                    <MoreVert />
                  </div>
                </div>
              </div>
              <div className = "mailContent">
                <div className = "mailContentAccord">
                  {
                      ReactHtmlParser(mail.content)
                  }
                </div>
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
                      <p>{forward ? "Forward" : "Reply"}</p>
                      <div 
                      className = "modalHeaderIcons">  
                          <IconButton onClick = {() => setModalOpen(false)}>
                              <CloseIcon />
                          </IconButton>
                      </div>
                  </div>
                  <div onClick = {() => setFocus(true)} className = "modalRecipient">
                      <p>{focus ? "To" : "Recipients"}</p>
                      <input
                        required = {true} 
                        value = {recipient}
                        onChange = {(e) => setRecipient(e.target.value)}
                        type = "text"
                      />
                  </div>
                  <div className = "modalRecipient">
                      <input 
                        required = {true} 
                        value = {subject}
                        onChange = {(e) => setSubject(e.target.value)}
                        type = "text"
                        placeholder = "Subject"
                      />
                  </div>
                  <div className = "quill">
                      <ReactQuill 
                      value = {content}
                      onChange = {(value) => setContent(value)}
                      placeholder = {forward ? "Add content then forward mail..." : "Add reply to this mail..."}
                      />
                  </div>
                </div>
                    <div className = "modalContainerBottom">
                        <div className = "modalBottom">
                        <button onClick = {(e) => sendMail(mailId)}>{forward ? "Forward" : "Reply"}</button>
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
                  
              </Modal>{
                replied &&  repliedMails.map(({id, reMail}) => (
                    <ReplyMails key = {id} id = {id} mail = {reMail}/>
                ))
              
              }

              {
                fwd && fwdMails.map(({id, fwdMail}) => (
                  <ForwardMails key = {id} id = {id} mail = {fwdMail}/>
                ))
              }
              
              
                <div className = "mailReplyLinks">
                  
                  <div onClick = {handleReply} className = "mailReplyLink">
                    <ReplyIcon />
                    <a  href = "#">Reply</a>
                    
                  </div>
                  <div onClick = {handleForward} className = "mailReplyLink">
                    <ForwardIcon />
                    <a  href = "#">Forward</a>
                  </div>
                </div>
              </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const ReplyMails = ({id, mail}) =>  {
  console.log(id, mail)

  const user = useSelector(selectUser)
  return (<>
  <div className = 'repliedMail'>
                <div className = "repliedMailContainer">
                  <div className = "repliedMailTop">
                    <h5>{`<replied mail>`}</h5>
                  </div>
                  
                  <div className = "repliedMailMid">
                    <p style = {{
                      margin: "0px 10px",
                      paddingBottom: "10px",
                      fontWeight: '500'
                    
                    }}>{mail.subject}</p>
                        <div className = "accordDetailsInfo">
                      <Avatar 
                        src = {mail.user.photo}
                      />
                      <div className = "sendersInfo">
                      <h4>{mail.user.displayName}<small>{mail.from}</small></h4>
                  <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
                      </div>
                      <div className = "sendersInfoDate">
                        <div className = "sendersInfoDateOption">
                          <small>{new Date(mail.timestamp?.toDate()).toLocaleString()}</small>
                          <Star />
                          <ReplyIcon />
                          <MoreVert />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className = "mailContent">
                              <div className = "mailContentAccord">
                          {
                              ReactHtmlParser(mail.content)
                          }
                        </div>
                        </div>
              </div>
  </>)
  
}

const ForwardMails = ({id, mail}) => {
  console.log(id, mail)

  const user = useSelector(selectUser)
  return (<>
    <div className = 'repliedMail'>
                <div className = "repliedMailContainer">
                  <div className = "repliedMailTop">
                    <h5>{`<forwarded mail>`}</h5>
                  </div>
                  <div className = "repliedMailMid">
                        <div className = "accordDetailsInfo">
                      <Avatar 
                        src = {mail.user.photo}
                      />
                      <div className = "sendersInfo">
                      <h4>{mail.user.displayName}<small>{mail.from}</small></h4>
                  <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
                      </div>
                      <div className = "sendersInfoDate">
                        <div className = "sendersInfoDateOption">
                          <small>{new Date(mail.timestamp?.toDate()).toLocaleString()}</small>
                          <Star />
                          <ReplyIcon />
                          <MoreVert />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className = "mailContent">
                              <div className = "mailContentAccord">
                          {
                              ReactHtmlParser(mail.content)
                          }
                        </div>
                        </div>
              </div>
  </>)
}

function MailCard() {
  const [mails, setMails] = useState([])
  const [userMail, setUserMail]  = useState([])
  const [show, setShow] = useState(false)
  const [welcome, setWelcome] = useState(true)

  const user = useSelector(selectUser)

  useEffect(() => {
    db.collection('sentMails').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setMails(snapshot.docs.map((doc) => ({
      id: doc.id,
      mail: doc.data()
    }))))
  }, [])

  useEffect(() => {
    if(mails.length !==0){
      mails.map(({id, mail}) => {
        if(user.email === mail.to || user.email === mail.from){
              setUserMail(mail)
              setShow(true)
              setWelcome(false)
          }
      })
    }
  })

  // console.log(userMail)

    return (
        <div className = "mailCard">
          { show &&
            mails.map(({id, mail}) => {
              if(user.email === mail.to || user.email === mail.from){
                return(<>{
                     <SimpleAccordion key = {id} Id = {id} mail = {mail}/>
                  }
                  </>) 
              }
                  
            }  
            )
          }
          {
            welcome && <>
              <div className = "noMail">
                <div className = "noMailContainer">
                  <img 
                  src = "https://media3.giphy.com/media/lSCLYbVra2E1Z6eJ12/giphy.gif"
                  alt = ""
                />
                <h3>To compose mail click on the <span>
                  <img 
                    src = "https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"
                    alt = "compose"
                  /> </span>icon in sidebar</h3>
                </div> 
              </div>
            </>
          }
           
        </div>
    )
}

export default MailCard
