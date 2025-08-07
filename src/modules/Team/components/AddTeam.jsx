import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { X } from "lucide-react";
import useAddTeam from "../hooks/useAddTeam";

function InputField({ label, name, value, onChange, type = "text", error,placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? "border-red-500 border" : ""}`}
      />
    </div>
  );
}

function AddTeam() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
    preview,
    handleThumbnailChange,
    removeThumbnail,
  } = useAddTeam();

  return (
    <Container maxWidth="md" className="my-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ✅ صورة الفريق */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Team Logo
          </h2>

          <div className="flex items-center gap-4">
            <div
              className={`w-28 h-28 rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden ${
                errors.photo ? "border-red-500" : "border-gray-300"
              }`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="block w-full text-sm text-gray-600
                  file:mr-4 file:py-1 file:px-3 file:rounded-full
                  file:border-0 file:text-sm file:font-medium
                  file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />

              {preview && (
                <div className="flex justify-between items-center mt-2 bg-gray-100 p-2 border rounded">
                  <span className="text-sm text-gray-600 truncate max-w-[80%]">
                    Image Selected
                  </span>
                  <button type="button" onClick={removeThumbnail}>
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ بيانات الفريق */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">Team Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="الاسم (عربي)"
              name="nameAR"
              value={formData.nameAR}
              onChange={handleChange}
              error={errors.nameAR}
            />

            <InputField
              label="Name (English)"
              name="nameEN"
              value={formData.nameEN}
              onChange={handleChange}
              error={errors.nameEN}
            />

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium mb-1">Sport</label>
              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className={`input ${errors.sport ? "border-red-500 border" : ""}`}
              >
                <option value="">Select Sport</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Handball">Handball</option>
                <option value="Tennis">Tennis</option>
              </select>
            </div>
          </div>

          {/* ✅ الإحصائيات */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 pt-2">
            {["wins", "losses", "draws"].map((key) => (
              <InputField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                type="number"
                value={formData.stats[key] ?? ""}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        {/* ✅ زر الحفظ */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        rtl={false}
      />
    </Container>
  );
}

export default AddTeam;
