import { Container } from "@mui/material";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import { useAddNews } from "../hooks/useAddNews";

function AddNews() {
  const {
    formData,
    handleChange,
    handleContentChangeEn,
    handleContentChangeAr,
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
  } = useAddNews();

  return (
    <Container maxWidth="lg" className="my-10">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-2xl">
            <h2 className="text-xl font-bold text-center mb-4">Add Photo</h2>

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
                <span className="text-gray-400">
                  No Selected <i className="icon-magento"></i>
                </span>
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
          {/* News Information Section */}
          <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col gap-6">
            <h2 className="text-xl font-bold text-center mb-4">
              News Information
            </h2>

            {/* Title */}
            <div className="input-group">
              <label className="btn btn-input w-[7em]">Title-en</label>
              <input
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                placeholder="Enter Title English ..."
                type="text"
                className={`input ${errors.title_en ? "border-red-500 border" : ""}`}
              />
            </div>
            <div className="input-group">
              <label className="btn btn-input w-[7em]">Title-ar</label>
              <input
                name="title_ar"
                value={formData.title_ar}
                onChange={handleChange}
                placeholder="Enter Title Arabic ..."
                type="text"
                className={`input ${errors.title_ar ? "border-red-500 border" : ""}`}
              />
            </div>

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
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                name="isVideo"
                checked={formData.isVideo}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                id="isVideo"
              />
              <label htmlFor="isVideo" className="font-medium">
                video link
              </label>
            </div>

            {formData.isVideo && (
              <div className="input-group mb-6">
                <label className="btn btn-input w-[10em]">video link</label>
                <input
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="enter video url"
                  type="url"
                  className={`input ${errors.videoUrl ? "border-red-500" : ""}`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div className="grid grid-cols-2">
          <div
            className={`bg-white p-6 shadow-lg rounded-2xl mt-8 ${
              errors.content ? "border border-red-500" : ""
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Content-en</h2>
            <ReactQuill
              value={formData.content_en}
              onChange={handleContentChangeEn}
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

          <div
            className={`bg-white p-6 shadow-lg rounded-2xl mt-8 ${
              errors.content ? "border border-red-500" : ""
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Content-ar</h2>
            <ReactQuill
              value={formData.content_ar}
              onChange={handleContentChangeAr}
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
        </div>
        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving ..." : "Save News"}
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

export default AddNews;
