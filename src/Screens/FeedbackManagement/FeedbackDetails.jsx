import React, { useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import { useParams } from "react-router";
import BackButton from "../../Components/BackButton";
import { FaRegStar, FaStar } from "react-icons/fa";

const FeedbackDetails = () => {
  const { id } = useParams();

  const [data, setData] = React.useState({});

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("admintoken");
    // document.title = "Hisoc Admin | Vendor Detail";
    document.querySelector(".loaderBox").classList.remove("d-none");
    // fetch(`${apiUrl}/api/admin/member/${id}`, {
    fetch(`${apiUrl}/feedback-view/${id}`, {
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
        console.log("feedback data", data);

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
                Feedback Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3 gap-3 ">
                    <h3 className="secondaryText">Vendor Name :</h3>
                    <p className="text-capitalize mb-0">
                      {data?.vendor_data?.name}
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3 gap-3 ">
                    <h3 className="secondaryText">User Name :</h3>
                    <p className="text-capitalize mb-0">
                      {data?.user_data?.name}
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3 gap-3 ">
                    <h3 className="secondaryText">Hiring Date :</h3>
                    <p className="text-capitalize mb-0">{data?.hire_date}</p>
                  </div>
                  <div className="d-flex align-items-center mb-3 gap-3 ">
                    <h3 className="secondaryText">Status :</h3>
                    <p className="text-capitalize mb-0">{data?.status}</p>
                  </div>
                  <div className="d-flex align-items-center mb-3 gap-3 ">
                    <h3 className="secondaryText">Ratings :</h3>
                    <p>
                      {[1, 2, 3, 4, 5].map((i) =>
                        i <= parseInt(data?.rating) ? (
                          <FaStar key={i} size={20} color="#ffc107" />
                        ) : (
                          <FaRegStar key={i} size={20} color="#ffc107" />
                        )
                      )}
                    </p>
                  </div>
                  <div className=" mb-3 ">
                    <h3 className="secondaryText">Comment :</h3>
                    <p className="mb-0">{data?.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default FeedbackDetails;
