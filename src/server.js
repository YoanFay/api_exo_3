const mariadb = require("mariadb");
const { loadEnvFile } = require('node:process');
const PORT = 3000;

loadEnvFile('./.env');

const connectionPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.CONNECTION_LIMIT_AMOUNT
});

function appListen(app) {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });

    return app;
}

module.exports = { connectionPool, appListen }