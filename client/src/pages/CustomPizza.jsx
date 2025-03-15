import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const pizzaBases = ["Thin Crust", "Thick Crust", "Cheese Burst", "Whole Wheat", "Gluten-Free"];
const sauces = ["Tomato", "BBQ", "Pesto", "Alfredo", "Spicy Mayo"];
const cheeses = ["Mozzarella", "Cheddar", "Parmesan", "Vegan Cheese"];
const toppings = ["Mushrooms", "Capsicum", "Olives", "Chicken", "Pepperoni", "Paneer"];

const CustomPizza = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    if (!location.state || !location.state.pizza) {
      navigate("/");
    } else {
      setSelectedPizza({ ...location.state.pizza, base: pizzaBases[0], sauce: sauces[0], cheese: cheeses[0], toppings: [], price: location.state.pizza.price });
    }
  }, [location, navigate]);

  const handleToppingChange = (topping) => {
    const newToppings = selectedPizza.toppings.includes(topping)
      ? selectedPizza.toppings.filter((t) => t !== topping)
      : [...selectedPizza.toppings, topping];

    setSelectedPizza({ ...selectedPizza, toppings: newToppings, price: selectedPizza.price + (selectedPizza.toppings.includes(topping) ? -20 : 20) });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(selectedPizza));
    alert("Custom Pizza added to cart!");
    navigate("/cart");
  };

  if (!selectedPizza) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">🍕 Customize Your Pizza</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Select Pizza Base:</h2>
        <select value={selectedPizza.base} onChange={(e) => setSelectedPizza({ ...selectedPizza, base: e.target.value })} className="w-full p-2 border rounded">
          {pizzaBases.map((base) => <option key={base} value={base}>{base}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Select Sauce:</h2>
        <select value={selectedPizza.sauce} onChange={(e) => setSelectedPizza({ ...selectedPizza, sauce: e.target.value })} className="w-full p-2 border rounded">
          {sauces.map((sauce) => <option key={sauce} value={sauce}>{sauce}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Select Cheese:</h2>
        <select value={selectedPizza.cheese} onChange={(e) => setSelectedPizza({ ...selectedPizza, cheese: e.target.value })} className="w-full p-2 border rounded">
          {cheeses.map((cheese) => <option key={cheese} value={cheese}>{cheese}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Choose Toppings:</h2>
        <div className="grid grid-cols-2 gap-2">
          {toppings.map((topping) => (
            <label key={topping} className="flex items-center space-x-2">
              <input type="checkbox" checked={selectedPizza.toppings.includes(topping)} onChange={() => handleToppingChange(topping)} />
              <span>{topping}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-xl font-bold text-green-600 my-4">Total Price: ₹{selectedPizza.price}</div>

      <div className="flex space-x-4">
        <button onClick={handleAddToCart} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
          Add to Cart
        </button>
        <button onClick={() => navigate("/checkout")} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CustomPizza;