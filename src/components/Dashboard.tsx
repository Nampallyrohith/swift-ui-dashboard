/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useSwiftContext } from "../context/SwiftContext";
import Pagination from "../shared/Pagination";

const Dashboard = () => {
  const { comments, commentsLoader } = useSwiftContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = comments.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComments = comments.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page when itemsPerPage changes
  }, [itemsPerPage]);
  return (
    <main>
      <section className="w-4/5 mx-auto py-10">
        {commentsLoader ? (
          <div className="flex justify-center items-center w-full h-[40vh]">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <>
            <table className="table-auto border-collapse border my-10 !rounded-lg border-gray-100">
              <thead className="">
                <tr className="bg-[#272a4b] text-white text-left">
                  <th className="p-2 border border-gray-300">ID</th>
                  <th className="p-2 border border-gray-300">Post ID</th>
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Email</th>
                  <th className="p-2 border border-gray-300">Body</th>
                </tr>
              </thead>
              <tbody>
                {currentComments?.map((comment) => (
                  //@ts-ignore
                  <tr key={comment.id} className="hover:bg-gray-50">
                    {/* @ts-ignore */}
                    <td className="p-2 border border-gray-300">{comment.id}</td>
                    <td className="p-2 border border-gray-300">
                      {/* @ts-ignore */}
                      {comment.postId}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {/* @ts-ignore */}
                      {comment.name}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {/* @ts-ignore */}
                      {comment.email}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {/* @ts-ignore */}
                      {comment.body}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
