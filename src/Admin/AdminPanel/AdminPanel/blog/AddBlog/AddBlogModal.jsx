import React from "react";
import BlogForm from "./BlogForm";
import Swal from "sweetalert2";

const AddBlogModal = ({ onClose }) => {
  const baseUrl = "http://localhost:5000";

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(`${baseUrl}/api/blog`, {
        method: "POST",
        body: formData,
      });

     

      Swal.fire("Success", "Blog added successfully", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Blog</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <BlogForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddBlogModal;
