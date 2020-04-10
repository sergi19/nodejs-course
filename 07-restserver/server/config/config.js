// =============
// Port
// =============
process.env.PORT = process.env.PORT || 3000;

// =============
// Enviroment
// =============
process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

// =============
// Token expiration date
// =============
process.env.TOKEN_EXPIRATION_DATE = 60 * 60 * 24 *30;

// =============
// Token Secret
// =============
process.env.TOKEN_SECRET = process.env.TOKEN_SECRET || 'Secret Develop';

// =============
// Base de datos
// =============
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_DB_URI;
}
process.env.URLDB = urlDB;

process.env.CLIENT_ID = process.env.CLIENT_ID || '348548217883-rj8scqhqcovv2f1g4ajit3mqdhcdniae.apps.googleusercontent.com';