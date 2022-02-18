import { exit } from "process";
import * as fs from 'fs';
const docxConverter = require('docx-pdf');

async function bootstrap() {
  const sourcePath = process.argv[2];
  const targetPath = process.argv[3];

  if ( !sourcePath ) {
    console.error("you must provide source path");
    exit(1);
  }

  if ( !targetPath ) {
    console.error("you must provide target path");
    exit(2);
  }

  if ( !fs.existsSync(sourcePath) ) {
    console.error("source path does not exist");
    exit(3);
  }

  try {
    await new Promise( ( resolve, reject ) => {
      docxConverter(sourcePath,targetPath,function(err,result){
        if(err){
          reject(err);
        } else {
          resolve(result);
        }
      });
    } );
  } catch (error) {
    console.error(error);
    exit(4);
  }  
}
bootstrap();
