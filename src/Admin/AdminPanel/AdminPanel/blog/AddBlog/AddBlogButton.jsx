import React, { useState } from "react";
import AddBlogModal from "./AddBlogModal";

const AddBlogButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg flex "
      >
        Add Blog
      </button>

      {open && <AddBlogModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default AddBlogButton;
