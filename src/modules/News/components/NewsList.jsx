import React from "react";
import { FormattedMessage } from "react-intl";
import { Container, Tooltip } from "@mui/material";
import useGetAllNews from "../hooks/useGetAllNews";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/delete-modal/DeleteModal";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import PageSizeSelector from "../../../components/Global/PageSizeSelector";
import Pagination from "../../../components/Global/Pagination";
import { ToastContainer } from "react-toastify";
import FormatTime from "../../../hooks/Global/FormatTime";

const NewsList = () => {
  const {
    NewsData,
    isLoading,
    error,
    currentPage,
    perPage,
    setCurrentPage,
    setPerPage,
    show,
    setShow,
    DeleteId,
    setDeleteId,
    handleDeleteNews,
    totalCount,
    totalPages,
    searchTerm,
    handleSearch,
  } = useGetAllNews();
  console.log(NewsData);

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const onPageChange = (page) => {
    if (page < 1) page = 1;
    else if (page > totalCount) page = totalCount;
    setCurrentPage(page);
  };

  const onPerPageChange = (limit) => {
    setPerPage(limit);
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">
              <FormattedMessage id="News" />
            </h3>
            <div className="flex gap-6 items-center">
              <Link to={"/add-news"}>
                <button
                  type="button"
                  className="btn btn-sm btn-outline btn-primary h-8  flex items-center gap-2 capitalize"
                >
                  <i className="ki-outline ki-plus-squared"></i>
                  Add News Item
                </button>
              </Link>

              <div className="relative">
                <i className="ki-outline ki-magnifier leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3"></i>
                <input
                  className="input input-sm pl-8 w-[250px]"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search..."
                />
              </div>

              <span className="badge badge-primary badge-outline w-[150px]">
                Number of News: {totalCount}
              </span>
            </div>
          </div>

          <div className="card-body">
            <div data-datatable="true" data-datatable-page-size="5">
              <div className="scrollable-x-auto">
                <table
                  className="table table-auto table-border"
                  id="grid_table"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="min-w-[175px]">Image</th>
                      <th className="min-w-[175px]">Title</th>
                      <th className="min-w-[125px]">Created At</th>
                      <th className="w-[80px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NewsData?.data?.map((item, index) => (
                      <tr key={item._id}>
                        <td>
                          <span className="badge badge-outline">
                            {(currentPage - 1) * perPage + index + 1}
                          </span>
                        </td>
                        <td>
                          <img src={item?.photo} className="w-[4em] " />
                        </td>

                        <td>{item.titleEN} </td>

                        <td>{FormatTime(item?.createdAt)}</td>

                        <td>
                          <div className="flex gap-2 items-center">
                            <Link to={`/news-details/${item._id}`}>
                              <Tooltip placement="top" disableInteractive>
                                <i className="btn ki-duotone ki-eye text-xl p-0 cursor-pointer"></i>
                              </Tooltip>
                            </Link>
                            <Link to={`/update-news/${item._id}`}>
                              <Tooltip
                                title="edit"
                                placement="top"
                                disableInteractive
                              >
                                <button className="cursor-pointer">
                                  <i className="ki-filled ki-notepad-edit text-xl" />
                                </button>
                              </Tooltip>
                            </Link>
                            <Tooltip
                              title="delete"
                              placement="top"
                              disableInteractive
                            >
                              <div
                                className="relative group cursor-pointer"
                                onClick={() => {
                                  setDeleteId(item._id);
                                  setShow(true);
                                }}
                              >
                                <i className="ki-filled ki-trash text-xl text-red-500 text-xl" />
                              </div>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="card-footer flex justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium">
                  <PageSizeSelector
                    perPage={perPage}
                    setPerPage={onPerPageChange}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={onPageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        sh={show}
        onClose={setShow}
        Delete={handleDeleteNews}
        title={"Delete News item"}
        question={"Are you sure you want to delete this item?"}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        rtl={false}
      />
    </Container>
  );
};

export default NewsList;
