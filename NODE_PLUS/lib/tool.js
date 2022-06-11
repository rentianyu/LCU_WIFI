const moment = require('moment');
const fs = require('fs');

module.exports.info = (info) => {
    var current_time = "[" + moment(Date.now()).format('HH:mm:ss') + "]: "
    console.log(current_time + info);
}

module.exports.getJSON = (key) => {
    var data = fs.readFileSync('./settings.json', 'utf8');
    var data_json = JSON.parse(data);
    return data_json[key];
}