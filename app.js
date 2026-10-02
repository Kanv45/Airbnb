const dns = require('dns');

dns.setServers([
  '8.8.8.8',
  '1.1.1.1'
]);
require('dotenv').config();
const {Error}=require('./controller/Error')
const express = require('express')
const session = require('express-session')
const app= express()
app.set('view engine','ejs')  
app.set('views','views')  
const userRoute= require('./routes/user')
const {authRoute}= require('./routes/auth')
const {hostRoute}= require('./routes/host')
const { default: mongoose } = require('mongoose')
const MongoDbStore = require('connect-mongodb-session')(session)
const url = process.env.MONGODB_URI;
const store= new MongoDbStore({
  uri:url,
  collection:'sessions'
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret:"Compelete Coding by Prashant",
  resave:false,
  saveUninitialized:true,
  store:store
}))

app.use(userRoute)
app.use(hostRoute)
app.use(authRoute)
app.use(Error)
const PORT = process.env.PORT || 3002;
mongoose.connect(url).then(()=>{
  console.log("Connected to Mongo")
app.listen(PORT,()=>{
  console.log(`Server is running on PORT  ${PORT}`)
});
}).catch(()=>{
  console.log("Error in connected to Mongo")
})