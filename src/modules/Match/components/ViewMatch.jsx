import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useViewMatch from "../hooks/useViewMatch";

function ViewField({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-600">{label}</span>
      <span className="mt-1 text-base text-gray-800 whitespace-pre-wrap">{value || "-"}</span>
    </div>
  );
}

export default function ViewMatch() {
  const { match, isLoading, error } = useViewMatch();

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500">Loading match details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Failed to load match details.</p>;
  }

  if (!match) {
    return <p className="text-center py-10 text-gray-600">No match data found.</p>;
  }

  return (
    <Container maxWidth="md" className="my-12 space-y-10">
      {/* Row: Photo + Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Photo Card */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
          <div className="w-32 h-32 rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center">
            {match.photo ? (
              <img
                src={match.photo}
                alt="Match photo"
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
          <ViewField label="Location (Arabic)" value={match.locationAR} />
          <ViewField label="Location (English)" value={match.locationEN} />

          <ViewField
            label="Home Team"
            value={match.homeTeam?.nameEN || match.homeTeam || "-"}
          />
          <ViewField
            label="Away Team"
            value={match.awayTeam?.nameEN || match.awayTeam || "-"}
          />

          <ViewField
            label="Result"
            value={`${match.result.homeScore} - ${match.result.awayScore}`}
          />

          <ViewField label="Date" value={match.date} />

          {match.videos && (
            <div className="mt-4">
              <span className="text-sm font-semibold text-gray-600 block mb-2">Video</span>
              <video controls className="w-full rounded-lg border border-gray-300 shadow-sm">
                <source src={match.videos} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images */}
      {match.images && match.images.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Additional Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {match.images.map((img, i) => (
              <div
                key={i}
                className="w-full h-28 rounded-lg border border-gray-300 overflow-hidden shadow-sm"
              >
                <img
                  src={img}
                  alt={`Match image ${i + 1}`}
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
