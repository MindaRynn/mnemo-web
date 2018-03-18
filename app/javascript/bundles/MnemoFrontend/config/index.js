let config = {};

config['api'] = {

};

config['api']['recordPerPage'] = 25;

config['auth'] = {
  signOut: '/users/sign_out',
  refreshBefore: 5000,
  localStorageKey: '_mnemo'
};

config['axios'] = {
  timeout: 15000
};

export default config;
