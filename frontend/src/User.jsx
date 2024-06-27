import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddNewUser,
  DeleteUser,
  GetAllUsers,
  UpdateUser,
} from "./Apollo-Client";
const User = () => {
  const [isEdit, setsiEdit] = useState(false);
  const [EditID, setEditID] = useState("");
  const [user, setuser] = useState({
    UserName: "",
    Email: "",
    Password: "",
    Profile: "",
    Confirm: "",
  });

  let UpdateOld =
    "https://res.cloudinary.com/dcteurhwi/image/upload/v1719502559/pv57z8pxtvmppvcyvpou.png";

  const { data, loading, error } = useQuery(GetAllUsers);

  const [Delele] = useMutation(DeleteUser);

  const [Insert] = useMutation(AddNewUser);
  const [Update] = useMutation(UpdateUser);

  const HandleUser = async (e) => {
    e.preventDefault();
    const upload_preset = "wnx0tmuv";
    const cloud_name = "dcteurhwi";
    let formdata = new FormData();
    formdata.append("file", user.Profile);
    formdata.append("upload_preset", upload_preset);

    if (isEdit) {
      Update({
        variables: {
          id: EditID.ID,
          editUser: {
            UserName: user.UserName,
            Email: user.Email,
            Password: user.Password,
            Confirm: user.Confirm,
            Profile: user.Profile
              ? await axios
                  .post(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                    formdata
                  )
                  .then(({ data }) => data.secure_url)
              : user.Profile,
          },
        },
      });

      toast.success("Successfully Update User");
    } else {
      toast.success("Successfully Created New User");
      Insert({
        variables: {
          addUser: {
            UserName: user.UserName,
            Email: user.Email,
            Password: user.Password,
            Profile: user.Profile
              ? await axios
                  .post(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                    formdata
                  )
                  .then(({ data }) => data.secure_url)
              : UpdateOld,
          },
        },
      });
    }
  };

  const Handle = (data) => {
    setsiEdit(true);
    setEditID(data);
    const obj = {
      UserName: data.UserName,
      Email: data.Email,
      Password: data.Password,
      Confirm: data.Confirm,
    };
    setuser(obj);
  };

  const HandleDelete = (data) => {
    toast.success("Successfully Delete User");
    Delele({
      variables: {
        id: data.ID,
      },
    });
  };

  if (error)
    return <h1 className="text-center m-4">We Catch Something Error </h1>;
  if (loading) return <h1 className="text-center m-4">Loading </h1>;
  return (
    <>
      <div
        className="contaier d-flex align-items-center  text-center  justify-content-center "
        style={{ height: "600px" }}
      >
        <div className="card" style={{ width: "450px", borderRadius: "12px" }}>
          <div
            className="card-title   "
            style={{
              fontSize: "38px",
              fontWeight: "600",
              position: "relative",
            }}
          >
            <strong>
              {isEdit ? (
                <img
                  src={
                    user.Profile
                      ? URL.createObjectURL(user.Profile)
                      : EditID.Profile
                  }
                  style={{
                    width: "100px",
                    borderRadius: "50%",
                    height: "100px",
                    marginTop: "10px",
                  }}
                />
              ) : (
                "Create User"
              )}
            </strong>
            {isEdit && (
              <button
                onClick={() => HandleDelete(EditID)}
                className=" btn btn-danger mt-2 "
                style={{ position: "absolute", right: "12px" }}
              >
                Delete
              </button>
            )}
          </div>
          <div className="card-body ">
            <form onSubmit={HandleUser}>
              <div className="row">
                <div
                  className="col-6"
                  style={{ width: "80%", margin: "0 auto" }}
                >
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Your Name"
                    value={user.UserName}
                    onChange={(e) =>
                      setuser({
                        ...user,
                        UserName: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  className="col-6"
                  style={{ width: "80%", margin: "0 auto" }}
                >
                  <input
                    type="text"
                    className="form-control mt-4"
                    placeholder="Enter Your E-mail"
                    value={user.Email}
                    onChange={(e) =>
                      setuser({
                        ...user,
                        Email: e.target.value,
                      })
                    }
                  />
                </div>

                {isEdit ? (
                  <div
                    className="col-6"
                    style={{ width: "80%", margin: "0 auto" }}
                  >
                    <input
                      type="text"
                      className="form-control mt-4"
                      placeholder="Enter Your Confirm"
                      value={user.Confirm}
                      onChange={(e) =>
                        setuser({
                          ...user,
                          Confirm: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div
                    className="col-6"
                    style={{ width: "80%", margin: "0 auto" }}
                  >
                    <input
                      type="text"
                      className="form-control mt-4"
                      placeholder="Enter Your Password"
                      value={user.Password}
                      onChange={(e) =>
                        setuser({
                          ...user,
                          Password: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                <div
                  className="col-6"
                  style={{ width: "80%", margin: "0 auto" }}
                >
                  <label htmlFor="upload" className="form-control mt-4">
                    {user.Profile ? user.Profile.name : "Upload-Image"}
                  </label>
                  <input
                    type="file"
                    id="upload"
                    hidden
                    className="form-control mt-4"
                    onChange={(e) =>
                      setuser({
                        ...user,
                        Profile: e.target.files[0],
                      })
                    }
                  />
                </div>

                <div
                  className="col-6"
                  style={{ width: "30%", margin: "0 auto" }}
                >
                  <button
                    type="text"
                    className="form-control btn btn-primary mt-4"
                  >
                    {isEdit ? "Update" : "AddUser"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <table className="container table table-bordered text-center mt-5">
        <thead>
          <tr>
            <th>Profile</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.GetAllUsers.map((data, index) => (
            <tr key={index} onClick={() => Handle(data)}>
              <td>
                {
                  <img
                    src={data.Profile}
                    style={{
                      width: "50px",
                      borderRadius: "50%",
                      height: "50px",
                    }}
                  />
                }
              </td>
              <td>{data.UserName}</td>
              <td>{data.Email}</td>
              <td>{data.Confirm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default User;
