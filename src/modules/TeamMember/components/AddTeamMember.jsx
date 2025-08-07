import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

function AddTeamMember() {
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving ..." : "Save "}
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
