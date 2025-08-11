import React from "react";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useUpdateInvestment from "../hooks/useUpdateInvestment";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  placeholder,
}) {
  return (
    <div className="input-group">
      <label className="btn btn-input w-[10em]">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`input ${error ? "border-red-500 border" : ""}`}
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, error }) {
  return (
    <div className="input-group">
      <label className="btn btn-input w-[10em] ">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`textarea h-[10em] mb-5 ${error ? "border-red-500 border" : ""}`}
      />
    </div>
  );
}
const UpdateInvestment = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
    getInvestmentError,
  } = useUpdateInvestment();

  if (isLoading) return <LoadingCard />;
  if (getInvestmentError) return <ErrorMessageCard />;
  return (
    <Container maxWidth="md" className="my-12">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          Update Investment Details
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Title-en"
            name="titleEN"
            value={formData.titleEN}
            onChange={handleChange}
            error={errors.titleEN}
            placeholder="Enter the English title..."
          />
          <InputField
            label="Title-ar"
            name="titleAR"
            value={formData.titleAR}
            onChange={handleChange}
            error={errors.titleAR}
            placeholder="Enter the Arabic title..."
          />
        </div>

        <InputField
          label="Deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          type="date"
          error={errors.deadline}
          placeholder="Enter the deadline..."
        />

        <div className="input-group relative">
          <label className="btn btn-input w-[9em]">Select Status</label>
          <div className="relative w-full">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`input w-full ${
                errors.status ? "border-red-500 border" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">Please select a status</p>
          )}
        </div>

        <TextAreaField
          label="Description-en"
          name="descriptionEN"
          value={formData.descriptionEN}
          onChange={handleChange}
          error={errors.descriptionEN}
          placeholder="Enter the English description..."
        />
        <TextAreaField
          label="Description-ar"
          name="descriptionAR"
          value={formData.descriptionAR}
          onChange={handleChange}
          error={errors.descriptionAR}
          placeholder="Enter the Arabic description..."
        />
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Investment"}
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        rtl={false}
      />
    </Container>
  );
};

export default UpdateInvestment;
