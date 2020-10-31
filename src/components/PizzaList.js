import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PizzaList.scss";

const selectUser = (reduxState) => {
  return reduxState.user;
};

const selectPizzas = (reduxState) => {
  return reduxState.pizzas.sort((a, b) => b.bought - a.bought);
};

export default function PizzaList() {
  const user = useSelector(selectUser);
  const pizzas = useSelector(selectPizzas);
  const dispatch = useDispatch();

  return (
    <div id="pizzaList">
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <p>total number of known pizzas: {pizzas.length}</p>
      <div id="pizzaContainer">
        {pizzas.map((pizza) => {
          return (
            <div className="pizzaCard" key={pizza.id}>
              <div className="favorite">
                <button
                  onClick={() => {
                    dispatch({
                      type: "TOGGLE_FAVORITE_PIZZA",
                      payload: pizza.id,
                    });
                  }}
                >
                  {user.favorites.includes(pizza.id) ? "♥" : "♡"}
                </button>
              </div>
              <div className="pizzaText">
                <p>
                  <strong>{pizza.name}:</strong>
                  <br></br>
                  {pizza.description} <i>Bought {pizza.bought} times.</i>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
