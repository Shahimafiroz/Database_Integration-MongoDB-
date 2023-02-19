//**************************************// ESTABLISHING COLLECTION WITH FRUITS DATABASE //****************************************//

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

//*************************************************// WRITING IN DATABASE // *****************************************************//

//creating the schema for objects to follow (schema for 1 collection is same)
const fruitSchema = {
  // *************************************************  validating data ******************************************************* //
  name: String,
  // required: [true, "why no name ? haaiiiiyyyaaa"],

  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
};
const Fruit = mongoose.model("Fruit", fruitSchema);
// declaring a new object in the collection.
// Collection is automatically turned into plural form of the declared object by mongoose using loadash
// fruit 1 in fruits
const Apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Its Fine",
});
// fruit 2 in fruits
const kiwi = new Fruit({
  name: "kiwi",
  rating: 9,
  review: "Amazing",
});
// fruit 3 in fruits
const orange = new Fruit({
  name: "Orange",
  rating: 2,
  review: "yuck",
});
// fruit 3 in fruits
const lichi = new Fruit({
  name: "lichi",
  rating: 9,
  review: "The most amazing",
});
// fruit 4 in fruits
const coconut = new Fruit({
  name: "coconut",
  rating: 10,
  review: "BEST",
});

// lichi.save();
//saving  the Fruit apple individually
// Apple.save();
// *************************************************************** //saving the fruit seperately the server will keep making new objects everytime you keep runnig the server hence commmnet out once satisfed with the currect collection.
// Fruit.insertMany([Apple, kiwi, orange, coconut, lichi], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     console.log("Sucessfully saved all the fruits!");
//   }
// });

// making another collection in the same database
//*************************************// Establishing relationships between two collections//***********************//
const personSchema = {
  name: String,
  age: Number,
  favroiteFruit: fruitSchema,
};
const Person = mongoose.model("Person", personSchema);
const Shahima = new Person({
  name: "Shahima Firoz Khan",
  age: 21,
  favroiteFruit: coconut,
});

const aadil = new Person({
  name: "Aadil Firoz Khan",
  age: 14,
  favroiteFruit: kiwi,
});

Shahima.save();
aadil.save();

//*********************************************// READING FROM DATABASE //*********************************************************//

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach((fruit) => console.log(fruit.name));
  }
});

//*********************************************// UPDATING IN DATABASE //*********************************************************//
// Fruit.updateOne(
//   { _id: "63f114edfa934cb9ee14650a" },
//   { name: "lichi" },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Sucessfully updated");
//     }
//   }
// );
///*********************************************// DELETING IN DATABASE //*******************************************************//
// Fruit.deleteOne({ name: lichi }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Sucessfully deleted");
//   }
// });
