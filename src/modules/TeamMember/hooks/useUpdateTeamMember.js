import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneTeamMemberQuery,
  useUpdateTeamMemberMutation,
} from "../../../rtk/teamMemberApi/teamMemberApi";
import { useGetAllTeamQuery } from "../../../rtk/teamApi/teamApi";

export const useUpdateTeamMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: memberData,
    isLoading: isMemberLoading,
    error: getError,
  } = useGetOneTeamMemberQuery(id);

  const {
    data: TeamData,
    isLoading: isTeamLoading,
    error: getTeamError,
  } = useGetAllTeamQuery();

  const [updateTeamMember, { isLoading: isUpdating }] =
    useUpdateTeamMemberMutation();

  const [formData, setFormData] = useState({
    nameAR: "",
    nameEN: "",
    role: "",
    position: "",
    number: "",
    team: "",
    ageGroup: "",
    bioAR: "",
    bioEN: "",
    experience: "",
    stats: {
      appearances: "",
      goals: "",
      assists: "",
      yellowCards: "",
      redCards: "",
    },
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (memberData?.data) {
      const m = memberData.data;
      setFormData({
        nameAR: m.nameAR || "",
        nameEN: m.nameEN || "",
        role: m.role || "",
        position: m.position || "",
        number: m.number || "",
        team: m.team?._id || "",
        ageGroup: m.ageGroup || "",
        bioAR: m.bioAR || "",
        bioEN: m.bioEN || "",
        experience: m.experience || "",
        stats: {
          appearances: m.stats?.appearances || "",
          goals: m.stats?.goals || "",
          assists: m.stats?.assists || "",
          yellowCards: m.stats?.yellowCards || "",
          redCards: m.stats?.redCards || "",
        },
      });

      if (m.photo) {
        setPreview(m.photo);
      }
    }
  }, [memberData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.stats) {
      setFormData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
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
    setPreview(null);
  };

  const validate = () => {
    const newErrors = {};
    let firstEmptyFieldName = "";

    if (!thumbnail && !preview) {
      newErrors.thumbnail = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Profile Photo";
    }

    if (!formData.nameEN.trim()) {
      newErrors.nameEN = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Name (English)";
    }

    if (!formData.nameAR.trim()) {
      newErrors.nameAR = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Name (Arabic)";
    }

    if (!formData.team) {
      newErrors.team = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Team";
    }

    if (!formData.role.trim()) {
      newErrors.role = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Role";
    }

    if (!formData.position.trim()) {
      newErrors.position = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Position";
    }

    if (!formData.number.toString().trim()) {
      newErrors.number = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Number";
    }

    if (!formData.ageGroup.trim()) {
      newErrors.ageGroup = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Age Group";
    }

    if (!formData.bioEN.trim()) {
      newErrors.bioEN = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Bio (English)";
    }

    if (!formData.bioAR.trim()) {
      newErrors.bioAR = true;
      if (!firstEmptyFieldName) firstEmptyFieldName = "Bio (Arabic)";
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
    formDataToSend.append("nameAR", formData.nameAR);
    formDataToSend.append("nameEN", formData.nameEN);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("team", formData.team);
    formDataToSend.append("ageGroup", formData.ageGroup);
    formDataToSend.append("bioAR", formData.bioAR);
    formDataToSend.append("bioEN", formData.bioEN);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("stats.appearances", formData.stats.appearances);
    formDataToSend.append("stats.goals", formData.stats.goals);
    formDataToSend.append("stats.assists", formData.stats.assists);
    formDataToSend.append("stats.yellowCards", formData.stats.yellowCards);
    formDataToSend.append("stats.redCards", formData.stats.redCards);

    if (thumbnail) {
      formDataToSend.append("photo", thumbnail);
    }

    try {
      await updateTeamMember({ id, data: formDataToSend }).unwrap();
      toast.success("Team Member Updated successfully");
      setTimeout(() => navigate("/all-teamMember"), 2000);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("فشل في تحديث عضو الفريق!");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleThumbnailChange,
    removeThumbnail,
    isLoading: isMemberLoading || isTeamLoading || isUpdating,
    preview,
    thumbnail,
    errors,
    TeamData,
    getError :isMemberLoading,
    getTeamError,
  };
};
