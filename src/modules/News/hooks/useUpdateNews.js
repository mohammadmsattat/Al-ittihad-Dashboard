import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneNewsQuery,
  useUpdateNewsMutation,
} from "../../../rtk/newsApi/newsApi";
import { toast } from "react-toastify";

export const useUpdateNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: newsData,
    isLoading: isNewsLoading,
    error: getError,
  } = useGetOneNewsQuery(id);

  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    video: null,
  });

  const [preview, setPreview] = useState(null); // لمعاينة الفيديو الحالي أو الجديد
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // تعبئة البيانات عند التحميل
  useEffect(() => {
    if (newsData?.data) {
      const news = newsData.data;
      setFormData({
        title: news.title || "",
        content: news.content || "",
        video: null, // نتركه فارغ لأنه سيتم رفع فيديو جديد لو تم تغييره
      });

      setPreview(news.video || null);

      setImages(
        (news.images || []).map((imgUrl) => ({
          name: imgUrl.split("/").pop(),
          url: imgUrl,
          file: null,
        }))
      );
    }
  }, [newsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
    setErrors((prev) => ({ ...prev, content: false }));
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
    setPreview(null);
  };

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const uniqueFiles = newFiles.filter(
      (file) => !images.some((img) => img.name === file.name)
    );
    setImages((prev) => [
      ...prev,
      ...uniqueFiles.map((file) => ({
        name: file.name,
        file,
        url: null,
      })),
    ]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.content.trim()) newErrors.content = true;
    // if (!preview && !formData.video) newErrors.video = true; // إن أردت التأكد من وجود فيديو دائمًا
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);

    if (formData.video) {
      formDataToSend.append("video", formData.video);
    }

    // رفع الصور الجديدة فقط
    images.forEach((img) => {
      if (img.file) {
        formDataToSend.append("images", img.file);
      }
    });

    try {
      const res = await updateNews({ id, data: formDataToSend }).unwrap();
      toast.success("News updated successfully!");

      setTimeout(() => {
        navigate("/all-news");
      }, 2000);
    } catch (error) {
      console.error("Error updating news:", error);
      toast.error("Failed to update news!");
    }
  };

  return {
    formData,
    handleChange,
    handleContentChange,
    preview,
    handleVideoChange,
    removeVideo,
    images,
    handleImagesChange,
    removeImage,
    handleSubmit,
    isLoading: isNewsLoading ,
    getError,
    errors,
  };
};
