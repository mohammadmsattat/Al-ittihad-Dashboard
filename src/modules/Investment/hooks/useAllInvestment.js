import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteInvestmentMutation,
  useGetAllInvestmentQuery,
} from "../../../rtk/investmentApi/invesmetntApi";

const useGetAllInvestment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const limitFromUrl = parseInt(searchParams.get("limit")) || 10;

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const query = `page=${pageFromUrl}&limit=${limitFromUrl}${
    searchTerm.trim() ? `&keyword=${searchTerm.trim()}` : ""
  }`;

  const {
    data: investmentData,
    isLoading,
    error,
    refetch,
  } = useGetAllInvestmentQuery(query);

  const [deleteInvestment] = useDeleteInvestmentMutation();

  const handleDeleteInvestment = async () => {
    try {
      if (deleteId) {
        const result = await deleteInvestment(deleteId).unwrap();
        toast.success("Investment deleted successfully!");
        setDeleteId();
      
      }
    } catch (err) {
      toast.error("Failed to delete investment!");
      console.error("Delete failed", err);
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
    investmentData,
    isLoading,
    error,
    currentPage: pageFromUrl,
    perPage: limitFromUrl,
    setCurrentPage,
    setPerPage,
    show,
    setShow,
    deleteId,
    setDeleteId,
    handleDeleteInvestment,
    totalCount: investmentData?.pagination?.totalItems || 0,
    totalPages: investmentData?.pagination?.totalPages || 0,
    searchTerm,
    handleSearch,
  };
};

export default useGetAllInvestment;
