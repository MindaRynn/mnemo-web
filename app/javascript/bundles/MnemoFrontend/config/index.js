let config = {};

config['api'] = {
  friends: '/api/v1/friends',
  rooms: '/api/v1/rooms',
  time_capsules: '/api/v1/time_capsules',
  medium: '/api/v1/medium',
  memory_boxes: '/api/v1/memory_boxes',
  tags: '/api/v1/tags',
};

config['firebase'] = {
  apiKey: "AIzaSyBXxxmbRknxtHXpg5EvQzgd-i70I3ZKi7k",
  authDomain: "mnemo-194409.firebaseapp.com",
  databaseURL: "https://mnemo-194409.firebaseio.com",
  projectId: "mnemo-194409",
  storageBucket: "mnemo-194409.appspot.com",
  messagingSenderId: "589905994837"
  };

config['api']['recordPerPage'] = 25;

config['auth'] = {
  signOut: '/users/sign_out',
  refreshBefore: 5000,
  localStorageKey: '_mnemo'
};

config['notificationStatus'] = {
  success: 0,
  error: 1,
  neutral: 2
};

config['axios'] = {
  timeout: 15000
};

export default config;
