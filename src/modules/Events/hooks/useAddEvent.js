import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateEventMutation } from "../../../rtk/eventApi/eventApi";

export const AddEventHook = () => {
  const [createEvent, { isLoading, error }] = useCreateEventMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    location: "",
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

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
    setErrors((prev) => ({ ...prev, content: false }));
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
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.location.trim()) newErrors.location = true;
    if (!formData.content.trim()) newErrors.content = true;
    if (!thumbnail) newErrors.thumbnail = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.content);
    formDataToSend.append("location", formData.location);
    // formDataToSend.append("thumbnail", thumbnail);
    console.log(images);

    images.forEach((img) => formDataToSend.append("images", img));
    console.log(formData.location);

    try {
      const res = await createEvent(formDataToSend).unwrap();
      console.log(res);
      
      toast.success("Event added successfully!");
      setTimeout(() => {
        navigate("/all-news");
      }, 2000);
    } catch (err) {
      console.log(err);
      
      toast.error("Failed to add event.");
      console.error("Create event error:", err);
    }
  };

  return {
    formData,
    handleChange,
    handleContentChange,
    thumbnail,
    preview,
    handleThumbnailChange,
    removeThumbnail,
    images,
    handleImagesChange,
    removeImage,
    handleSubmit,
    isLoading,
    error,
    errors,
  };
};
