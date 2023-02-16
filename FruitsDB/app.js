const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

const fruitSchema = {
  name: String,
  rating: Number,
  review: String,
};

const Fruit = mongoose.model("Fruit", fruitSchema);

const fru = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Its Fine",
});

const kiwi = new Fruit({
  name: "kiwi",
  rating: 7,
  review: "Amazing",
});

fru.save();
kiwi.save();

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
