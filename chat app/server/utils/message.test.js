let expect=require('expect');

var {generateMsg,generateLocMsg} =require('./message');

describe("generate message",()=>{
    it("should generate correct message",()=>{
        let from="sra1"
            text="hi,all"
            message=generateMsg(from,text);

            expect(typeof message.time) .toBe('number');
            expect(message).toMatchObject({from,text})
    })
});

describe("Generate Loc Msg",()=>{
    it("should generate corrct location obj",()=>{
        let from="sra2",
        lat=12,
        long=35,url=`https://www.google.com/maps?q=${lat},${long}`
        message=generateLocMsg(from,lat,long);
        expect(typeof message.time) .toBe('number');
        expect(message).toMatchObject({from,url})


    })
       
})