import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOneTeamQuery } from "../../../rtk/teamApi/teamApi";

const useViewTeam = () => {
  const { id } = useParams();

  // استدعاء الـ query ولكن بدون استخدام البيانات مباشرة
  const { data: teamData, isLoading, error } = useGetOneTeamQuery(id);

  // حالة محلية لتخزين بيانات الفريق بعد المعالجة
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (teamData?.data) {
      // نقوم بعملية تحويل أو تهيئة البيانات كما نريد
      const mappedTeam = {
        nameAR: teamData.data.nameAR || "",
        nameEN: teamData.data.nameEN || "",
        sport: teamData.data.sport || "",
        stats: {
          wins: teamData.data.stats?.wins || 0,
          losses: teamData.data.stats?.losses || 0,
          draws: teamData.data.stats?.draws || 0,
        },
        photo: teamData.data.photo || null,
      };

      setTeam(mappedTeam);
    } else {
      setTeam(null);
    }
  }, [teamData]); // كل ما تغيرت البيانات تعيد المعالجة

  return {
    team,
    isLoading,
    error,
  };
};

export default useViewTeam;
