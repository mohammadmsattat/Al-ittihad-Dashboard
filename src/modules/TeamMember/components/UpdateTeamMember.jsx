import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { X } from "lucide-react";
import { useUpdateTeamMember } from "../hooks/useUpdateTeamMember";

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

function UpdateTeamMember() {
  const {
    formData,
    handleChange,
    preview,
    handleThumbnailChange,
    removeThumbnail,
    handleSubmit,
    isLoading,
    errors,
    TeamData,
  } = useUpdateTeamMember();

  return (
    <Container>
      <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* === Profile Photo Upload === */}
        <div className="flex gap-5 flex-col col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              الصورة الشخصية
            </h2>

            <div>
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
                    <span className="text-sm text-gray-600 truncate max-w-[80%]">
                      تم اختيار صورة
                    </span>
                    <button type="button" onClick={removeThumbnail}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-5 pt-2">
              {[
                "appearances",
                "goals",
                "assists",
                "yellowCards",
                "redCards",
              ].map((statKey) => (
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
        </div>

        {/* === Team Member Details === */}
        <div
          className="bg-white p-6 rounded-xl shadow-md space-y-5 col-span-8"
          style={{ marginTop: "0px" }}
        >
          <h2 className="text-lg font-semibold text-gray-700">معلومات العضو</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="الاسم (عربي)"
              name="nameAR"
              value={formData.nameAR}
              error={errors.nameAR}
              onChange={handleChange}
            />
            <InputField
              label="Name (English)"
              name="nameEN"
              value={formData.nameEN}
              error={errors.nameEN}
              onChange={handleChange}
            />

            <InputField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
            <InputField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />

            <InputField
              label="Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              type="number"
            />
            <InputField
              label="Age Group"
              name="ageGroup"
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
                <option value="">Choose Team</option>
                {TeamData?.data?.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.nameEN}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md space-y-5 col-span-12">
          <h2 className="text-lg font-semibold text-gray-700">معلومات العضو</h2>

          <div>
            <TextAreaField
              label="نبذة (عربي)"
              name="bioAR"
              value={formData.bioAR}
              onChange={handleChange}
            />
            <TextAreaField
              label="Bio (English)"
              name="bioEN"
              value={formData.bioEN}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {isLoading ? "Saving" : "Update Team Member"}
        </button>
      </div>
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

export default UpdateTeamMember;
