const sum1 = require('../../src/sum.js');


test('adds',()=>  {
    expect(sum1.sum(4,7)).toBe(6);
});