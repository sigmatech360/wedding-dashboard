import React, { useEffect, useState } from "react";
// import echo from "../../echo";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useNotifications } from "../../context/NotificationContext";
import toast from "react-hot-toast";
import { getEcho, getEchoInstance } from "../../echo";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { updateNotifications } = useNotifications();
  const { user } = useSelector(({ user }) => user);

  useEffect(() => {
    // if (!vendorId) return;
    // getEchoInstance();
    console.log('user',user);
    

    let echo = getEcho();
    if (!echo) {
      // if(user.role == "0"){
      //   let token = localStorage.getItem('admintoken');
      //   getEchoInstance(token);
        

      //   console.log('Admin Echo not initialized, no echo instance');
      // return
      // }
      // else{
      //   console.log('NotAdmin Echo not initialized, no echo instance');
        
      //   return
        
      // }
      return
    };
    console.log("Subscribing to admin channel");

    const channel = echo.private("admin");

    const handleNotification = (event) => {
      console.log("Notification response:", event);
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
              minWidth: "300px",
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
              <p className="fw-bold mb-0">{event.message.title}</p>
              <p className="mb-0">{event.message.body}</p>
            </div>
          </div>
        ),
        {
          duration: Infinity,
        }
      );
    };
    channel.listen(".admin-notification", handleNotification);

    // echo.private(`admin`).listen(".admin-notification", (event) => {
    //   console.log("Notification response:", event);
    //   updateNotifications()

    //   toast.custom(
    //     (t) => (
    //       <div
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           gap: "10px",
    //           backgroundColor: "#f0fdf4",
    //           border: "1px solid #17a2b8",
    //           padding: "12px 16px",
    //           borderRadius: "8px",
    //           color: "#17a2b8",
    //           boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
    //           minWidth: "300px",
    //           position: "relative",
    //         }}
    //         className="popupBody"
    //       >
    //         <button
    //           onClick={() => toast.dismiss(t.id)}
    //           className="notiCloseBtn"
    //         >
    //           <FaX size={10} />
    //         </button>
    //         <FaBell
    //           size={20}
    //           color="#17a2b8"
    //           style={{ flexShrink: 0, marginTop: 4 }}
    //         />
    //         <div>
    //           <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "bold" }}>
    //             {event.message.title}
    //           </h4>
    //           <p style={{ margin: 0, fontSize: "14px" }}>
    //             {event.message.body}
    //           </p>
    //         </div>
    //       </div>
    //     ),
    //     {
    //       duration: Infinity,
    //     }
    //   );
    // });
  }, [user]);

  return null;
};

export default Notifications;
