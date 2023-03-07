import mysql from "mysql2/promise";

import config from "~/config";

const db = mysql.createPool({
    ...config.mySql,
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

export default db;
