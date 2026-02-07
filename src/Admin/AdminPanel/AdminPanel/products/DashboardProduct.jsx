import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import AddProductButton from "./AddProduct/AddProductButton";
const DashboardProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseurl = "https://rayanbackend-1.onrender.com";

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseurl}/api/products`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      if (!data.products || data.products.length === 0) {
        setProducts([]);
        setError("No products found");
        Swal.fire("No products found");
      } else {
        setProducts(data.products);
        setError(null);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${baseurl}/api/products/${productId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to delete product");

        setProducts((prev) => prev.filter((p) => p._id !== productId));
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };

  // View product
  const viewProduct = (product) => {
    Swal.fire({
      title: `<strong>Product Info</strong>`,
      html: `
        <p><strong>Name:</strong> ${product.productname || "N/A"}</p>
        <p><strong>Amount:</strong> ${product.productamount || "N/A"}</p>
        <p><strong>Price:</strong> ${product.productPrice || "N/A"}</p>
        <p><strong>Discount:</strong> ${product.discountPrice || "N/A"}</p>
        <p><strong>Stock:</strong> ${product.stock || "N/A"}</p>
        <p><strong>Type:</strong> ${product.type || "N/A"}</p>
      `,
      icon: "info",
      showCloseButton: true,
    });
  };

  // Columns (EXACTLY like users)
  const columns = [
    { field: "productname", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "productamount", headerName: "Amount", flex: 1, minWidth: 100 },
    { field: "productPrice", headerName: "Price", flex: 1, minWidth: 100 },
    { field: "discountPrice", headerName: "Discount", flex: 1, minWidth: 100 },
    { field: "stock", headerName: "Stock", flex: 1, minWidth: 100 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
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
            onClick={() => deleteProduct(params.row._id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 transition-colors flex-1 min-w-[70px] flex items-center justify-center"
            onClick={() => viewProduct(params.row)}
          >
            <FaEye />
          </button>
        </div>
      ),
    },
  ];

  // Rows
  const rows = products.map((product) => ({
    ...product,
    id: product._id,
    productname: product.productname || "N/A",
    productamount: product.productamount || "N/A",
    productPrice: product.productPrice || "N/A",
    discountPrice: product.discountPrice || "N/A",
    stock: product.stock || "N/A",
    type: product.type || "N/A",
  }));

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {loading && <p>Loading products...</p>}
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
     <div className="text-center">
 <AddProductButton/>
     </div>
     
    </div>
  );
};

export default DashboardProduct;
