import React, { useState } from "react";
import AddProductModal from "./AddProductModal";

const AddProductButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg"
      >
        Add Product
      </button>

      { open&& <AddProductModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default AddProductButton;
