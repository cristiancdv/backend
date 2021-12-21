const config = {
    appConfig: {
        host: process.env.APP_HOST,
        port: process.env.PORT
    },
    dbConfig: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    }
}

module.exports = config