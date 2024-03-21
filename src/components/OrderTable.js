import { useDispatch } from "react-redux";
import { cancelOrder } from "../redux/orderSlice";
import "../styles/ordertable.css";

const OrderTable = ({ orders, totalOrders }) => {
  const dispatch = useDispatch();

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  // Sort orders based on total time spent in ascending order
  const sortedOrders = orders.slice().sort((a, b) => {
    if (!a.totalTime || !b.totalTime) return 0;
    const totalTimeA = a.totalTime.minutes * 60 + a.totalTime.seconds;
    const totalTimeB = b.totalTime.minutes * 60 + b.totalTime.seconds;
    return totalTimeA - totalTimeB;
  });

  return (
    <div>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Stage</th>
            <th>Total time spent (time from order placed)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              {order.totalTime ? (
                <td>
                  {order.totalTime?.minutes} min {order.totalTime?.seconds} sec
                </td>
              ) : (
                <td></td>
              )}

              <td>
                {(order.stage === "Order Placed" ||
                  order.stage === "Order in Making") && (
                  <button onClick={() => handleCancelOrder(order.id)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="1">Total Order Delivered:</td>
            <td>{totalOrders}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderTable;
