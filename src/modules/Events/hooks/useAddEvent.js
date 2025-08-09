import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateEventMutation } from "../../../rtk/eventApi/eventApi";

export const AddEventHook = () => {
  const [createEvent, { isLoading, error }] = useCreateEventMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    location_en: "",
    location_ar: "",
    date: "",
    video: "",
  });

  const [photo, setPhoto] = useState(null);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleDescriptionChangeAR = (value) => {
    setFormData((prev) => ({ ...prev, description_ar: value }));
    setErrors((prev) => ({ ...prev, description_ar: false }));
  };
  const handleDescriptionChangeEN = (value) => {
    setFormData((prev) => ({ ...prev, description_en: value }));
    setErrors((prev) => ({ ...prev, description_en: false }));
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
    let firstEmptyFieldName = "";

    if (!formData.title_en.trim()) {
      newErrors.title_en = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Title (English)";
    }

    if (!formData.title_ar.trim()) {
      newErrors.title_ar = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Title (Arabic)";
    }

    if (!formData.location_en.trim()) {
      newErrors.location_en = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Location (English)";
    }

    if (!formData.location_ar.trim()) {
      newErrors.location_ar = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Location (Arabic)";
    }
    if (!photo) {
      newErrors.photo = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Main Image";
    }

    if (!formData.description_en.trim()) {
      newErrors.description_en = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Description (English)";
    }

    if (!formData.description_ar.trim()) {
      newErrors.description_ar = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Description (Arabic)";
    }

    if (!formData.date.trim()) {
      newErrors.date = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Date";
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
    formDataToSend.append("titleEN", formData.title_en);
    formDataToSend.append("titleAR", formData.title_ar);
    formDataToSend.append("descriptionEN", formData.description_en);
    formDataToSend.append("descriptionAR", formData.description_ar);
    formDataToSend.append("locationEN", formData.location_en);
    formDataToSend.append("locationAR", formData.location_ar);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("video", formData.video);

    if (photo) {
      formDataToSend.append("photo", photo);
    }

    images.forEach((img) => {
      formDataToSend.append("images", img);
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
    handleDescriptionChangeAR,
    handleDescriptionChangeEN,
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
