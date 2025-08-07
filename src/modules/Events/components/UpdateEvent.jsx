import React from "react";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UpdateEventHook from "../hooks/useUpdateEvent"; // تأكد من المسار الصحيح

function UpdateEvent() {
  const {
    formData,
    inputErrors,
    handleUpdate,
    isLoading,
    resetForm,
    handleChange,
    handleImagesChange,
  } = UpdateEventHook();

  return (
    <Container maxWidth="lg" className="my-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col gap-6">
          <h2 className="text-xl font-bold text-center mb-4">Update Event</h2>

          {/* Title */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Event Title..."
              type="text"
              className={`input ${inputErrors.title ? "border-red-500 border" : ""}`}
            />
          </div>

          {/* Location */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event Location..."
              type="text"
              className={`input ${inputErrors.location ? "border-red-500 border" : ""}`}
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
              className={`input ${inputErrors.date ? "border-red-500 border" : ""}`}
            />
          </div>

          {/* Main Photo URL */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Main Photo URL</label>
            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="URL or filename of main photo"
              type="text"
              className="input"
            />
          </div>

          {/* Additional Images */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Additional Images</label>
            <input
              name="images"
              value={formData.images.join(", ")}
              onChange={(e) => {
                const imagesArray = e.target.value
                  .split(",")
                  .map((img) => img.trim())
                  .filter((img) => img.length > 0);
                handleImagesChange(imagesArray);
              }}
              placeholder="Enter additional image URLs separated by commas"
              type="text"
              className="input"
            />
          </div>

          {/* Video URL */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Video URL</label>
            <input
              name="video"
              value={formData.video}
              onChange={handleChange}
              placeholder="Video URL"
              type="text"
              className="input"
            />
          </div>
        </div>

        {/* Description Editor */}
        <div
          className={`bg-white p-6 shadow-lg rounded-2xl mt-8 ${
            inputErrors.description ? "border border-red-500" : ""
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <ReactQuill
            value={formData.description}
            onChange={(value) =>
              handleChange({ target: { name: "description", value } })
            }
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

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose(false);
            }}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Updating ..." : "Update Event"}
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

export default UpdateEvent;
