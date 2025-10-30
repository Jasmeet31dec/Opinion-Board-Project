import { useContext } from "react";
import { NotificationContext } from "../store/notification-context";

export const useNotification = () => {
    return useContext(NotificationContext);
};