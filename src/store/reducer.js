const initialState = {
  user: {
    name: "Helva",
    favorites: [67283, 357311],
  },
  pizzas: [
    {
      id: 161235,
      name: "Pizza Margherita",
      description:
        "The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.",
      bought: 5,
      ingredients: ["tomatoes", "mozzarella", "basil", "oil"],
      url:
        "https://kookidee.nl/wp-content/uploads/2018/11/pizza-margherita.jpg",
    },
    {
      id: 67283,
      name: "Pizza Napoletana",
      description:
        "Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",
      bought: 2,
      ingredients: ["tomatoes", "mozzarella", "oil"],
      url:
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    },
    {
      id: 357311,
      name: "Pizza Bianca",
      description:
        "White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.",
      bought: 10,
      ingredients: ["ricotta", "mozzarella", "garlic"],
      url:
        "https://img.static-rmg.be/a/food/image/q75/w640/h400/1087722/pizza-bianca-met-artisjok-en-mortadella.jpg",
    },
  ],
  darkMode: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_DARK_MODE": {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }
    case "TOGGLE_FAVORITE_PIZZA": {
      return {
        ...state,
        user: {
          ...state.user,
          favorites: state.user.favorites.includes(action.payload)
            ? state.user.favorites.filter((id) => id !== action.payload)
            : [...state.user.favorites, action.payload],
        },
      };
    }
    case "ADD_PIZZA": {
      return {
        ...state,
        pizzas: [
          ...state.pizzas,
          {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            bought: 0,
          },
        ],
      };
    }
    default: {
      return state;
    }
  }
}
