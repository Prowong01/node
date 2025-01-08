// timers -> pending callbacks -> idle, prepare -> poll -> check -> close callback

const fs = require('fs')
const crypto = require('crypto')

console.log('1. script start')

setTimeout(() => {
    console.log('2. settimeout 0s callback (macrotask)')
},0)

setTimeout(() => {
    console.log('3. settimeout 0s callback (macrotask)')
},0)

setImmediate(() => {
    console.log('4. setImmediate callback (check)')
})

Promise.resolve().then(() => {
    console.log('5. Promise resolved (microtask)')
})

process.nextTick(() => {
    console.log('6. process.nextTick callback (microtask)')
})

fs.readFile(__filename, ()=> {
    console.log('7.File read operation (I/O) callback')
})

crypto.pbkdf2('a secret', 'a salt', 100000, 64, 'sha512', (err, key) => {
    if(err) throw err
    console.log('8.pbkdf2 operation completed (CPU intensive task)')
});

console.log('9.script ends')

// 任务紧急程度：process.nextTick 通常用于执行一些需要立即处理的任务（如清理资源、错误处理等），而 Promise 的任务相对可以稍后处理

// 同步代码最先执行。
//
// 微任务（process.nextTick 和 Promise）在同步代码执行完毕后立即执行。
//
// 宏任务（setTimeout 和 setImmediate）在事件循环的不同阶段执行。
//
// I/O 回调和 CPU 密集型任务会在 poll 阶段执行
