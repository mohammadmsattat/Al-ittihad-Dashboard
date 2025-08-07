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
  } = useGetAllTeamQuery();
  console.log(TeamData);

  const [addTeamMember, { isLoading, error }] = useCreateTeamMemberMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    position: "",
    number: "",
    team: "",
    ageGroup: "",
    bio: "",
    photo: "",
    stats: {
      appearances: "",
      goals: "",
      assists: "",
      yellowCards: "",
      redCards: "",
    },
    experience: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.content.trim()) newErrors.content = true;
    if (!formData.categoryId) newErrors.categoryId = true;
    if (!thumbnail) newErrors.thumbnail = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("categoryId", formData.categoryId);
    formDataToSend.append("authorId", "6875fb71ea315e2b4016348f");
    formData.tags.forEach((tag) => formDataToSend.append("tags", tag));
    formDataToSend.append("favorite", formData.favorite);

    if (thumbnail) formDataToSend.append("thumbnail", thumbnail);
    images.forEach((image) => formDataToSend.append("images", image));

    if (videoFile) formDataToSend.append("video", videoFile);

    formDataToSend.append("isVideo", formData.isVideo); // true / false
    if (formData.isVideo && formData.videoUrl) {
      formDataToSend.append("video", formData.videoUrl);
    }
    try {
      const res = await addTeamMember(formDataToSend).unwrap();
      toast.success("team Member saved successfully");
      setTimeout(() => {
        navigate("/all-news");
      }, 2000);
    } catch (err) {
      toast.error("Failed to Add team Member!");

      console.error("Failed to add news:", err);
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
