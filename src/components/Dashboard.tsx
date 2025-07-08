/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useSwiftContext } from "../context/SwiftContext";
import Pagination from "../shared/Pagination";
import type { Comment } from "../model/typeDefinitions";

type SortKey = "postId" | "name" | "email";
type SortDirection = "asc" | "desc" | null;

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const Dashboard = () => {
  const { comments, commentsLoader } = useSwiftContext() as {
    comments: Comment[];
    commentsLoader: boolean;
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem("searchTerm") || ""
  );
  const [sortConfig, setSortConfig] = useState(() => {
    const stored = localStorage.getItem("sortConfig");
    return stored ? JSON.parse(stored) : { key: null, direction: null };
  });

  const filteredComments = comments.filter((comment) =>
    [comment.name, comment.email, comment.body].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedComments = sortConfig.key
    ? [...filteredComments].sort((a, b) => {
        const key = sortConfig.key!;
        // @ts-ignore
        const valA = String(a[key]).toLowerCase();
        // @ts-ignore
        const valB = String(b[key]).toLowerCase();

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      })
    : filteredComments;

  const totalItems = sortedComments.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComments = sortedComments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (key: SortKey) => {
    setSortConfig((prev: SortConfig) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [sortConfig]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }, [itemsPerPage]);

  useEffect(() => {
    const savedPage = parseInt(localStorage.getItem("currentPage") || "1", 10);
    const savedPageSize = parseInt(
      localStorage.getItem("itemsPerPage") || "10",
      10
    );
    setCurrentPage(savedPage);
    setItemsPerPage(savedPageSize);
  }, []);

  return (
    <main>
      <section className="w-4/5 mx-auto py-10">
        <div className="flex flex-col md:flex-row  justify-between items-center">
          <div className="flex gap-5">
            <div
              className="p-2 border border-gray-300 cursor-pointer rounded-lg text-sm w-24 flex justify-between"
              onClick={() => handleSort("postId")}
            >
              <span>Post ID </span>
              <span>
                {sortConfig.key === "postId" &&
                  (sortConfig.direction === "asc"
                    ? "▲"
                    : sortConfig.direction === "desc"
                    ? "▼"
                    : "")}
              </span>
            </div>
            <div
              className="p-2 border border-gray-300 cursor-pointer rounded-lg text-sm w-24 flex justify-between"
              onClick={() => handleSort("name")}
            >
              <span>Name </span>
              <span>
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc"
                    ? "▲"
                    : sortConfig.direction === "desc"
                    ? "▼"
                    : "")}
              </span>
            </div>
            <div
              className="p-2 border border-gray-300 cursor-pointer rounded-lg text-sm w-24 flex justify-between"
              onClick={() => handleSort("email")}
            >
              <span>Email </span>
              <span>
                {sortConfig.key === "email" &&
                  (sortConfig.direction === "asc"
                    ? "▲"
                    : sortConfig.direction === "desc"
                    ? "▼"
                    : "")}
              </span>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search name, email, comment"
            className="border border-gray-300 rounded-lg mt-4 md:mt-0 p-2 mb-4 w-full md:w-2/5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {commentsLoader ? (
          <div className="flex justify-center items-center w-full h-[40vh]">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full shadow overflow-x-autotable-auto border-collapse my-5 !rounded-lg border-gray-100">
                <thead>
                  <tr className="bg-gray-300 text-[#272a4b] text-left">
                    <th className="p-2 ">ID</th>
                    <th className="p-2  w-24">Post ID</th>
                    <th className="p-2 ">Name</th>
                    <th className="p-2 ">Email</th>
                    <th className="p-2 ">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {currentComments?.map((comment) => (
                    <tr key={comment.id} className="hover:bg-gray-50">
                      <td className="p-2 ">{comment.id}</td>
                      <td className="p-2 ">{comment.postId}</td>
                      <td className="p-2 ">{comment.name}</td>
                      <td className="p-2 ">{comment.email}</td>
                      <td className="p-2 ">{comment.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={setItemsPerPage}
            />
          </>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
