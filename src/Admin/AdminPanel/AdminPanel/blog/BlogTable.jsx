import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import AddBlogButton from "./AddBlog/AddBlogButton";
const AdminBlogs = () => {
  const baseUrl = "https://rayanbackend-1.onrender.com";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/blog`);
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const data = await response.json();
      if (!data.blogs || data.blogs.length === 0) {
        setBlogs([]);
        setError("No blogs found");
        Swal.fire("No blogs found");
      } else {
        setBlogs(data.blogs);
        setError(null);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog with confirmation
  const deleteBlog = async (blogId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${baseUrl}/api/blog/${blogId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to delete blog");

        setBlogs((prev) => prev.filter((b) => b._id !== blogId));
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };

  // View blog details
  const viewBlog = (blog) => {
    Swal.fire({
      title: `<strong>Blog Info</strong>`,
      html: `
        <p><strong>Title:</strong> ${blog.blogTitle.en || blog.blogTitle}</p>
        <p><strong>Status:</strong> Published</p>
        <p><strong>Content:</strong> ${blog.blogInfo.en || blog.blogInfo}</p>
        <p><strong>ID:</strong> ${blog._id}</p>
      `,
      icon: "info",
      showCloseButton: true,
    });
  };

  // DataGrid columns
  const columns = [
    { field: "blogTitle", headerName: "Title", flex: 2, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
    { field: "_id", headerName: "ID", flex: 1.5, minWidth: 150 },
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
            onClick={() => deleteBlog(params.row._id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 transition-colors flex-1 min-w-[70px] flex items-center justify-center"
            onClick={() => viewBlog(params.row)}
          >
            <FaEye />
          </button>
        </div>
      ),
    },
  ];

  // Map blogs to DataGrid rows
  const rows = blogs.map((blog) => ({
    ...blog,
    id: blog._id,
    blogTitle: blog.blogTitle.en || blog.blogTitle,
    status: "Published",
  }));

  return (
    <div className="p-4 max-w-full overflow-x-auto">
        <AddBlogButton/>
      <h2 className="text-2xl font-bold mb-4">Admin Blogs</h2>

      {loading && <p>Loading blogs...</p>}
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

export default AdminBlogs;
