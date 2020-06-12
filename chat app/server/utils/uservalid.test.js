const expect=require('expect')
const {Users}=require('./user')

describe("user validations",()=>{

    let users;
    beforeEach(()=>{
        users=new Users();
        users.users=[
            {id:"1",
            name:"name1",
            room:"room1"},
            {id:"2",
            name:"name2",
            room:"room2"},
            {id:"3",
            name:"name3",
            room:"room1"},
        ]
    })

    it("should add the user",()=>{
        let users=new Users()
        let user={
            id:"4",
            name:"name4",
            room:"room4"
        }
        let reUser=users.addUser(user.id,user.name,user.room)
        expect(users.users).toEqual([user])
        expect (users.users.length).toBe(1)
    })

    it("should get users List of room name room1",()=>{
        let usersList=users.getUserList('room1')
        expect(usersList).toEqual(['name1','name3'])
    })


    it("should get users List of room name room2",()=>{
        let usersList=users.getUserList('room2')
        expect(usersList).toEqual(['name2'])
    })

    it("shouldnot get users List of unknow roomid",()=>{
        let usersList=users.getUserList('room3')
        expect(usersList).toEqual([])
    })

    it("should get user by id",()=>{
        let userId="1"
        let userdata=users.getUser(userId)
        expect(userdata.id).toBe(userId)
    })

    it("should not get user by unknownid",()=>{
        let userId="11"
        let userdata=users.getUser(userId)
        expect(userdata).toBeUndefined()
    })

    it("should delect user by id",()=>{
        let userId='1'
        let deluser=users.delectUser(userId)

        expect(deluser.id).toEqual(userId)
        expect(users.users.length).toEqual(2)
    })

    it("shouldnot delect user by unknowid",()=>{
        let userId='112'
        let deluser=users.delectUser(userId)

        expect(deluser).toBeUndefined()
        expect(users.users.length).toEqual(3)
    })
})