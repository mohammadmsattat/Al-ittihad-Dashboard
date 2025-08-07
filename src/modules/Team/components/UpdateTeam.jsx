import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { X } from "lucide-react";
import useUpdateTeam from "../hooks/useUpdateTeam";

function UpdateTeam() {
  const {
    formData,
    handleChange,
    preview,
    handleThumbnailChange,
    removeThumbnail,
    handleSubmit,
    isLoading,
    errors,
  } = useUpdateTeam();

  return (
    <Container maxWidth="md" className="my-12">
      <form onSubmit={handleSubmit} className="space-y-8">

     
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">شعار الفريق</h2>

          <div className="flex items-center gap-4">
            <div
              className={`w-32 h-32 rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden ${
                errors.photo ? "border-red-500" : "border-gray-300"
              }`}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-400 text-sm">لا توجد صورة</span>
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
                  <span className="text-sm text-gray-600 truncate max-w-[80%]">تم اختيار صورة</span>
                  <button type="button" onClick={removeThumbnail}>
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

    
        <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">معلومات الفريق</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="اسم الفريق (عربي)"
              name="nameAR"
              value={formData.nameAR}
              onChange={handleChange}
              error={errors.nameAR}
            />
            <InputField
              label="Team Name (English)"
              name="nameEN"
              value={formData.nameEN}
              onChange={handleChange}
              error={errors.nameEN}
            />
            <InputField
              label="Sport"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              error={errors.sport}
            />
          </div>
        </div>

      
        <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">إحصائيات الفريق</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {["wins", "losses", "draws"].map((statKey) => (
              <InputField
                key={statKey}
                label={statKey.charAt(0).toUpperCase() + statKey.slice(1)}
                name={statKey}
                value={formData.stats?.[statKey] ?? ""}
                onChange={handleChange}
                type="number"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Update Team"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar pauseOnHover />
    </Container>
  );
}

function InputField({ label, name, value, onChange, type = "text", error }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`input ${error ? "border-red-500 border" : ""}`}
      />
    </div>
  );
}

export default UpdateTeam;
