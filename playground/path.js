const { url } = require('inspector')
const path=require('path')

console.log(path.join('Node','Balaji'))
console.log(path.normalize('../Node/J/../../Balaji'))//it will normalize and give the last thing ..\Balaji
console.log(path.resolve('../Node/J/../../Balaji'))//it will clib up with desktop and give the last thing
//C:\Users\balaj\OneDrive\Desktop\Balaji
const staticBasePath=path.join(__dirname,'..','static_folder');
console.log(staticBasePath)
console.log(path.join(staticBasePath,'text','index.html'))
// console.log(path.join(staticBasePath, '..', 'text', 'index.html'));

// console.log(url.parse("?page=name&gmail=none",true).query)