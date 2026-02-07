import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseurl = "https://rayanbackend-1.onrender.com";

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseurl}/api/auth/users`);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      if (!data.users || data.users.length === 0) {
        setUsers([]);
        setError("No users found");
        Swal.fire("No users found");
      } else {
        setUsers(data.users);
        setError(null);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user with confirmation
  const deleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${baseurl}/api/auth/users/${userId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to delete user");

        setUsers((prev) => prev.filter((u) => u._id !== userId));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };

  // View user details
  const viewUser = (user) => {
    Swal.fire({
      title: `<strong>User Info</strong>`,
      html: `
        <p><strong>Username:</strong> ${user.username || "N/A"}</p>
        <p><strong>Email:</strong> ${user.email || "N/A"}</p>
        <p><strong>Role:</strong> ${user.role || "N/A"}</p>
        <p><strong>Address:</strong> ${user.address || "N/A"}</p>
        <p><strong>Cart:</strong> ${user.cart || "N/A"}</p>
      `,
      icon: "info",
      showCloseButton: true,
    });
  };

  // DataGrid columns with flex for responsiveness
  const columns = [
    { field: "username", headerName: "Username", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 150 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 100 },
    { field: "cart", headerName: "Cart", flex: 1, minWidth: 100 },
    { field: "address", headerName: "Address", flex: 1.5, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2 flex-wrap">
          <button
            className="bg-black text-white px-2 py-1 rounded hover:bg-red-700 transition-colors flex-1 min-w-[70px]"
            onClick={() => deleteUser(params.row._id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 transition-colors flex-1 min-w-[70px] flex items-center justify-center"
            onClick={() => viewUser(params.row)}
          >
            <FaEye />
          </button>
        </div>
      ),
    },
  ];

  // Map users to DataGrid rows
  const rows = users.map((user) => ({
    ...user,
    id: user._id,
    username: user.username || "N/A",
    email: user.email || "N/A",
    role: user.role || "N/A",
    cart: user.cart || "N/A",
    address: user.address || "N/A",
  }));

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Users</h2>

      {loading && <p>Loading users...</p>}
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
          className="min-w-[600px]" // ensures horizontal scroll on small screens
        />
      </div>
    </div>
  );
};

export default AdminUsers;
