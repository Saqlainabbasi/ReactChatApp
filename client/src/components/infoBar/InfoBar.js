import React from 'react';
//importing icons....
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';
import { Link } from 'react-router-dom';
const InfoBar = ({ room }) => {
  // const ENDPOINT = 'localhost:3001';
  // socket = io(ENDPOINT,{
  //   transports: ['websocket']
  // });
  // const disconnect = ()=>{
  //   socket.emit('disconnect')
  // }

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <Link to='/'><img src={closeIcon} alt="close icon" /></Link>
      </div>
    </div>
  );
};

export default InfoBar