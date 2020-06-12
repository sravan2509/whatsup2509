let socket = io();

function srollBottomUp(){
    message=document.querySelector('.messages').lastElementChild
    message.scrollIntoView()
}

socket.on('connect',()=>{
    console.log("server connected to this");

    let userData=JSON.parse('{"'+window.location.search.substring(1).replace(/&/g,'","').replace(/=/g,'":"').replace(/\+/g,'" "')+'"}')
 console.log(userData)
 socket.emit('join',userData,function(err){
     if(err){
         alert(err)
         window.location.href='/'}
     else{
         console.log('no error');
         
     }
 })
    // auto emit status check on connecting
    // socket.emit('createMsg',{from:"sravan",text:"sockets"})
})


socket.on('disconnect',()=>{
    console.log("server disconnected")
})

socket.on('updateUser',(users)=>{
  let ol=document.createElement('ol')
  users.forEach((user)=>{
      let li=document.createElement('li')
      li.innerHTML=user
      ol.appendChild(li)
  })
  let userlist=document.querySelector('.users')
  userlist.innerHTML=' ';
  userlist.appendChild(ol)
  })


socket.on('newMsg',(newMg)=>{
  console.log("newMg",newMg);
//with engine
const formatTime=moment(newMg.time).format('LT')
    let template=document.querySelector('#msg-block').innerHTML
    let html=Mustache.render(template,{
        from:newMg.from,
        text:newMg.text,
        time:formatTime
    })

    const div=document.createElement('div')
    div.innerHTML=html
    document.querySelector('.messages').appendChild(div)

    //scroll up
    srollBottomUp()

//   with out engine
//   const formatTime=moment(newMg.time).format('LT')
//   let li=document.createElement('li')
//         li.innerText=`${newMg.from} at ${formatTime} : ${newMg.text}`
//         document.querySelector('body').appendChild(li)
})


socket.on('newLocMsg',(newLocMg)=>{
    console.log("newLocMg",newLocMg);
    // with engine
    const formatTime=moment(newLocMg.time).format('LT')
    let template=document.querySelector('#LocMessage').innerHTML
    let html=Mustache.render(template,{
        from:newLocMg.from,
        url:newLocMg.url,
        time:formatTime
    })

    const div=document.createElement('div')
    div.innerHTML=html
    document.querySelector('.messages').appendChild(div)

    //to scroll up
    srollBottomUp()


    // without engine
    // const formatTime=moment(newLocMg.time).format('LT')

    //       let li=document.createElement('li')
    //       let a=document.createElement('a')
    //       li.innerText=`${newLocMg.from} at ${formatTime}`
    //       a.setAttribute('target','_blank')
    //       a.setAttribute('href',newLocMg.url)
    //       a.innerText="my current location"
    //       li.appendChild(a)

    //     //   li.innerText=`${newMg.from} : ${newMg.text}`
    //       document.querySelector('body').appendChild(li)
        
  })


document.querySelector('#submit-btn').addEventListener('click',
function(e){
    e.preventDefault();

    socket.emit("createMsg",{
        // about callbackfun
    //     from:"sravan",
    //     text:"from index.js on emit"
    // }, (msg)=>{console.log(msg,": msg received");
    
    // from input
    from:"user",
    text:document.querySelector('input[name="message"]').value
    },
    function(){
        // let li=document.createElement('li')
        // li.innerText=`${newMsg.from} : ${newMsg.text}`
        // document.querySelector('body').appendChild(li)
        // console.log(newMsg)
       })


})



document.querySelector('#location').addEventListener('click',
function(){
    if(!navigator.geolocation){
       return alert("geolocation not supported in your browser")
    }

    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position)
        socket.emit("createLocationmsg",{
          from:"user",
          lat:position.coords.latitude,
          long:position.coords.longitude
    })
    },function(){ return alert("error!unable to fetch location")})
    
})

