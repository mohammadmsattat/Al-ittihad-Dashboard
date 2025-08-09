import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNewsMutation } from "../../../rtk/newsApi/newsApi";
import { toast } from "react-toastify";

export const useAddNews = () => {
  const [addNews, { isLoading, error }] = useCreateNewsMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    content_en: "",
    content_ar: "",
    isVideo: false,
    videoUrl: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (name === "isVideo") {
      setFormData((prev) => ({
        ...prev,
        isVideo: checked,
        videoUrl: checked ? prev.videoUrl : "",
      }));
    } else {
      const val = type === "checkbox" ? checked : value;
      setFormData((prev) => ({ ...prev, [name]: val }));
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
  const handleContentChangeEn = (content_en) => {
    setFormData((prev) => ({ ...prev, content_en }));
    setErrors((prev) => ({ ...prev, content_en: false }));
  };
  const handleContentChangeAr = (content_ar) => {
    setFormData((prev) => ({ ...prev, content_ar }));
    setErrors((prev) => ({ ...prev, content_ar: false }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, video: false }));
    }
  };

  const removeVideo = () => {
    setFormData((prev) => ({ ...prev, video: null }));
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
    let firstEmptyFieldName = "";

    if (!formData.title_en.trim()) {
      newErrors.title_en = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Title (English)";
    }

    if (!formData.title_ar.trim()) {
      newErrors.title_ar = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Title (Arabic)";
    }

    if (!thumbnail) {
      newErrors.thumbnail = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Image";
    }

    if (!formData.content_en.trim()) {
      newErrors.content_en = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Content (English)";
    }

    if (!formData.content_ar.trim()) {
      newErrors.content_ar = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Content (Arabic)";
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

    formDataToSend.append("contentEN", formData.content_en);
    formDataToSend.append("contentAR", formData.content_ar);

    if (formData.isVideo && formData.videoUrl) {
      formDataToSend.append("video", formData.videoUrl);
    }
    if (thumbnail) formDataToSend.append("photo", thumbnail);

    images.forEach((image) => formDataToSend.append("images", image));

    try {
      const res = await addNews(formDataToSend).unwrap();
      console.log(res);

      toast.success("News saved successfully!");
      setTimeout(() => {
        navigate("/all-news");
      }, 2000);
    } catch (err) {
      console.log(err);

      toast.error("Failed to Add news!");
      console.error("Failed to add news:", err);
    }
  };

  return {
    formData,
    handleChange,
    handleContentChangeEn,
    handleContentChangeAr,
    preview,
    thumbnail,
    handleThumbnailChange,
    removeThumbnail,
    handleVideoChange,
    removeVideo,
    images,
    handleImagesChange,
    removeImage,
    handleSubmit,
    isLoading,
    error,
    errors,
  };
};
