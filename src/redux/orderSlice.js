import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const { id, stage } = action.payload;
      const orderIndex = state.orders.findIndex((order) => order.id === id);
      if (orderIndex !== -1) {
        if (stage === "Order Picked") {
          const currentTime = new Date();
          const startTime = new Date(state.orders[orderIndex].startTime);
          const timeDifference = currentTime - startTime;
          const totalMinutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes
          const totalSeconds = Math.floor((timeDifference % 60000) / 1000); // Convert remaining milliseconds to seconds
          state.orders[orderIndex] = {
            ...state.orders[orderIndex],
            stage: stage,
            totalTime: { minutes: totalMinutes, seconds: totalSeconds },
          };
        } else {
          state.orders[orderIndex] = {
            ...state.orders[orderIndex],
            stage: stage,
          };
        }
      }
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
  },
});

export const { placeOrder, updateOrder, cancelOrder } = orderSlice.actions;

export default orderSlice.reducer;
