import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useViewEvent from "../hooks/useViewEvent";

function ViewField({ label, value }) {
  return (
    <div className="flex flex-col mb-4">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-800">{value || "-"}</span>
    </div>
  );
}

export default function ViewEvent() {
  const { event, isLoading, error } = useViewEvent();

  if (isLoading) {
    return <p className="text-center py-10">Loading event details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Failed to load event details.</p>;
  }

  if (!event) {
    return <p className="text-center py-10">No event data found.</p>;
  }

  return (
    <Container maxWidth="md" className="my-12 space-y-8">
      {/* Photo Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
          <div className="w-32 h-32 rounded-lg border flex items-center justify-center overflow-hidden border-gray-300">
            {event.photo ? (
              <img
                src={event.photo}
                alt={event.titleEN || "Event"}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2 space-y-4">
          <ViewField label="Title (Arabic)" value={event.titleAR} />
          <ViewField label="Title (English)" value={event.titleEN} />
          <ViewField label="Description (Arabic)" value={event.descriptionAR} />
          <ViewField label="Description (English)" value={event.descriptionEN} />
          <ViewField label="Date" value={event.date} />
          <ViewField label="Location (Arabic)" value={event.locationAR} />
          <ViewField label="Location (English)" value={event.locationEN} />

          {event.video && (
            <div>
              <span className="text-sm font-medium text-gray-500">Video</span>
              <video controls className="w-full rounded mt-1">
                <source src={event.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images Card */}
      {event.images && event.images.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Additional Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {event.images.map((img, i) => (
              <div
                key={i}
                className="w-full h-24 rounded-lg border overflow-hidden border-gray-300"
              >
                <img src={img} alt={`Event image ${i + 1}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar pauseOnHover />
    </Container>
  );
}
