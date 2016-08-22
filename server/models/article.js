var Sequelize = require('sequelize');
var db = new Sequelize('mysql://root@2001:4860:4864:1:9f47:b101:c280:90e2/lavendimia');

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
