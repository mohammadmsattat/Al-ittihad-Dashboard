import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteMembershipMutation,
  useGetAllMembershipQuery,
} from "../../../rtk/membershipApi/membershipApi";

const useGetAllMembership = () => {
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
    data: MembershipData,
    isLoading,
    error,
    refetch,
  } = useGetAllMembershipQuery(query);

  const [deleteMembership] = useDeleteMembershipMutation();

  const handleDeleteMembership = async () => {
    try {
      if (DeleteId) {
        const result = await deleteMembership(DeleteId).unwrap();
        toast.success("Membership Deleted successfully");
        setDeleteId();
     
      }
    } catch (err) {
      toast.error("Failed To Delete Membership");
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
    MembershipData,
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
    handleDeleteMembership, 
    totalCount: MembershipData?.pagination?.totalItems || 0,
    totalPages: MembershipData?.pagination?.totalPages || 0,
    searchTerm,
    handleSearch,
  };
};

export default useGetAllMembership;
