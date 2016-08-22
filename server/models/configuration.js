var Sequelize = require('sequelize');
var db = new Sequelize('mysql://root@2001:4860:4864:1:9f47:b101:c280:90e2/lavendimia');

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
