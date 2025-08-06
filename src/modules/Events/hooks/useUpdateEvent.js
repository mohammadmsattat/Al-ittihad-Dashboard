import { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../rtk/eventApi/eventApi";
import { toast } from "react-toastify";

const UpdateCategoryHook = (sh, onClose, category) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const [show, setShow] = useState(false);
  const [name, setName] = useState(category?.name || "");
  const [inputErrors, setInputErrors] = useState({
    name: false,
  });

  useEffect(() => {
    if (sh) {
      setShow(true);
      setName(category?.name || "");
    } else {
      resetForm();
    }
  }, [sh, category]);

  const resetForm = () => {
    setName("");

    setInputErrors({
      name: false,
    });
    setShow(false);
  };

  const handleUpdate = async () => {
    const errors = {
      name: !name.trim(),
    };

    setInputErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    const formData = {
      name,
    };

    try {
      const res = await updateCategory({
        slug: category.slug,
        patch: formData,
      }).unwrap();
      if (res) toast.success("Category Updated successfully!");

      console.log(res);

      resetForm();
      onClose(false);
    } catch (err) {
      toast.error("Failed to update news!");

      console.error("Error updating category:", err);
    }
  };

  return {
    name,
    setName,
    inputErrors,
    show,
    handleUpdate,
    isLoading,
    resetForm,
  };
};

export default UpdateCategoryHook;
