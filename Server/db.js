import sql from 'mssql';

const config = {
    user: 'sa', 
    password: 'giorgi123', 
    server: 'DESKTOP-UCVGGMI\\SQLEXPRESS', 
    database: 'Currency', 
    options: {
        encrypt: false, 
        trustServerCertificate: true, 
    }
};

export { sql, config };
