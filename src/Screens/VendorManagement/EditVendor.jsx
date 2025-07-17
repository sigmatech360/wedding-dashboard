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
import { FiUploadCloud } from "react-icons/fi";
export const EditVendor = () => {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  const [showModal, setShowModal] = useState(false);
  const [formimage, setFormimage] = useState();
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [valuelong, setValuelong] = useState(RichTextEditor.createEmptyValue());
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "", // Initialize image as an empty string
    agenda: [],
  });
  const handleChange = (newValue) => {
    setValue(newValue);
    // if (onChange) {
    //   // Send the changes up to the parent component as an HTML string.
    //   onChange(newValue.toString("html"));
    // }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setFormData({
      ...formData,
      short_description: value.toString("html"), // Convert editor content to HTML
    });
  };

  const handleEditorChangelong = (value) => {
    setEditorValuelong(value);
    setFormData({
      ...formData,
      long_description: value.toString("html"), // Convert editor content to HTML
    });
  };
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const [editorValuelong, setEditorValuelong] = useState(
    RichTextEditor.createEmptyValue()
  );

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
        console.log(data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setFormData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  useEffect(() => {
    GenreData();
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

  const filehandleChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;

    console.log("image change out", name);
    if (file) {
      const previewURL = URL.createObjectURL(file); // Generate a preview URL

      if (name == "business_Logo") {
        console.log("image change", name);
        setFormData((prevData) => ({
          ...prevData,
          business_Logo: file, // Store the actual file for backend upload
          business_Logo_image: previewURL, // Store the preview URL for immediate display
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          image: file, // Store the actual file for backend upload
          imageFile: previewURL, // Store the preview URL for immediate display
        }));
      }
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

    // You might want to send raw JSON, not FormData
    const formDataMethod = new FormData();
    // for (const key in formData) {
    //   formDataMethod.append(key, formData[key]);
    // }

    // console.log('portfolio_images' , formData.portfolio_images);
    
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
        console.log(data);
        setMessage(data);
        if (data?.status == true) {
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

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Vendor
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
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

                      {/* <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">Vendor type</label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="member_type"
                              value="1" // Yes = 1
                              checked={formData?.member_type === 1}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Team member
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="member_type"
                              value="2" // No = 0
                              checked={formData?.member_type === 2}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Board Mmber
                          </label>
                        </div>
                      </div> */}
                      {/* <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">Show in Mobile</label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="show_in_mobile"
                              value="1" // Yes = 1
                              checked={formData?.show_in_mobile === 1}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="show_in_mobile"
                              value="0" // No = 0
                              checked={formData?.show_in_mobile === 0}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            No
                          </label>
                        </div>
                      </div> */}
                      {/* <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">Show in Web</label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="show_in_web"
                              value="1" // Yes = 1
                              checked={formData?.show_in_web === 1}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="show_in_web"
                              value="0" // No = 0
                              checked={formData?.show_in_web === 0}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            No
                          </label>
                        </div>
                      </div> */}

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="   Email"
                          required
                          id="title"
                          type="text"
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
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="D.O.B"
                          required
                          id="title"
                          type="date"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="dob"
                          // value={formData?.dob}
                          value={formatToDateInput(formData?.dob)}
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
                          label=" Business Type"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Busines Type"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="business_type"
                          value={formData?.business_type}
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
                          onChange={handleChange}
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
                          label="Discount Special Offer"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Discount Special Offer"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="discount_special_offer"
                          value={formData?.discount_special_offer}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Service Area"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Service Area"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="service_area"
                          value={formData?.service_area}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Service Category"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Service Category"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="service_categories"
                          value={formData?.service_categories}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">
                          Do You Offer Destination Wedding Service?
                        </label>
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

                      <div className="col-md-6 mb-4"></div>
                      <div className="col-md-6 mb-4">
                        {/* <CustomInput
                          label="Upload Product Image"
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          onChange={filehandleChange}
                        />

                        {(formData?.imageFile || formData?.image) && (
                          <img
                            src={
                              formData?.imageFile?.startsWith("blob:")
                                ? formData.imageFile
                                : `${apiUrl}/${formData.image}`
                            }
                            className="img-fluid mt-2"
                            alt="Product"
                          />
                        )} */}
                        <div className="wedding-form-group">
                          <label className="upload-box upload-box__portfolio">
                            <p>Upload Portfolio Images</p>
                            <FiUploadCloud size={30} />
                            <input
                              type="file"
                              name="portfolio_images[]"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = Array.from(e.target.files);
                                setFormData({
                                  ...formData,
                                  portfolio_images: [
                                    ...(formData.portfolio_images || []),
                                    ...files,
                                  ],
                                });
                              }}
                              hidden
                            />
                          </label>
                          {formData?.portfolio_images &&
                            formData?.portfolio_images.length > 0 && (
                              <div className="preview-grid">
                                {formData.portfolio_images.map((img, idx) => (
                                  <div className="preview-box" key={idx}>
                                    <img
                                      src={`${imageUrl}/${img}`}
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
                                ))}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="col-md-12">
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
