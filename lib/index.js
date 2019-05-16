

function promise_obj(obj) {
    if (!obj)
        throw new TypeError('first argument cannot be null!');
    if (Array.isArray(obj))
        throw new TypeError('first arugment should not be an array!');
    if (typeof obj !== 'object')
        throw new TypeError(`first argument should be of type: object!`);


    
    const result = Object.assign({}, obj);

    return result;
};


module.exports = promise_obj;