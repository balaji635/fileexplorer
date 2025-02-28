const http=require('http');
//importing respond 
const respond=require('D:/CDRV/DESKTOP/webdevprojects/fileexplorer/lib/respond.js');

//connection settings
//to deploy in heroku we need environmengt variables which is found in process module so setting tghe port according 
//to that
const port =3000;

//create server 
const server=http.createServer(respond)


//listen client request to specific port ,the port should be available
server.listen(port,()=>{

    console.log(`listening port ${port}`)
})