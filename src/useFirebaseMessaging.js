import { useEffect, useState } from "react";
import { messaging, getToken, onMessage } from "./firebase";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";
import { useNotifications } from "./context/NotificationContext";
import { FaBell } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const useFirebaseMessaging = () => {
  const [deviceToken, setDeviceToken] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const {updateNotifications} = useNotifications();
 
  useEffect(() => {
    // Firebase messaging handler when a message is received in the foreground
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("New message received");
      updateNotifications();
      toast.custom(
        (t) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#ffffffff",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "rgb(33 33 33)",
              boxShadow: "0px 0px 11px 5px rgb(0 0 0 / 12%)",
              width: "350px",
              position: "relative",
            }}
            className="popupBody"
          >
            <button
              onClick={() => toast.dismiss(t.id)}
              className="notiCloseBtn"
            >
              <FaX size={10} />
            </button>
            <FaBell
              size={20}
              color="#212121"
              style={{ flexShrink: 0, marginTop: 4 }}
            />
            <div>
              <p className="fw-bold mb-0">{payload.notification.title}</p>
              <p className="mb-0">{payload.notification.body}</p>
            </div>
          </div>
        ),
        {
          duration: Infinity,
        }
      );
    });

    // Cleanup the messaging listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);



  return {
    // deviceToken,
    loading,
    error,
  };
};

export default useFirebaseMessaging;
