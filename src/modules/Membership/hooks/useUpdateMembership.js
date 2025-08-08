import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneMembershipQuery,
  useUpdateMembershipMutation,
} from "../../../rtk/membershipApi/membershipApi";

const useUpdateMembership = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const {
    data: membershipData,
    isLoading: isMembershipLoading,
    error: getMembershipError,
  } = useGetOneMembershipQuery(id);


  const [updateMembership, { isLoading: isUpdating }] =
    useUpdateMembershipMutation();

 
  const [formData, setFormData] = useState({
    type: "",
    benefits: "",
    price: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (membershipData?.data) {
      const m = membershipData.data;
      setFormData({
        type: m.type || "",
        benefits: m.benefits || "",
        price: m.price || "",
        duration: m.duration || "",
      });
    }
  }, [membershipData]);

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
    if (!formData.type.trim()) newErrors.type = true;
    if (!formData.benefits.trim()) newErrors.benefits = true;
    if (!formData.price) newErrors.price = true;
    if (!formData.duration.trim()) newErrors.duration = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updateMembership({ id, data: formData }).unwrap();
      toast.success("Membership updated successfully!");
      setTimeout(() => navigate("/all-membership"), 2000);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update membership.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: isMembershipLoading || isUpdating,
    errors,
    getMembershipError,
  };
};

export default useUpdateMembership;
