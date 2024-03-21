import React from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import OrderTable from "./OrderTable";
import "../styles/maindisplay.css";

const MainDisplay = () => {
  const orders = useSelector((state) => state.orders.orders);
  const orderPicked = orders.filter((order) => order.stage === "Order Picked");

  return (
    <div>
      <h2>Pizza Stages Section</h2>
      <div className="kanban-board">
        <div className="kanban-column">
          <h3>Order Placed</h3>
          {orders
            .filter((order) => order.stage === "Order Placed")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
        <div className="kanban-column">
          <h3>Order in Making</h3>
          {orders
            .filter((order) => order.stage === "Order in Making")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
        <div className="kanban-column">
          <h3>Order Ready</h3>
          {orders
            .filter((order) => order.stage === "Order Ready")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
        <div className="kanban-column">
          <h3>Order Picked</h3>
          {orders
            .filter((order) => order.stage === "Order Picked")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
      </div>

      <h2>Main Section</h2>
      <OrderTable orders={orders} totalOrders={orderPicked.length} />
    </div>
  );
};

export default MainDisplay;
