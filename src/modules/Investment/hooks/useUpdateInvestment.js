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
      await updateInvestment({ id, data: formData }).unwrap();
      toast.success("Investment Updated Successfully!");
      setTimeout(() => navigate("/all-investment"), 2000);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed To Update Investment!");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: isInvestmentLoading,
    errors,
    getInvestmentError,
  };
};

export default useUpdateInvestment;
