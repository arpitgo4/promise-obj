
const promise_obj = require('../index');

const { expect, } = require('chai');


describe('Promise.obj()', () => {

    it('should not be null', () => {
        expect(promise_obj).to.not.null;
    });

    it('should be a function', () => {
        expect(typeof promise_obj).equal('function');
    });

    it('should throw error for null as first argument', () => {
        const test_arg = null;
        const err_msg = 'first argument cannot be null!';

        expect(() => promise_obj(test_arg)).to.throw(TypeError, err_msg);
    });

    it('should throw error for array as first argument', () => {
        const test_arg = [];
        const err_msg = 'first arugment should not be an array!';

        expect(() => promise_obj(test_arg)).to.throw(TypeError, err_msg);
    });

    it('should throw error for first argument not of type object', () => {
        const test_arg_1 = 1;
        const test_arg_2 = '1';
        const err_msg = 'first argument should be of type: object!';

        expect(() => promise_obj(test_arg_1)).to.throw(TypeError, err_msg);
        expect(() => promise_obj(test_arg_2)).to.throw(TypeError, err_msg);
    });

    it('should return an object', () => {
        const test_obj = {};
        
        expect(typeof promise_obj(test_obj)).equals('object');
    });

    it('should not mutate the argument object', () => {
        const test_obj = {};
        promise_obj(test_obj);

        expect(test_obj).to.deep.equal(test_obj);
    });

    it('should return a new object', () => {
        const test_obj = {};
        const result_obj = promise_obj(test_obj);

        expect(result_obj).to.not.equal(test_obj);
    });

});