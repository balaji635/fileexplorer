const url = require('url'); // ✅ NO CHANGE, BUT FIXED USAGE BELOW
const path = require('path');
const fs = require('fs');
const buildBreadCrumb = require('./breadcrumbbb.js');
const buildmainContent = require('./maincontent.js');
const getMimeType = require('./getMimeType.js');

//to get the current directory path
// console.log(__dirname)
// // to link with another folder we use path.join(dir.'..')
// console.log(path.join(__dirname,'.'))//its in current path as above __dirname
// console.log(path.join(__dirname,'..'))//it moved out of lib and in fileexplorer its is
// console.log(path.join(__dirname,'../static_folder'));//path of static folder
// console.log(path.join(__dirname,'..','static_folder'));//same as above we can use anuyone

const staticBasePath = path.join(__dirname, '..', 'static_folder');
// console.log(staticBasePath)

//respond to a request
//following is function passed to createServer Used to create server
const respond = (request, response) => {
   
    // ✅ FIXED URL PARSING: Replaced `url.parse()` with `new URL()`
    let pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

    // ✅ `url.parse(request.url, true).pathname` was deprecated

    //gives the only path of the url request.url gives the query
    // url.parse(request.url,true) gives query with object type like ?page=name&gmail=none gives you page:name gmail=none
    
    // if(pathname==='/favicon.ico'){
    //     console.log('ewww')
    //     return false;
    // }
    
    console.log(pathname);
    console.log(request.url);

    //before working with the pathname, you need to decode it
    pathname = decodeURIComponent(pathname);
    console.log(pathname);

    //get the corresponding full static path located in the static folder
    // console.log(path.join(staticBasePath,pathname))
    const fullStaticPath = path.join(staticBasePath, pathname);

    //static folder:-the folder which is display in the web

    //can we find something in full static path?
    
    // no send 404 file not found 
    if (!fs.existsSync(fullStaticPath)) {
        console.log(`${fullStaticPath} does not exist`);
        response.write("error 404 file path does not exist");
        response.end();
        return false;
        //returning because it will still work after end it wont go down
    }

    //after checking this only other code can run otherwise it wont run
    // else{
    //     console.log(`${fullStaticPath}  exits`)
    //     response.write("file path does exist")  
    //     response.end();
    // }

    //if we found something 
    //is it a file or directory?
    let stats;
    try {
        stats = fs.lstatSync(fullStaticPath);
        console.log(stats);
        //gives the info about the file like it is directory or file and times alllll
    } catch (err) {
        console.log(`lstat error :${err}`);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.write("500 Internal Server Error");
        response.end();
        return; // ✅ FIXED: Prevents running further code if `stats` fails
    }

    // ✅ FIXED: Check if stats is defined before accessing it
    if (!stats) return;

    //it is a directory
    if (stats.isDirectory()) {
        //get content from the template index.html
        let data = fs.readFileSync(path.join(staticBasePath, 'text', 'index.html'), 'utf-8');
        // console.log(data)

        let pathElement = pathname.split('/');
        console.log(pathElement);
        pathElement = pathElement.filter(element => element !== '');

        //build the page title
        let folderName = pathElement[pathElement.length - 1];
        console.log(folderName);
        // console.log(folderName)

        //build breadcrumb 
        const breadcrumb = buildBreadCrumb(pathname);
        //build table rows
        const mainContent = buildmainContent(fullStaticPath, pathname);
        //fill the template data with the page title, breadcrumb, and table rows
        data = data.replace('page_title', folderName);
        data = data.replace('path_name', breadcrumb);
        data = data.replace('mainContent', mainContent);

        //print data to webpage
        response.statusCode = 200;
        response.write(data);
        response.end();
        return; // ✅ ADDED RETURN TO PREVENT EXTRA CODE EXECUTION
    }

    //it is not a directory nor a valid file 
    //send 401 access denied
    //if it is a file
    //lets get the file extension

    let fileDetails={};
    fileDetails.extname=path.extname(fullStaticPath)
    console.log(fileDetails.extname)
    //get the file mime and add it to the response header
    getMimeType(fileDetails.extname).then(mime =>{
        console.log(mime)
    }).catch(err =>{
        response.statusCode=500
        response.write('500:internal server error')
        console.log(`promise error ${err}`)
        return response.end()
    })
    //get the file size and add it to the response header
    //pdf->display in browser
    //all other files stream in normal way
};

module.exports = respond;
