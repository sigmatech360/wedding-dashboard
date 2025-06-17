import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faPencil } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";

export const UserManagement = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate('/add-user')
  }


  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data?.filter(item =>
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);



  useEffect(() => {
    document.title = 'Wedding Concierge | User Management';
    const token = localStorage.getItem("token");
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}/all-users`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    )

      .then(response =>
        response.json()
      )
      .then((data) => {
        console.log('user data',data)
        document.querySelector('.loaderBox').classList.add("d-none");
        setData(data.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })


  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Name",
    },
    {
      key: "email",
      title: "Email Address",
    },
  
    {
      key: "action",
      title: "Action",
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
                    <h2 className="mainTitle">User Management</h2>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="addUser">
                      {/* <CustomButton text="Add User" variant='primaryButton' onClick={hanldeRoute}/> */}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.name}
                            </td>
                            {/* <td>{item?.username}</td> */}
                            <td>{item?.email}</td>
                            <td>
                                  <Link to={`/user-detail/${item?.id}`} className="btn btn-secondary py-1">View</Link>
                              {/* <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/edit-user/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</Link>
                                </Dropdown.Menu>

                              </Dropdown> */}
                            </td>
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

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />



        </div>
      </DashboardLayout>
    </>
  );
};
