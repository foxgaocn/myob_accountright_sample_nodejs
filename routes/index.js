exports.index = function(req, res){
  res.render('index', { 
    title: 'View your AccountRight company files',
    pagetitle: 'MYOB API NodeJS Sample',
    client_id: res.app.settings['myob credentials'].clientId,
    redirect_uri: res.app.settings['myob credentials'].redirectUri
  });
};