const express = require('express')
const path = require('path')
const morgan = require('morgan')
const hbs  = require('express-handlebars');
const app = express()
const port = 3000

//Ghi nhật kí yêu cầu HTTP
app.use(morgan('combined'))

//Tìm và phục vụ tài nguyên tĩnh
app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs')

//Định nghĩa cho biết nơi cần tìm các tập tin template
app.set('views', path.join(__dirname, 'resources', 'views'))

//Trả về endpoints
app.get('/', (req,res) => res.render('home'))
app.get('/news', (req,res) => res.render('news'))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))