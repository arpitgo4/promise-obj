
const { promise_mapper } = require('../lib');

const { expect } = require('chai');


describe('Promise Mapper', () => {

    it('should return original value for invalid first argument', () => {
        const test_arg = undefined;

        expect(promise_mapper(test_arg)).to.equals(test_arg);
    });

    it('should return an object as return value', () => {
        const test_arg = {};

        expect(promise_mapper(test_arg)).to.be.an('object');
    });

    it('should return empty object for empty object as argument', () => {
        const test_arg = {};

        expect(promise_mapper(test_arg)).to.be.an('object');
    });

    it('should not mutate the object argument', () => {
        const test_arg = {};
        promise_mapper(test_arg);

        expect(test_arg).to.deep.equal(test_arg);
    });

    describe('Fetch all promises from give object', () => {
        
        it('should return empty object for object with no promises as values', () => {
            const test_obj = {
                one: 1,
                two: 2,
                three: 3,
            };

            expect(promise_mapper(test_obj)).to.deep.equals({});
        });

        it('should fetch promises as a map for flat objects with promises as values', () => {
            const p1 = Promise.resolve(2);
            const p2 = Promise.resolve(3);

            const test_obj = {
                one: 1,
                two: p1,
                three: p2,
                four: 4,
            };

            const result_obj = {
                two: p1,
                three: p2,
            };

            expect(promise_mapper(test_obj)).to.deep.equals(result_obj);
        });


        it('should fetch promises as a map for complex objects with promises as values', () => {
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
                'two.three': p3,
                'two.four.five': p5,
                'two.four.six.seven': p7,
                'two.four.six.eight.1': p9,
                'ten.0': p10,
                'ten.2': p12,
                'ten.3.thirteen': p13,
                'ten.3.fourteen.fifteen': p15,
                'ten.4.sixteen': p16,
            };

            expect(promise_mapper(test_obj)).to.deep.equals(result_obj);
        });

    });

});