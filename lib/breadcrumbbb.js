//include libraries 
const path=require('path')
const buildBreadCrumb= pathname =>{
    const pathChunks=pathname.split('/').filter(elements =>elements!=='')
    // console.log(`pathChunks: ${pathChunks}`)
    let breadcrumb='<li class="breadcrumb-item"><a href="#">Home</a></li>'
    let link='/'
    pathChunks.forEach((item ,index)=> {
        link=path.join(link,item)
        if(index!==pathChunks.length-1){
        breadcrumb+=`<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`
           }  
            else{
                breadcrumb+=`<li class="breadcrumb-item active" current='page'>${item}</li>`
            }
            
    });
  return breadcrumb;
        

}
module.exports=buildBreadCrumb
