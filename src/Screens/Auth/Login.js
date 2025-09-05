import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import toast from "react-hot-toast";
import { useDispatch } from "../../store";
import { setLogin } from "../../store/slices/user";
import {  getEchoInstance } from "../../echo";

const AdminLogin = () => {
  const apiUrl = `${process.env.REACT_APP_BASE_URL}/login`;
  const location = useLocation();



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  useEffect(() => {
    document.title = "Wedding Concierge | Login";
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    formDataMethod.append("email", formData.email);
    formDataMethod.append("password", formData.password);
    console.log(formData);

    document.querySelector(".loaderBox").classList.remove("d-none");

    // const apiUrl = 'https://custom.mystagingserver.site/Tim-WDLLC/public/api/user-login';

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataMethod,
      });
      
      
      const responseData = await response.json();
      if (responseData.success) {

        document.querySelector(".loaderBox").classList.add("d-none");
        if(responseData?.data?.role == 0 ){
          dispatch(setLogin({ token: responseData.token, user: responseData?.data }));
          getEchoInstance(responseData.token);

          navigate("/dashboard");
          toast.success(responseData?.message || 'Logged in Successfully1')
        }
        else{
          // navigate("/profile");
          toast.error('Unauthorized User!')
          // navigate(window.location.origin)
          let origin = window.location.origin;
          if(responseData?.data?.role == 1){

            // window.location.href = `http://localhost:5174/brittney-bay/login?vendor=${responseData.token}`
            window.location.href = window.location.origin+`/brittney-bay/login?vendor=${responseData.token}`;
          }
          else{

            // window.location.href = `http://localhost:5174/brittney-bay/login?user=${responseData.token}`
            window.location.href = window.location.origin+`/brittney-bay/login?user=${responseData.token}`;
          }
          

        }
      } else {
        document.querySelector(".loaderBox").classList.add("d-none");
        toast.error("Invalid Credentials")

        console.error("Login failed");
      }
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");
      console.error("Error:", error);
    }

    
  };

  return (
    <>
      <AuthLayout authTitle="Login" authPara="Login into your Account">
        <form onSubmit={handleSubmit}>
          <CustomInput
            label="Email Address"
            required
            id="userEmail"
            type="email"
            placeholder="Enter Your Email Address"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <CustomInput
            label="Password"
            required
            id="pass"
            type="password"
            placeholder="Enter Password"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
          />
          {/* <div className="d-flex align-items-baseline justify-content-between mt-1">
            <div className="checkBox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="me-1"
              />
              <label htmlFor="rememberMe" className="fw-semibold">
                Remember Me
              </label>
            </div>
            <Link
              to={"/forget-password"}
              className="text-dark text-decoration-underline"
            >
              Forget Password?
            </Link>
          </div> */}
          <div className="mt-4 text-center">
            <CustomButton variant="primaryButton" text="Login" type="submit" />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default AdminLogin;
