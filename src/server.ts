import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log('App running on http://localhost:%d', app.get('port'));
});

export default server;
