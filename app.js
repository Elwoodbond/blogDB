//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {useNewUrlParser: true});
}


const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Wake Up"
});

const item2 = new Item ({
  name: "Eat Breakfast"
});

const item3 = new Item ({
  name: "Go to Work"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved defult items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });


app.get("/", function(req, res) {

  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(4000, function() {
  console.log("Server started on port 3000");
});
