import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneMatchQuery,
  useUpdateMatchMutation,
} from "../../../rtk/matchApi/matchApi";
import { useGetAllTeamQuery } from "../../../rtk/teamApi/teamApi";

const urlToFile = async (url, filename = "image") => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch image. Status: ${response.status}`);

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.startsWith("image/"))
      throw new Error(
        `URL does not point to an image. Content-Type: ${contentType}`
      );

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

export const useUpdateMatch = () => {
  const { id } = useParams();

  const [updateMatch, { isLoading, error }] = useUpdateMatchMutation();
  const {
    data: matchData,
    isLoading: isMatchLoading,
    isError,
  } = useGetOneMatchQuery(id, { skip: !id });
console.log(matchData);

  const {
    data: TeamData,
    isLoading: getTeamLoading,
    error: getTeamError,
    isError: errorTeam,
  } = useGetAllTeamQuery("limit=1000");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    locationAR: "",
    locationEN: "",
    homeTeam: "",
    awayTeam: "",
    homeScore: "",
    awayScore: "",
    videoUrl: "",
    date: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (matchData) {
      const fillData = async () => {
        setFormData({
          locationAR: matchData.data.locationAR || "",
          locationEN: matchData.data.locationEN || "",
          homeTeam: matchData.data.homeTeam?._id || "",
          awayTeam: matchData.data.awayTeam?._id || "",
          homeScore: matchData.data.result?.homeScore?.toString() || "",
          awayScore: matchData.data.result?.awayScore?.toString() || "",
          videoUrl: matchData.data.videos || "",
          date: matchData.data.date
            ? new Date(matchData.data.date).toISOString().slice(0, 16)
            : "",
        });

        if (matchData?.data.photo) {
          const thumbFile = await urlToFile(matchData.data.photo, "thumbnail");
          if (thumbFile) {
            setThumbnail(thumbFile);
            setPreview(URL.createObjectURL(thumbFile));
          }
        }

        if (matchData?.data.images?.length > 0) {
          const imageFiles = await Promise.all(
            matchData.data.images.map((url, idx) =>
              urlToFile(url, `image-${idx + 1}`)
            )
          );
          setImages(imageFiles.filter(Boolean));
        }
      };

      fillData();
    }
  }, [matchData]);
console.log(formData.awayTeam);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    let firstField = "";

    const requiredFields = [
      "locationAR",
      "locationEN",
      "homeTeam",
      "awayTeam",
      "homeScore",
      "awayScore",
      "date",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = true;
        if (!firstField) firstField = field;
      }
    });

    if (!thumbnail) {
      newErrors.thumbnail = true;
      if (!firstField) firstField = "thumbnail";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(`Please fill the field: ${firstField}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();

    formDataToSend.append("locationAR", formData.locationAR);
    formDataToSend.append("locationEN", formData.locationEN);
    formDataToSend.append("homeTeam", formData.homeTeam);
    formDataToSend.append("awayTeam", formData.awayTeam);
    formDataToSend.append("result[homeScore]", formData.homeScore);
    formDataToSend.append("result[awayScore]", formData.awayScore);
    formDataToSend.append("date", formData.date);

    if (formData.videoUrl) {
      formDataToSend.append("videos", formData.videoUrl);
    }

    if (thumbnail) formDataToSend.append("photo", thumbnail);

    images.forEach((img) => formDataToSend.append("images", img));

    try {
      await updateMatch({ id, data: formDataToSend }).unwrap();
      toast.success("Match updated successfully!");
      setTimeout(() => {
        navigate("/all-matches");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update match!");
    }
  };

  return {
    formData,
    handleChange,
    preview,
    thumbnail,
    handleThumbnailChange,
    removeThumbnail,
    images,
    handleImagesChange,
    removeImage,
    handleSubmit,
    isLoading,
    error,
    errors,
    TeamData,
    getTeamLoading,
    isMatchLoading,
    isError: errorTeam || isError,
  };
};
