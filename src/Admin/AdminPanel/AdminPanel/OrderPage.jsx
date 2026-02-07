import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const baseUrl = "https://rayanbackend-1.onrender.com";

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/orders`);
      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      if (!data.orders || data.orders.length === 0) {
        setOrders([]);
        setError("No orders found");
      } else {
        setOrders(data.orders);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Cancel order with confirmation
  const cancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Cancel Order",
    });

    if (!result.isConfirmed) return;

    try {
      setCancellingOrderId(orderId);

      const response = await fetch(`${baseUrl}/api/orders/${orderId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || "Failed to cancel order");

      // Update order locally
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, isCancelled: true } : o
        )
      );

      Swal.fire("Cancelled!", "Order has been cancelled.", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setCancellingOrderId(null);
    }
  };

  // View order details
  const viewOrder = (order) => {
    const productsHtml = order.purchasedProducts
      .map(
        (p) =>
          `<p><strong>${p.productname}</strong> — Quantity: ${p.quantity}, Price: $${p.price}</p>`
      )
      .join("");

    Swal.fire({
      title: `<strong>Order Info</strong>`,
      html: `
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Status:</strong> ${order.isCancelled ? "Cancelled" : "Active"}</p>
        <hr/>
        <h4>Products:</h4>
        ${productsHtml || "<p>No products found</p>"}
      `,
      icon: "info",
      showCloseButton: true,
    });
  };

  // Columns
  const columns = [
    { field: "_id", headerName: "Order ID", flex: 1, minWidth: 150 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 120 },
    { field: "address", headerName: "Address", flex: 1.5, minWidth: 150 },
    {
      field: "isCancelled",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      valueGetter: (params) => (params.row?.isCancelled ? "Cancelled" : "Active"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2 flex-wrap">
          <button
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 transition-colors flex-1 min-w-[80px]"
            disabled={params.row.isCancelled || cancellingOrderId === params.row._id}
            onClick={() => cancelOrder(params.row._id)}
          >
            {cancellingOrderId === params.row._id
              ? "Cancelling..."
              : params.row.isCancelled
              ? "Cancelled"
              : "Cancel Order"}
          </button>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 transition-colors flex-1 min-w-[80px]"
            onClick={() => viewOrder(params.row)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  // Rows
  const rows = orders.map((order) => ({
    ...order,
    id: order._id,
    isCancelled: order.isCancelled || false,
  }));

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="w-full" style={{ minHeight: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
          disableSelectionOnClick
          autoHeight
          className="min-w-[600px]"
        />
      </div>
    </div>
  );
};

export default OrdersPage;
