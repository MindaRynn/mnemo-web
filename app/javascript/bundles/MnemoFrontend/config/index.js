let config = {};

config['api'] = {

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
