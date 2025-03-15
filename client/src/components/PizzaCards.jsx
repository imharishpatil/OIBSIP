import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const PizzaCards = ({ pizzas }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCustomize = (pizza) => {
    navigate(`/customize/${pizza.id}`, { state: { pizza } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
          <img src={pizza.image} alt={pizza.name} className="w-full h-40 object-cover rounded-md mb-3" />
          <h3 className="text-lg font-semibold dark:text-white">{pizza.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{pizza.description}</p>
          <p className="font-bold text-green-600 mt-2">₹{pizza.price}</p>
          
          <div className="flex justify-between mt-4">
            <button
              onClick={() => dispatch(addToCart(pizza))}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleCustomize(pizza)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Customize
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PizzaCards;