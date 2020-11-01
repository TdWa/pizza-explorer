import React, { useState, useEffect } from "react";
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
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const allIngredients = {};
    pizzas.forEach((pizza) => {
      pizza.ingredients?.forEach((ingredient) => {
        allIngredients[ingredient] = false;
      });
    });
    setFavorites(allIngredients);
  }, [pizzas]);

  return (
    <div id="pizzaList">
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <p>total number of known pizzas: {pizzas.length}</p>
      <div id="pizzaContainer">
        {favorites &&
          pizzas
            .filter((pizza) => {
              let include = true;
              Object.keys(favorites).forEach((ingredient) => {
                if (favorites[ingredient] === true) {
                  if (
                    !pizza.ingredients ||
                    !pizza.ingredients.includes(ingredient)
                  ) {
                    include = false;
                    return;
                  }
                }
              });
              return include;
            })
            .map((pizza) => {
              return (
                <div className="pizzaCard" key={pizza.id}>
                  {pizza.url && <img src={pizza.url} alt={pizza.name}></img>}
                  <div className="favorite">
                    <button
                      className={
                        user.favorites.includes(pizza.id) ? "fav" : "noFav"
                      }
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
                      <br></br>
                      <br></br>
                      {pizza.ingredients && pizza.ingredients.join(", ")}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
      <h2>Filter by ingrendients:</h2>
      {favorites &&
        Object.keys(favorites).map((ingredient) => {
          return (
            <button
              key={ingredient}
              className={favorites[ingredient] ? "on" : "off"}
              onClick={() => {
                const allIngredientsCopy = {
                  ...favorites,
                };
                allIngredientsCopy[ingredient] = !favorites[ingredient];
                setFavorites(allIngredientsCopy);
              }}
            >
              {ingredient}
            </button>
          );
        })}
    </div>
  );
}
