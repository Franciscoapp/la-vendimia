var Sequelize = require('sequelize');
var db = new Sequelize('mysql://root@2001:4860:4864:1:9f47:b101:c280:90e2/lavendimia');

var Sale = db.define('sale', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: Sequelize.INTEGER,
        field: 'client_id'
    },
    total: {
        type: Sequelize.DECIMAL(16,4),
        field: 'total'
    },
    date: {
        type: Sequelize.DATE(),
        field: 'date'
    }
}, {
    freezeTableName: true
});

module.exports = Sale;
