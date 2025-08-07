import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateEventMutation } from "../../../rtk/eventApi/eventApi";

export const AddEventHook = () => {
  const [createEvent, { isLoading, error }] = useCreateEventMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    video: "", // ✅ video as a URL string
  });

  const [photo, setPhoto] = useState(null); // ✅ main photo
  const [images, setImages] = useState([]); // ✅ additional images
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
    setErrors((prev) => ({ ...prev, description: false }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
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

  const handleVideoChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, video: value }));
    setErrors((prev) => ({ ...prev, video: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.location.trim()) newErrors.location = true;
    if (!formData.description.trim()) newErrors.description = true;
    if (!formData.date.trim()) newErrors.date = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("video", formData.video); // ✅ as string

    if (photo) {
      formDataToSend.append("photo", photo); // ✅ main image
    }

    images.forEach((img) => {
      formDataToSend.append("images", img); // ✅ additional images
    });

    try {
      const res = await createEvent(formDataToSend).unwrap();
      toast.success("Event added successfully!");
      setTimeout(() => {
        navigate("/all-event");
      }, 2000);
    } catch (err) {
      toast.error("Failed to add event.");
      console.error("Create event error:", err);
    }
  };

  return {
    formData,
    handleChange,
    handleDescriptionChange,
    date: formData.date,
    video: formData.video,
    handleVideoChange,
    photo,
    handlePhotoChange,
    removePhoto,
    images,
    handleImagesChange,
    removeImage,
    handleSubmit,
    isLoading,
    error,
    errors,
  };
};
