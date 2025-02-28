const child_process=require('child_process')

const calculateSizeD=(itemFullStaticPath)=>{
    const itemFullStaticPathCleaned=itemFullStaticPath.replace(/\s/g,'\ ')
    const commandLineOutput=child_process.execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString()
    console.log(commandLineOutput)
    let fileSize=commandLineOutput.replace(/\s/g,'')
    fileSize=fileSize.split("\\")
    // console.log(fileSize)
    fileSize=fileSize[0]

    return [fileSize,110*1000*1000]
}

module.exports=calculateSizeD