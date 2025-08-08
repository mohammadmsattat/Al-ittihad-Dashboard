import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneInvestmentQuery,
  useUpdateInvestmentMutation,
} from "../../../rtk/investmentApi/invesmetntApi";

const useUpdateInvestment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: investmentData,
    isLoading: isInvestmentLoading,
    error: getInvestmentError,
  } = useGetOneInvestmentQuery(id);

  const [updateInvestment, { isLoading: isUpdating }] =
    useUpdateInvestmentMutation();

  const [formData, setFormData] = useState({
    titleAR: "",
    titleEN: "",
    descriptionAR: "",
    descriptionEN: "",
    deadline: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (investmentData?.data) {
      const inv = investmentData.data;
      setFormData({
        titleAR: inv.titleAR || "",
        titleEN: inv.titleEN || "",
        descriptionAR: inv.descriptionAR || "",
        descriptionEN: inv.descriptionEN || "",
        deadline: inv.deadline ? inv.deadline.split("T")[0] : "", // للتأكد من صيغة التاريخ
        status: inv.status || "",
      });
    }
  }, [investmentData]);

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
    if (!formData.titleAR.trim()) newErrors.titleAR = true;
    if (!formData.titleEN.trim()) newErrors.titleEN = true;
    if (!formData.descriptionAR.trim()) newErrors.descriptionAR = true;
    if (!formData.descriptionEN.trim()) newErrors.descriptionEN = true;
    if (!formData.deadline) newErrors.deadline = true;
    if (!formData.status.trim()) newErrors.status = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updateInvestment({ id, data: formData }).unwrap();
      toast.success("تم تحديث الاستثمار بنجاح!");
      setTimeout(() => navigate("/all-investment"), 2000);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("فشل في تحديث الاستثمار.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: isInvestmentLoading || isUpdating,
    errors,
    getInvestmentError,
  };
};

export default useUpdateInvestment;
