import { Container } from "@mui/material";
import { X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useAddMatch } from "../hooks/useAddMatch";

function AddMatch() {
  const {
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
    errors,
    TeamData,
    getTeamLoading,
  } = useAddMatch();
console.log(TeamData);

  return (
    <Container maxWidth="lg" className="my-10">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
          {/* Photo Upload */}
          <div className="bg-white p-6 shadow-lg rounded-2xl mb-6 col-span-4">
            <h2 className="text-xl font-bold text-center mb-4">
              Add Match Photo
            </h2>

            <div
              className={`w-full h-48 bg-gray-100 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden ${
                errors.thumbnail ? "border-red-500" : "border-gray-300"
              }`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain h-full w-full"
                />
              ) : (
                <span className="text-gray-400">No Selected</span>
              )}
            </div>

            {thumbnail && (
              <div className="flex justify-between items-center mt-2 bg-gray-100 p-2 border rounded-md">
                <span className="text-sm truncate max-w-[80%]">
                  {thumbnail.name}
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

          {/* Match Info Section */}
          <div className="bg-white p-6 shadow-lg rounded-2xl mb-6 col-span-8">
            <h2 className="text-xl font-bold text-center mb-4">Match Info</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Location EN */}
              <div className="input-group">
                <label className="btn btn-input w-[9em]">Location EN</label>
                <input
                  name="locationEN"
                  value={formData.locationEN}
                  onChange={handleChange}
                  placeholder="Enter Location in English"
                  type="text"
                  className={`input ${errors.locationEN ? "border-red-500" : ""}`}
                />
              </div>

              {/* Location AR */}
              <div className="input-group">
                <label className="btn btn-input w-[9em]">Location AR</label>
                <input
                  name="locationAR"
                  value={formData.locationAR}
                  onChange={handleChange}
                  placeholder="Enter Location in Arabic"
                  type="text"
                  className={`input ${errors.locationAR ? "border-red-500" : ""}`}
                />
              </div>

              {/* Date */}
              <div className="input-group">
                <label className="btn btn-input w-[9em]">Date</label>
                <input
                  name="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={handleChange}
                  className={`input ${errors.date ? "border-red-500" : ""}`}
                />
              </div>

              {/* Video URL */}
              <div className="input-group">
                <label className="btn btn-input w-[9em]">Video URL</label>
                <input
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="Enter video URL"
                  type="url"
                  className="input"
                />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <label className="mb-2 font-semibold text-gray-700">
                Additional Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleImagesChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />

              {images.length > 0 && (
                <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {images.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-sm bg-gray-100 px-3 py-2 rounded-md"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <div className="bg-white p-6 shadow-lg rounded-2xl mb-6">
          <h2 className="text-xl font-bold text-center mb-4">Teams</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Home Team */}
            <div className="input-group relative">
              <label className="btn btn-input w-[9em]">Home Team</label>

              <div className="relative w-full">
                <select
                  name="homeTeam"
                  value={formData.homeTeam}
                  onChange={handleChange}
                  className={`input appearance-none pr-10 ${errors.homeTeam ? "border-red-500" : ""}`}
                >
                  <option value="">Select Home Team</option>
                  {TeamData?.data.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.nameEN}
                    </option>
                  ))}
                </select>

                {/* سهم ▼ ليدل على أنها قائمة منسدلة */}
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
            </div>

            {/* Away Team */}
            <div className="input-group relative">
              <label className="btn btn-input w-[9em]">Away Team</label>

              <div className="relative w-full">
             <input
                name="awayTeam"
                value={formData.awayTeam}
                onChange={handleChange}
                type="text"
                placeholder="Enter Away Team..."
                className={`input ${errors.awayTeam ? "border-red-500" : ""}`}
              />

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
            </div>

            <div className="input-group">
              <label className="btn btn-input w-[9em]">Home Score</label>
              <input
                name="homeScore"
                value={formData.homeScore}
                onChange={handleChange}
                type="number"
                placeholder="Enter Score..."
                className={`input ${errors.homeScore ? "border-red-500" : ""}`}
              />
            </div>
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Away Score</label>
              <input
                name="awayScore"
                value={formData.awayScore}
                onChange={handleChange}
                type="number"
                placeholder="Enter Score..."
                className={`input ${errors.awayScore ? "border-red-500" : ""}`}
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
            {isLoading ? "Saving..." : "Save Match"}
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

export default AddMatch;
