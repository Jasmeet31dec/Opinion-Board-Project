import Notification from "../components/Notification";
import { createContext,useState } from "react";

export const NotificationContext = createContext({
    showNotification: (title, message) => {}, // Default empty function
});

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null); // Will hold { title, message }

    // Function to trigger the notification
    const showNotification = (title, message) => {
        setNotification({ title, message });
    };

    // Function to hide the notification
    const handleClose = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            <Notification 
                show={Boolean(notification)}
                onClose={handleClose}
                title={notification?.title || ''}
                message={notification?.message || ''}
            />
            {children} 
            
            {/* The NotificationComponent now lives here, permanently.
              It will only be *visible* when 'notification' state is set.
            */}
            
        </NotificationContext.Provider>
    );
};
