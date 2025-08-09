import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { X } from "lucide-react";
import { useAddTeamMember } from "../hooks/useAddTeamMember";

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

function TextAreaField({ label, name, value, onChange, placeholder }) {
  return (
    <div className="input-group">
      <label className="btn btn-input w-[10em] ">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="textarea h-[10em] mb-5"
      />
    </div>
  );
}
function AddTeamMember() {
  const {
    formData,
    handleChange,
    preview,
    handleThumbnailChange,
    removeThumbnail,
    handleSubmit,
    isLoading,
    error,
    errors,
    TeamData,
  } = useAddTeamMember();

  return (
    <Container maxWidth="md" className="my-12">
      <form onSubmit={handleSubmit} className="space-y-8 ">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Profile Photo
          </h2>

          <div className="flex items-center gap-4">
            <div
              className={`w-32 h-32 rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden ${
                errors.thumbnail ? "border-red-500" : "border-gray-300"
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

        <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">
            Team Member Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Name-ar"
              name="nameAR"
              placeholder="Enter the Arabic name..."
              value={formData.nameAR}
              error={errors.nameAR}
              onChange={handleChange}
            />
            <InputField
              label="Name-en"
              placeholder="Enter the English name..."
              name="nameEN"
              value={formData.nameEN}
              error={errors.nameEN}
              onChange={handleChange}
            />

            <InputField
              label="Role"
              name="role"
              placeholder="Enter The Role..."
              value={formData.role}
              onChange={handleChange}
            />
            <InputField
              label="Position"
              name="position"
              placeholder="Enter The Position..."
              value={formData.position}
              onChange={handleChange}
            />

            <InputField
              label="Number"
              name="number"
              placeholder="Enter The Number..."
              value={formData.number}
              onChange={handleChange}
              type="number"
            />
            <InputField
              label="Age Group"
              name="ageGroup"
              placeholder="Enter The Age Group..."
              value={formData.ageGroup}
              onChange={handleChange}
            />

            <div className="input-group">
              <label className="btn btn-input w-[10em]">Team</label>
              <select
                name="team"
                value={formData.team}
                onChange={handleChange}
                className={`input ${errors.team ? "border-red-500 border" : ""}`}
              >
                <option value="">Select Team</option>
                {TeamData?.data?.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.nameEN}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-5 pt-2">
            {["appearances", "goals", "assists", "yellowCards", "redCards"].map(
              (statKey) => (
                <InputField
                  key={statKey}
                  label={statKey.charAt(0).toUpperCase() + statKey.slice(1)}
                  name={statKey}
                  value={formData.stats?.[statKey] ?? ""}
                  placeholder={`Enter The ${statKey.charAt(0).toUpperCase() + statKey.slice(1)}....`}
                  onChange={handleChange}
                  type="number"
                />
              )
            )}
          </div>
          <div>
            <TextAreaField
              label="Bio-ar"
              name="bioAR"
              placeholder="Enter the Arabic Bio..."
              value={formData.bioAR}
              onChange={handleChange}
            />
            <TextAreaField
              label="Bio-en"
              name="bioEN"
              placeholder="Enter the English Bio...."
              value={formData.bioEN}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Saving" : "Save"}
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

export default AddTeamMember;
