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

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);

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
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.content_en.trim()) newErrors.content = true;
    if (!formData.content_ar.trim()) newErrors.content = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    console.log(formData.content);

    formDataToSend.append("isVideo", formData.isVideo); // true / false
    if (formData.isVideo && formData.videoUrl) {
      formDataToSend.append("video", formData.videoUrl);
    }
    images.forEach((image) => formDataToSend.append("images", image));

    try {
      const res = await addNews(formDataToSend).unwrap();
      console.log(res);

      toast.success("News saved successfully!");
      // setTimeout(() => {
      //   navigate("/all-news");
      // }, 2000);
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
