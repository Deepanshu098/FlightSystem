importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBcYR94TyGk09DBcPnF65KJoDrWKZEzj3E",
  authDomain: "flightsystem-d819e.firebaseapp.com",
  projectId: "flightsystem-d819e",
  storageBucket: "flightsystem-d819e.appspot.com",
  messagingSenderId: "119800372003",
  appId: "1:119800372003:web:e0bcc44f52f48eaab38a96"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
