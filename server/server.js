const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
// app.use(function(req,res,next){
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//  next();
// });

//const __dirname = path.resolve()

//app.use(express.static(path.join(__dirname, "public")));
///app.use(express.json());
//app.use(cors());
//console.log(__dirname)

app.use("/api/user", require("./routes/order"));
app.use("/api/theuser", require("./routes/user"));
app.use("/api/settings", require("./routes/setting"));

const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
/*app.get("*", (req, res) => {
      res.sendFile('index.html', { root });
  }) */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on PORT${PORT} in ${process.env.NODE_ENV} mode`
  );
});
