import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateMembershipMutation } from "../../../rtk/membershipApi/membershipApi";

const useAddMembership = () => {
  const [createMembership, { isLoading, error }] = useCreateMembershipMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    benefits: "",
    price: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.type.trim()) newErrors.type = true;
    if (!formData.benefits.trim()) newErrors.benefits = true;
    if (!formData.price || isNaN(formData.price)) newErrors.price = true;
    if (!formData.duration.trim()) newErrors.duration = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createMembership(formData).unwrap();
      toast.success("تم حفظ العضوية بنجاح");

      setTimeout(() => {
        navigate("/all-membership"); 
      }, 2000);
    } catch (err) {
      toast.error("فشل في إضافة العضوية!");
      console.error("فشل في إضافة العضوية:", err);
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

export default useAddMembership;
