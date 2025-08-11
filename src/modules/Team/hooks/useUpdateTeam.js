import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneTeamQuery,
  useUpdateTeamMutation,
} from "../../../rtk/teamApi/teamApi";

const useUpdateTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: teamData,
    isLoading: isTeamLoading,
    error: getTeamError,
  } = useGetOneTeamQuery(id);

  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();

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

  // ✅ Prefill team data
  useEffect(() => {
    if (teamData?.data) {
      const t = teamData.data;
      setFormData({
        nameAR: t.nameAR || "",
        nameEN: t.nameEN || "",
        sport: t.sport || "",
        stats: {
          wins: t.stats?.wins ?? "",
          losses: t.stats?.losses ?? "",
          draws: t.stats?.draws ?? "",
        },
      });

      if (t.photo) {
        setPreview(t.photo);
      }
    }
  }, [teamData]);

  // ✅ Handle input change
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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // ✅ Handle image upload
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
    setPreview(null);
  };

  const validate = () => {
    const newErrors = {};
    let firstEmptyFieldName = "";

    if (!thumbnail && !preview) {
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

  // ✅ Submit form
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

    if (thumbnail) {
      formDataToSend.append("photo", thumbnail);
    }

    try {
      await updateTeam({ id, data: formDataToSend }).unwrap();
      toast.success("Team updated successfully!");
      setTimeout(() => navigate("/all-team"), 2000);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update the team.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleThumbnailChange,
    removeThumbnail,
    isLoading: isTeamLoading || isUpdating,
    preview,
    thumbnail,
    errors,
    getTeamError,
  };
};

export default useUpdateTeam;
