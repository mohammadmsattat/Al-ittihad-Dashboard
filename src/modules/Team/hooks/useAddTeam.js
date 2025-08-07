import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateTeamMutation } from "../../../rtk/teamApi/teamApi";

const useAddTeam = () => {
  const [createTeam, { isLoading, error }] = useCreateTeamMutation();
  const navigate = useNavigate();

  // ✅ بيانات الفريق الأساسية
  const [formData, setFormData] = useState({
    nameAR: "",
    nameEN: "",
    sport: "",
    stats: {
      wins: "",
      losses: "",
      draws: "",
    },
  });

  const [thumbnail, setThumbnail] = useState(null); // ✅ صورة الفريق
  const [preview, setPreview] = useState(null); // ✅ معاينة للصورة

  const [errors, setErrors] = useState({}); // ✅ لتخزين الأخطاء في النموذج

  // ✅ التعامل مع تغييرات الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;

    // التعامل مع الحقول داخل stats
    if (["wins", "losses", "draws"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // ✅ رفع صورة الفريق
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, photo: false }));
    }
  };

  // ✅ إزالة الصورة المرفوعة
  const removeThumbnail = () => {
    setThumbnail(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  // ✅ التحقق من صحة الحقول
  const validate = () => {
    const newErrors = {};
    if (!formData.nameAR.trim()) newErrors.nameAR = true;
    if (!formData.nameEN.trim()) newErrors.nameEN = true;
    if (!formData.sport.trim()) newErrors.sport = true;
    if (!thumbnail) newErrors.photo = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();

    formDataToSend.append("nameAR", formData.nameAR);
    formDataToSend.append("nameEN", formData.nameEN);
    formDataToSend.append("sport", formData.sport);

    formDataToSend.append("stats.wins", formData.stats.wins);
    formDataToSend.append("stats.losses", formData.stats.losses);
    formDataToSend.append("stats.draws", formData.stats.draws);

    if (thumbnail) formDataToSend.append("photo", thumbnail);

    try {
      await createTeam(formDataToSend).unwrap();
      toast.success("تم حفظ الفريق بنجاح");

      setTimeout(() => {
        navigate("/all-team");
      }, 2000);
    } catch (err) {
      toast.error("فشل في إضافة الفريق!");
      console.error("فشل في إضافة الفريق:", err);
    }
  };

  return {
    formData,
    handleChange,
    preview,
    handleThumbnailChange,
    removeThumbnail,
    handleSubmit,
    isLoading,
    error,
    errors,
  };
};

export default useAddTeam;
