import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
} from "../../../rtk/newsApi/newsApi";

const useGetAllNews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const limitFromUrl = parseInt(searchParams.get("limit")) || 10;
  const categoryFromUrl = searchParams.get("category") || "";

  const [show, setShow] = useState(false);
  const [DeleteId, setDeleteId] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const query = `page=${pageFromUrl}&limit=${limitFromUrl}${
    searchTerm.trim() ? `&keyword=${searchTerm.trim()}` : ""
  }${categoryFromUrl ? `&category=${categoryFromUrl}` : ""}`;

  const {
    data: NewsData,
    isLoading,
    error,
    refetch,
  } = useGetAllNewsQuery(query);

  const [deleteNews] = useDeleteNewsMutation();

  const handleDeleteNews = async () => {
    try {
      if (DeleteId) {
        await deleteNews(DeleteId).unwrap();
        toast.success("News item Deleted successfully!");
        setDeleteId();
      
      }
    } catch (err) {
      toast.error("Failed to Delete news item!");
      console.error("delete failed", err);
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
    NewsData,
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
    handleDeleteNews,
    totalCount: NewsData?.pagination?.totalItems || 0,
    totalPages: NewsData?.pagination?.totalPages || 0,
    searchTerm,
    handleSearch,
  };
};

export default useGetAllNews;
