import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateMatchMutation } from "../../../rtk/matchApi/matchApi";
import { useGetAllTeamQuery } from "../../../rtk/teamApi/teamApi";

export const useAddMatch = () => {
  const [addMatch, { isLoading, error }] = useCreateMatchMutation();
  const {
    data: TeamData,
    isLoading: getTeamLoading,
    error: getTeamError,
  } = useGetAllTeamQuery("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    locationAR: "",
    locationEN: "",
    homeTeam: "",
    awayTeam: "",
    homeScore: "",
    awayScore: "",
    videoUrl: "",
    date: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
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

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const uniqueFiles = newFiles.filter(
      (file) => !images.some((f) => f.name === file.name)
    );
    setImages((prev) => [...prev, ...uniqueFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    let firstField = "";

    const requiredFields = [
      "locationAR",
      "locationEN",
      "homeTeam",
      "awayTeam",
      "homeScore",
      "awayScore",
      "date",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = true;
        if (!firstField) firstField = field;
      }
    });

    if (!thumbnail) {
      newErrors.thumbnail = true;
      if (!firstField) firstField = "thumbnail";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(`Please fill the field: ${firstField}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();

    formDataToSend.append("locationAR", formData.locationAR);
    formDataToSend.append("locationEN", formData.locationEN);
    formDataToSend.append("homeTeam", formData.homeTeam);
    formDataToSend.append("awayTeam", formData.awayTeam);
    formDataToSend.append("result[homeScore]", formData.homeScore);
    formDataToSend.append("result[awayScore]", formData.awayScore);
    formDataToSend.append("date", formData.date);

    if (formData.videoUrl) {
      formDataToSend.append("videos", formData.videoUrl);
    }

    if (thumbnail) formDataToSend.append("photo", thumbnail);;
    
    

    images.forEach((img) => formDataToSend.append("images", img));

    try {
      const res = await addMatch(formDataToSend).unwrap();
      toast.success("Match added successfully!");
      setTimeout(() => {
        navigate("/all-matches");
      }, 1500);
    } catch (err) {
        console.log(err);
        
      toast.error("Failed to add match!");
      console.error(err);
    }
  };

  return {
    formData,
    handleChange,
    preview,
    thumbnail,
    handleThumbnailChange,
    removeThumbnail,
    images,
    handleImagesChange,
    removeImage,
    handleSubmit,
    isLoading,
    error,
    errors,
    TeamData,
    getTeamLoading,
  };
};
