const { Admin_user, Users } = require('../db/models');


const GLOBAL_UNIQUE_SESSIONS = [];
const LOCAL_USER_SESSIONS = [];

function initionalUserLocalSession(info) {
  const { date, from: { id, first_name, last_name, username} } = info;
  const user = {
    id,
    user_name,
    first_name,
    last_name,
    date_connection: date,
    notification_request: [{ page:'', text_request: '' }],
  }
  isNotMatch(LOCAL_USER_SESSIONS,id) ? LOCAL_USER_SESSIONS.push(user) : false;
}

function initionalUserGlobalSession(info) {
  const { date, from: { id, first_name, last_name, username} } = info;
  const user = {
    id,
    user_name,
    first_name,
    last_name,
    date_connection: date
  }
  isNotMatch(GLOBAL_UNIQUE_SESSIONS,id) ? GLOBAL_UNIQUE_SESSIONS.push(user) : false;
}

function isNotMatch(arr,id) {
  let push = true;
  arr.forEach(element => {
    if(element.id === id) { push = false; }
  });
  return push;
}

const getAdminItems = async () => {
  let array_error = [];
  let object_result = {
  };

  let error_item = ['Admin_user'];

  try {
    let results = await Promise.all([
      Admin_user.findOne({where: { id: 1 }}),
    ]);

    results.map((element_promise,count) => {
      if (!element_promise || element_promise === null || element_promise === "" || element_promise.length === 0) {
        array_error.push(`Not elem in table for: ${error_item[count]}`);
      }
    
      if (element_promise !== null && element_promise.dataValues !== undefined && element_promise.dataValues.id !== undefined) {
        object_result.login = element_promise.dataValues.login,
        object_result.password = element_promise.dataValues.password,
        object_result.email = element_promise.dataValues.email,
        object_result.tokens = element_promise.dataValues.tokens,
        object_result.accaunts = element_promise.dataValues.accaunts,
        object_result.toogle_status_bot = element_promise.dataValues.toogle_status_bot,
        object_result.admin_chat_tg_id = element_promise.dataValues.admin_chat_tg_id,
        object_result.albums = element_promise.dataValues.albums,
        object_result.command_topics = element_promise.dataValues.command_topics,
        object_result.scammers = element_promise.dataValues.scammers,
        object_result.categories = element_promise.dataValues.categories,
        object_result.info_project = element_promise.dataValues.info_project
      }
    });

    object_result.errors = array_error;
    return object_result;

  } catch(error) {
    if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
      array_error.push(`Произошла ошибка: ${error.original.sqlMessage}`);
      object_result.errors = array_error;
      return object_result;
    }
    array_error.push(`Произошла ошибка: ${error.msg}`);
    object_result.errors = array_error;
    return object_result;
  }
}

const getUsers = async () => {
  let array_error = [];
  let object_result = {
    users: [],
    errors: null
  };
  let error_item = ['Users'];

  // const NowBDformat = moment(moment().add(7, 'hours').format("YYYY-MM-DD HH:mm"));

  try {
    let results = await Promise.all([
      Users.findAll(),
    ]);

    results.map((element_promise,count) => {

      if (!element_promise || element_promise === null || element_promise === "" || element_promise.length === 0) {
        array_error.push(`Not elem in table for: ${error_item[count]}`);
      }

      if (Array.isArray(element_promise)) {  
        element_promise.map((elem) => {
          object_result.users.push({
            id: elem.dataValues.id,
            first_name: elem.dataValues.first_name,
            user_name: elem.dataValues.user_name,
            last_name: elem.dataValues.last_name,
            date_conection: elem.dataValues.date_conection,
            notification_request: elem.dataValues.notification_request,
          })
        })
      } else {
        // if (item !== null && item.dataValues !== undefined && item.dataValues.login !== undefined) {
        //   objResult.login = item.dataValues.login,
        //   objResult.password = item.dataValues.password,
        //   objResult.email_admin = item.dataValues.email
        // }
  
        // if (item !== null && item.dataValues !== undefined && item.dataValues.toogle_total_temp !== undefined) {
        //   objResult.toogle_total_temp = item.dataValues.toogle_total_temp,
        //   objResult.total_temp_min = item.dataValues.total_temp_min,
        //   objResult.total_temp_max = item.dataValues.total_temp_max,
        //   objResult.site_status_has_block = item.dataValues.site_status_has_block,
        //   objResult.mode_auto = item.dataValues.mode_auto,
        //   objResult.status_mode = item.dataValues.status_mode
        // }
      }
    });

    object_result.errors = array_error;

    return object_result;

  } catch(error) {
    if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
      array_error.push(`Произошла ошибка: ${error.original.sqlMessage}`);
      object_result.errors = array_error;
      return object_result;
    }
    array_error.push(`Произошла ошибка: ${error.msg}`);
    object_result.errors = array_error;
    return object_result;
  }
}

const getUser = async (id) => {
  let array_error = [];
  let object_result = {
    user: {},
    errors: null
  };

  let error_item = ['Users'];

  try {
    let results = await Promise.all([
      Users.findOne({where: { id }}),
    ]);

    results.map((element_promise,count) => {
      if (!element_promise || element_promise === null || element_promise === "" || element_promise.length === 0) {
        array_error.push(`Not elem in table for: ${error_item[count]}`);
      }

      if (Array.isArray(element_promise)) {  
        element_promise.map((elem) => {
          object_result.users.push({
            id: elem.dataValues.id,
            first_name: elem.dataValues.first_name,
            user_name: elem.dataValues.user_name,
            last_name: elem.dataValues.last_name,
            date_conection: elem.dataValues.date_conection,
            notification_request: elem.dataValues.notification_request,
          })
        })
      } else {
        if (element_promise !== null && element_promise.dataValues !== undefined && element_promise.dataValues.id !== undefined) {
          object_result.users = element_promise
        }
      }
    });

    object_result.errors = array_error;

    return object_result;

  } catch(error) {
    if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
      array_error.push(`Произошла ошибка: ${error.original.sqlMessage}`);
      object_result.errors = array_error;
      return object_result;
    }
    error.msg ? array_error.push(`Произошла ошибка: ${error.msg}`) : array_error.push(`Произошла ошибка: ${error}`);
    object_result.errors = array_error;
    return object_result;
  }
}

const putUser = async (id,body) => {
  Users.update(body, {
    where: {
      id,
    }
  })
  .then(result => {
    if (!result || result === null || result === "" || result[0] === 0) return console.log({msg: "Not user in table"})
     console.log("Update base succes")
  })
  .catch(error => {
    console.log(error)
  }) 
}

const putAdmin = async (body) => {
  Admin_user.update(body, {
    where: {
      id: 1,
    }
  })
  .then(result => {
    // console.log(result)
    if (!result || result === null || result === "" || result[0] === 0) return console.log({msg: "Not RESULT"})
     console.log("Update base succes")
  })
  .catch(error => {
    console.log(error.original)
  }) 
}

const creatUser = async (obj) => {
  if(obj.id !== undefined) {
    let default_object = {
      id: obj.id,
      user_name: obj.user_name !== undefined ? obj.user_name : '',
      first_name: obj.first_name !== undefined ? obj.first_name : '',
      last_name: obj.last_name !== undefined ? obj.last_name : '',
      date_conection: obj.date_conection !== undefined ? obj.date_conection : new Date(),
      notification_request: obj.notification_request !== undefined ? obj.notification_request : JSON.stringify([{}])
    }

    Users.create(default_object) 
    .then(result => {
      if (!result || result === null || result === "" || result[0] === 0) return console.log({msg: "Not user in table"})
       console.log("Create user in base succes")
    })
    .catch(error => {
      console.log(error.original.sqlMessage)
    }) 
  } else {
    console.log("NO CREATE USER.PLEASE ENTER ID !!!")
  }
}

module.exports = {
  initionalLocal: initionalUserLocalSession,
  initionalGlobal: initionalUserGlobalSession,
  getUsers,
  getUser,
  getAdminItems,
  putUser,
  putAdmin,
  creatUser
}