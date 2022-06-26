import { createSlice } from "@reduxjs/toolkit";

import {NotificationsData} from '../Data.js'; 

export const notificationSlice = createSlice({
    name:'notifications',
    initialState:{value:NotificationsData},
    reducers: {
        createNotification: (state, action) => {
            state.value.push(action.payload)
        },

        deleteNotification: (state, action) => {
            state.value = state.value.filter((notification) => notification.id !== action.payload.id)
        },

        updateNotificationTitle: (state, action) => {
            state.value.map((notification) => {
                if (notification.id === action.payload.id) {
                    notification.title = action.payload.title
                }
                return notification.title
            })
        },

        updateNotificationMessage: (state, action) => {
            state.value.map((notification) => {
                if (notification.id === action.payload.id) {
                    notification.message = action.payload.message
                }
                return notification.message
            })
        },
    }
});

export const {createNotification, deleteNotification, updateNotificationTitle, updateNotificationMessage} = notificationSlice.actions;
export default notificationSlice.reducer; 