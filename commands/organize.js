function oraganizeFn(dirPath){
    // console.log("oraganize command implemented for", dirPath);
     // 1. input -> directory path given
     let destPath;
     if(dirPath == undefined){
         destPath = process.cwd();
        // console.log("Kindly enter the path");
         return;
     }
     else{
         let doesExist = fs.existsSync(dirPath);
         if(doesExist){
                 // 2. create -> oraganized_files -> directory
                 destPath = path.join(dirPath, "organized_files");
                 if(fs.existsSync(destPath)==false){
                     fs.mkdirSync(destPath);
                 }
                 
         }
         else{
             console.log("Kindly enter the correct path");
             return;
         }
     }
     organizerHelper(dirPath, destPath);
     
    
 }
 
 function organizerHelper(src, dest){
     // 3. identify categories of all the files present in that input directory->
     let childName = fs.readdirSync(src);
     //console.log(childName);
     for(let i=0;i< childName.length; i++){
         let childAddress = path.join(src, childName[i]);
         let isFile = fs.lstatSync(childAddress).isFile();
         if(isFile){
             //console.log(childName[i]);
             let category = getCategory(childName[i]);
             console.log(childNames[i],"belongs to -->", category);
 
 
              // 4. copy/cut files to that oraganized directory inside of any of category folder
              sendFiles(childAddress, dest, category);
         }
 
     }
     function sendFiles(srcFilePath, dest, category){
         let categoryPath = path.join(dest, category);
         if(fs.existsSync(categoryPath)==false){
             fs.mkdirSync(categoryPath);
         }
         let fileName =path.basename(srcFilePath)
         let destFilePath = path.join(categoryPath, fileName);
         fs.copyFileSync(srcFilePath, destFilePath);
         fs.unlinkSync(srcFilePath);
         console.log(fileName, "copied to ", category);
     }
 }
 
 function getCategory(name){
     let ext = path.extname(name);
     ext = ext.slice(1);
     for(let type in types){
         let currentTypeArray =types[type];
         for(let i=0; i<currentTypeArray.length;i++){
             if(ext == currentTypeArray[i]){
                 return type;
             }
         }
     }
     return "others";
 }

 module.exports={
    organizeKey: oraganizeFn
 }