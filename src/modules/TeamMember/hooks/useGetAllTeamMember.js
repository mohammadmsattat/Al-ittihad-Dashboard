import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import {
  useDeleteTeamMemberMutation, // ✅ used correct mutation name
  useGetAllTeamMemberQuery,
} from "../../../rtk/teamMemberApi/teamMemberApi";

const useGetAllTeamMember = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const limitFromUrl = parseInt(searchParams.get("limit")) || 10;

  const [show, setShow] = useState(false);
  const [DeleteId, setDeleteId] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const query = `page=${pageFromUrl}&limit=${limitFromUrl}${
    searchTerm.trim() ? `&keyword=${searchTerm.trim()}` : ""
  }`;

  const {
    data: TeamMemberData,
    isLoading,
    error,
    refetch,
  } = useGetAllTeamMemberQuery(query);

  const [deleteTeamMember] = useDeleteTeamMemberMutation(); // ✅ renamed from deleteNews

  const handleDeleteTeamMember = async () => {
    try {
      if (DeleteId) {
        const result = await deleteTeamMember(DeleteId).unwrap(); // ✅ updated function name

        // ✅ Updated logic for accurate toast messages based on returned status
        if (result.status === "true") {
          toast.success("Team Member Deleted successfully");
          setDeleteId();
        } else {
          toast.error("Failed to Delete!");
        }
      }
    } catch (err) {
      console.error("delete failed", err);
      toast.error("Something went wrong while deleting"); // optional improvement
    }
  };

  const setCurrentPage = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const setPerPage = (limit) => {
    searchParams.set("limit", limit);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleSearch = (word) => {
    setSearchTerm(word);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  return {
    TeamMemberData,
    isLoading,
    error,
    currentPage: pageFromUrl,
    perPage: limitFromUrl,
    setCurrentPage,
    setPerPage,
    show,
    setShow,
    DeleteId,
    setDeleteId,
    handleDeleteTeamMember,
    totalCount: TeamMemberData?.pagination?.totalItems || 0,
    totalPages: TeamMemberData?.pagination?.totalPages || 0,
    searchTerm,
    handleSearch,
    refetch, 
  };
};

export default useGetAllTeamMember;
