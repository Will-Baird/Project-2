module.exports = function (sequelize, DataTypes) {
    var product = sequelize.define("products", {
        product_name: DataTypes.STRING,
        description: DataTypes.STRING,
        img_url: DataTypes.STRING,
        department: DataTypes.STRING,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        userid: DataTypes.INTEGER
    });
    return product;
};