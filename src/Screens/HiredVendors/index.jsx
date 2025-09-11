import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";

// import "./style.css";
import toast from "react-hot-toast";
import { FaGofore } from "react-icons/fa";

export const HiredVendors = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");

  const [handledeleteid, setHandledeleteid] = useState();
  const apiUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate("/add-user");
  };

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterData = data?.filter((item) =>
    item?.data?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    document.title = "Wedding Concierge | User Management";
    HiredVendorslist();
  }, []);

  const HiredVendorslist = () => {
    const token = localStorage.getItem("admintoken");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}/all-hire-vendor`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        setData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    setShowModal5(true);
    setHandledeleteid(id);
  };

  const deleteVendor = () => {
    const token = localStorage.getItem("admintoken");
    document.querySelector(".loaderBox").classList.remove("d-none");

    fetch(`${apiUrl}/user/${handledeleteid}/delete`, {
      method: "POST",
      // body: JSON.stringify({status:'approved'}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User Deleted ", data?.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        toast.success("User Deleted Successfully");
        // setData(data?.data);
        HiredVendorslist();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "vendorname",
      title: "Vendor Name",
    },
    {
      key: "username",
      title: "User Name",
    },
    {
      key: "hiredate",
      title: "Hiring Date",
    },

    {
      key: "category",
      title: "Category",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Hired Vendors</h2>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="addUser">
                      {/* <CustomButton text="Add User" variant='primaryButton' onClick={hanldeRoute}/> */}
                      <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              <Link
                                to={`/vendor-management/vendor-details/${item?.data?.id}`}
                              >
                                {item?.data?.name}{" "}
                              </Link>
                            </td>
                            <td className="text-capitalize">
                              <Link to={`/user-detail/${item?.user_data?.id}`}>
                                {item?.user_data?.name}
                              </Link>
                            </td>
                            <td className="text-capitalize">
                              {item?.hire_date}
                            </td>
                            <td className="text-capitalize">
                              {item?.search_query?.vendor_type.join(", ")}
                            </td>
                            {/* <td><Dropdown className="tableDropdown">
                                <Dropdown.Toggle
                                  variant="transparent"
                                  className="notButton classicToggle"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                  align="end"
                                  className="tableDropdownMenu"
                                >
                                  <Link
                                    to={`/user-detail/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <button
                                    type="button"
                                    className="tableAction border-0 ps-lg-3 pt-1"
                                    onClick={() => handleDelete(item?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>{" "}
                                    Delete
                                  </button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>

                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal
            show={showModal}
            close={() => {
              setShowModal(false);
            }}
            action={inActive}
            heading="Are you sure you want to mark this user as inactive?"
          />
          <CustomModal
            show={showModal2}
            close={() => {
              setShowModal2(false);
            }}
            success
            heading="Marked as Inactive"
          />

          <CustomModal
            show={showModal3}
            close={() => {
              setShowModal3(false);
            }}
            action={ActiveMale}
            heading="Are you sure you want to mark this user as Active?"
          />
          <CustomModal
            show={showModal4}
            close={() => {
              setShowModal4(false);
            }}
            success
            heading="Marked as Active"
          />
          <CustomModal
            show={showModal5}
            close={() => {
              setShowModal5(false);
            }}
            action={() => {
              setShowModal5(false);
              deleteVendor();
            }}
            heading={" Do you want to Delete this User ?"}
          />
        </div>
      </DashboardLayout>
    </>
  );
};
