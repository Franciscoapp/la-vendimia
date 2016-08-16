var Sequelize = require('Sequelize');
var db = new Sequelize('mysql://root@localhost:3306/lavendimia');

var Configuration = db.define('configuration', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    rate: {
        type: Sequelize.DECIMAL(16,6),
        field: 'rate'
    },
    hitch: {
        type: Sequelize.DECIMAL(16,6),
        field: 'hitch'
    },
    deadline: {
        type: Sequelize.DECIMAL(16,6),
        field: 'deadline'
    }
}, {
    freezeTableName: true
});

module.exports = Configuration;
