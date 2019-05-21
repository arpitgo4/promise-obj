

function promise_mapper(obj, abs_key = '', promises_map = {}) {
    if (!obj)
        return obj;

    if (Array.isArray(obj))
        return obj.map((o, idx) => promise_mapper(o, `${abs_key}.${idx}`, promises_map));

    if (typeof obj === 'number'    || 
        typeof obj === 'string'    || 
        typeof obj === 'undefined' || 
        typeof obj === 'boolean')
        return promises_map;

    if (obj instanceof Promise || 
        (typeof obj.then === 'function') && (typeof obj.catch === 'function')) {
        promises_map[abs_key] = obj;
        return promises_map;
    }

    Object.keys(obj)
    .forEach(key => {
        const value = obj[key];

        const abs_key_for_value = `${abs_key ? `${abs_key}.` : ''}${key}`;

        promise_mapper(value, abs_key_for_value, promises_map);
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

    const promises_map = promise_mapper(obj);
    const [ promise_abs_keys, promises ] = [ Object.keys(promises_map), Object.values(promises_map) ];

    return Promise.all(promises)
    .then(result_arr => {
        for (let idx = 0; idx < result_arr.length; idx++) {
            const abs_key = promise_abs_keys[idx];
            const result = result_arr[idx];

            let obj_ref = obj;
            const keys = abs_key.split('.');
            for (const key of keys.slice(0, keys.length - 1))
                obj_ref = obj_ref[key];

            obj_ref[keys[keys.length - 1]] = result;
        }

        return obj;
    });
};


module.exports = {
    promise_obj,
    promise_mapper,
}