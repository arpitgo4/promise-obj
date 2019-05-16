

function promise_mapper(obj, abs_key = '', promises_map = {}) {
    if (!obj)
        return obj;

    if (Array.isArray(obj))
        return obj.map(o => map_promises(o, abs_key, promises_map));

    if (typeof obj === 'number'    || 
        typeof obj === 'string'    || 
        typeof obj === 'undefined' || 
        typeof obj === 'boolean')
        return promises_map;

    if (obj instanceof Promise) {
        promises_map[abs_key] = obj;
        return promises_map;
    }

    Object.keys(obj)
    .forEach(key => {
        const value = obj[key];

        const abs_key_for_value = `${abs_key}.${key}`;

        map_promises(value, abs_key_for_value, promises_map);
    });

    return promises_map;
};


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


module.exports = {
    promise_obj,
    promise_mapper,
}