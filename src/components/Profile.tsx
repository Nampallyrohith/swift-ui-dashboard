import { ArrowLeft } from "lucide-react";
import { useSwiftContext } from "../context/SwiftContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, userInfoLoader } = useSwiftContext();
  const navigate = useNavigate();

  const addressString = Object.entries(user?.address || {})
    .filter(([key]) => key !== "geo")
    .map(([, value]) => value)
    .join(", ");

  return (
    <main className="w-full h-full flex justify-center items-center text-[#272a4b] opacity-95">
      <section className="w-4/5 h-full my-5">
        <div className="flex items-center gap-3 my-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer"
          >
            <ArrowLeft />{" "}
          </button>
          <p className="font-semibold tracking-wide text-lg opacity-95">
            Welcome, {user?.name}
          </p>
        </div>
        {userInfoLoader ? (
          <div className="flex justify-center items-center w-full h-[40vh]">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <div className="border shadow border-gray-200 rounded-lg w-full h-full p-7 my-8">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex justify-center items-center font-semibold bg-gray-100 rounded-full text-center">
                <p className="text-2xl text-[]">
                  {user &&
                    user.name[0][0].toLocaleUpperCase() +
                      user.name[1][0].toLocaleUpperCase()}
                </p>
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>

            {/* User details */}
            <div className="w-full grid grid-cols-1 gap-5 md:gap-x-10 md:gap-y-5 md:grid-cols-2 my-5">
              <div className="w-full">
                <label htmlFor="userId" className="text-gray-400">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  value={user?.id}
                  className="w-full bg-gray-100 rounded-md p-4 mt-2 mb-4 text-sm"
                />
              </div>
              <div className="w-full">
                <label htmlFor="name" className="text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={user?.name}
                  className="w-full bg-gray-100 rounded-md p-4 mt-2 mb-4 text-sm"
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="text-gray-400">
                  Email ID
                </label>
                <input
                  type="text"
                  id="email"
                  value={user?.email}
                  className="w-full bg-gray-100 rounded-md p-4 mt-2 mb-4 text-sm"
                />
              </div>
              <div className="w-full">
                <label htmlFor="address" className="text-gray-400">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={addressString}
                  className="w-full bg-gray-100 rounded-md p-4 mt-2 mb-4 text-sm"
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone" className="text-gray-400">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={user?.phone}
                  className="w-full bg-gray-100 rounded-md p-4 mt-2 mb-4 text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
