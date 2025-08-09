import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UpdateEventHook from "../hooks/useUpdateEvent";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

function UpdateEvent() {
  const {
    formData,
    handleChange,
    handleDescriptionChangeAR,
    handleDescriptionChangeEN,
    handlePhotoChange,
    removePhoto,
    handleImagesChange,
    removeImage,
    photo,
    images,
    handleSubmit,
    isLoading,
    isError,
    errors,
  } = UpdateEventHook();


if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;
  
  return (
    <Container maxWidth="lg" className="my-10">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col gap-6">
          <h2 className="text-xl font-bold text-center mb-4">Update Event</h2>

          {/* Title */}
          <div className="grid grid-cols-2 gap-5">
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Title-en</label>
              <input
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                placeholder="Enter The English Title ..."
                type="text"
                className={`input ${errors.title_en ? "border-red-500 border" : ""}`}
              />
            </div>
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Title-ar</label>
              <input
                name="title_ar"
                value={formData.title_ar}
                onChange={handleChange}
                placeholder="Enter The Arabic Title ..."
                type="text"
                className={`input ${errors.title_ar ? "border-red-500 border" : ""}`}
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-5">
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Location-en</label>
              <input
                name="location_en"
                value={formData.location_en}
                onChange={handleChange}
                placeholder="Enter The English location ..."
                type="text"
                className={`input ${errors.location_en ? "border-red-500 border" : ""}`}
              />
            </div>
            <div className="input-group">
              <label className="btn btn-input w-[9em]">Location-ar</label>
              <input
                name="location_ar"
                value={formData.location_ar}
                onChange={handleChange}
                placeholder="Enter The Arabic location ..."
                type="text"
                className={`input ${errors.location_ar ? "border-red-500 border" : ""}`}
              />
            </div>
          </div>

          {/* Date */}
          <div className="input-group">
            <label className="btn btn-input w-[9em]">Date</label>
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
            <label className="mb-2 font-semibold text-gray-700">
              Main Photo
            </label>
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
                <span className="truncate">
                  {typeof photo === "string" ? photo : photo.name}
                </span>
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
                    <span className="truncate">
                      {typeof file === "string" ? file : file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(file.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Video */}
          <div className="input-group">
            <label className="btn btn-input w-[9em]">Video URL</label>
            <input
              name="video"
              value={formData.video}
              onChange={handleChange}
              placeholder="Paste video URL ..."
              type="text"
              className="input"
            />
          </div>
        </div>

        {/* Description Editors */}
        <div className="grid grid-cols-2 gap-5">
          <div className={`bg-white p-6 shadow-lg rounded-2xl mt-8`}>
            <h2 className="text-xl font-bold mb-4">Description-en</h2>
            <ReactQuill
              value={formData.description_en}
              onChange={handleDescriptionChangeEN}
              className="bg-white text-black min-h-[400px]"
            />
          </div>
          <div className={`bg-white p-6 shadow-lg rounded-2xl mt-8`}>
            <h2 className="text-xl font-bold mb-4">Description-ar</h2>
            <ReactQuill
              value={formData.description_ar}
              onChange={handleDescriptionChangeAR}
              className="bg-white text-black min-h-[400px]"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}

export default UpdateEvent;
