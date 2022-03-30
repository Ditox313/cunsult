// Контроллер для Login
module.exports.login = async function(req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    });

};









// Контроллер для register 
module.exports.register = async function(req, res) {
    res.status(200).json({
        register: true
    });

};