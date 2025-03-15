import React from "react";
import PizzaCards from "../components/PizzaCards";

// Sample Data: Veg & Non-Veg Pizzas
const vegPizzas = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic cheese and tomato base.",
    price: 199,
    image: "/images/margherita.jpeg",
  },
  {
    id: 2,
    name: "Farmhouse",
    description: "Loaded with mushrooms, capsicum, and tomatoes.",
    price: 249,
    image: "/images/farmhouse.jpeg",
  },
  {
    id: 3,
    name: "Peppy Paneer",
    description: "Spiced paneer with crunchy toppings.",
    price: 279,
    image: "/images/peppy-paneer.jpeg",
  },
];

const nonVegPizzas = [
  {
    id: 4,
    name: "Chicken Tikka",
    description: "Tandoori chicken with rich spices.",
    price: 299,
    image: "/images/chicken-tikka.jpeg",
  },
  {
    id: 5,
    name: "Pepperoni",
    description: "Loaded with spicy pepperoni slices.",
    price: 349,
    image: "/images/pepperoni.jpeg",
  },
  {
    id: 6,
    name: "BBQ Chicken",
    description: "Smoky BBQ chicken with onions and cheese.",
    price: 329,
    image: "/images/bbq-chicken.jpeg",
  },
];

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="relative h-72 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold"
           style={{ backgroundImage: "url('/images/pizza-banner.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-4 rounded-lg">Welcome to Pizza Shop 🍕</div>
      </div>

      {/* Veg Pizzas */}
      <h1 className="text-3xl font-bold my-6 text-green-600">🌱 Veg Pizzas</h1>
      <PizzaCards pizzas={vegPizzas} />

      {/* Non-Veg Pizzas */}
      <h1 className="text-3xl font-bold my-6 text-red-600">🍗 Non-Veg Pizzas</h1>
      <PizzaCards pizzas={nonVegPizzas} />
    </div>
  );
};

export default Home;