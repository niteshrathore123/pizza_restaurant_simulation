import { Provider } from "react-redux";
import store from "./redux/store";
import OrderForm from "./components/OrderForm";
import MainDisplay from "./components/MainDisplay";
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1 style={{ textAlign: "center" }}>Pizza Restaurant</h1>
        <OrderForm />
        <MainDisplay />
      </div>
    </Provider>
  );
};

export default App;
