# Promise.all for objects
Resolves an object containing deeply nested promises in sub-objects and arrays.
It internally uses Promise.all for concurrent resolution of promises.

### To Install
```
npm install --save @arpitgo4/promise-obj
```

### How to use ?

#### Promise resolution
```javascript
const promise-obj = require('@arpitgo4/promise-obj');

const p3 = Promise.resolve(3);
const p5 = Promise.resolve(5);
const p7 = Promise.resolve(7);
const p9 = Promise.resolve(9);
const p10 = Promise.resolve(10);
const p12 = Promise.resolve(12);
const p13 = Promise.resolve(13);
const p15 = Promise.resolve(15);
const p16 = Promise.resolve(16);

const test_obj = {
    one: 1,
    two: {
        three: p3,
        four: {
            five: p5,
            six: {
                seven: p7,
                eight: [ 8, p9, ],
            },
        }
    },
    ten: [ p10, 11, p12, { thirteen: p13, fourteen: { fifteen: p15 } }, { sixteen: p16 } ],
};

return promise-obj(test_obj)
.then(result_obj => console.log(result_obj))
.catch(err => console.error(err));

// result_obj:
// {
//     one: 1,
//     two: {
//         three: 3,
//         four: {
//             five: 5,
//             six: {
//                 seven: 7,
//                 eight: [ 8, 9, ],
//             },
//         }
//     },
//     ten: [ 10, 11, 12, { thirteen: 13, fourteen: { fifteen: 15 } }, { sixteen: 16 } ],
// }

```

#### Promise rejection
Promise will reject if any of the nested promises fails, same as Promise.all.

```javascript
const error = new Error('some error!');
const test_obj = {
    one: 1,
    two: Promise.reject(error),
    three: 3,
};

return promise-obj(test_obj)
.catch(error => console.log(error)); // some error!
```

### How to contribute
```
## run mocha in watch mode
npm run test:watch
```
