import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";

import {
  useDeleteMatchMutation,
  useGetAllMatchQuery,
  useImportMatchTableMutation
} from "../../../rtk/matchApi/matchApi";

const useGetAllMatches = () => {
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
    data: MatchesData,
    isLoading,
    error,
    refetch,
  } = useGetAllMatchQuery(query);

  const [deleteMatch] = useDeleteMatchMutation();

  const [importMatchTable, { isLoading: isImporting }] = useImportMatchTableMutation();

  const handleDeleteMatch = async () => {
    try {
      if (DeleteId) {
        const result = await deleteMatch(DeleteId).unwrap();
        toast.success("Match Deleted successfully!");
        setDeleteId();
        if (result.status !== "true") {
          toast.error("Failed to Delete Match!");
        }
      }
    } catch (err) {
      console.error("delete failed", err);
      toast.error("Failed to Delete Match!");
    }
  };

  const handleImportMatches = async (file) => {
    try {
      if (!file) {
        toast.error("Please select a file!");
        return;
      }
      await importMatchTable(file).unwrap();
      toast.success("Matches imported successfully!");
      refetch();
    } catch (err) {
      console.error("Import failed", err);
      toast.error("Failed to import matches!");
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
    MatchesData,
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
    handleDeleteMatch,
    handleImportMatches,
    isImporting,
    totalCount: MatchesData?.pagination?.totalItems || 0,
    totalPages: MatchesData?.pagination?.totalPages || 0,
    searchTerm,
    handleSearch,
    refetch
  };
};

export default useGetAllMatches;
