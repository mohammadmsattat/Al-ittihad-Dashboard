import React from "react";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useUpdateInvestment from "../hooks/useUpdateInvestment";

  const TextAreaField = ({ label, name, value, onChange, error, required }) => (
    <div className="flex flex-col mb-5">
      <label className="text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`textarea w-full border rounded p-2 ${error ? "border-red-500" : "border-gray-300"}`}
        required={required}
        rows={4}
      />
      {error && <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>}
    </div>
  );
const UpdateInvestment = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
    getInvestmentError,
  } = useUpdateInvestment();

  if (getInvestmentError) {
    return (
      <Container className="my-12">
        <p className="text-red-500">فشل في جلب بيانات الاستثمار.</p>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="my-12">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          تحديث بيانات الاستثمار
        </h2>

        <InputField
          label="العنوان (عربي)"
          name="titleAR"
          value={formData.titleAR}
          onChange={handleChange}
          error={errors.titleAR}
          required
        />
        <InputField
          label="Title (English)"
          name="titleEN"
          value={formData.titleEN}
          onChange={handleChange}
          error={errors.titleEN}
          required
        />

        <TextAreaField
          label="الوصف (عربي)"
          name="descriptionAR"
          value={formData.descriptionAR}
          onChange={handleChange}
          error={errors.descriptionAR}
          required
        />
        <TextAreaField
          label="Description (English)"
          name="descriptionEN"
          value={formData.descriptionEN}
          onChange={handleChange}
          error={errors.descriptionEN}
          required
        />

        <InputField
          label="الموعد النهائي"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          type="date"
          error={errors.deadline}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`input w-full ${errors.status ? "border-red-500 border" : ""}`}
          required
        >
          <option value="" disabled>
            اختر الحالة
          </option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="completed">مكتمل</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">يرجى اختيار الحالة</p>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "جاري التحديث..." : "تحديث الاستثمار"}
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        pauseOnHover
      />
    </Container>
  );
};

// مكونات الإدخال
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  required,
}) => (
  <div className="flex flex-col mb-5">
    <label className="text-sm font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`input w-full ${error ? "border-red-500 border" : ""}`}
      required={required}
    />
    {error && <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>}
  </div>
);

export default UpdateInvestment;
