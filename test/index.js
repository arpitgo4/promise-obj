
const promise_obj = require('../index');

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

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

    it('should resolve all promises in given simple object', () => {
        const test_obj = {
            one: 1,
            two: 2,
            three: 3,
        };

        expect(promise_obj(test_obj)).to.eventually.equal(test_obj);
    });

    it('should resolve all promises in given complex objects ', () => {
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

        const result_obj = {
            one: 1,
            two: {
                three: 3,
                four: {
                    five: 5,
                    six: {
                        seven: 7,
                        eight: [ 8, 9, ],
                    },
                }
            },
            ten: [ 10, 11, 12, { thirteen: 13, fourteen: { fifteen: 15 } }, { sixteen: 16 } ],
        };

        expect(promise_obj(test_obj)).to.eventually.deep.equals(result_obj);
    });
});