const { expect, should } = require('chai');
const cartSpec = require('../cart');
const productsMock = require('./products.mock');

describe('Cart function', () => {
    describe('Adding Pquantity to the "Products" obj ', () => {
        it('should exist and not return undefined', () => {
            expect(cartSpec.AddQuantity(productsMock).Products[0].Pquantity).to.exist;
        });
    });


    describe('Products summary', () => {
        it('should be equal to 3', () => {
            expect(cartSpec.Summery(cartSpec.AddQuantity(productsMock)).Total).to.be.equal(3);
        });
    });

    describe('Remove product', () => {
        it('should return undefined after remove', () => {
            expect(cartSpec.RemoveProduct(productsMock, productsMock.Products[1].PID).Products).to.have.lengthOf(1)
        });
    });

    // describe('Remove product', () => {
    //     it('should return undefined after remove', () => {
    //         console.log(cartSpec.RemoveProduct(productsMock));
    //         expect(cartSpec.RemoveProduct(productsMock, 99)).to.have.lengthOf(1)
    //     });
    // });
});