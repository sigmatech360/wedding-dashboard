import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import Lightbox from "react-image-lightbox";

import placeholderimage from "../../Assets/images/placeholderimage.png";
export const VendorDetail = () => {
  const { id } = useParams();

  // const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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
    const token = localStorage.getItem("token");
    document.title = "Hisoc Admin | Vendor Detail";
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
            <div className="col-12">
              {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <button onClick={() => {
                    data?.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.status ? 'Inactive' : 'Active'}</button>
                  <span className={`statusBadge ${data?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}

              <div className="row">
                <div className="col-md-6">
                  <div className="productInfo">
                    <h3 className="secondaryText">Name </h3>
                    <h3 className="text-capitalize">{data?.name}</h3>

                    <h3 className="secondaryText">Phone </h3>
                    <p>{data?.phone}</p>
                    <h3 className="secondaryText">Email </h3>
                    <p>{data?.email}</p>
                    <h3 className="secondaryText">Status </h3>
                    <p>{data?.status}</p>
                    <h3 className="secondaryText">D.O.B </h3>
                    <p>{data?.dob}</p>
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
                      data?.portfolio_images.map((image, index) => (
                        <div className="col-md-6 mt-3">
                          <img
                            src={`${imageUrl}/${image}`}
                            className="w-100 c-pointer gallery-image"
                            alt=""
                            onClick={() => { setIsOpen(true); setPhotoIndex(index); }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          
          <Lightbox
            mainSrc={`${imageUrl}/${data?.portfolio_images[photoIndex]}`}
            nextSrc={`${imageUrl}/${data?.portfolio_images[(photoIndex + 1) % data?.portfolio_images.length]}`}
            prevSrc={`${imageUrl}/${data?.portfolio_images[(photoIndex + data?.portfolio_images.length - 1) % data?.portfolio_images.length]}`}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + data?.portfolio_images.length - 1) % data?.portfolio_images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % data?.portfolio_images.length)
            }
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
