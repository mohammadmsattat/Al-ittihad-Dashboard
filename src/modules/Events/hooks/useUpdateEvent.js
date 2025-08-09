import { useEffect, useState } from "react";
import {
  useUpdateEventMutation,
  useGetOneEventQuery,
} from "../../../rtk/eventApi/eventApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const UpdateEventHook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { data: eventData, isLoading: isFetching,isError } = useGetOneEventQuery(id, {
    skip: !id,
  });

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

  //convert the url of photo to file
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
      if (eventData) {
        setFormData({
          title_en: eventData?.data.titleEN || "",
          title_ar: eventData?.data.titleAR || "",
          description_en: eventData?.data.descriptionEN || "",
          description_ar: eventData?.data.descriptionAR || "",
          location_en: eventData?.data.locationEN || "",
          location_ar: eventData?.data.locationAR || "",
          date: eventData?.data.date || "",
          video: eventData?.data.video || "",
        });

        if (eventData?.data.photo) {
          const thumbFile = await urlToFile(eventData.data.photo, "thumbnail");
          if (thumbFile) {
            setPhoto(thumbFile);
          }
        }

        if (eventData?.data.images?.length > 0) {
          const imageFiles = await Promise.all(
            eventData.data.images.map((url, idx) =>
              urlToFile(url, `image-${idx + 1}`)
            )
          );
          setImages(imageFiles.filter(Boolean));
        }
      }
    };
    loadFiles();
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleDescriptionChangeEN = (value) => {
    setFormData((prev) => ({ ...prev, description_en: value }));
    setErrors((prev) => ({ ...prev, description_en: false }));
  };

  const handleDescriptionChangeAR = (value) => {
    setFormData((prev) => ({ ...prev, description_ar: value }));
    setErrors((prev) => ({ ...prev, description_ar: false }));
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

  const removeImage = (fileToRemove) => {
    setImages((prev) => prev.filter((file) => file.name !== fileToRemove));
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

    if (photo && typeof photo !== "string") {
      formDataToSend.append("photo", photo);
    }

    if (images.length > 0) {
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });
    } else {
      formDataToSend.append("images", []);
    }

    try {
      await updateEvent({ id, data: formDataToSend }).unwrap();
      toast.success("Event updated successfully!");
      setTimeout(() => navigate("/all-event"), 2000);
    } catch (err) {
      toast.error("Failed to update event.");
      console.error("Update error:", err);
    }
  };

  return {
    formData,
    handleChange,
    handleDescriptionChangeEN,
    handleDescriptionChangeAR,
    handlePhotoChange,
    removePhoto,
    handleImagesChange,
    removeImage,
    photo,
    images,
    handleSubmit,
    isLoading:isFetching,
    isError,
    errors,
  };
};

export default UpdateEventHook;
