import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateNewsMutation,
  useGetOneNewsQuery,
} from "../../../rtk/newsApi/newsApi";
import { toast } from "react-toastify";

export const useUpdateNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();
  const { data: newsData, isLoading: isNewsLoading ,isError } = useGetOneNewsQuery(id, {
    skip: !id,
  });

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
  console.log(images);
  const urlToFile = async (url, filename = "image") => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error(
          `URL does not point to an image. Content-Type: ${contentType}`
        );
      }

      const blob = await response.blob();
      const extension = contentType.split("/")[1].split(";")[0];
      const safeFilename = filename.endsWith(`.${extension}`)
        ? filename
        : `${filename}.${extension}`;

      return new File([blob], safeFilename, { type: contentType });
    } catch (error) {
      console.error("urlToFile error:", error);
      return null;
    }
  };
  useEffect(() => {
    const loadFiles = async () => {
      if (newsData) {
        setFormData({
          title_en: newsData?.data.titleEN || "",
          title_ar: newsData?.data.titleAR || "",
          content_en: newsData?.data.contentEN || "",
          content_ar: newsData?.data.contentAR || "",
          isVideo: !!newsData?.data.video,
          videoUrl: newsData?.data.video || "",
        });

        if (newsData?.data.photo) {
          const thumbFile = await urlToFile(newsData.data.photo, "thumbnail");
          if (thumbFile) {
            setThumbnail(thumbFile);
            setPreview(URL.createObjectURL(thumbFile));
          }
        }

        if (newsData?.data.images?.length > 0) {
          const imageFiles = await Promise.all(
            newsData.data.images.map((url, idx) =>
              urlToFile(url, `image-${idx + 1}`)
            )
          );
          setImages(imageFiles.filter(Boolean));
        }
      }
    };

    loadFiles();
  }, [newsData]);

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

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const uniqueFiles = newFiles.filter(
      (file) => !images.some((f) => f.name === file.name)
    );
    setImages((prev) => [...prev, ...uniqueFiles]);
  };

  const removeImage = (fileToRemove) => {
    setImages((prev) => prev.filter((file) => file.name !== fileToRemove));
  };
  console.log(images);

  const validate = () => {
    const newErrors = {};
    let firstEmptyFieldName = "";

    if (!formData.title_en.trim()) {
      newErrors.title_en = true;
      firstEmptyFieldName ||= "Title (English)";
    }

    if (!formData.title_ar.trim()) {
      newErrors.title_ar = true;
      firstEmptyFieldName ||= "Title (Arabic)";
    }

    if (!thumbnail && !preview) {
      newErrors.thumbnail = true;
      firstEmptyFieldName ||= "Image";
    }

    if (!formData.content_en.trim()) {
      newErrors.content_en = true;
      firstEmptyFieldName ||= "Content (English)";
    }

    if (!formData.content_ar.trim()) {
      newErrors.content_ar = true;
      firstEmptyFieldName ||= "Content (Arabic)";
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

    if (thumbnail) {
      formDataToSend.append("photo", thumbnail);
    }
    if (images.length > 0) {
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });
    } else {
      formDataToSend.append("images", []);
    }

    try {
      await updateNews({ id, data: formDataToSend }).unwrap();
      toast.success("News updated successfully!");
      setTimeout(() => {
        navigate("/all-news");
      }, 1500);
    } catch (err) {
      console.log(err);

      console.error(err);
      toast.error("Failed to Update news!");
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
    images,
    handleImagesChange,
    removeImage,
    handleSubmit,
    isLoading: isNewsLoading,
    isError,
    errors,
  };
};
