var Sequelize = require('sequelize');
var db = new Sequelize('mysql://franciscoapp:123456@http://www.db4free.net:3306/lavendimia');

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
