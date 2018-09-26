module.exports = function (sequelize, DataTypes) {
    var cart = sequelize.define("cart", {
        product_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    });
    return cart;
};