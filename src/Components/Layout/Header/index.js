import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userImage, mtech } from './../../../Assets/images/'
import logo from '../../../Assets/images/logo.png'
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../CustomModal";
import { useNavigate } from "react-router-dom";
import {
  faBell,
  faUser,
  faBars,
  faEllipsisV,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { notifications } from "../../../Config/Data";

import "./style.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../store/slices/user";


export const Header = (props) => {

  const [notificationState, setNotificationState] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [role,setRole] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Continue = () => {
    setShowModal(false)
    setShowModal2(true)
  }

  const handleClickPopup = () => {
    setShowModal(true)
  }

  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/logout`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        dispatch(setLogout)
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })

  }

  const apiUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = process.env.REACT_APP_BASE_IMAGE_URL;


  useEffect(() => {
    setNotificationState(notifications)
    setRole(localStorage.getItem("role"))
  }, [])


  const [userData, setUserData] = useState()


  const PrfileDetail = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/${role == 0 ? 'profile-edit': 'vendor/profile-edit'}`, {
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
        console.log('header usre data', data?.data);
        
        setUserData(data?.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };




  // console.log("userData", userData?.image)
  useEffect(() => {
    PrfileDetail()
  }, [])
  return (
    <header>
      <Navbar className="customHeader" expand="md">
        <Container fluid>
          <Link to={"/dashboard"} className="siteLogo order-2 order-lg-3 text-decoration-none">
            {/* <h1>Project <span>Camp</span></h1> */}
            <img src={logo} className="mw-100 logo" />
          </Link>
          <Navbar.Toggle className="order-4 order-lg-2 notButton">
            <FontAwesomeIcon className="bell-icon" icon={faEllipsisV} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="customCollapse order-3"
          >
            <Nav className="ms-auto">
              {/* <Dropdown className="notiDropdown me-2">
                <Dropdown.Toggle variant="transparent" className="notButton">
                  <FontAwesomeIcon className="bellIcon" icon={faBell} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="notiMenu" align="end">
                  <div className="notiHead p-3 pb-0">
                    <h4 className="mainTitle">Notifications</h4>
                  </div>
                  <div className="notificationsBody">
                    {notificationState.slice(0, 5).map((notification) => (
                      <>
                        <Link className="singleNoti" key={notification.id}>
                          <div className="singleNotiIcon">
                            <FontAwesomeIcon
                              className="notiIcon"
                              icon={faBell}
                            />
                          </div>
                          <div className="singleNotiContent">
                            <p className="notiText">{notification.text}</p>
                            <p className="notiDateTime">
                              {notification.date} | {notification.time}
                            </p>
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                  <div className="notiFooter">
                    <Link to={"/notifications"}>View All</Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}
              <Dropdown className="userDropdown">
                <Dropdown.Toggle
                  variant="transparent"
                  className="notButton toggleButton"
                >
                  <div className="userImage">
                    <img
                      src={`${imageUrl}/${userData?.image}`}
                    alt=""
                    className="img-fluid"
                    />
                  </div>
                  {/* <img src={images.profilePic} alt="" className="img-fluid" /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="userMenu" align="end">
                  <Link className="userMenuItem" to={'/profile'}>
                    <FontAwesomeIcon
                      className="me-2 yellow-text"
                      icon={faUser}
                    />{" "}
                    Profile
                  </Link>
                  <Link to="#" className="userMenuItem" onClick={handleClickPopup}>
                    <FontAwesomeIcon
                      className="me-1 yellow-text"
                      icon={faSignOut}

                    />{" "}
                    Logout
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
          <button className="notButton ms-md-2 order-lg-4 order-md-4 order-1">
            <FontAwesomeIcon
              className="bell-icon"
              onClick={props.sidebarToggle}
              icon={faBars}
            />
          </button>
        </Container>
      </Navbar>

      <CustomModal show={showModal} close={() => { setShowModal(false) }} action={Continue} heading='Are you sure you want to logout?' />
      <CustomModal show={showModal2} close={handleRedirect} success heading='Successfully Logged Out' />
    </header>
  );
};
