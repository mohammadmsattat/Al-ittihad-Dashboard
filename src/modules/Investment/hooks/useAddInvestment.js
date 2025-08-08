import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateInvestmentMutation } from "../../../rtk/investmentApi/invesmetntApi";

const useAddInvestment = () => {
  const navigate = useNavigate();
  const [createInvestment, { isLoading, error }] = useCreateInvestmentMutation();

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

  // ✅ التحقق من صحة البيانات
  const validate = () => {
    const newErrors = {};
    if (!formData.titleAR.trim()) newErrors.titleAR = true;
    if (!formData.titleEN.trim()) newErrors.titleEN = true;
    if (!formData.descriptionAR.trim()) newErrors.descriptionAR = true;
    if (!formData.descriptionEN.trim()) newErrors.descriptionEN = true;
    if (!formData.deadline) newErrors.deadline = true;
    if (!formData.status.trim()) newErrors.status = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ إرسال البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createInvestment(formData).unwrap();
      toast.success("تم إضافة الاستثمار بنجاح");
      setTimeout(() => {
        navigate("/all-investment");
      }, 2000);
    } catch (err) {
      toast.error("فشل في إضافة الاستثمار!");
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
