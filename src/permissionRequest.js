
import { getToken, messaging } from "./firebase";

export const requestPermission = async () => {
  try {
    
    const status = await Notification.requestPermission();
    
    if (status === "granted") {
      try {
        
        await navigator.serviceWorker.register(
           "/wedding-admin/firebase-messaging-sw.js"
         );
         const serviceWorkerRegistration = await navigator.serviceWorker.ready;
         // Get the FCM token using service worker registration
         const fcmToken = await getToken(messaging, {
           vapidKey:
             "BIjoBMR8Qk9UihrO_5MaFCqkke7plBAxqXGBJNkGsUaYFkU0H5dzjnbYtUqHb7b1cUYs8Hm7Mha1uc7oUl4bVp0",
           serviceWorkerRegistration, // Pass service worker registration
         });
   
       //   setDeviceToken(fcmToken);
   
         if(fcmToken){
             
             return {device_token: fcmToken}
         }
      } catch (error) {
        console.error('Something went wrong!',error)
      }
    } else {
      console.error("Permission denied for notifications");
      return {device_token: null}
    }
  } catch (error) {
    console.error("Error requesting permission", error);
  }
};
