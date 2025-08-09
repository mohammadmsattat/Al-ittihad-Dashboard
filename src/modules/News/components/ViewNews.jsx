import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useViewNews from "../hooks/useViewNews";

function ViewField({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-600">{label}</span>
      <span className="mt-1 text-base text-gray-800 whitespace-pre-wrap">{value || "-"}</span>
    </div>
  );
}

export default function ViewNews() {
  const { news, isLoading, error } = useViewNews();

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500">Loading news details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Failed to load news details.</p>;
  }

  if (!news) {
    return <p className="text-center py-10 text-gray-600">No news data found.</p>;
  }

  return (
    <Container maxWidth="md" className="my-12 space-y-10">
      {/* Row: Photo Card + Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Photo Card */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
          <div className="w-32 h-32 rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center">
            {news.photo ? (
              <img
                src={news.photo}
                alt={news.titleEN || "News"}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2 space-y-6">
          <ViewField label="Title (Arabic)" value={news.titleAR} />
          <ViewField label="Title (English)" value={news.titleEN} />
          <ViewField label="Content (Arabic)" value={news.contentAR} />
          <ViewField label="Content (English)" value={news.contentEN} />

          {news.video && (
            <div className="mt-4">
              <span className="text-sm font-semibold text-gray-600 block mb-2">Video</span>
              <video controls className="w-full rounded-lg border border-gray-300 shadow-sm">
                <source src={news.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images Card */}
      {news.images && news.images.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Additional Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {news.images.map((img, i) => (
              <div
                key={i}
                className="w-full h-28 rounded-lg border border-gray-300 overflow-hidden shadow-sm"
              >
                <img
                  src={img}
                  alt={`News image ${i + 1}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar pauseOnHover />
    </Container>
  );
}
