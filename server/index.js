const express = require('express');
const { Router } = require('express');
const cors = require('cors');
const config = require('config');
const path = require('path');
const app = express();
const PORT = config.get('Server.port') || 8000;
const SESSION = require('../db/index');
const SERVICE = require ('../service_functions/index.js');
const TGAPI = require ('../bot_TG_API/index');
var ADMINSETTINGS = {};



app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  res.header('Access-Control-Allow-Credentials', true);
  next();
},express.json());

app.use(cors());

// app.use('/api',info_rout);

app.use('/bot',Router().get('/adminpage',(req,res,next) => {
  res.status(200).send(`ADMINPAGE!`)
}));

if (process.env.NODE_ENV === 'production') {
  // app.use('/',express.static(path.join(__dirname,'..','client','build')))
  // app.get('*',(req,res)=>{
  //   res.sendFile(path.resolve(__dirname,'..','client','build','index.html'))
  // })
}

app.listen(PORT,()=>{
  // Получаем настройки администратора
  SESSION.getAdminItems().then(res => {
    ADMINSETTINGS = res;
    module.exports = ADMINSETTINGS;
    // Запускаем телеграмм бота
    if(ADMINSETTINGS.toogle_status_bot) {
      TGAPI.initialBotListner();
    } else {
      console.log('TELEGRAMM BOT NO CONECTION....!');
    }

    // SESSION.creatUser({ id:3234525,last_name:'test' })
    // console.log(Pages.albums)
    // SESSION.putAdmin({ login: JSON.stringify() })
    // SESSION.putUser(3234525,{ notification_request: JSON.stringify([{qrty:1}]) })
  })

  // Получаем всех пользователей
  // SESSION.getUsers().then(res => {
  //   const { users, errors } = res;
  //   if(errors.length === 0) {
  //     // console.log(users);
  //   } else {
  //     // console.log(errors);
  //   }
  // })

    // const get_db_info_interval = setInterval(() => {
    //   console.log('Запрашиваю базу каждые 2 минуты');
    // }, getTime (2,'m')); 
    
    // const change_db_info_on_new = setInterval(() => {
    //   oldData = newData;
    // }, getTime (2,'m')); 

    console.log(`Start server ${PORT} on port`);
    console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);

});




  
