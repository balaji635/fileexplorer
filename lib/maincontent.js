//modules
const path=require('path')
const fs=require('fs')
const calculateSizeD=require('./calculateSizeD')
const buildmainContent=(fullStaticPath,pathname)=>{
    let mainContent=''
    let items

    //loop throught the elements inside the folder
    try{
        items=fs.readdirSync(fullStaticPath)
        // console.log(items);
        console.log(items)
    }catch(err){
        console.log(`error: ${err}`)
        return `<div class='alert alert-danger'> Internal Server Error<div>`
    }
    //get the following elements of each item
    items.forEach(item => {
        const link=path.join(pathname,item)
        let itemFullStaticPath=path.join(fullStaticPath,item)
        let stats
        try{
         stats=fs.statSync(itemFullStaticPath)
        }
        catch(err){
            console.log("error in statSync")
        }
        let icon,itemSize,itemSizeBytes
        if(stats.isDirectory()){
            icon='<i class="bi bi-folder"></i>'
            [itemSize,itemSizeBytes]=calculateSizeD(itemFullStaticPath);

        }
        else if(stats.isFile()){
                icon='<i class="bi bi-file-earmark"></i>'
                // [itemSize,itemSizeBytes]=calculateSizeF(itemFullStaticPath);
        }
        else{
            icon=""
        }

          mainContent +=`
    <tr>
    <td>${icon}<a href="${link}">${item}</a></td>
    <td>${itemSize}</td>
    <td>12/23/45 1:3:0 pm</td>
    </tr>
    `
    });
        //name
        //icon
        // let itemFullPath=path.join(fullStaticPath,item);
        // try{
        //     let 

        // }catch(err){
        //     console.log(err)
        // }
        //link to that item
        //size
        //last modified
  
    return mainContent

}
module.exports=buildmainContent