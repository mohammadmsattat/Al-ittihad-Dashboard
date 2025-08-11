import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateTeamMutation } from "../../../rtk/teamApi/teamApi";

const useAddTeam = () => {
  const [createTeam, { isLoading, error }] = useCreateTeamMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameAR: "",
    nameEN: "",
    sport: "",
    stats: {
      wins: "",
      losses: "",
      draws: "",
    },
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["wins", "losses", "draws"].includes(name)) {
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
      setErrors((prev) => ({ ...prev, photo: false }));
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
      newErrors.photo = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Team Logo";
    }

    if (!formData.nameEN.trim()) {
      newErrors.nameEN = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Name (English)";
    }
    if (!formData.nameAR.trim()) {
      newErrors.nameAR = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Name (Arabic)";
    }

    if (!formData.sport.trim()) {
      newErrors.sport = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Sport";
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
    formDataToSend.append("sport", formData.sport);

    formDataToSend.append("stats.wins", formData.stats.wins);
    formDataToSend.append("stats.losses", formData.stats.losses);
    formDataToSend.append("stats.draws", formData.stats.draws);

    if (thumbnail) formDataToSend.append("photo", thumbnail);

    try {
      await createTeam(formDataToSend).unwrap();
      toast.success("Team Added successfully");

      setTimeout(() => {
        navigate("/all-team");
      }, 2000);
    } catch (err) {
      toast.error("Failed to Add Team!");
      console.error("فشل في إضافة الفريق:", err);
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
  };
};

export default useAddTeam;
