import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
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

import placeholderimage from "../../Assets/images/placeholderimage.png";
import { FiUser } from "react-icons/fi";
export const VendorDetail = () => {
  const { id } = useParams();

  // const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);

  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    // document.title = "Hisoc Admin | Vendor Detail";
    document.querySelector(".loaderBox").classList.remove("d-none");
    // fetch(`${apiUrl}/api/admin/member/${id}`, {
    fetch(`${apiUrl}/vendor/${id}/edit`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);

        setData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  }, [id]);

  const handleImageClick = (index, imageArray) => {
    const imageList = imageArray.map((item) => `${imageUrl}/${item}`);
    let typeImages = imageList.map((media, _index) => {
      const isFile = media instanceof File;
      const fileType = isFile
        ? media.type
        : media?.includes(".mp4") ||
          media?.includes(".webm") ||
          media?.includes(".mov")
        ? "video"
        : "image";
      const src = isFile ? URL.createObjectURL(media) : `${media}`;
      if (fileType == "image") {
        return { src };
      }
      return {
        type: fileType,
        width: 1280,
        height: 720,
        sources: [{ type: "video/mp4", src }],
      };
    });

    setImages(typeImages);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Vendor Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {/* <div className="col-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="productInfo">
                    <h3 className="secondaryText">Name</h3>
                    <h3 className="text-capitalize fw-bold">{data?.name}</h3>

                    <h3 className="secondaryText">Phone </h3>
                    <p>{data?.phone}</p>
                    <h3 className="secondaryText">Email </h3>
                    <p>{data?.email}</p>
                    <h3 className="secondaryText">Status </h3>
                    <p className="text-capitalize">{data?.status}</p>
                    <h3 className="secondaryText">Business Name </h3>
                    <p>{data?.business_name}</p>
                    <h3 className="secondaryText">Business Address </h3>
                    <p>{data?.business_address}</p>
                    <h3 className="secondaryText">Busines Type </h3>
                    <p>{data?.business_type}</p>
                    <h3 className="secondaryText">Business Year </h3>
                    <p>{data?.business_year}</p>
                    <h3 className="secondaryText">Prefered Contact </h3>
                    <p>{data?.prefered_contact}</p>
                    <h3 className="secondaryText">Package Price </h3>
                    <p>{data?.packages_price}</p>
                    <h3 className="secondaryText">Website</h3>
                    <p>{data?.packages_price}</p>

                    <h3 className="secondaryText">Discount Special Offer </h3>
                    <p>{data?.discount_special_offer}</p>
                    <h3 className="secondaryText">Service Area </h3>
                    <p>{data?.service_area}</p>
                    <h3 className="secondaryText">Service Category </h3>
                    <p>{data?.service_categories}</p>
                    <h3 className="secondaryText">Service Category </h3>
                    <p>{data?.service_categories}</p>
                    <h3 className="secondaryText">
                      Do This Vendor Offer Destination Wedding Service?{" "}
                    </h3>
                    <p>{data?.wedding_service === 1 ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  {data?.business_Logo && data?.business_Logo ? (
                    <div className="profileImage">
                      <p>
                        <b>Business Logo</b>
                      </p>
                      <img
                        src={
                          data?.business_Logo
                            ? `${imageUrl}/${data?.business_Logo}`
                            : placeholderimage
                        }
                      />
                    </div>
                  ) : (
                    <h3>No Image Available</h3>
                  )}
                  <div className="row mt-4">
                    <p>
                      <b>Portfolio Images</b>
                    </p>
                    {data?.portfolio_images &&
                      data?.portfolio_images.length > 0 &&
                      data?.portfolio_images.map((media, _index) => {
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
                          <div className="col-md-6 mt-3">
                            {fileType === "video/mp4" ||
                            fileType === "video" ? (
                              <video
                                className="w-100 c-pointer gallery-image"
                                src={src}
                                muted
                                autoPlay="true"
                                loop
                                width="100%"
                              />
                            ) : (
                              <img
                                src={src}
                                className="w-100 c-pointer gallery-image"
                                alt={`Portfolio ${_index}`}
                                // onClick={() => { setIsOpen(true); setPhotoIndex(_index); }}
                                onClick={() =>
                                  handleImageClick(
                                    _index,
                                    data?.portfolio_images
                                  )
                                }
                              />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-12  mb-5">
              <div className="row justify-content-center gap-5">
                <div className="profileImage d-inline-block col-md-3 position-relative">
                  <p>
                    <b>Profile Image : </b>
                  </p>
                  {data?.image && data?.image !== "null" ? (
                    <img
                      src={
                        data?.imageFile?.startsWith("blob:")
                          ? data.imageFile
                          : `${imageUrl}/${data.image}`
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
                </div>
                <div className="profileImage d-inline-block col-md-3 position-relative">
                  <p>
                    <b>Business Logo : </b>
                  </p>
                  {data?.business_Logo ? (
                    <img
                      src={
                        data?.business_Logo_File?.startsWith("blob:")
                          ? data.business_Logo_File
                          : `${imageUrl}/${data.business_Logo}`
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
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                {/* Vendor Name */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Vendor Name</label>
                  <p className="">{data?.name}</p>
                </div>

                {/* Phone Number */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Phone Number</label>
                  <p className="">{data?.phone}</p>
                </div>

                {/* Email */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Email</label>
                  <p>{data?.email}</p>
                </div>

                {/* Status */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Status</label>
                  <p>{data?.status}</p>
                </div>

                {/* Business Name */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Business Name</label>
                  <p>{data?.business_name}</p>
                </div>

                {/* Business Address */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Business Address</label>
                  <p>{data?.business_address}</p>
                </div>

                {/* Business Year */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Business Year</label>
                  <p>{data?.business_year}</p>
                </div>

                {/* Preferred Contact */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Preferred Contact</label>
                  <p className="text-capitalize">{data?.prefered_contact}</p>
                </div>

                {/* Package Price */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Package Price</label>
                  <p>{data?.packages_price}</p>
                </div>

                {/* Website */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Website</label>
                  <p>
                    <Link to={data?.add_website}>{data?.add_website}</Link>
                  </p>
                </div>

                {/* Facebook */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Facebook</label>
                  <p>
                    <Link to={data?.Facebook}>{data?.Facebook}</Link>
                  </p>
                </div>

                {/* Instagram */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Instagram</label>
                  <p>
                    <Link to={data?.Instagram}>{data?.Instagram}</Link>
                  </p>
                </div>

                {/* Recommending Vendors */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Recommending Vendor 1</label>
                  <p>{data?.vendor_1}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Recommending Vendor 2</label>
                  <p>{data?.vendor_2}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Recommending Vendor 3</label>
                  <p>{data?.vendor_3}</p>
                </div>

                {/* Wedding Service */}
                <div className="checkBox col-md-6 mb-4">
                  <label className="fw-semibold">
                    Do Vendor Offer Destination Wedding Service?
                  </label>
                  <p>{data?.wedding_service == 1 ? "Yes" : "No"}</p>
                </div>

                {/* Business Description */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Business Description</label>
                  <p>{data?.business_description || 'No Business Description'}</p>
                </div>

                {/* Business Bio */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Business Bio</label>
                  <p>{data?.business_bio || 'No Business Bio'}</p>
                </div>

                {/* Business Vision */}
                <div className="col-md-6 mb-4">
                  <label className="mainLabel">Business Vision</label>
                  <p>{data?.business_vision || 'No Business Vision'}</p>
                </div>
                <div className="col-md-6 mb-4"></div>

                {/* Business Type (MultiSelect) */}
                <div className="mb-3 col-lg-6  d-flex justify-content-between gap-5">
                  <div className="editableItem w-100 flex-column align-items-start">
                    <strong>Business Type</strong>
                    <div className="mt-3">
                      {(data?.vendor_type || []).map((type, index) => (
                        <h5 key={index}>
                          <span className="badge bg-dark me-2">
                            {type.label || type}
                          </span>
                        </h5>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services Sections */}
                {/* <div className="col-12">
                  <div className="row">
                    {data?.vendor_type?.includes(
                      "Venue (Ceremony & Reception)"
                    ) && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Venues:</h4>
                        <ul>
                        {data?.venue_type?.map((venue, index) => (
                          <li key={index}>{venue}</li>
                        ))}
                        </ul>
                        <label className="mainLabel">Budget</label>
                        {data?.venue_budget && <p> Under {data?.venue_budget}k</p>}
                      </div>
                    )}
                    {data?.vendor_type?.includes("Photographer") && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Photographer:</h4>
                      </div>
                    )}
                    {data?.vendor_type?.includes("Videographer") && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Videographer:</h4>
                        <Videographer formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes("DJ") && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">DJ:</h4>
                        <DJ formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes("Florist") && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Florist:</h4>
                        <Florist formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes(
                      "Wedding Planner / Coordinator"
                    ) && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Planner:</h4>
                        <Planner formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes("Caterer") && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Catering:</h4>
                        <Catering formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes("Makeup Artist") && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Makeup Artist:</h4>
                        <MakeupArtist formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes("Hair Stylist") && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Hair Stylist:</h4>
                        <HairStylist formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes(
                      "Stationery Designer (invitations, menus, programs)"
                    ) && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Stationary:</h4>
                        <Stationary formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes(
                      "Rental Company (tables, chairs, linens, etc.)"
                    ) && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Rentals:</h4>
                        <Rentals formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes(
                      "Photo Booth / 360 Booth"
                    ) && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Photo Booth / 360 Booth:</h4>
                        <Booth formData={data} />
                      </div>
                    )}
                    {data?.vendor_type?.includes(
                      "Bakery (cake, desserts)"
                    ) && (
                      <div className="mb-3 col-lg-8 mt-3">
                        <h4 className="fw-bold">Bakery (cake, desserts):</h4>
                        <Bakery formData={data} />
                      </div>
                    )}
                  </div>
                </div> */}
                <div className="col-12">
                  <div className="row">
                    {data?.vendor_type?.includes(
                      "Venue (Ceremony & Reception)"
                    ) &&
                      (Array.isArray(data?.venue_type) ||
                        data?.venue_budget) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Venues:</h4>
                          {Array.isArray(data?.venue_type) && (
                            <ul>
                              {data?.venue_type?.map((venue, index) => (
                                <li key={index}>{venue}</li>
                              ))}
                            </ul>
                          )}
                          {data?.venue_budget && (
                            <>
                              <label className="mainLabel">Budget</label>
                              <p>Under {data?.venue_budget}k</p>
                            </>
                          )}
                        </div>
                      )}

                    {data?.vendor_type?.includes("Photographer") &&
                      (Array.isArray(data?.photographer_editing_style) ||
                        Array.isArray(data?.photographer_shooting_style) ||
                        data?.photographer_budget) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Photographer:</h4>
                          <ul>
                            {Array.isArray(data?.photographer_editing_style) &&
                              data?.photographer_editing_style?.map(
                                (style, i) => <li key={i}>{style}</li>
                              )}
                            {Array.isArray(data?.photographer_shooting_style) &&
                              data?.photographer_shooting_style?.map(
                                (style, i) => (
                                  <li key={`shoot-${i}`}>{style}</li>
                                )
                              )}
                          </ul>
                          {data?.photographer_budget && (
                            <>
                              <label className="mainLabel">Budget</label>
                              <p>Under {data?.photographer_budget}k</p>
                            </>
                          )}
                        </div>
                      )}

                    {data?.vendor_type?.includes("Videographer") &&
                      (Array.isArray(data?.videography_type) ||
                        Array.isArray(data?.videography_categories) ||
                        data?.videography_budget) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Videographer:</h4>
                          <ul>
                            {Array.isArray(data?.videography_type) &&
                              data?.videography_type?.map((type, i) => (
                                <li key={i}>{type}</li>
                              ))}
                            {Array.isArray(data?.videography_categories) &&
                              data?.videography_categories && (
                                <li>{data?.Videography_categories}</li>
                              )}
                          </ul>
                          {data?.videography_budget && (
                            <>
                              <label className="mainLabel">Budget</label>
                              <p>Under {data?.videography_budget}k</p>
                            </>
                          )}
                        </div>
                      )}

                    {data?.vendor_type?.includes("DJ") &&
                      (Array.isArray(data?.dj_type) || data?.dj_budget) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">DJ:</h4>
                          <ul>
                            {Array.isArray(data?.dj_type) &&
                              data?.dj_type?.map((type, i) => (
                                <li key={i}>{type}</li>
                              ))}
                          </ul>
                          {data?.dj_budget && (
                            <>
                              <label className="mainLabel">Budget</label>
                              <p>Under {data?.dj_budget}k</p>
                            </>
                          )}
                        </div>
                      )}

                    {data?.vendor_type?.includes("Florist") &&
                      data?.florist_budget && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Florist:</h4>
                          {data?.florist_budget && (
                            <>
                              <label className="mainLabel">Budget</label>
                              <p>Under {data?.florist_budget}k</p>
                            </>
                          )}
                        </div>
                      )}

                    {data?.vendor_type?.includes(
                      "Wedding Planner / Coordinator"
                    ) &&
                      (Array.isArray(data?.planner_type) ||
                        data?.planner_budget) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Planner:</h4>
                          <ul>
                            {Array.isArray(data?.planner_type) &&
                              data?.planner_type?.map((type, i) => (
                                <li key={i}>{type}</li>
                              ))}
                          </ul>
                          {data?.planner_budget && (
                            <>
                              <label className="mainLabel">Budget</label>
                              <p>Under {data?.planner_budget}k</p>
                            </>
                          )}
                        </div>
                      )}

                    {data?.vendor_type?.includes("Caterer") &&
                      (Array.isArray(data?.catering_type) ||
                        Array.isArray(data?.food_type)) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Catering:</h4>
                          <ul>
                            {Array.isArray(data?.catering_type) &&
                              data?.catering_type?.map((type, i) => (
                                <li key={i}>{type}</li>
                              ))}
                            {Array.isArray(data?.food_type) &&
                              data?.food_type?.map((food, i) => (
                                <li key={`food-${i}`}>{food}</li>
                              ))}
                          </ul>
                        </div>
                      )}

                    {data?.vendor_type?.includes("Makeup Artist") &&
                      data?.makeupartist_budget && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Makeup Artist:</h4>
                          <label className="mainLabel">Budget</label>
                          {data?.makeupartist_budget && (
                            <p>Under {data?.makeupartist_budget}k</p>
                          )}
                        </div>
                      )}

                    {data?.vendor_type?.includes("Hair Stylist") &&
                      Array.isArray(data?.hairstylist_type) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Hair Stylist:</h4>
                          <ul>
                            {data?.hairstylist_type?.map((type, i) => (
                              <li key={i}>{type}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {data?.vendor_type?.includes(
                      "Stationery Designer (invitations, menus, programs)"
                    ) &&
                      Array.isArray(data?.stationary_type) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Stationery:</h4>
                          <ul>
                            {data?.stationary_type?.map((type, i) => (
                              <li key={i}>{type}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {data?.vendor_type?.includes(
                      "Rental Company (tables, chairs, linens, etc.)"
                    ) &&
                      Array.isArray(data?.rental_type) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Rentals:</h4>
                          <ul>
                            {data?.rental_type?.map((type, i) => (
                              <li key={i}>{type}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {data?.vendor_type?.includes("Photo Booth / 360 Booth") &&
                      Array.isArray(data?.photo_booth_type) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Photo Booth / 360 Booth:</h4>
                          <ul>
                            {data?.photo_booth_type?.map((type, i) => (
                              <li key={i}>{type}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {data?.vendor_type?.includes("Bakery (cake, desserts)") &&
                      Array.isArray(data?.bakery_type) && (
                        <div className="mb-3 col-lg-8 mt-3">
                          <h4 className="fw-bold">Bakery (cake, desserts):</h4>
                          <ul>
                            {data?.bakery_type?.map((type, i) => (
                              <li key={i}>{type}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>

                {/* Portfolio Images/Videos */}
                {/* <div className="mb-4">
                  <label className="mainLabel">Portfolio Images/Videos</label>
                  {data?.portfolio_images &&
                  data.portfolio_images.length > 0 ? (
                    <div className="preview-grid">
                      {data.portfolio_images.map((media, idx) => {
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
                            {fileType === "video" ? (
                              <video src={src} width="100%" controls />
                            ) : (
                              <img src={src} alt={`Portfolio ${idx}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>No portfolio uploaded.</p>
                  )}
                </div> */}
                <div className="row mt-4">
                  <h3>
                    <b>Portfolio Images/Videos</b>
                  </h3>
                  {data?.portfolio_images &&
                    data?.portfolio_images.length > 0 ?
                    data?.portfolio_images.map((media, _index) => {
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
                        <div className="col-md-4 mt-3">
                          {fileType === "video/mp4" || fileType === "video" ? (
                            <video
                              className="w-100 c-pointer gallery-image"
                              src={src}
                              muted
                              autoPlay="true"
                              loop
                              width="100%"
                              onClick={() =>
                                handleImageClick(_index, data?.portfolio_images)
                              }
                            />
                          ) : (
                            <img
                              src={src}
                              className="w-100 c-pointer gallery-image"
                              alt={`Portfolio ${_index}`}
                              // onClick={() => { setIsOpen(true); setPhotoIndex(_index); }}
                              onClick={() =>
                                handleImageClick(_index, data?.portfolio_images)
                              }
                            />
                          )}
                        </div>
                      );
                    })
                    : (
                      <h5 className="">No Portfolio Image and Videos</h5>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {isOpen && (
          <Lightbox
            mainSrc={`${imageUrl}/${data?.portfolio_images[photoIndex]}`}
            nextSrc={`${imageUrl}/${
              data?.portfolio_images[
                (photoIndex + 1) % data?.portfolio_images.length
              ]
            }`}
            prevSrc={`${imageUrl}/${
              data?.portfolio_images[
                (photoIndex + data?.portfolio_images.length - 1) %
                  data?.portfolio_images.length
              ]
            }`}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + data?.portfolio_images.length - 1) %
                  data?.portfolio_images.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % data?.portfolio_images.length)
            }
          />
        )} */}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={images}
            index={photoIndex}
            on={{
              view: ({ index }) => setPhotoIndex(index),
            }}
            plugins={[Video]}
          />
        )}

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
          action={Active}
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
      </DashboardLayout>
    </>
  );
};
