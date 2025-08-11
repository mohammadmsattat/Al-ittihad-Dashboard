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
    <Container maxWidth="lg" className="my-10">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
          {/* Photo Upload */}
          <div className="bg-white p-6 shadow-lg rounded-2xl mb-6 col-span-4">
            <h2 className="text-xl font-bold text-center mb-4">Team Logo</h2>

            <div
              className={`w-full h-48 bg-gray-100 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden ${
                errors.photo ? "border-red-500" : "border-gray-300"
              }`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain h-full w-full"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {preview && (
              <div className="flex justify-between items-center mt-2 bg-gray-100 p-2 border rounded-md">
                <span className="text-sm truncate max-w-[80%]">
                  Image Selected
                </span>
                <button type="button" onClick={removeThumbnail}>
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-4 block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4 file:rounded-full
                file:border-0 file:text-sm file:font-semibold
                file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          {/* Team Info Section */}
          <div className="bg-white p-6 shadow-lg rounded-2xl mb-6 col-span-8">
            <h2 className="text-xl font-bold text-center mb-4">
              Team Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="btn btn-input w-[9em]">Name-en</label>
                <input
                  name="nameEN"
                  value={formData.nameEN}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter the English name..."
                  className={`input ${errors.nameEN ? "border-red-500" : ""}`}
                />
              </div>
              <div className="input-group">
                <label className="btn btn-input w-[9em]"> Name-ar</label>
                <input
                  name="nameAR"
                  value={formData.nameAR}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter the Arabic name..."
                  className={`input ${errors.nameAR ? "border-red-500" : ""}`}
                />
              </div>

              <div className="input-group">
                <label className="btn btn-input w-[9em]">Sport</label>
                <input
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter the sport..."
                  className={`input ${errors.sport ? "border-red-500" : ""}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white p-6 shadow-lg rounded-2xl mb-6">
          <h2 className="text-xl font-bold text-center mb-4">
            Team Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Wins</label>
              <input
                name="wins"
                value={formData.stats?.wins ?? ""}
                onChange={handleChange}
                type="number"
                placeholder="Number of wins"
                className="input"
              />
            </div>
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Losses</label>
              <input
                name="losses"
                value={formData.stats?.losses ?? ""}
                onChange={handleChange}
                type="number"
                placeholder="Number of losses"
                className="input"
              />
            </div>
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Draws</label>
              <input
                name="draws"
                value={formData.stats?.draws ?? ""}
                onChange={handleChange}
                type="number"
                placeholder="Number of draws"
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Update Team"}
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

export default UpdateTeam;
