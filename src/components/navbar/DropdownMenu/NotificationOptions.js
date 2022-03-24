import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import supabase from '../../../client';
import { Link } from 'react-router-dom';

const NotificationOptions = (props) => {
  const { notification, handleClick, allNotifications, setNotifications } =
    props;
  const [didRespond, setDidRespond] = useState(false);

  const handleAccept = async () => {
    const { data, error } = await supabase
      .from('projectUser')
      .update({ isAccepted: true })
      .eq('projectId', notification.projects.id)
      .eq('userId', notification.user.id);
    if (error) {
      console.log(error);
    } else {
      setDidRespond(true);
    }
  };

  const handleDecline = async () => {
    const { data, error } = await supabase
      .from('projectUser')
      .delete()
      .eq('projectId', notification.projects.id)
      .eq('userId', notification.user.id);
    if (error) {
      console.log(error);
    } else {
      const newNotifs = allNotifications.filter(
        (notif) => notif.id !== notification.id
      );
      console.log('allNotifications', allNotifications);
      console.log('after delete', newNotifs);
      setNotifications(newNotifs);
      setDidRespond(true);
    }
  };
  return (
    <div className="menu">
      <ArrowBackIosIcon
        className="icon"
        onClick={handleClick}
        id="back-button"
      />
      <div className="user-info">
        <img src={notification.user.imageUrl} className="profile-pic" />
        <Link to={`/user/${notification.user.username}`}>
          <h2>@{notification.user.username}</h2>
        </Link>
        <p>wants to join {notification.projects.name}</p>
        {didRespond ? (
          <p className="response-message">Success!</p>
        ) : (
          <div>
            <button onClick={handleAccept} className="accept response-button">
              Accept
            </button>
            <button onClick={handleDecline} className="decline response-button">
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationOptions;
