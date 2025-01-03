const fs = require('fs')

function person(name, callbackFn) {
    console.log(`Hello ${name}`)
    callbackFn('KL') // call the callback function
}

function address (address){
    console.log(address)
}

// second parameter is callbackFn
person('Eddie', address)

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file", err);
        return;
    }
    console.log(data);
});
