import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./App.css";

function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [address, setAddress] = useState("");
  const [document, setDocument] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
// console.log('fname >> ',fname)
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const submitValue = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await Axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }

    let data = {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      qualification: qualification,
      address: address,
      document: fileName,
    }
    Axios.post("http://localhost:5000/api/insert", data).then(() => {
      alert("Your form is submited");
    });
  };
  return (
    <div className="App">
      <div className="form">
        <h1>Registration Form</h1>
        <form>
          <div className="fname">
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              onChange={(e) => {
                setFname(e.target.value);
              }}
              required
            />
          </div>

          <div className="lname">
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              onChange={(e) => {
                setLname(e.target.value);
              }}
              required
            />
          </div>

          <div className="email">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          <div className="number">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
            />
          </div>

          <div className="education">
            <label>Qualification</label>
            <select
              name="qulification"
              onChange={(e) => {
                setQualification(e.target.value);
              }}
              id="qualif"
            >
              <option>Please select : </option>
              <option>SSC</option>
              <option>HSC</option>
              <option>Bsc</option>
              <option>MCA</option>
              <option>BCA</option>
            </select>
          </div>

          <div className="address">
            <textarea
              placeholder="Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>

          <div className="document">
            <label>Resume</label>
            <input
              type="file"
              name="fileToUpload"
              onChange={saveFile}
              required
            />
          </div>

          <div className="btn">
            <button className="submit" onClick={submitValue}>
              Submit
            </button>
            <button className="reset" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
