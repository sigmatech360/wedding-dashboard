import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import placeholderimage from "../../Assets/images/placeholderimage.png";
import CustomButton from "../../Components/CustomButton";

import "./style.css";
import { useDispatch, useSelector } from "../../store";
import { FiUploadCloud, FiUser } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import toast from "react-hot-toast";
import { setLogin } from "../../store/slices/user";
import axios from "axios";

const Profile = () => {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = process.env.REACT_APP_BASE_IMAGE_URL;
  const { user } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editBusinessName, setEditBusinessName] = useState(false);
  const [editBusinessAddress, setEditBusinessAddress] = useState(false);
  const [editBusinessType, setEditBusinessType] = useState(false);
  const [editBusinessYear, setEditBusinessYear] = useState(false);
  const [editPreferedContact, setEditPreferedContact] = useState(false);
  const [editPackagePrice, setEditPackagePrice] = useState(false);
  const [editServiceCategory, setEditServiceCategory] = useState(false);

  // Website instagram facebook
  const [editWebsite, setEditWebsite] = useState(false);
  const [editFacebook, setEditFacebook] = useState(false);
  const [editInstagram, setEditInstagram] = useState(false);

  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "dob" && value) {
      const [year, month, day] = value.split("-");
      updatedValue = `${day}-${month}-${year}`;
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  const applyChanges = () => {
    console.log("form ", formData);
  };

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [role, setRole] = useState();

  useEffect(() => {
    document.title = "Wedding Concierge | My Profile";
    setRole(localStorage.getItem("role"));

    // setUserData(currentUser);
  }, []);
  useEffect(() => {
    console.log("role", role);
  }, [role]);

  const PrfileDetail = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log('role is', role);
    
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/${role == 0 ? "profile-edit" : "vendor/profile-edit"}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('admin data',data?.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setUserData(data?.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    PrfileDetail();
  }, []);

  const handlecheck = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
        imageFile: previewURL,
      }));
    }
  };

  const handleBusinessLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        business_Logo: file,
        business_Logo_File: previewURL,
      }));
    }
  };

  const handlePortfolioChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        portfolio_images: [...(prevData.portfolio_images || []), ...files],
      }));
    }
  };

  const updateProfile = async () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
    const token = localStorage.getItem("token");
    const formDataMethod = new FormData();
    for (const key in formData) {
      if (key === "portfolio_images") {
        const logos = formData[key];
        logos.forEach((logo, ind) => {
          formDataMethod.append("portfolio_images[]", logo); // use same key for all files
        });
      } else {
        formDataMethod.append(key, formData[key]);
      }
    }
    try {
      const response = await axios.post(
        `${baseUrl}/vendor/profile-update`,
        formDataMethod,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.data;

      console.log("response", responseData);
      if (responseData.success) {
        document.querySelector(".loaderBox").classList.add("d-none");
        toast.success("Vendor Updated Successfully");
        const user = responseData.data;
        dispatch(setLogin({ token: token, user: user }));
        // navigate('/login');
      }
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 d-flex justify-content-between align-itemscenter">
              <h2 className="mainTitle">
                {role == 0 && <BackButton />}
                Profile
              </h2>
              {role == 1 && (
                  <CustomButton
                    type="button"
                    variant="primaryButton"
                    className="me-3 mb-2"
                    text="Update Profile"
                    onClick={updateProfile}
                  />

              )}
            </div>
          </div>
          {role == 0 ? (
            <div className="row mb-3">
                
              {userData ? (
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-lg-4 order-2 order-lg-1 mb-3">
                      <div className="profileImage">
                        <img
                          src={
                            userData?.image
                              ? `${imageUrl}/${userData.image}`
                              : placeholderimage
                          }
                          alt="User"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-6 mb-3">
                          <h4 className="secondaryLabel">Full Name</h4>
                          <p className="secondaryText">{userData.name}</p>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <h4 className="secondaryLabel">Full Name</h4>
                          <p className="secondaryText">{userData.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <CustomButton
                        type="button"
                        variant="primaryButton"
                        className="me-3 mb-2"
                        text="Edit Profile"
                        onClick={() => {
                          navigate("/profile/edit-profile");
                        }}
                      />
                      <CustomButton
                        type="button"
                        variant="secondaryButton"
                        className="me-3 mb-2"
                        text="Change Password"
                        onClick={() => {
                          navigate("/profile/change-password");
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="row  justify-content-between">
              <div className="col-lg-12 col-md-6  mb-5">
                <div className="row justify-content-center gap-5">
                  <div className="profileImage d-inline-block col-md-3 position-relative">
                    <p>
                      <b>Profile Image : </b>
                    </p>
                    {formData?.image ? (
                      <img
                        src={
                          formData?.imageFile?.startsWith("blob:")
                            ? formData.imageFile
                            : `${process.env.REACT_APP_BASE_IMAGE_URL}/${formData.image}`
                        }
                        className="img-fluid mt-2 w-100"
                        alt="User Image"
                      />
                    ) : (
                      <FiUser
                        size={16}
                        className="rounded-circle border border-5-gray h-100 w-100"
                      />
                    )}

                    <input
                      type="file"
                      accept="img/*"
                      className="d-none"
                      id="profileImage"
                      name="image"
                      onChange={handleProfileChange}
                    />
                    <label htmlFor="profileImage" className="imageUploadButton">
                      <FaCamera size={16} />
                    </label>
                  </div>
                  <div className="profileImage d-inline-block col-md-3 position-relative">
                    <p>
                      <b>Business Logo : </b>
                    </p>
                    {formData?.business_Logo ? (
                      <img
                        src={
                          formData?.business_Logo_File?.startsWith("blob:")
                            ? formData.business_Logo_File
                            : `${process.env.REACT_APP_BASE_IMAGE_URL}/${formData.business_Logo}`
                        }
                        className="img-fluid mt-2 w-100"
                        alt="User Image"
                      />
                    ) : (
                      <FiUser
                        size={16}
                        className="rounded-circle border border-5-gray h-100 w-100"
                      />
                    )}

                    <input
                      type="file"
                      accept="img/*"
                      className="d-none"
                      id="business_Logo"
                      name="business_Logo"
                      onChange={handleBusinessLogoChange}
                    />
                    <label
                      htmlFor="business_Logo"
                      className="imageUploadButton"
                    >
                      <FaCamera size={16} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row profile">
                  <div className="mb-3 col-md-6 mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Name :{" "}
                      {editName ? (
                        <input
                          autoFocus
                          type="text"
                          name="name"
                          value={formData?.name}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong> {formData?.name}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditName(!editName)}
                    >
                      {editName ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6 mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Email : <strong> {formData?.email}</strong>
                    </div>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Phone :{" "}
                      {editPhone ? (
                        <input
                          type="text"
                          autoFocus
                          name="phone"
                          value={formData?.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong> {formData?.phone}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditPhone(!editPhone)}
                    >
                      {editPhone ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Business Name :{" "}
                      {editBusinessName ? (
                        <input
                          type="text"
                          autoFocus
                          name="business_name"
                          value={formData?.business_name}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong> {formData?.business_name}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditBusinessName(!editBusinessName)}
                    >
                      {editBusinessName ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Business Address :{" "}
                      {editBusinessAddress ? (
                        <input
                          type="text"
                          autoFocus
                          name="business_address"
                          value={formData?.business_address}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong> {formData?.business_name}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() =>
                        setEditBusinessAddress(!editBusinessAddress)
                      }
                    >
                      {editBusinessAddress ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Business Type :{" "}
                      {editBusinessType ? (
                        // <input
                        //   type="text"
                        //   autoFocus
                        //   name="business_type"
                        //   value={formData?.business_type}
                        //   onChange={handleChange}
                        // />
                        <select
                          className="form-select form-control"
                          name="business_type"
                          value={formData.business_type}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected>
                            Business Type
                          </option>
                          <option value="type1">Type 1</option>
                          <option value="type2">Type 2</option>
                          <option value="type3">Type 3</option>
                        </select>
                      ) : (
                        <strong> {formData?.business_type}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditBusinessType(!editBusinessType)}
                    >
                      {editBusinessType ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Business Year :{" "}
                      {editBusinessYear ? (
                        <select
                          className="form-select form-control"
                          name="business_year"
                          value={formData?.business_year}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected>
                            Years in Business
                          </option>
                          <option value="twoYears">2 Years</option>
                          <option value="fiveYears">5 Years</option>
                          <option value="tenYears">10 Years</option>
                        </select>
                      ) : (
                        <strong> {formData?.business_year}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditBusinessYear(!editBusinessYear)}
                    >
                      {editBusinessYear ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Prefered Contact :{" "}
                      {editPreferedContact ? (
                        <select
                          type="text"
                          autoFocus
                          name="prefered_contact"
                          value={formData?.prefered_contact}
                          onChange={handleChange}
                          className="form-select form-control"
                        >
                          {/* <option value="">Prefered type</option> */}
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                        </select>
                      ) : (
                        <strong className="text-capitalize">
                          {" "}
                          {formData?.prefered_contact}
                        </strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() =>
                        setEditPreferedContact(!editPreferedContact)
                      }
                    >
                      {editPreferedContact ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Package Price :{" "}
                      {editPackagePrice ? (
                        <input
                          type="text"
                          autoFocus
                          name="packages_price"
                          value={formData?.packages_price}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong> {formData?.packages_price}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditPackagePrice(!editPackagePrice)}
                    >
                      {editPackagePrice ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  {/* <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                  <div className="editableItem">
                    Discount Special Offer :{" "}
                    {editDiscountOffer ? (
                      <select
                        className="form-select form-control"
                        name="discount_special_offer"
                        value={formData?.discount_special_offer}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Discount & Special Offers
                        </option>
                        <option value="offer 1">Offer 1</option>
                        <option value="offer 2">Offer 2</option>
                        <option value="offer 3">Offer 3</option>
                      </select>
                    ) : (
                      <strong> {formData?.discount_special_offer}</strong>
                    )}
                  </div>

                  <span
                    className="edit"
                    onClick={() => setEditDiscountOffer(!editDiscountOffer)}
                  >
                    {editDiscountOffer ? (
                      <MdDone onClick={applyChanges} size={22} />
                    ) : (
                      <FaPencil size={16} />
                    )}
                  </span>
                </div> */}
                  {/* <div className="mb-3 col-md-6 mt-3  d-flex justify-content-between">
                  <div className="editableItem">
                    Service Area :{" "}
                    {editServiceArea ? (
                      <select
                        className="form-select form-control"
                        name="service_area"
                        value={formData?.service_area}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Service Areas
                        </option>
                        <option value="service Area 1">Service Area 1</option>
                        <option value="service Area 2">Service Area 2</option>
                        <option value="service  Area 3">Service Area 3</option>
                      </select>
                    ) : (
                      <strong> {formData?.service_area}</strong>
                    )}
                  </div>

                  <span
                    className="edit"
                    onClick={() => setEditServiceArea(!editServiceArea)}
                  >
                    {editServiceArea ? (
                      <MdDone onClick={applyChanges} size={22} />
                    ) : (
                      <FaPencil size={16} />
                    )}
                  </span>
                </div> */}
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Service Category :{" "}
                      {editServiceCategory ? (
                        <select
                          className="form-select form-control"
                          name="service_categories"
                          value={formData.service_categories}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected>
                            Service Categories
                          </option>
                          <option value="service Category 1">
                            Service Category 1
                          </option>
                          <option value="service Category 2">
                            Service Category 2
                          </option>
                          <option value="service Category 3">
                            Service Category 3
                          </option>
                        </select>
                      ) : (
                        <strong> {formData?.service_categories}</strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() =>
                        setEditServiceCategory(!editServiceCategory)
                      }
                    >
                      {editServiceCategory ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>

                  {/* Website Instagram Facebook */}
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Website :{" "}
                      {editWebsite ? (
                        <input
                          type="text"
                          autoFocus
                          name="add_website"
                          value={formData?.add_website}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong style={{ textTransform: "lowercase" }}>
                          {" "}
                          {formData?.add_website}
                        </strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditWebsite(!editWebsite)}
                    >
                      {editWebsite ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>

                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Facebook :{" "}
                      {editFacebook ? (
                        <input
                          type="text"
                          autoFocus
                          name="Facebook"
                          value={formData?.Facebook}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong style={{ textTransform: "lowercase" }}>
                          {" "}
                          {formData?.Facebook}
                        </strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditFacebook(!editFacebook)}
                    >
                      {editFacebook ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>
                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Instagram :{" "}
                      {editInstagram ? (
                        <input
                          type="text"
                          autoFocus
                          name="Instagram"
                          value={formData?.Instagram}
                          onChange={handleChange}
                        />
                      ) : (
                        <strong style={{ textTransform: "lowercase" }}>
                          {" "}
                          {formData?.Instagram}
                        </strong>
                      )}
                    </div>

                    <span
                      className="edit"
                      onClick={() => setEditInstagram(!editInstagram)}
                    >
                      {editInstagram ? (
                        <MdDone onClick={applyChanges} size={22} />
                      ) : (
                        <FaPencil size={16} />
                      )}
                    </span>
                  </div>

                  <div className="mb-3 col-md-6  mt-3 d-flex justify-content-between">
                    <div className="editableItem">
                      Do You Offer Destination Wedding Service? :{" "}
                      <div>
                        <label className="me-2">
                          <input
                            type="radio"
                            name="wedding_service"
                            value="1" // Yes = 1
                            checked={formData?.wedding_service === 1}
                            onChange={handlecheck}
                            className="me-1"
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="wedding_service"
                            value="2" // No = 0
                            checked={formData?.wedding_service === 0}
                            onChange={handlecheck}
                            className="me-1"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="porfolio-upload-box">
                    <label className=" upload-box__portfolio c-pointer">
                      <p>Upload Portfolio Images</p>
                      <FiUploadCloud size={30} />
                      <input
                        type="file"
                        name="portfolio_images[]"
                        accept="image/*"
                        multiple
                        onChange={handlePortfolioChange}
                        hidden
                      />
                    </label>
                    {formData?.portfolio_images &&
                      formData?.portfolio_images.length > 0 && (
                        <div className="preview-grid">
                          {formData.portfolio_images.map((img, idx) => {
                            const isFile = img instanceof File;
                            const src = isFile
                              ? URL.createObjectURL(img)
                              : `${process.env.REACT_APP_BASE_IMAGE_URL}/${img}`;
                            return (
                              <div className="preview-box" key={idx}>
                                <img
                                  // src={`${
                                  //   process.env.REACT_APP_BASE_IMAGE_URL
                                  // }/${img}`}
                                  // src={
                                  //   formData?.portfolio_imageFile &&
                                  //   formData?.portfolio_imageFile[
                                  //     idx
                                  //   ]?.startsWith("blob:")
                                  //     ? formData.portfolio_imageFile[idx]
                                  //     : `${
                                  //         process.env.REACT_APP_BASE_IMAGE_URL
                                  //       }/${img}`
                                  // }
                                  src={src}
                                  alt={`Portfolio ${idx}`}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      portfolio_images:
                                        prev.portfolio_images.filter(
                                          (_, i) => i !== idx
                                        ),
                                    }))
                                  }
                                >
                                  ❌
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="profile"></div>
                  </div>
                  <div className="col-md-6 mt-2">
                    {/* <div className="profile">
                    <div className="mb-3 d-flex justify-content-between">
                      <div className="editableItem">
                        Name :{" "}
                        {editName ? (
                          <input
                            autoFocus
                            type="text"
                            name="name"
                            value={formData?.name}
                            onChange={handleChange}
                          />
                        ) : (
                          <strong> {formData?.name}</strong>
                        )}
                      </div>

                      <span className="edit" onClick={() => setEditName(!editName)}>
                        {editName ? (
                          <MdDone onClick={applyChanges} size={22} />
                        ) : (
                          <FaPencil size={16} />
                        )}
                      </span>
                    </div>
                    <div className="mb-3  d-flex justify-content-between">
                      <div className="editableItem">
                        Phone :{" "}
                        {editPhone ? (
                          <input
                            type="text"
                            autoFocus
                            name="phone"
                            value={formData?.phone}
                            onChange={handleChange}
                          />
                        ) : (
                          <strong> {formData?.phone}</strong>
                        )}
                      </div>

                      <span
                        className="edit"
                        onClick={() => setEditPhone(!editPhone)}
                      >
                        {editPhone ? (
                          <MdDone onClick={applyChanges} size={22} />
                        ) : (
                          <FaPencil size={16} />
                        )}
                      </span>
                    </div>
                    <div className="mb-3  d-flex justify-content-between">
                      <div className="editableItem">
                        City :{" "}
                        {editCity ? (
                          <input
                            type="text"
                            autoFocus
                            name="city"
                            value={formData?.city}
                            onChange={handleChange}
                          />
                        ) : (
                          <strong> {formData?.city}</strong>
                        )}
                      </div>

                      <span className="edit" onClick={() => setEditCity(!editCity)}>
                        {editCity ? (
                          <MdDone onClick={applyChanges} size={22} />
                        ) : (
                          <FaPencil size={16} />
                        )}
                      </span>
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                      <div className="editableItem">
                        Zip code :{" "}
                        {editZipcode ? (
                          <input
                            type="text"
                            autoFocus
                            name="zip_code"
                            value={formData?.zip_code}
                            onChange={handleChange}
                          />
                        ) : (
                          <strong> {formData?.zip_code}</strong>
                        )}
                      </div>

                      <span
                        className="edit"
                        onClick={() => setEditZipcode(!editZipcode)}
                      >
                        {editZipcode ? (
                          <MdDone onClick={applyChanges} size={22} />
                        ) : (
                          <FaPencil size={16} />
                        )}
                      </span>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
