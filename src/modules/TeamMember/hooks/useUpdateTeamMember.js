import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneTeamMemberQuery,
  useUpdateTeamMemberMutation,
} from "../../../rtk/teamMemberApi/teamMemberApi";
import { useGetAllTeamQuery } from "../../../rtk/teamApi/teamApi";

export const useUpdateTeamMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Get existing team member data by ID
  const {
    data: memberData,
    isLoading: isMemberLoading,
    error: getError,
  } = useGetOneTeamMemberQuery(id);

  // ✅ Get all teams for the dropdown list
  const {
    data: TeamData,
    isLoading: isTeamLoading,
    error: getTeamError,
  } = useGetAllTeamQuery();

  const [updateTeamMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation();

  // ✅ Form state
  const [formData, setFormData] = useState({
    nameAR: "",
    nameEN: "",
    role: "",
    position: "",
    number: "",
    team: "",
    ageGroup: "",
    bioAR: "",
    bioEN: "",
    experience: "",
    stats: {
      appearances: "",
      goals: "",
      assists: "",
      yellowCards: "",
      redCards: "",
    },
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // ✅ Pre-fill form with existing data
  useEffect(() => {
    if (memberData?.data) {
      const m = memberData.data;
      setFormData({
        nameAR: m.nameAR || "",
        nameEN: m.nameEN || "",
        role: m.role || "",
        position: m.position || "",
        number: m.number || "",
        team: m.team?._id || "",
        ageGroup: m.ageGroup || "",
        bioAR: m.bioAR || "",
        bioEN: m.bioEN || "",
        experience: m.experience || "",
        stats: {
          appearances: m.stats?.appearances || "",
          goals: m.stats?.goals || "",
          assists: m.stats?.assists || "",
          yellowCards: m.stats?.yellowCards || "",
          redCards: m.stats?.redCards || "",
        },
      });

      if (m.photo) {
        setPreview(m.photo);
      }
    }
  }, [memberData]);

  // ✅ Input field handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.stats) {
      setFormData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // ✅ Handle photo upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, thumbnail: false }));
    }
  };

  // ✅ Remove uploaded photo
  const removeThumbnail = () => {
    setThumbnail(null);
    setPreview(null);
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.nameAR.trim()) newErrors.nameAR = true;
    if (!formData.nameEN.trim()) newErrors.nameEN = true;
    if (!formData.team) newErrors.team = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("nameAR", formData.nameAR);
    formDataToSend.append("nameEN", formData.nameEN);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("team", formData.team);
    formDataToSend.append("ageGroup", formData.ageGroup);
    formDataToSend.append("bioAR", formData.bioAR);
    formDataToSend.append("bioEN", formData.bioEN);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("stats.appearances", formData.stats.appearances);
    formDataToSend.append("stats.goals", formData.stats.goals);
    formDataToSend.append("stats.assists", formData.stats.assists);
    formDataToSend.append("stats.yellowCards", formData.stats.yellowCards);
    formDataToSend.append("stats.redCards", formData.stats.redCards);

    if (thumbnail) {
      formDataToSend.append("photo", thumbnail);
    }
console.log(formData.nameEN);

    try {
      await updateTeamMember({ id, data: formDataToSend }).unwrap();
      toast.success("تم تحديث عضو الفريق بنجاح");
      setTimeout(() => navigate("/all-teamMember"), 2000);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("فشل في تحديث عضو الفريق!");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleThumbnailChange,
    removeThumbnail,
    isLoading: isMemberLoading || isTeamLoading || isUpdating,
    preview,
    thumbnail,
    errors,
    TeamData,
    getError,
    getTeamError,
  };
};
