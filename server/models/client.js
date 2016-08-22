var Sequelize = require('sequelize');
var db = new Sequelize('mysql://franciscoapp:123456@http://www.db4free.net:3306/lavendimia');

var Client = db.define('client', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(45),
        field: 'name'
    },
    last_name: {
        type: Sequelize.STRING(45),
        field: 'last_name'
    },
    mother_last_name: {
        type: Sequelize.STRING(45),
        field: 'mother_last_name'
    },
    rfc: {
        type: Sequelize.STRING(13),
        field: 'rfc'
    }
}, {
    freezeTableName: true
});

module.exports = Client;
