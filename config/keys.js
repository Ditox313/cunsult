module.exports = {
    mongoUri: 'mongodb+srv://xsodex_consult:19731379Consult@cluster0.bsvwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    jwt: 'xsodex_consult_jwt',
};



// Подготовка деплоя
// if (process.env.NODE_ENV === "production") {
//     module.exports = require('./keys.prod.js');
// }
// else
// {
//   module.exports = require("./keys.dev.js");
// }