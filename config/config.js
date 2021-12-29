const config = {
    appConfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbConfig: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    },
    storageConfig: {
        cloudName: process.env.STORE_CLOUDNAME,
        apiKey: process.env.STORE_APIKEY,
        apiSecret: process.env.STORE_APISECRET

    }
}

module.exports = config