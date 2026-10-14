// Serve the strict build under the actual GitHub Pages prefix for browser tests.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('site'),prefix='/topology-from-zero/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2'};
createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(!path.startsWith(prefix))throw new Error('prefix');
    let file=resolve(root,path.slice(prefix.length));
    if(file!==root&&!file.startsWith(root+sep))throw new Error('path');
    if((await stat(file)).isDirectory())file=resolve(file,'index.html');
    res.setHeader('Content-Type',mime[extname(file)]??'application/octet-stream');res.end(await readFile(file));
  }catch{res.statusCode=404;res.end('Not found');}
}).listen(8123,'127.0.0.1');
