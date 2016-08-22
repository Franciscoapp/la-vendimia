var Sequelize = require('../../node_modules/sequelize/index.js');
var db = new Sequelize('mysql://root@localhost:3306/lavendimia');

var Article = db.define('article', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: Sequelize.STRING(45),
        field: 'description'
    },
    model: {
        type: Sequelize.STRING(45),
        field: 'model'
    },
    price: {
        type: Sequelize.DECIMAL(16,4),
        field: 'price'
    },
    existence: {
        type: Sequelize.INTEGER,
        field: 'existence'
    }
}, {
    freezeTableName: true
});

module.exports = Article;
