import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateTeamMemberMutation } from "../../../rtk/teamMemberApi/teamMemberApi";
import { useGetAllTeamQuery } from "../../../rtk/teamApi/teamApi";

export const useAddTeamMember = () => {
  const {
    data: TeamData,
    isLoading: getTeamLoading,
    error: getTeamError,
  } = useGetAllTeamQuery("limit=1000");

  const [addTeamMember, { isLoading, error }] = useCreateTeamMemberMutation();
  const navigate = useNavigate();

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
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, thumbnail: false }));
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  const validate = () => {
    const newErrors = {};
    let firstEmptyFieldName = "";

    if (!thumbnail) {
      newErrors.thumbnail = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Profile Photo";
    }

    if (!formData.nameEN.trim()) {
      newErrors.nameEN = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Name (English)";
    }

    if (!formData.nameAR.trim()) {
      newErrors.nameAR = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Name (Arabic)";
    }

    if (!formData.team) {
      newErrors.team = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Team";
    }

    if (!formData.role.trim()) {
      newErrors.role = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Role";
    }

    if (!formData.position.trim()) {
      newErrors.position = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Position";
    }

    if (!formData.number.toString().trim()) {
      newErrors.number = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Number";
    }

    if (!formData.ageGroup.trim()) {
      newErrors.ageGroup = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Age Group";
    }

    if (!formData.bioEN.trim()) {
      newErrors.bioEN = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Bio (English)";
    }

    if (!formData.bioAR.trim()) {
      newErrors.bioAR = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Bio (Arabic)";
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
    formDataToSend.append("stats.appearances", formData.stats.appearances);
    formDataToSend.append("stats.goals", formData.stats.goals);
    formDataToSend.append("stats.assists", formData.stats.assists);
    formDataToSend.append("stats.yellowCards", formData.stats.yellowCards);
    formDataToSend.append("stats.redCards", formData.stats.redCards);

    if (thumbnail) formDataToSend.append("photo", thumbnail);

    try {
      await addTeamMember(formDataToSend).unwrap();
      toast.success("Team Member Added successfully");

      setTimeout(() => {
        navigate("/all-teamMember");
      }, 2000);
    } catch (err) {
      toast.error("Failed to Add Team Membeer!");
      console.error("فشل في الإضافة:", err);
    }
  };

  return {
    formData,
    handleChange,
    preview,
    handleThumbnailChange,
    removeThumbnail,
    handleSubmit,
    isLoading,
    error,
    errors,
    TeamData,
    getTeamLoading,
    getTeamError,
  };
};
