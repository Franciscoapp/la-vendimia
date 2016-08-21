var Sequelize = require('Sequelize');
var db = new Sequelize('mysql://root@localhost:3306/lavendimia');

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
