//**************************************// ESTABLISHING COLLECTION WITH FRUITS DATABASE //****************************************//

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

//*************************************************// WRITING IN DATABASE // *****************************************************//

//creating the schema for objects to follow (schema for 1 collection is same)
const fruitSchema = {
  name: String,
  rating: Number,
  review: String,
};
const Fruit = mongoose.model("Fruit", fruitSchema);
// declaring a new object in the collection.
// Collection is automatically turned into plural form of the declared object by mongoose using loadash
// fruit 1 in fruits
const fru = new Fruit({
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
// fruit 2 in fruits
const coconut = new Fruit({
  name: "coconut",
  rating: 100,
  review: "BEST",
});
//saving both the fruits
fru.save();
kiwi.save();
orange.save();
coconut.save();
// making another collection in the same database
const personSchema = {
  name: String,
  age: Number,
};
const Person = mongoose.model("Person", personSchema);
const Shahima = new Person({
  name: "Shahima Firoz Khan",
  age: 21,
});
Shahima.save();

//*********************************************// READING FROM DATABASE //*********************************************************//

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach((fruit) => console.log(fruit.name));
  }
});
