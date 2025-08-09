import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOneMatchQuery } from "../../../rtk/matchApi/matchApi"; // تأكد من مسار الـ API الصحيح

const useViewMatch = () => {
  const { id } = useParams();

  console.log("Match ID:", id);

  const { data: matchData, isLoading, error } = useGetOneMatchQuery(id);

  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (matchData?.data) {
      const mappedMatch = {
        locationAR: matchData.data.locationAR || "",
        locationEN: matchData.data.locationEN || "",
        homeTeam: matchData.data.homeTeam || null, // قد يكون كائن populated أو id
        awayTeam: matchData.data.awayTeam || null, // نفس الشيء
        result: {
          homeScore: matchData.data.result?.homeScore ?? 0,
          awayScore: matchData.data.result?.awayScore ?? 0,
        },
        videos: matchData.data.videos || null,
        photo: matchData.data.photo || null,
        images: Array.isArray(matchData.data.images) ? matchData.data.images : [],
        date: matchData.data.date || "",
        createdAt: matchData.data.createdAt || null,
        updatedAt: matchData.data.updatedAt || null,
      };
      setMatch(mappedMatch);
    } else {
      setMatch(null);
    }
  }, [matchData]);

  return {
    match,
    isLoading,
    error,
  };
};

export default useViewMatch;
