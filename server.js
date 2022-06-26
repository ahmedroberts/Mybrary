// 7.  Check if this is development or production
// Make Sure .env is top-level file
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// 1. Setting up the Express Server as an App
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 4. Require our routers
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

// 2. Setting defaults of the App
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded( { limit: '10mb', extended: false } ))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
// db.on('on', () => console.log('Initially Mongoose Clicked On')) probably deprecated
db.on('connected', () => console.log('Connected to Mongoose'))

// 5. Use Routers inside the app just like Controllers
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

// 9. Update this for Heroku
const PORT = process.env.PORT || '3000'
app.set("port", PORT)
app.listen(PORT)
