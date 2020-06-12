const expect=require('expect')
var {isReal}=require('./isRealValid')

describe("valid string",()=>{
    it("should not allow nonsting char" ,()=>{
     let res=isReal(65)
     expect(res).toBe(false)
    });

    it("should not allow space char",()=>{
       let  res=isReal('     ')
        expect(res).toBe(false)
    });

       it("should  allow string with no space char",()=>{
        let res=isReal('   gdsvf   ')
        expect(res).toBe(true)
       })
});