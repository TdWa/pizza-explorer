import PizzaList from "./components/PizzaList";
import AddPizzaForm from "./components/AddPizzaForm";
import "./main.scss";
import { useSelector, useDispatch } from "react-redux";

const selectMode = (reduxState) => {
  return reduxState.darkMode;
};

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectMode);

  return (
    <div id="app" className={darkMode ? "dark" : "light"}>
      <button onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}>
        Dark/Light Mode
      </button>
      <PizzaList />
      <AddPizzaForm />
    </div>
  );
}

export default App;
