// =============
// Port
// =============
process.env.PORT = process.env.PORT || 3000;

// =============
// Enviroment
// =============
process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

// =============
// Base de datos
// =============
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = 'mongodb+srv://sergi19:j0lgKCOGFIBbsdss@cluster0-owuks.mongodb.net/coffee';
}
process.env.URLDB = urlDB;