import Server from "./server/server";
import router from "./router/router";
import MySQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use(router);

server.start(() => {
    console.log('Server running in port 3000');
})