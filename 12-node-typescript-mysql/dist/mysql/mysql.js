"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log('Initialized class');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.connectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error in query', err);
                return callback(err);
            }
            if (results.length === 0) {
                return callback('No results found');
                ;
            }
            callback(null, results);
        });
    }
    connectDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Database online!');
        });
    }
}
exports.default = MySQL;
