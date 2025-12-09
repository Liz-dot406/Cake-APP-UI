import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { usersAPI, type Typeuser } from "../../../../features/users/usersAPI";
import { UpdateUserModal } from "./Updateuser";
import { DeleteUserModal } from "./Deleteuser";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<Typeuser | null>(null);
  const [userToDelete, setUserToDelete] = useState<Typeuser | null>(null);

  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = usersAPI.useGetUsersQuery();

  
  const adminUsers = usersData?.filter(
    (user: Typeuser) => user.role?.toLowerCase() === "admin"
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-pink-500 mb-6">Admin - Users</h1>

      {isLoading && <p className="text-gray-700 text-center">Loading users...</p>}

      {error && (
        <p className="text-red-600 text-center font-medium mt-2">
          {(error as any)?.data?.message || "Failed to fetch users."}
        </p>
      )}

      {adminUsers && adminUsers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminUsers.map((user: Typeuser) => (
            <div
              key={user.user_Id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between transition hover:shadow-lg hover:scale-[1.02]"
            >
             
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center text-pink-600 font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>

              
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  Phone: <span className="font-medium">{user.phone || "-"}</span>
                </p>
                <p>
                  Role: <span className="capitalize font-medium">{user.role}</span>
                </p>
                <p>
                  Status:{" "}
                  {user.is_verified ? (
                    <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-block bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  )}
                </p>
                <p>
                  Created:{" "}
                  {user.Created_At ? new Date(user.Created_At).toLocaleString() : "-"}
                </p>
                <p>
                  Updated:{" "}
                  {user.Updated_At ? new Date(user.Updated_At).toLocaleString() : "-"}
                </p>
              </div>

              
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-md transition flex justify-center items-center gap-2"
                  onClick={() => {
                    setSelectedUser(user);
                    (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
                  }}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition flex justify-center items-center gap-2"
                  onClick={() => {
                    setUserToDelete(user);
                    (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
                  }}
                >
                  <MdDeleteForever /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-700 text-center mt-4 font-medium">No admin users found.</p>
        )
      )}

      
      <UpdateUserModal selectedUser={selectedUser} refetchUsers={refetch} />
      <DeleteUserModal userToDelete={userToDelete} refetchUsers={refetch} />
    </div>
  );
}
