  const setup = {port:8000}
  const express = require ('express');
  const app = express ();

  app.get('/test', (req, res) => {
    res.send('cool');
  });

  app.listen(setup.port, () => {
    console.log('server listen port - %s - start', setup.port);
  });
