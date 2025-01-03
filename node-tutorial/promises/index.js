//  1
function delayFn(time) {
    // Promise 一定会从 Pending 状态变为 Fulfilled 状态，因为你只写了 resolve，没有写 reject
    return new Promise((resolve => setTimeout(resolve, time)))
}

console.log('starts')
delayFn(2000).then(()=> console.log('after 2 seconds promise resolved'))
console.log('end')

// 2
function delayFn2(time) {
    return new Promise((resolve, reject) => {
        if (time < 0) {
            reject('时间不能为负数');
        } else {
            setTimeout(resolve, time);
        }
    });
}

delayFn2(-1000)
    .then(() => console.log('成功'))
    .catch((err) => console.error('失败:', err));

// 3
function divideFn(num1, num2) {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject("Can not perform division by 0");
        } else {
            resolve(num1 / num2);
        }
    });
}

divideFn(10, 0)
    .then((result) => console.log(result, "res"))
    .catch((error) => console.log(error, "err"));

// 4
function test(param1, param2) {
    return new Promise((resolve, reject) => {
        if (param1 === 1 && param2 === 2) {
            resolve("Success");
        } else {
            reject("Failed");
        }
    })
}

test(2,2).then((result) => console.log(result, "result"))
                         .catch((error) => console.log(error, "error"));
