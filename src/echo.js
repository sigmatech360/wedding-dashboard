import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

// const token = localStorage.getItem("admintoken");

let echoInstance = null;

export function getEchoInstance(token) {
  // if (!echoInstance) {
  // echoInstance = new Echo({
  //   broadcaster: "pusher",
  //   key: "ebefd3bad1dde161a009",
  //   cluster: "ap2",
  //   forceTLS: true,
  //   authEndpoint:
  //     "https://server.testlinkwebsitespace.com/wedding-concierge/public/broadcasting/auth",
  //   auth: {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: "application/json",
  //     },
  //   },
  // });
  console.log("Echo initializing", token);
  echoInstance = new Echo({
    broadcaster: "pusher",
    key: "ebefd3bad1dde161a009",
    cluster: "ap2",
    forceTLS: true,
    authEndpoint:
      "https://server.testlinkwebsitespace.com/wedding-concierge/public/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });
  console.log("Echo initialized", token);

  return echoInstance;
}

export function getEcho() {
  return echoInstance;
}

// const echo = new Echo({
//   broadcaster: "pusher",
//   key: "ebefd3bad1dde161a009",
//   cluster: "ap2",
//   forceTLS: true,
//   authEndpoint:
//     "https://server.testlinkwebsitespace.com/wedding-concierge/public/broadcasting/auth",
//   auth: {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//     },
//   },
// });

// export default echo;
