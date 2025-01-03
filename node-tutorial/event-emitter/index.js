// emit is use to trigger an event
// on is listening to events

const EventEmitter = require('events');

const myFirstEmitter = new EventEmitter();

//register a listener
myFirstEmitter.on("greet", (name) => {
    console.log(`Hello ${name}`);
});

myFirstEmitter.emit("greet", "Sangam Mukherjee");
