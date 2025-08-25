import { useState, useEffect } from "react";

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faCalendarDays,
  faHandshake,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import program from '../../Assets/images/program.png'

import "./style.css";

export const Dashboard = () => {
  const [vendors, setVendors] = useState('');
  const [users, setUsers] = useState('');
  const [programs, setPrograms] = useState('');
  const [sponsors, setSponsors] = useState('');
  const  fetchVendor = (token) =>{
    let url = `${process.env.REACT_APP_BASE_URL}/all-vendor`
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(res => res.json())
      .then((data)=>{
        // console.log(data.data);
        setVendors(data?.data)
      }).catch((error)=>{
        console.log('Error in fetching Error' , error);
        
      })

  }
  const  fetchUser = (token) =>{
    let url = `${process.env.REACT_APP_BASE_URL}/all-users`
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(res => res.json())
      .then((data)=>{
        // console.log(data.data);
        setUsers(data?.data)
      }).catch((error)=>{
        console.log('Error in fetching Error' , error);
        
      })

  }
  
  useEffect(()=>{
    try {
      const token = localStorage.getItem("admintoken");
      fetchVendor(token);
      fetchUser(token);
    } catch (error) {
      
    }
  },[])


  useEffect(() => {

    document.title = 'Wedding Concierge | Dashboard';
  }, []);

  const [chartData, setChartData] = useState({});


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{vendors?.length}</h3>
                          <p className="statsText">Total Vendors</p>
                        </div>
                      </div>
                      <div className="statsChange">
                      <FontAwesomeIcon icon={faHandshake} className="me-2  fs-3" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{users?.length}</h3>
                          <p className="statsText">Total Users</p>
                        </div> 
                      </div>
                      <div className="statsChange">
                      <FontAwesomeIcon icon={faUsers} className="me-2  fs-3" />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{programs?.length}</h3>
                          <p className="statsText">Total Programs</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <img src={program} style={{width:'30px'}} className="me-2" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{sponsors?.length}</h3>
                          <p className="statsText">Total Sponsor Programs</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon icon={faHandshake} className="me-2  fs-3" />

                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="d-flex flex-wrap justify-content-between">
                  <h3 className="mainTitle">Total Users</h3>
                </div>
                <div className="graph-wrapper">
                 
                  
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </DashboardLayout >
    </>
  );
};
