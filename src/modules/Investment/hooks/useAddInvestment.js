import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateInvestmentMutation } from "../../../rtk/investmentApi/invesmetntApi";

const useAddInvestment = () => {
  const navigate = useNavigate();
  const [createInvestment, { isLoading, error }] =
    useCreateInvestmentMutation();

  const [formData, setFormData] = useState({
    titleAR: "",
    titleEN: "",
    descriptionAR: "",
    descriptionEN: "",
    deadline: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    let firstEmptyFieldName = "";

    if (!formData.titleEN.trim()) {
      newErrors.titleEN = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "title (English)";
    }
    if (!formData.titleAR.trim()) {
      newErrors.titleAR = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "title (Arabic)";
    }

    if (!formData.deadline.trim()) {
      newErrors.deadline = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "deadline";
    }
    if (!formData.status.trim()) {
      newErrors.status = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "status";
    }

    if (!formData.descriptionEN.trim()) {
      newErrors.descriptionEN = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Description (English)";
    }
    if (!formData.descriptionAR.trim()) {
      newErrors.descriptionAR = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Description (Arabic)";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(`Please fill the field: ${firstEmptyFieldName}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createInvestment(formData).unwrap();
      toast.success("Investment Added Successfully!");
      setTimeout(() => {
        navigate("/all-investment");
      }, 2000);
    } catch (err) {
      toast.error("Failed To Add Investment!");
      console.error("فشل في إضافة الاستثمار:", err);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
    errors,
  };
};

export default useAddInvestment;
