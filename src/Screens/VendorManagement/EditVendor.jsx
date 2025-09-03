import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import RichTextEditor from "react-rte";
import CustomButton from "../../Components/CustomButton";
import placeholderimage from "../../Assets/images/placeholderimage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FiUploadCloud, FiUser } from "react-icons/fi";
import { FaCamera, FaPlay } from "react-icons/fa";
import MultiSelect from "../../Components/MultiSelect";
import { vendorOptions } from "../../data";
import Venue from "../../Components/ServiceQuestions/Venue";
import Photographers from "../../Components/ServiceQuestions/Photographers";
import Videographer from "../../Components/ServiceQuestions/Videographer";
import DJ from "../../Components/ServiceQuestions/DJ";
import Florist from "../../Components/ServiceQuestions/Florist";
import Planner from "../../Components/ServiceQuestions/Planner";
import Catering from "../../Components/ServiceQuestions/Catering";
import MakeupArtist from "../../Components/ServiceQuestions/MakeupArtist";
import HairStylist from "../../Components/ServiceQuestions/HairStylist";
import Stationary from "../../Components/ServiceQuestions/Stationary";
import Rentals from "../../Components/ServiceQuestions/Rentals";
import Booth from "../../Components/ServiceQuestions/Booth";
import Bakery from "../../Components/ServiceQuestions/Bakery";
import toast from "react-hot-toast";
export const EditVendor = () => {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  const [showModal, setShowModal] = useState(false);
  const [formimage, setFormimage] = useState();
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [valuelong, setValuelong] = useState(RichTextEditor.createEmptyValue());
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [selectedVendors, setSelectedVendors] = useState([]);

  const [selectedServices, setSelectedServices] = useState([]);
  const [vendorTypeError, setVendorTypeError] = useState(false);

  useEffect(() => {
    // if (selectedVendors.length > 0) {
    let services = selectedVendors.map((vendor) => {
      return vendor.value;
    });
    // console.log(
    //   "services",
    //   services,
    //   selectedServices.includes("Venue (Ceremony & Reception)")
    // );

    setSelectedServices(services);
    // }
  }, [selectedVendors]);

  const GenreData = () => {
    const token = localStorage.getItem("admintoken");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/vendor/${id}/edit`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("fetched user data", data.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setFormData(data.data);
        let user = data.data;
        let initialVendors = [];
        if (user?.vendor_type) {
          setSelectedVendors(
            user.vendor_type.map((item) => ({
              label: item,
              value: item,
            }))
          );
          initialVendors = user.vendor_type.map((item) => ({
            label: item,
            value: item,
          }));
          console.log("initialVendors", initialVendors);
        }
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  useEffect(() => {
    GenreData();
    document.title = "Wedding Concierge | Edit Vendor";
  }, []);

  const handleChanges = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "dob" && value) {
      const [year, month, day] = value.split("-");
      updatedValue = `${day}-${month}-${year}`;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
    console.log(formData);
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // setImageUpdated(true);
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
      // setBusinessLogoUpdated(true);
      const previewURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        business_Logo: file,
        business_Logo_File: previewURL,
      }));
    }
  };

  const formatToDateInput = (dateStr) => {
    if (!dateStr) return "";

    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const token = localStorage.getItem("admintoken");
  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();

    // for (const key in formData) {
    //   if (key === "portfolio_images") {
    //     const logos = formData[key];
    //     logos.forEach((logo, ind) => {
    //       formDataMethod.append("portfolio_images[]", logo); // use same key for all files
    //     });
    //   } else {
    //     formDataMethod.append(key, formData[key]);
    //   }
    // }
    for (const key in formData) {
      if (key === "portfolio_images") {
        const logos = formData[key];
        logos.forEach((logo, ind) => {
          formDataMethod.append(`portfolio_images[${ind}]`, logo); // use same key for all files
        });
      } else if (key === "venue_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`venue_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "photographer_editing_style") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`photographer_editing_style[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "photographer_shooting_style") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`photographer_shooting_style[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "videography_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`videography_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "planner_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`planner_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "catering_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`catering_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "food_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`food_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "dj_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`dj_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "hairstylist_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`hairstylist_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "bakery_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`bakery_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "stationary_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`stationary_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "rental_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`rental_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else if (key === "photo_booth_type") {
        const logos = formData[key];
        if (logos.length > 0) {
          logos.forEach((logo, ind) => {
            formDataMethod.append(`photo_booth_type[${ind}]`, logo); // use same key for all files
          });
        }
      } else {
        formDataMethod.append(key, formData[key]);
      }
    }
    if(vendorTypeError){
      document.querySelector(".loaderBox").classList.add("d-none");
      toast.error('Please select at least one Business type!');
      return
    }
    selectedVendors.forEach((vendor, i) => {
      formDataMethod.append(`vendor_type[${i}]`, vendor.label);
    });

    document.querySelector(".loaderBox").classList.remove("d-none");

    // Make the fetch request
    fetch(`${apiUrl}/vendor/${id}/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formDataMethod, // Use the raw data as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log('vendor update response',data);
        setMessage(data);
        if (data?.success == true) {
          setShowModal(true);
        }
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  const handlecheck = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value), // Update the specific field dynamically and ensure the value is numeric
    }));
  };
  useEffect(() => {
    // Cleanup the blob URL to avoid memory leaks
    return () => {
      if (formData?.imageFile?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imageFile);
      }
    };
  }, [formData?.imageFile]);

  const statusOptions = [
    { id: "approved", title: "Approved" },
    { id: "pending", title: "Pending" },
    { id: "rejected", title: "Rejected" },
  ];
  const contactOptions = [
    { id: "email", title: "Email" },
    { id: "phone", title: "Phone" },
  ];

  const handlePortfolioChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        portfolio_images: [...(prevData.portfolio_images || []), ...files],
      }));
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-6 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Vendor
              </h2>
            </div>
            <div className="col-6 d-flex justify-content-end mb-2">
              {/* <button
                onClick={updateProfile}
                className="primary-btn update-profile me-auto"
              >
                <FaPencil size={16} className="me-2" />
                Update Profile
              </button> */}
              <CustomButton
                variant="primaryButton"
                text="Update Profile"
                type="button"
                onClick={handleSubmit}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-3 mb-4">
                        <div className="profileImage">
                          <p>
                            <b>Bussiness Logo</b>
                          </p>
                          {formData?.business_Logo ? (
                            <img
                              src={
                                formData?.business_Logo_image?.startsWith(
                                  "blob:"
                                )
                                  ? formData.business_Logo_image
                                  : `${imageUrl}/${formData.business_Logo}`
                                // formData?.business_Logo
                                //   ? `${imageUrl}/${formData?.business_Logo}`
                                //   : placeholderimage
                              }
                              className="img-fluid mt-2"
                              alt="Product"
                            />
                          ) : (
                            <img
                              src={placeholderimage}
                              className="img-fluid mt-2"
                              alt="Product"
                            />
                          )}
                          <input
                            type="file"
                            accept="img/*"
                            className="d-none"
                            id="profileImage"
                            name="business_Logo"
                            onChange={filehandleChange}
                          />
                          <label
                            htmlFor="profileImage"
                            className="imageUploadButton"
                          >
                            <FontAwesomeIcon icon={faCamera} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-12  mb-5">
                    <div className="d-flex justify-content-center flex-wrap gap-5">
                      <div className="profileImage d-inline-block  position-relative">
                        <p>
                          <b>Profile Image : </b>
                        </p>
                        {formData?.image && formData?.image !== "null" ? (
                          <img
                            src={
                              formData?.imageFile?.startsWith("blob:")
                                ? formData.imageFile
                                : `${imageUrl}/${formData.image}`
                            }
                            className="img-fluid mt-2 w-100"
                            alt="User Image"
                          />
                        ) : (
                          <FiUser
                            size={160}
                            className="user-icon border border-5-gray "
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
                        <label
                          htmlFor="profileImage"
                          className="imageUploadButton"
                        >
                          <FaCamera size={16} />
                        </label>
                      </div>
                      <div className="profileImage d-inline-block  position-relative">
                        <p>
                          <b>Business Logo : </b>
                        </p>
                        {formData?.business_Logo ? (
                          <img
                            src={
                              formData?.business_Logo_File?.startsWith("blob:")
                                ? formData.business_Logo_File
                                : `${imageUrl}/${formData.business_Logo}`
                            }
                            className="img-fluid mt-2 w-100"
                            alt="User Image"
                          />
                        ) : (
                          <FiUser
                            size={160}
                            className="user-icon  border border-5-gray "
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
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Vendor Name"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="name"
                          value={formData?.name}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Phone Number"
                          id="title"
                          type="text"
                          placeholder="Enter number"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="phone"
                          value={formData?.phone}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="   Email"
                          // required
                          id="title"
                          type="text"
                          disabled
                          placeholder="Enter email"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="email"
                          value={formData?.email}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="status"
                          label="Status"
                          required
                          value={formData?.status}
                          option={statusOptions}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Business Name"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Busines Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="business_name"
                          value={formData?.business_name}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Business Address"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Busines Address"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="business_address"
                          value={formData?.business_address}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Business Year"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Business Year"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="business_year"
                          value={formData?.business_year}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="prefered_contact"
                          label="Prefered Contact"
                          required
                          value={formData?.prefered_contact}
                          option={contactOptions}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Package Price"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Package Price"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="packages_price"
                          value={formData?.packages_price}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Website"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Website"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="add_website"
                          value={formData?.add_website}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Facebook"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Facebook"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="Facebook"
                          value={formData?.Facebook}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Instagram"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Instagram"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="Instagram"
                          value={formData?.Instagram}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Recommending Vendor 1"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Recommending Vendor 1"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="vendor_1"
                          value={formData?.vendor_1}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Recommending Vendor 2"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Recommending Vendor 2"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="vendor_2"
                          value={formData?.vendor_2}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Recommending Vendor 3"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Recommending Vendor 3"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="vendor_3"
                          value={formData?.vendor_3}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">
                          Do Vendor Offer Destination Wedding Service?
                        </label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="wedding_service"
                              value="1" // Yes = 1
                              checked={formData?.wedding_service == 1}
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
                              checked={formData?.wedding_service == 0}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Business Description"
                          required
                          id="title"
                          type="textarea"
                          rows={8}
                          placeholder="Enter Business Description"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="business_description"
                          value={formData?.business_description}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Business Bio"
                          required
                          id="title"
                          type="textarea"
                          rows={6}
                          placeholder="Enter Business Bio"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="business_bio"
                          value={formData?.business_bio}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Business Vision"
                          required
                          id="title"
                          type="textarea"
                          rows={6}
                          placeholder="Enter Business Vision"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="business_vision"
                          value={formData?.business_vision}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4"></div>
                      <div className="mb-3 col-lg-6 mt-3 d-flex justify-content-between align-items-center gap-5">
                        <div className="editableItem w-100 flex-column align-items-start">
                          <strong>Business Type</strong>
                          <span className="text-danger">*</span>{" "}
                          <MultiSelect
                            isMulti={true}
                            placeholder="Select Vendor Type"
                            className="w-100"
                            required={true}
                            options={vendorOptions}
                            value={selectedVendors}
                            onChange={(selectedOptions) => {
                              setSelectedVendors(selectedOptions);
                              if (
                                !selectedOptions ||
                                selectedOptions.length === 0
                              ) {
                                setVendorTypeError(true);
                              } else {
                                setVendorTypeError(false);
                              }
                            }}
                          />
                          {vendorTypeError && (
                            <span className="text-danger">
                              Please select at least one Business type!
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4"></div>

                      <div className="col-12">
                        <div className="row">
                          {/* Venue */}
                          {selectedServices.includes(
                            "Venue (Ceremony & Reception)"
                          ) && (
                            <div className="mb-3 col-lg-8  mt-3">
                              <h4 className="fw-bold">Venue:</h4>
                              <Venue
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {/* Photographer */}
                          {selectedServices.includes("Photographer") && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Photographer:</h4>
                              <Photographers
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {/* Videographer */}
                          {selectedServices.includes("Videographer") && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Videographer:</h4>
                              <Videographer
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {/* DJ */}
                          {selectedServices.includes("DJ") && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">DJ:</h4>
                              <DJ
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {/* Florist */}
                          {selectedServices.includes("Florist") && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Florist:</h4>
                              <Florist
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {/* Planner */}
                          {selectedServices.includes(
                            "Wedding Planner / Coordinator"
                          ) && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Planner:</h4>
                              <Planner
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {/* Caterer */}
                          {selectedServices.includes("Caterer") && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Catering:</h4>
                              <Catering
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {selectedServices.includes("Makeup Artist") && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Makeup Artist:</h4>
                              <MakeupArtist
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {selectedServices.includes("Hair Stylist") && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Hair Stylist:</h4>
                              <HairStylist
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {selectedServices.includes(
                            "Stationery Designer (invitations, menus, programs)"
                          ) && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Stationary:</h4>
                              <Stationary
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {selectedServices.includes(
                            "Rental Company (tables, chairs, linens, etc.)"
                          ) && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">Rentals:</h4>
                              <Rentals
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {selectedServices.includes(
                            "Photo Booth / 360 Booth"
                          ) && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">
                                Photo Booth / 360 Booth:
                              </h4>
                              <Booth
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                          {selectedServices.includes(
                            "Bakery (cake, desserts)"
                          ) && (
                            <div className="mb-3 col-lg-8 mt-3">
                              <h4 className="fw-bold">
                                Bakery (cake, desserts):
                              </h4>
                              <Bakery
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className=" mb-4">
                        <div className="wedding-form-group">
                          <label className="upload-box upload-box__portfolio">
                            <p>Upload Portfolio Images/Videos</p>
                            <FiUploadCloud size={30} />
                            <input
                              type="file"
                              name="portfolio_images[]"
                              accept="image/*"
                              multiple
                              onChange={handlePortfolioChange}
                              // onChange={(e) => {
                              //   const files = Array.from(e.target.files);
                              //   setFormData({
                              //     ...formData,
                              //     portfolio_images: [
                              //       ...(formData.portfolio_images || []),
                              //       ...files,
                              //     ],
                              //   });
                              // }}
                              hidden
                            />
                          </label>
                          {formData?.portfolio_images &&
                            formData?.portfolio_images.length > 0 && (
                              <div className="preview-grid">
                                {formData.portfolio_images.map((media, idx) => {
                                  // const isFile = img instanceof File;
                                  // const src = isFile
                                  //   ? URL.createObjectURL(img)
                                  //   : `${import.meta.env.VITE_BASE_IMAGE_URL}/${img}`;
                                  const isFile = media instanceof File;
                                  const fileType = isFile
                                    ? media.type
                                    : media?.includes(".mp4") ||
                                      media?.includes(".webm") ||
                                      media?.includes(".mov")
                                    ? "video"
                                    : "image";

                                  const src = isFile
                                    ? URL.createObjectURL(media)
                                    : `${imageUrl}/${media}`;
                                  return (
                                    <div className="preview-box" key={idx}>
                                      {/* <img src={src} alt={`Portfolio ${idx}`} /> */}
                                      {fileType === "video/mp4" ||
                                      fileType === "video" ? (
                                        <div className="position-relative">
                                          <video src={src} width="100%" />
                                          <FaPlay color="white" />
                                        </div>
                                      ) : (
                                        <img
                                          src={src}
                                          alt={`Portfolio ${idx}`}
                                        />
                                      )}
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
                      </div>

                      <div className="col-md-12 d-flex justify-content-end">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
            navigate(-1);
          }}
          success
          heading={message?.message}
        />
      </DashboardLayout>
    </>
  );
};
