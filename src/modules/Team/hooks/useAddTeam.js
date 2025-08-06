import { useEffect, useState } from "react";
import { useCreateAuthorMutation } from "../../../rtk/teamApi/teamApi";
import { toast } from "react-toastify";

const AddAuthorHook = (sh, onClose) => {
  const [createAuthor, { isLoading }] = useCreateAuthorMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("author");

  const [inputErrors, setInputErrors] = useState({
    name: false,
    email: false,
    role: false,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sh) {
      setShow(true);
    } else {
      resetForm();
    }
  }, [sh]);

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

  const handleSave = async () => {
    console.log("handleSave called with:", { name, email, role });

    const errors = {
      name: !name.trim(),
      email: !email.trim(),
      role: !role.trim(),
    };

    setInputErrors(errors);
    if (Object.values(errors).some(Boolean)) {
      console.log("Validation errors:", errors);
      return;
    }

    const formData = { name, email, role };
    console.log("Submitting form data:", formData);

    try {
      const res = await createAuthor(formData).unwrap();
      if (res) toast.success("Author Saved successfully!");

      console.log("Author created successfully");
      resetForm();
      onClose(false);
    } catch (err) {
      if (err.status === 403)
        toast.error("you have no access for this Validity");

      console.error("Error adding author:", err);
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
    resetForm,
    handleSave,
    isLoading,
  };
};

export default AddAuthorHook;
