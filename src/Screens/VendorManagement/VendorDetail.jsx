import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

import placeholderimage from "../../Assets/images/placeholderimage.png";
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
