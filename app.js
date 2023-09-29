const express = require ('express')
const dotEnv = require('dotenv').config()
const dbConnect = require('./dbConnect')
const user = require ('./user')
const bcrypt = require ('bcrypt')
const helmet = require('helmet')
const port = process.env.PORT || 4000
const app = express()


// fetching the data from form submission
app.use(helmet())
app.use(express.urlencoded({extended:false}))

//register a user
app.post ('/register', async (req, res)=>{
    // accepting user input
    try{
    const {firstName,lastName,email,password} = req.body
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10)
   const results = await user.create({firstName,lastName,email, 'password':hashPassword})
   if(results)
    return res.send('user created successfully')

   res.send('unable to create user')
    }catch(error){
        console.log(error);
        res.send ('unable to handle request currently, please try again')
    }
})

app.post('/login',async(req,res)=>{
    const {email,password} =req.body
    //   check if the username is vaild in the database
    const results = await users.findOne({where:{email}})
    if(!results){
        return  res.send('Invaild Credentials ')
    }
    const correctPassword = results.password
    // comparing hashed pass with current password
    const isCorrectPassword =await bcrypt.compare(password,correctPassword)
    if(!isCorrectPassword){
       return res.send('Invaild Credentials ')
    }
    res.send('Logged in Successfully')
})

app.listen(port, ()=>{
    dbConnect.authenticate()
    console.log(`server connected on http://localhost:${port}`)
})
