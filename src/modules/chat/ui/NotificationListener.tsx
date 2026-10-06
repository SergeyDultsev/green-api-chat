import { useCredentials } from "@/shared";
import { useReceiveNotifications } from "@modules/chat/hooks/useReceiveNotifications.ts";

const NotificationListener: React.FC = () => {
    const credentials = useCredentials();

    useReceiveNotifications(credentials);

    return null;
};

export default NotificationListener;
