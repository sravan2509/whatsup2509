const moment=require('moment')

let generateMsg=(from,text)=>{
    return{
        from,
        text,
        time:moment().valueOf()
    }
}

let generateLocMsg=(from,lat,long)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        time:moment().valueOf()
    }
}

module.exports={generateMsg,generateLocMsg}