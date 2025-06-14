import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import ConfirmModal from "@/components/confirmModal";
import verifiedImg from "@/assets/images/verified.png";

const User = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, loading, error } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    try {
      const response = await deleteData(
        `${getEvn("VITE_API_BASE_URL")}/user/delete/${id}`
      );

      if (response?.success) {
        showToast("success", "User deleted successfully.");
        setRefreshData((prev) => !prev);
      } else {
        showToast("error", response?.message || "User could not be deleted.");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      showToast("error", "Something went wrong while deleting the user.");
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Users page</title>
        <meta name="description" content="Users page" />
      </Helmet>
      <div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Dated</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.user.length > 0 ? (
                  data.user.map((user) => (
                    <TableRow key={user?._id}>
                      <TableCell>{user?.role}</TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-10 min-w-10 h-10">
                            <img
                              src={user?.avatar || usericon}
                              alt="avatar"
                              className={`w-full h-full object-cover rounded-full border-2 ${
                                user?.role === "admin"
                                  ? "border-blue-400"
                                  : "border-gray-300"
                              }`}
                              onError={(e) => {
                                console.error(
                                  "Google image failed to load:",
                                  e
                                );
                                e.currentTarget.src = usericon;
                              }}
                            />
                            {user?.role === "admin" && (
                              <img
                                src={verifiedImg}
                                alt="verified"
                                className="absolute bottom-0 -right-1 w-[18px]"
                              />
                            )}
                          </div>
                          <span className="font-medium">{user?.name}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {moment(user?.createdAt).format("DD-MM-YYYY")}
                      </TableCell>

                      <TableCell className="flex gap-3">
                        <Button
                          variant="outline"
                          className="hover:bg-violet-500 hover:text-white "
                          disabled={user?.role === "admin" ? true : false}
                        >
                          <a href={`/user/edit/${user._id}`}>
                            <FiEdit />
                          </a>
                        </Button>

                        <Button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                          variant="outline"
                          className="hover:bg-violet-500 hover:text-white"
                          disabled={user?.role === "admin" ? true : false}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="3">Data not found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(selectedUser._id)}
        description={`Are you sure you want to delete user ${selectedUser?.name}?`}
        title="Delete User"
        confirmLabel="Delete"
      />
    </>
  );
};

export default User;
