//for every user there is a special id on connect to chat
// here we r create user data like id name room

class Users{
    constructor(){
        this.users=[]
    }
    addUser(id,name,room){
        let user={id,name,room}
        this.users.push(user)
        return user;
    }
    getUserList(room){
        let usersl=this.users.filter((user)=>user.room===room)
        let nameList=usersl.map((user)=>user.name)
        return nameList
    }
    getUser(id){
        let user=this.users.filter((user)=>user.id===id)[0]
        //as users is array so it returns array of req user so include index
        return user
    }

    delectUser(id){
      let duser=this.getUser(id)
      if(duser){
          this.users= this.users.filter((user)=>user.id!==duser.id)
      }
      return duser
    }
}

module.exports={Users}