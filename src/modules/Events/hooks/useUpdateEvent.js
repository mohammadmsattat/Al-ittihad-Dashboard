import { useEffect, useState } from "react";
import { useUpdateEventMutation } from "../../../rtk/eventApi/eventApi"; // adjust import path as needed
import { toast } from "react-toastify";
import { useParams } from "react-router";

const UpdateEventHook = () => {
  const { id } = useParams();
console.log(id);

  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    photo: "",
    images: [],
    video: "",
  });

  const [inputErrors, setInputErrors] = useState({
    title: false,
    description: false,
    date: false,
    location: false,
  });

  useEffect(() => {
    if (sh) {
      setShow(true);
      setFormData({
        title: event?.title || "",
        description: event?.description || "",
        date: event?.date || "",
        location: event?.location || "",
        photo: event?.photo || "",
        images: event?.images || [],
        video: event?.video || "",
      });
    } else {
      resetForm();
    }
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      photo: "",
      images: [],
      video: "",
    });
    setInputErrors({
      title: false,
      description: false,
      date: false,
      location: false,
    });
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagesChange = (images) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }));
  };

  const handleUpdate = async () => {
    // Basic validation example
    const errors = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      date: !formData.date.trim(),
      location: !formData.location.trim(),
    };

    setInputErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    try {
      const res = await updateEvent({
        slug: event.slug, // or id based on your API
        patch: formData,
      }).unwrap();

      if (res) toast.success("Event updated successfully!");
      resetForm();
      onClose(false);
    } catch (err) {
      toast.error("Failed to update event!");
      console.error("Error updating event:", err);
    }
  };

  return {
    formData,
    inputErrors,
    show,
    handleUpdate,
    isLoading,
    resetForm,
    handleChange,
    handleImagesChange,
  };
};

export default UpdateEventHook;
