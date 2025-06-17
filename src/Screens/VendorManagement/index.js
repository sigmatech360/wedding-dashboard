import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import placeholderimage from '../../Assets/images/placeholderimage.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,

  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import "./style.css";

export const VendorManagement = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");



  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);

  const [handledeleteid, setHandledeleteid] = useState()
  const [handleApproveid, setHandApproveid] = useState()

  const handleApprove = (id) => {
    setShowModal5(true)
    setHandApproveid(id) 
  }
  
  const ApproveVendor = () => {
    const token = localStorage.getItem("token");
    document.querySelector(".loaderBox").classList.remove("d-none");
    
    
    fetch(`${apiUrl}/vendor/${handleApproveid}/status`, {
      method: "POST",
      body: JSON.stringify({status:'approved'}),
      headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('aPPROVED ',data?.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        // setData(data?.data);
        Vendorlist();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  }

  const [handleRejectid, setHandRejectid] = useState()

  const handleReject = (id) => {
    setShowModal6(true)
    setHandRejectid(id) 
  }

  const RejectVendor = () => {
    const token = localStorage.getItem("token");
    document.querySelector(".loaderBox").classList.remove("d-none");
    
    
    fetch(`${apiUrl}/vendor/${handleRejectid}/status`, {
      method: "POST",
      body: JSON.stringify({status:'rejected'}),
      headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('aPPROVED ',data?.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        // setData(data?.data);
        Vendorlist();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  }




  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate("/add-vendor");
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
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  const apiUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  const Vendorlist = () => {
    const token = localStorage.getItem("token");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/all-vendor`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data?.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setData(data?.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Wedding Concierge | Vendor Management";
    Vendorlist();
  }, []);


  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "business_Logo",
      title: "Business Logo",
    },
    {
      key: "name",
      title: "  Name",
    },
    // {
    //   key: "phone",
    //   title: "phone",
    // },
    {
      key: "phone",
      title: "phone No",
    },
    
    {
      key: "status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
    },
  ];

  // const DeleteMember = ( ) => {
  //   const token = localStorage.getItem("token");
  //   document.querySelector(".loaderBox").classList.remove("d-none");
  //   fetch(`${apiUrl}/api/admin/member/${handledeleteid}`, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       document.querySelector(".loaderBox").classList.add("d-none");
  //       Vendorlist();
  //     })
  //     .catch((error) => {
  //       document.querySelector(".loaderBox").classList.add("d-none");
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Vendor Management</h2>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="addUser">
                      {/* <CustomButton
                        text="Add Vendor"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      /> */}
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
                        {currentItems?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={
                                  item?.business_Logo
                                    ? `${imageUrl}/${item.business_Logo}`
                                    : placeholderimage
                                }
                                className="avatarIcon"
                              />
                            </td>
                            <td className="text-capitalize">
                              {item?.name == null
                                ? "No Title Available"
                                : item?.name}
                            </td>
                            {/* <td className="text-capitalize">{item?.name}</td> */}
                            <td>   {item?.phone == null
                              ? "No Phone No Available"
                              : item?.phone}</td>
                            <td className={`${item?.status == "approved" ? 'text-success' : "text-danger"} text-capitalize`}>{item?.status}</td>
                            <td>
                              {/* <Link to={`/vendor-management/vendor-details/${item?.id}`} className="btn btn-secondary py-1">View</Link> */}
                              <Dropdown className="tableDropdown">
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
                                    to={`/vendor-management/vendor-details/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  {/* <Link
                                    to={`/vendor-management/edit-vendor/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link> */}
                                {item?.status != "approved" ?  (

                                  <button
                                    type="button"
                                    className="tableAction border-0 ps-lg-3 pt-1"
                                    onClick={() => handleApprove(item?.id)}
                                  >
                                    {/* <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>{" "} */}
                                    Approve
                                  </button>
                                ):(

                                  <button
                                    type="button"
                                    className="tableAction border-0 ps-lg-3 pt-1"
                                    onClick={() => handleReject(item?.id)}
                                  >
                                    {/* <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>{" "} */}
                                    Reject
                                  </button>
                                )}
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data?.length}
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



          <CustomModal show={showModal5} close={() => { setShowModal5(false) }} action={() => { setShowModal5(false); ApproveVendor() }} heading={" Do you want to Approve this Vendor ?"} />
          <CustomModal show={showModal6} close={() => { setShowModal6(false) }} action={() => { setShowModal6(false); RejectVendor() }} heading={" Do you want to Reject this Vendor ?"} />
        </div>
      </DashboardLayout>
    </>
  );
};
