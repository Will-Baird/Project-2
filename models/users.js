module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define("users", {
        first_name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        phone_number: DataTypes.INTEGER
    });
    return user;
};