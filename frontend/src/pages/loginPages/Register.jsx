import React, { useState } from "react";
import axios from "axios";
import { REGISTER_ROUTE, GET_OTP_ROUTE } from "../../utils/ApiRoutes";
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: {
      countryCode: "",
      phoneNo: "",
    },
    permanentAddress: {
      country: "",
      state: "",
      pin: "",
      city: "",
      streetAddress: "",
    },
    nationality: "",
    hostel: "",
    gender: "",
    dateOfBirth: "",
    collegeMail: "",
    extraMail: "",
    bloodGroup: "",
    position: "",
  });

    useEffect(() => {
    if (userInfo) {
      console.log("Updated userInfo:", userInfo);
    }
  }, [userInfo]); 

  const countryCodes = [
    { code: "+1", label: "United States" },
    { code: "+44", label: "United Kingdom" },
    { code: "+91", label: "India" },
    { code: "+61", label: "Australia" },
    // Add other country codes as needed
  ];

  const nationalities = [
    "American",
    "British",
    "Indian",
    "Australian",
    // Add other nationalities as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    const names = name.split(".");
    // console.log(names);

    if (name === "collegeMail") {
      if (value && !value.endsWith("@mnnit.ac.in")) {
        setError("CollegeMail must end with @mnnit.ac.in");
      } else {
        setError(""); // Clear error if validation passes
      }
    }

    if (names.length > 1) {
      setFormData((prevState) => ({
        ...prevState,
        [names[0]]: {
          ...prevState[names[0]],
          [names[1]]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
        dispatch({
        //Dispatch an action to set the newUser state to true.
        type: reducerCases.SET_NEW_USER,
        newUser: true,
      });
      dispatch({
        type: reducerCases.SET_USER_INFO, // Action to set user information in the state.
        userInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          permanentAddress: formData.permanentAddress,
          nationality: formData.nationality,
          hostel: formData.hostel,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          collegeMail: formData.collegeMail,
          extraMail: formData.extraMail,
          bloodGroup: formData.bloodGroup,
          position: formData.position,
        },
      });
      console.log("My foot", userInfo);
      
      const response = await axios.post(GET_OTP_ROUTE, formData, {
        withCredentials: true,
      });
      console.log("Registration successful:", response);
      console.log(response);
      const redirectLink = response.data.redirect;
      if(redirectLink == '/'){
        alert("User already registered, try log in");
      }
      if (response.data.redirect) {
        navigate(response.data.redirect);
      } else {
        console.log("User logged in successfully!");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Registration Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-700">Phone</label>
            <div className="flex space-x-2">
              <select
                name="phone.countryCode"
                value={formData.phone.countryCode}
                onChange={handleChange}
                required
                placeholder="Country Code"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/3"
              >
                <option value="">Select</option>
                {countryCodes.map((country) => {
                  return (
                    <option value={country.code}>
                      {country.label} ({country.code})
                    </option>
                  );
                })}
              </select>
              <input
                type="text"
                name="phone.phoneNo"
                value={formData.phone.phoneNo}
                onChange={handleChange}
                required
                placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-2/3"
              />
            </div>
          </div>

          {/* Permanent Address */}
          <div className="flex flex-col">
            <label className="text-gray-700">Permanent Address</label>

            <input
              type="text"
              name="permanentAddress.country"
              value={formData.permanentAddress.country}
              onChange={handleChange}
              required
              placeholder="Country"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="grid grid-cols-3 gap-4 mt-2">
              <input
                type="text"
                name="permanentAddress.state"
                value={formData.permanentAddress.state}
                onChange={handleChange}
                required
                placeholder="State"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="permanentAddress.city"
                value={formData.permanentAddress.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="permanentAddress.streetAddress"
                value={formData.permanentAddress.streetAddress}
                onChange={handleChange}
                required
                placeholder="Street Address"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="permanentAddress.pin"
                value={formData.permanentAddress.pin}
                onChange={handleChange}
                required
                placeholder="PIN"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Nationality */}
          <div className="flex flex-col">
            <label className="text-gray-700">Nationality</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Nationality</option>
              {nationalities.map((x) => {
                return <option value={x}>{x}</option>;
              })}
            </select>
          </div>

          {/* Hostel */}
          <div className="flex flex-col">
            <label className="text-gray-700">Hostel</label>
            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Hostel</option>
              <option value="Patel">Patel</option>
              <option value="Tilak">Tilak</option>
              <option value="Tandon">Tandon</option>
              <option value="Malviya">Malviya</option>
              <option value="NBH">NBH</option>
            </select>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* College Email */}
          <div className="flex flex-col">
            <label className="text-gray-700">College Email</label>
            <input
              type="email"
              name="collegeMail"
              value={formData.collegeMail}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error && (
              <span className="text-red-500 text-sm mt-1">{error}</span>
            )}
          </div>

          {/* Extra Email */}
          <div className="flex flex-col">
            <label className="text-gray-700">Extra Email</label>
            <input
              type="email"
              name="extraMail"
              value={formData.extraMail}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label className="text-gray-700">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="Other">Other</option>
              <option value="N/A">N/A</option>
            </select>
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <label className="text-gray-700">Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Position</option>
              <option value="Student">Student</option>
              <option value="ChiefWarden">ChiefWarden</option>
              <option value="Warden">Warden</option>
              <option value="Accountant">Accountant</option>
              <option value="MessInCharge">MessInCharge</option>
              <option value="StoreKeeper">StoreKeeper</option>
              <option value="Caretaker">Caretaker</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          {error === "" && (
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Register f
              </button>
            </div>
          )}
          {error !== "" && (
            <div className="col-span-full">
              <div className="w-full bg-gray-400 text-center text-white font-semibold py-3 rounded-md shadow-md">
                Register
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
