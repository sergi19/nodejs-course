import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    connection: mysql.Connection;
    connected: boolean = false;

    constructor() {
        console.log('Initialized class');

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });

        this.connectDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static executeQuery(query: string, callback: Function) {
        this.instance.connection.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error in query', err);
                return callback(err);
            }

            if (results.length === 0) {
                return callback('No results found');;
            }

            callback(null, results);
        });
    }

    private connectDB() {
        this.connection.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.connected = true;
            console.log('Database online!');
        });
    }

}