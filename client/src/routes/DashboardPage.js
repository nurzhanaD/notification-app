import CardComponent from '../components/CardComponent';
import {ReactNotifications, Store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import moment from 'moment';

import React,{useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { createNotification, deleteNotification, updateNotificationTitle, updateNotificationMessage } from '../features/Notifications.js';

function DashboardPage({socket}) {
    const dispatch = useDispatch();
    const notificationList = useSelector((state) => state.notifications.value);
    const[title,setTitle] = useState("");
    const[message,setMessage ] = useState("");
    const[type,setType ] = useState("success");
    const[newTitle,setNewTitle] = useState("");
    const[newMessage,setNewMessage] = useState("");

    const sendNotification = async (title,message,type) => {
        const notification = {
            title:title,
            message:message,
            type:type,
            container:'top-left',
            insert:'top',
            animationIn:['animate__animated','animate__flipInX'],
            animationOut:['animate__animated','animate__fadeOutUp'],
            dismiss:{
                duration:4000,
                showIcon:true,
                onScreen:true,
                pauseOnHover:true
            },
            width:400
        }
        Store.addNotification(notification);
        await socket.emit("send_notification", notification);
    };

    useEffect(() => {
        socket.on("receive_notification", (data) => {
            Store.addNotification(data);
        })
    },[socket]);

    return (
        <div className="dashboard">
            <ReactNotifications/>
            <div className="dashboard-panel">
                <h1>Create a notification</h1>
                <h1>Title:</h1>
                <input className="input" 
                onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
                <h1>Message:</h1>
                <input className="input"
                onChange={(e) => {
                    setMessage(e.target.value)
                }}/>
                <h1>Type:</h1>
                <select onChange={(e) => {
                    setType(e.target.value)
                }} name="message-types">
                    <option value="success">success</option>
                    <option value="warning">warning</option>
                    <option value="danger">danger</option>
                    <option value="info">info</option>
                </select>
                <button type="submit" className="btn create-btn" onClick={() => {dispatch(createNotification({
                id:notificationList[notificationList.length - 1].id + 1,
                title: title,
                message: message,
                type: type,
                createdAt:moment().format('MMMM Do YYYY, hh:mm:ss a')
            }))}}>Create</button>
            </div>
            <ul>{notificationList.map((notification) => 
                <li className="li-card" key={notification.id}>
                    <CardComponent 
                    delete={() => {
                        dispatch(deleteNotification({id: notification.id}))
                    }}

                    updateTitle={() => {
                        dispatch(updateNotificationTitle({id: notification.id, title : newTitle}))
                    }}
                    changeTitle={(e) => {
                        setNewTitle(e.target.value);
                    }}
                    updateMessage={() => {
                        dispatch(updateNotificationMessage({id: notification.id, message : newMessage}))
                    }} 
                    changeMessage={(e) => {
                        setNewMessage(e.target.value);
                    }}
                    send={() => sendNotification(notification.title, notification.message, notification.type)} title={notification.title} message={notification.message} createdAt={notification.createdAt} type={notification.type}/>
                </li>)}
            </ul>
        </div>
    )
}

export default DashboardPage;