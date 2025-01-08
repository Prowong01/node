//objects -> handle binary data
//file system operations, cryptography, image processing

const buffOne = Buffer.alloc(10); //allocate a buffer of 10 bytes -> zeros
console.log(buffOne);

const buffFromString = Buffer.from("Hello"); // (十六进制)
console.log(buffFromString);

const buffFromArrayOfintegers = Buffer.from([1, 2, 3, 4, 5, 0]);
console.log(buffFromArrayOfintegers);

buffOne.write("Eddie");
console.log("After writing Node js to buffOne", buffOne.toString());

console.log(buffFromString[0]); // 72 (十进制)

console.log(buffFromString.slice(0, 3));

const concatBuffs = Buffer.concat([buffOne, buffFromString]);
console.log(concatBuffs);

console.log(concatBuffs.toJSON());

//十六进制：用于表示整个 Buffer，因为它更紧凑且易于与字符对应。
//
// 十进制：用于单独访问 Buffer 中的某个字节，因为它更直观且易于计算。
//
// 不同进制有不同的用途：十六进制适合查看和调试，十进制适合计算和操作
