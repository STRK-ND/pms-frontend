import React, { useState, useEffect } from "react";
import { CreateOnBoardingForm } from "../services/authService";

const OnboardingForm = () => {
  const [onBoarding, setOnboarding] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: "",
    gender: "Male",
    designation: "",
    doj: "",
    department: "Quality Assurance",
    dob: "",
    email: "",
    uanNo: "",
    joiningLocation: "",
    panNo: "",
    mobileNo: "",
    aadharNo: "",
    presentAddress: "",
    permanentAddress: "",
    annualCtc: "",
    maritalStatus: "",
    spouseName: "",
    previousPfNumber: "Yes",
    epfSalary: "",
    esiNo: "",
    esicDispensary: "",
    nomineeName: "",
    nomineeDob: "",
    nomineeAadhar: "",
    nomineeRelation: "",
    fatherName: "",
    husbandName: "",
    nameInBank: "",
    bankAccountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await CreateOnBoardingForm(formData); // pass form data here
      setOnboarding(res.data);
      alert("✅ Form Submitted Successfully");
      window.location.reload()
      console.log(res, "OnBoarding Data");
    } catch (error) {
      console.error("❌ Submission error:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans bg-gray-50 min-h-screen">
    <header className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 gap-4">
  {/* Brand Info */}
  <div className="text-center sm:text-left">
    <div className="text-2xl sm:text-3xl font-bold text-black">
      <span className="text-gray-600 ">SKORA</span>SOFT
    </div>
    <div className="text-sm sm:text-xs font-normal text-gray-600">
      SKORA SOFT PVT. LTD
    </div>
  </div>

  {/* Page Title */}
  <h1 className="text-xl sm:text-2xl font-semibold text-gray-600 text-center sm:text-right">
    SkoraSoft - Onboarding Form
  </h1>
</header>


      <form action="" className="">
        {/* Personal and Contact Details */}
        <section className="bg-white shadow-md rounded p-6 ">
          <h2 className="text-lg font-semibold mb-4 text-gray-800  h-13 rounded flex justify-start items-center bg-amber-10 border-l-4 border-gray-600 p-3 bg-[whitesmoke] ">
            Personal and Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">
                Employee Name as per Aadhar
              </label>
              <input
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Employee Name as per Aadhar"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    className="mr-2"
                    value={formData.gender}
                    onChange={handleChange}
                    defaultChecked
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" className="mr-2" />
                  Female
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Designation</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Date of Joining (DOJ)
              </label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Select Date of Joining"
                name="doj"
                value={formData.doj}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Department</label>
              <select
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                defaultValue="Quality Assurance"
                name="department"
              >
                <option value="">Select Department</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Development">Development</option>
                <option value="HR">Human Resources</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Date of Birth (DOB)
              </label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Select Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-3 ">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Employment Details */}
        <section className="bg-white shadow-md rounded p-6 ">
          <h2 className="text-lg font-semibold mb-4 text-gray-800  h-13 rounded flex justify-start items-center bg-amber-10 border-l-4 border-gray-600 p-3 bg-[whitesmoke]">
            Employment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">UAN No</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter UAN number"
                name="uanNo"
                value={formData.uanNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Joining Location</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter joining location"
                name="joiningLocation"
                value={formData.joiningLocation}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">PAN No</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter PAN number"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Mobile No</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter mobile number"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Aadhar No</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Aadhar number"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Present Address</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter current address"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Permanent Address
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter permanent address"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Annual CTC</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Annual CTC"
                name="annualCtc"
                value={formData.annualCtc}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Marital Status</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="maritalStatus"
                    className="mr-2"
                    value="Yes" // ✅ explicitly set value
                    checked={formData.maritalStatus === "Yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="maritalStatus"
                    className="mr-2"
                    value="No" // ✅ explicitly set value
                    checked={formData.maritalStatus === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Spouse Name (if Married)
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter spouse name"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Previous Employer PF Number
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="previousPfNumber"
                    className="mr-2"
                    defaultChecked
                  />{" "}
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="previousPfNumber"
                    className="mr-2"
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">EPF Salary</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter EPF salary"
                name="epfSalary"
                value={formData.epfSalary}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Previous ESI No. (if any)
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter ESI number (if any)"
                name="esiNo"
                value={formData.esiNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">ESIC Dispensary</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter ESIC dispensary name"
                name="esicDispensary"
                value={formData.esicDispensary}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <section className="bg-white shadow-md rounded p-6 ">
          <h1 className="text-lg font-semibold mb-4 text-gray-800  h-13 rounded flex justify-start items-center bg-amber-10 border-l-4 border-gray-600 p-3 bg-[whitesmoke]">
            Nominee Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Nominee Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter nominee full name"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nominee DOB</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Select date of birth"
                name="nomineeDob"
                value={formData.nomineeDob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nominee Aadhar</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Aadhar number"
                name="nomineeAadhar"
                value={formData.nomineeAadhar}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Relation with Nominee
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="e.g., Son, Daughter, Spouse"
                name="nomineeRelation"
                value={formData.nomineeRelation}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Father Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter father's name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Husband's Name (if Married)
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter husband's name"
                name="husbandName"
                value={formData.husbandName}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
        {/* -------------------------------------------- */}
        <section className="bg-white shadow-md rounded p-6 ">
          <h1 className="text-lg font-semibold mb-4 text-gray-800  h-13 rounded flex justify-start items-center bg-amber-10 border-l-4 border-gray-600 p-3 bg-[whitesmoke]">
            Bank Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name in Bank</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter name as per bank records"
                name="nameInBank"
                value={formData.nameInBank}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Bank Account Number
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter bank account number"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bank Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter bank name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Branch Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter branch name"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">IFSC Code</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter IFSC code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
        <section className="bg-white shadow-md rounded p-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit} // 🔁 manually call the handler
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded shadow-md transition-all duration-300 h-8 flex items-center cursor-pointer"
          >
            Submit
          </button>
        </section>
      </form>
    </div>
  );
};

export default OnboardingForm;
