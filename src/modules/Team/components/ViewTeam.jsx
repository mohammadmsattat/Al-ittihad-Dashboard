import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useViewTeam from "../hooks/useViewTeam";

function ViewField({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-800">{value || "-"}</span>
    </div>
  );
}

export default function ViewTeam() {
  const { team, isLoading, error } = useViewTeam();
  console.log(team);
  

  if (isLoading) {
    return <p className="text-center py-10">Loading team details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Failed to load team details.</p>;
  }

  if (!team) {
    return <p className="text-center py-10">No team data found.</p>;
  }

  return (
    <Container maxWidth="md" className="my-12 space-y-8">
      {/* ✅ Row with Logo Card + Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Logo Card */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
          <div className="w-32 h-32 rounded-lg border flex items-center justify-center overflow-hidden border-gray-300">
            {team.photo ? (
              <img
                src={team.photo}
                alt={team.nameEN || "Team"}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Logo</span>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2 space-y-4">
          <ViewField label="اسم الفريق (عربي)" value={team.nameAR} />
          <ViewField label="Team Name (English)" value={team.nameEN} />
          <ViewField label="Sport" value={team.sport} />
        </div>
      </div>

      {/* ✅ Stats Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Team Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Wins</p>
            <p className="text-2xl font-bold text-blue-700">{team.stats?.wins ?? 0}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Losses</p>
            <p className="text-2xl font-bold text-red-700">{team.stats?.losses ?? 0}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Draws</p>
            <p className="text-2xl font-bold text-yellow-700">{team.stats?.draws ?? 0}</p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar pauseOnHover />
    </Container>
  );
}
