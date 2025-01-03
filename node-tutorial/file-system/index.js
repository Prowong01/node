// File System
const fs = require('fs');
// Path
const path = require('path');

// __dirname 是一个全局变量，表示 当前文件所在目录的绝对路径
// 在 ES Module 中（"type": "module"），__dirname 不再直接可用，需要通过 import.meta.url 和 path.dirname 来获取
const dataFolder = path.join(__dirname, "data");

if(!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log('data folder created')
}

const filePath = path.join(dataFolder, 'example.txt');
// 同步的
fs.writeFileSync(filePath, 'Hello World')

// 异步的
fs.writeFile(filePath, 'Async operation')
console.log('File created successfully')

const readContentFromFile = fs.readFileSync(filePath, 'utf8');
console.log('File content:', readContentFromFile);

fs.appendFileSync(filePath, '\n This is a new line added')
