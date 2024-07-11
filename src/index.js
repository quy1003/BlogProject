const express = require("express");
const path = require("path");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const route = require("./routes/index");
const SortMiddleWare = require("./app/middlewares/SortMiddleWare");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
//Database connect
const db = require("./config/db");
db.connect();

//Ghi nhật kí yêu cầu HTTP
app.use(morgan("combined"));

//Tìm và phục vụ tài nguyên tĩnh
app.use(express.static(path.join(__dirname, "public")));

//Custom middleware
app.use(SortMiddleWare);
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: require('./helpers/handlebars'),
  })
);
app.set("view engine", "hbs");

//Định nghĩa cho biết nơi cần tìm các tập tin template
app.set("views", path.join(__dirname, "resources", "views"));

//Routes
route(app);
//Giải thích:
/*
Các endpoints chung của 1 chức năng trong thư mực routes/index.js
Các endponts riêng của 1 chức năng trong file riêng như routes/news.js, routes/site.js
Các hàm xử lí trong controlllers

*/

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

// icons default là (mũi tên lên xuống)
//     icons desc là (mũi tên xuống) giảm dần
//     icons asc là (mũi tên lên) tăng dần
    
//     types default là desc
//     types asc thì đổi sang desc
//     types desc thì đổi sang asc
    
    
//     sortType = field được truyền vào
    
//     nếu field là column đúng với req column
//     thì sortType = type được truyền trên request
//     những field khác được gán là default
    
    
//     Field trùng với req.colum: sortType = desc
//     icon được chọn là icon desc
//     field trùng với req column  thì 
//     có type ban đầu là default -> desc
//     có icon ban đầu là icon [desc]
    
//     Các field khác: sortType = default
//     có type là desc
//     có icon là default
    
//     Khi bấm tiếp vào icon trùng với req.column: sortType = asc
    