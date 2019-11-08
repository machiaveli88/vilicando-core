// todo: absolute Baustelle und noch nirgends eingebunden!

// todo: geht nur in ssr!
// geht derzeit nur in safari => chrome geht nicht
// https://developer.mozilla.org/en-US/docs/Web/API/notification
// besser: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
// lesen: https://stackoverflow.com/questions/2271156/chrome-desktop-notification-example

const notify = (message: string) => {
  var notification = new Notification(message);
  console.log('Notification sended:', message, notification);
};

export default (message: string) => {
  // Let's check if the browser supports notifications
  if (!('Notification' in window))
    alert('This browser does not support desktop notification');
  // Let's check whether notification permissions have alredy been granted
  else if (Notification.permission === 'granted')
    // If it's okay let's create a notification
    notify(message);
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') notify(message);
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
};
