import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneNewsQuery,
  useUpdateNewsMutation,
} from "../../../rtk/newsApi/newsApi";
import { toast } from "react-toastify";

export const useUpdateNews = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: newsData,
    isLoading: isNewsLoading,
    isError :getError,
  } = useGetOneNewsQuery(slug);
console.log(getError);

  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    tags: [],
    status: "draft",
    favorite: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (newsData) {
      setFormData({
        title: newsData?.data.title || "",
        content: newsData?.data.content || "",
        categoryId: newsData?.data.categoryId?._id || "",
        tags: newsData?.data.tags || [],
        status: newsData?.data.status || "draft",
        favorite: newsData?.data.favorite || false,
      });
      setPreview(newsData?.data.thumbnail);
      setImages(
        newsData?.data.images?.map((img) => ({
          name: img.split("/").pop(),
          url: img,
        })) || []
      );
    }
  }, [newsData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
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
    setPreview(newsData?.data.thumbnail);
  };

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [
      ...prev,
      ...newFiles.map((file) => ({
        name: file.name,
        file,
      })),
    ]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleTagAddition = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag.text],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.content.trim()) newErrors.content = true;
    if (!formData.categoryId) newErrors.categoryId = true;

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
    formDataToSend.append("status", formData.status);
    formData.tags.forEach((tag) => formDataToSend.append("tags", tag));
    formDataToSend.append("favorite", formData.favorite);

    if (thumbnail) {
      formDataToSend.append("thumbnail", thumbnail);
    }

    images.forEach((item) => {
      if (item.file) {
        formDataToSend.append("images", item.file);
      }
    });

    try {
     const res= await updateNews({ slug, data: formDataToSend }).unwrap();
     if(res) toast.success("News Updated successfully!");

      setTimeout(() => {
        navigate("/all-news");
      }, 3000);
      
    } catch (err) {
      toast.error("Failed to update news!");

      console.error("News Updating Failed:", err);
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
    handleTagDelete,
    handleTagAddition,
    handleSubmit,
    isLoading: isNewsLoading || isUpdating,
    getError,
    errors,
  };
};
