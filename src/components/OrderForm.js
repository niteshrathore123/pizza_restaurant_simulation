import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { placeOrder } from "../redux/orderSlice";
import "../styles/formstyle.css";

const OrderForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const [type, setType] = useState("Veg");
  const [size, setSize] = useState("Large");
  const [base, setBase] = useState("Thin");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orders.length <= 10) {
      const newOrder = {
        id: uuidv4(),
        type,
        size,
        base,
        stage: "Order Placed",
        startTime: new Date().toISOString(),
      };
      dispatch(placeOrder(newOrder));
      setType("Veg");
      setSize("Large");
      setBase("Thin");
    } else {
      alert("Cannot place order. Maximum order limit reached.");
    }
  };

  return (
    <div className="form-container">
      {" "}
      <h2>Place Your Pizza Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Size:
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Base:
            <select value={base} onChange={(e) => setBase(e.target.value)}>
              <option value="Thin">Thin</option>
              <option value="Thick">Thick</option>
            </select>
          </label>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
