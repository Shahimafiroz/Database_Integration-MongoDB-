//************************************************************************ requiring  ****************************************************************//

const exp = require("express");
const bp = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const { name } = require("ejs");

const app = exp();
console.log(date);

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));
app.use(exp.static("public"));
//************************************************************************ MONGODB ****************************************************************//
// connecting mongoose//
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
});
// creating an items schema
const itemsSchema = {
  name: String,
};
// creating a mongoose model
const Item = mongoose.model("Item", itemsSchema);

// creating 3 default documnet objects items
const item1 = new Item({
  name: "Welcome to your todo list",
});

const item2 = new Item({
  name: "Hit the + button to add a new item",
});
const item3 = new Item({
  name: "<--- Hit this to delete an item",
});

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

////////////////////
//  Insert the items into an array //
const defaultItems = [item1, item2, item3];
Item.insertMany(defaultItems, function (err) {
  if (err) {
    console.log(err);
  } else {
  }
});

// Reading the items (objects from databse ) into the console

// Item.find({ name: true }, function (err, foundItems) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("sucessfully saved to defaultItems to DB");
//   }
// });

//*************************************************************** HOME ROUTE **********************************************************************//
app.get("/", function (req, res) {
  let day = date.getDate();
  // 0. mongodb -- rendering the found items
  Item.find({}, function (err, foundItems) {
    // 1. function for inserting the array only once. we do that by checking the length of elements in the items array
    if (foundItems.length === 0) {
      // 2. Insert the items into an array //
      const defaultItems = [item1, item2, item3];
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("All items sucessfully saved into the DB");
        }
        //2//
      });
      //3. incase the array is empty there is nothing to render ... hence rendering the inserted items by redirecting to the root route
      res.redirect("/"); //3//
    } else {
      res.render("list.ejs", { listTitle: day, newListItems: foundItems });
    }
    // 1//
  });
  //0//
}); //get//
//*******************************************EXpress route pramas *******************************************************//

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;
  ////////////////////
  List.find({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        console.log("Dosent exist");
      } else {
        console.log("Exists!");
      }
    }
  });
  //////////////

  const list = new List({
    name: customListName,
    items: defaultItems,
  });
  list.save();
});

//*************************************************************************************************************************************************//
app.post("/", function (req, res) {
  /************ getting items into the list from ejs remplate and pushing in the DB collection ****************/
  const item_dynamic_name = req.body.newtask;
  const item_n = new Item({
    name: item_dynamic_name,
  });
  item_n.save();
  res.redirect("/");
});

//******************************************************* HANDLING DELETE REQUESTS ***************************************************************//
app.post("/delete", function (req, res) {
  const checkedItemid = req.body.checkbox;
  // console.log(checkedItemid);
  Item.findByIdAndRemove(checkedItemid, function (err) {
    if (!err) {
      console.log("sucesssfully deleted");
      res.redirect("/");
    }
  });
});

//*************************************************************************************************************************************************//
app.listen(3000, function () {
  console.log("server running on port 3000");
});

app.get("/about", function (req, res) {
  res.render("about");
});
