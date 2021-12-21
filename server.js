require('dotenv').config();

const cors = require('cors')
const app = require("./app");
const { appConfig } = require('./config/config');


// app.use(cors())
console.log('hola');

// app.use('/', require('./routes/rutas'))



/*app.use(function (req, res, next) {
    res.status(404).render('404');
});*/

/*app.listen(appConfig.port, () => {
    console.log(`desde puerto ${appConfig.port}`)
})*/

