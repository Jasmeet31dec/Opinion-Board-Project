import './Notification.css';
import { useState, useEffect } from 'react';


export default function Notification({ show, onClose, title, message, duration = 3000 }) {


    // State to manage the exit animation
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (show) {
            // 1. When 'show' becomes true, reset exiting state
            setIsExiting(false);

            // 2. Set a timer to auto-dismiss
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            // 3. Clear the timer if the component unmounts or 'show' changes
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]); // Rerun effect if these change

    /**
     * Triggers the exit animation and then calls the parent's onClose.
     */
    const handleClose = () => {
        setIsExiting(true);
        // Wait for the animation to finish before truly hiding
        setTimeout(() => {
            onClose();
            setIsExiting(false); // Reset for next time
        }, 3000); // This MUST match your slide-out animation duration
    };

    // Render null if we're not supposed to show it
    if (!show && !isExiting) {
        return null;
    }

    // Determine the correct animation class
    const animationClass = isExiting ? 'animate-slide-out' : 'animate-slide-in';

    return (
        <div id="notification-bar" className={`gn-notification-bar ${animationClass}`} role="status">
            <svg xmlns="http://www.w3.org/2000/svg" className="gn-notification-bar__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="gn-notification-bar__content">
                <span className="gn-notification-bar__title">{title}</span>
                <span className="gn-notification-bar__message">{message}</span>
            </p>
            <button onClick={handleClose} title="Dismiss" className="gn-notification-bar__dismiss">
                <svg xmlns="http://www.w3.org/2000/svg" className="gn-notification-bar__dismiss-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}