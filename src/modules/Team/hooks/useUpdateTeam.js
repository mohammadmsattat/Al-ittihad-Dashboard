import { useEffect, useState } from "react";
import { useUpdateAuthorMutation } from "../../../rtk/teamApi/teamApi";
import { toast } from "react-toastify";

const UpdateAuthorHook = (sh, onClose, author) => {
  const [updateAuthor, { isLoading }] = useUpdateAuthorMutation();

  const [name, setName] = useState(author?.name || "");
  const [email, setEmail] = useState(author?.email || "");
  const [role, setRole] = useState(author?.role || "author");

  const [inputErrors, setInputErrors] = useState({
    name: false,
    email: false,
    role: false,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sh) {
      setShow(true);
      setName(author?.name || "");
      setEmail(author?.email || "");
      setRole(author?.role || "author");
    } else {
      resetForm();
    }
  }, [sh, author]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("author");
    setInputErrors({
      name: false,
      email: false,
      role: false,
    });
    setShow(false);
  };

  const handleUpdate = async () => {
    const errors = {
      name: !name.trim(),
      email: !email.trim(),
      role: !role.trim(),
    };

    setInputErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    const formData = {
      name,
      email,
      role,
    };

    try {
      const res = await updateAuthor({
        id: author._id,
        patch: formData,
      }).unwrap();
      if (res) toast.success("Author Updated successfully!");

      resetForm();
      onClose(false);
    } catch (err) {
      if (err.status === 403)
        toast.error("You Have No Access For This Vlidity");
      console.error("Error updating author:", err);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    inputErrors,
    show,
    handleUpdate,
    isLoading,
    resetForm,
  };
};

export default UpdateAuthorHook;
