import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddEventHook } from "../hooks/useAddEvent";

function AddEvent() {
  const {
    formData,
    handleChange,
    handleDescriptionChange,
    date,
    images,
    handleImagesChange,
    removeImage,
    video,
    handleVideoChange,
    photo,
    handlePhotoChange,
    removePhoto,
    handleSubmit,
    isLoading,
    errors,
  } = AddEventHook();

  return (
    <Container maxWidth="lg" className="my-10">
      <form onSubmit={handleSubmit}>
        {/* Event Information Section */}
        <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col gap-6">
          <h2 className="text-xl font-bold text-center mb-4">
            Event Information
          </h2>

          {/* Title */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Add Title ..."
              type="text"
              className={`input ${errors.title ? "border-red-500 border" : ""}`}
            />
          </div>

          {/* Location */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Add location ..."
              type="text"
              className={`input ${errors.location ? "border-red-500 border" : ""}`}
            />
          </div>

          {/* Date */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Date</label>
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
              className={`input ${errors.date ? "border-red-500 border" : ""}`}
            />
          </div>

          {/* Main Photo */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Main Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
            />
            {photo && (
              <div className="mt-2 flex justify-between items-center text-sm bg-gray-100 px-3 py-2 rounded-md">
                <span className="truncate">{photo.name}</span>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div className="flex flex-col">
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

          {/* Video URL (Not Upload) */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Video URL</label>
            <input
              name="video"
              value={video}
              onChange={handleVideoChange}
              placeholder="Paste video URL ..."
              type="text"
              className="input"
            />
          </div>
        </div>

        {/* Description Editor */}
        <div
          className={`bg-white p-6 shadow-lg rounded-2xl mt-8 ${
            errors.description ? "border border-red-500" : ""
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
              "image",
            ]}
            className="bg-white text-black min-h-[400px]"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving ..." : "Save Event"}
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

export default AddEvent;
