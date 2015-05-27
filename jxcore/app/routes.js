module.exports = function(match) {
  match('',                   'home#index');
  match('repos',              'repos#index');
  match('repos/:owner/:name', 'repos#show');
  match('users'       ,       'users#index');
  match('users/:login',       'users#show');
  match('todos',              'todos#index');
  match('todos/:item',        'todos#show');
  match('replications',       'replications#index');
  match('replications/:item', 'replications#show');
};
