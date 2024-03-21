import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../redux/orderSlice";
import "../styles/ordercard.css";

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const [elapsedTime, setElapsedTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    let intervalId;

    const calculateElapsedTime = () => {
      const startTime = new Date(order.startTime);
      const currentTime = new Date();
      const timeDifference = currentTime - startTime;
      const elapsedTimeInSeconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(elapsedTimeInSeconds / 60);
      const seconds = elapsedTimeInSeconds % 60;
      setElapsedTime({ minutes, seconds });
    };

    calculateElapsedTime();

    if (order.stage !== "Order Picked") {
      intervalId = setInterval(calculateElapsedTime, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [order.stage, order.startTime]);

  const handleNextStage = () => {
    let nextStage;
    switch (order.stage) {
      case "Order Placed":
        nextStage = "Order in Making";
        break;
      case "Order in Making":
        nextStage = "Order Ready";
        break;
      case "Order Ready":
        nextStage = "Order Picked";
        break;
      default:
        return;
    }
    dispatch(updateOrder({ id: order.id, stage: nextStage }));
  };

  const isOverdue =
    elapsedTime.minutes > 0 ||
    (elapsedTime.seconds > 20 &&
      order.stage !== "Order Picked" &&
      order.stage !== "Order Ready");

  return (
    <div className={isOverdue ? "order-card overdue" : "order-card"}>
      <p>Order ID: {order.id}</p>
      <p>Type: {order.type}</p>
      <p>Size: {order.size}</p>
      <p>Base: {order.base}</p>
      <p>Stage: {order.stage}</p>
      {order.stage === "Order Picked" && (
        <p>
          Total Time: {elapsedTime.minutes} minutes {elapsedTime.seconds}{" "}
          seconds
        </p>
      )}
      {!order.totalTime && (
        <p>
          Time Spent: {elapsedTime.minutes} minutes {elapsedTime.seconds}{" "}
          seconds
        </p>
      )}
      <button
        onClick={handleNextStage}
        disabled={order.stage === "Order Picked"}
      >
        Next
      </button>
    </div>
  );
};

export default OrderCard;
