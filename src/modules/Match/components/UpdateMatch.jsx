import React from "react";
import { Container } from "@mui/material";
import { X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useUpdateMatch } from "../hooks/useUpdateMatch";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

function UpdateMatch() {
  const { id } = useParams();
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
    isMatchLoading,
    isError
  } = useUpdateMatch();

  if (isMatchLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;

  return (
    <Container maxWidth="lg" className="my-10">
      <form onSubmit={handleSubmit}>
        {/* Photo Section */}
        <div
          className={`bg-white p-6 shadow-lg rounded-2xl ${
            errors.thumbnail ? "border-2 border-red-500" : ""
          }`}
        >
          <h2 className="text-xl font-bold text-center mb-4">Edit Photo</h2>

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

          {(thumbnail || preview) && (
            <div className="flex justify-between items-center mt-2 bg-gray-100 p-2 border rounded-md">
              <span className="text-sm truncate max-w-[80%]">
                {thumbnail ? thumbnail.name : "Current Image"}
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
              file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        {/* Match Details Section */}
        <div className="bg-white p-6 mt-8 shadow-lg rounded-2xl flex flex-col gap-6">
          <h2 className="text-xl font-bold text-center mb-4">Edit Match</h2>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Location AR</label>
            <input
              type="text"
              placeholder="Location AR"
              name="locationAR"
              value={formData.locationAR}
              onChange={handleChange}
              className={`input ${errors.locationAR ? "border-red-500 border" : ""}`}
            />
          </div>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Location EN</label>
            <input
              type="text"
              placeholder="Location EN"
              name="locationEN"
              value={formData.locationEN}
              onChange={handleChange}
              className={`input ${errors.locationEN ? "border-red-500 border" : ""}`}
            />
          </div>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Home Team</label>
            <select
              name="homeTeam"
              value={formData.homeTeam}
              onChange={handleChange}
              className={`input ${errors.homeTeam ? "border-red-500 border" : ""}`}
            >
              <option value="">Select Home Team</option>
              {TeamData?.data.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.nameEN}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Away Team</label>
            <select
              name="awayTeam"
              value={formData.awayTeam}
              onChange={handleChange}
              className={`input ${errors.awayTeam ? "border-red-500 border" : ""}`}
            >
              <option value="">Select Away Team</option>
              {TeamData?.data.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.nameEN}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Home Score</label>
            <input
              type="number"
              placeholder="Home Score"
              name="homeScore"
              value={formData.homeScore}
              onChange={handleChange}
              className={`input ${errors.homeScore ? "border-red-500 border" : ""}`}
            />
          </div>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Away Score</label>
            <input
              type="number"
              placeholder="Away Score"
              name="awayScore"
              value={formData.awayScore}
              onChange={handleChange}
              className={`input ${errors.awayScore ? "border-red-500 border" : ""}`}
            />
          </div>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Date & Time</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`input ${errors.date ? "border-red-500 border" : ""}`}
            />
          </div>

          <div className="input-group">
            <label className="btn btn-input w-[10em]">Video URL</label>
            <input
              type="url"
              placeholder="Video URL"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Additional Images Section */}
        <div className="bg-white p-6 mt-8 shadow-lg rounded-2xl">
          <h2 className="text-xl font-bold text-center mb-4">
            Additional Images
          </h2>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md
              file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
              file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 mb-4"
          />

          <div className="flex flex-wrap gap-4 max-h-48 overflow-y-auto">
            {images.length > 0 ? (
              images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`img-${idx}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No additional images selected</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Match"}
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

export default UpdateMatch;
