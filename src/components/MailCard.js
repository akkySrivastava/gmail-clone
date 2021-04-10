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
import { Avatar } from '@material-ui/core';
import db from '../firebase';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser'

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

function SimpleAccordion({id, mail}) {
  const classes = useStyles();
  console.log(id, mail)

  const user = useSelector(selectUser)

  return (
    <div className={classes.root}>
      <Accordion>
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
                <Avatar />
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
                <div className = "mailReplyLinks">
                  <div className = "mailReplyLink">
                    <ReplyIcon />
                    <a href = "#">Reply</a>
                  </div>
                  <div className = "mailReplyLink">
                    <ForwardIcon />
                    <a href = "#">Forward</a>
                  </div>
                </div>
              </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function MailCard() {
  const [mails, setMails] = useState([])

  useEffect(() => {
    db.collection('sentMails').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setMails(snapshot.docs.map((doc) => ({
      id: doc.id,
      mail: doc.data()
    }))))
  }, [])

    return (
        <div className = "mailCard">
          {
            mails.map(({id, mail}) => (
              <SimpleAccordion key = {id} id = {id} mail = {mail}/>
            ))
          }
        </div>
    )
}

export default MailCard
