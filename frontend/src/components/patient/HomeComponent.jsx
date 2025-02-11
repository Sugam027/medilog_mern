import React, { useEffect, useState } from "react";
import API from "../../API";

function ExpandedDetails({ record, onback}) {
  return (
    <>
      <div className="expandedDetailBackground">
        <div className="expandedMenu">
          <p onClick={onback} className="back btn btn-secondary">Back</p>
        </div>
        <div className="expandedDetails">
          <div className="hospitalInfo">
            <div className="logo">
              <img src="../icons/logo_green.png" alt="" />
            </div>
            <div className="hospitalDetail">
              <p className="hospitalName">{record.hospitalId.hospitalName}</p>
              <p className="address">{record.hospitalId.city.name}, {record.hospitalId.city.district.name}</p>
            </div>
            <div className="hospitalContact">
              <p className="contact">Ph: {record.hospitalId.contact}</p>
              <p className="email">Email: {record.hospitalId.email}</p>
              <p className="website">Website: {record.hospitalId.websiteUrl}</p>
            </div>
          </div>
          <div className="patientDetail">
            <p>Patient Info:</p>
            <div className="row">
              <div className="col">
                <p className="name">Name: {record.patientId.name}</p>
                <p className="name">Gender: Female</p>
                <p className="name">Age: 35</p>
              </div>
              <div className="col">
                <p className="name">Address: </p>
                <p className="name">Gender: </p>
                <p className="name">Phone: {record.patientId.phone}</p>
              </div>
              <div className="col-2">
                <div className="patientImage">
                  <img src={record.patientId.image} alt="" />      
                </div>
              </div>
            </div>
          </div>
          <p className="diagnosisTitle">Diagnosis</p>
          <div className="recordsDetail">
            <div className="row">
              <div className="col">
                <p>By: {record.doctorId.name}</p>
                <p>Category: {record.doctorId.category}</p>
              </div>
              <div className="col">
                <p>Date: {record.diagnosedOn}</p>
              </div>
            </div>
            <div className="examinationDetail">
              <p>Examination </p>
              <p>{record.examinationDetail}</p>
            </div>
            <div className="prescriptions">
              <p>Prescriptions</p>
              <ul className="prescriptionList">
                {record.prescriptions?.map((prescription, index) => (
                <li key={index} className="prescriptionItem">
                  {prescription.prescription} <span>on</span> {prescription.time} <span>till</span> {prescription.till}
                </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <p>Doctor Name: {record.doctorId.name}</p>
          <p>Doctor Email: {record.doctorId.email}</p> */}
          {/* Add more details as needed */}
        </div>

      </div>
    
    </>
  );
}

function HomeComponent() {

  const token = localStorage.getItem("token") ?? "";
  const [records, setRecords] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [active, setActive] = useState("all");

  const handleActiveTab = (active) =>{
    setActive(active);
  }

  const getProfile = async() =>{
    await API.get("/user/profile",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        setUserProfile(response.data);
    }).catch(error =>{
        console.log(error);
    })
}

  const getRecords = async (patientId) =>{
    if (!patientId) return;
    await API.get(`/prescription/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response =>{
      console.log(response.data.data)
      setRecords(response.data.data)
    }).catch(error =>{
      console.log(error);
    })
  }

  useEffect(() =>{
    getProfile();
  }, []);

  useEffect(() => {
    if (userProfile && userProfile._id) {
      getRecords(userProfile._id);
    }
  }, [userProfile]);

  const [expanded, setExpanded] = useState(false);
  const [expandedRecord, setExpandedRecord] = useState();

  const handleExpand = (record) => {
    setExpandedRecord(record);
    setExpanded(true);
  };

  const handleBack = () =>{
    setExpanded(false);
  }


  return (
    <>
      <div className="container">
        <div className="recordsMenu">
          <span>Records History</span>
          <ul>
            <li className={(active === 'all' ? "active": "")} onClick={() => handleActiveTab('all')}>All</li>
            <li className={(active === 'today' ? "active": "")} onClick={() => handleActiveTab('today')}>Today</li>
            <li className={(active === 'yesterday' ? "active": "")} onClick={() => handleActiveTab('yesterday')}>Yesterday</li>
            <li className={(active === 'lastWeek' ? "active": "")} onClick={() => handleActiveTab('lastWeek')}>Last Week</li>
            <li className={(active === 'lastMonth' ? "active": "")} onClick={() => handleActiveTab('lastMonth')}>Last Month</li>
            <li className={(active === 'lastYear' ? "active": "")} onClick={() => handleActiveTab('lastYear')}>Last Year</li>
          </ul>

        </div>
        <div>
          {records && records.map((record, index) =>{
            return(
              <div className="records" key={index}>
                <div className="date">
                  <p className="day">{record.diagnosedOn}</p>
                  
                </div>

                <div className="cardBody">
                  <div className="cardTitle">
                    <div className="hospitalName">
                      <p>{record.hospitalId.hospitalName}</p>
                    </div>
                    <div className="hospitalAddress">
                      <p>{record.hospitalId.city.name}, {record.hospitalId.city.district.name}</p>
                    </div>
                  </div>
                  <div className=" row cardInfo">
                    <div className="col-md-6">
                      <h4>Diagnosed By:</h4>
                      <div className="doctorDetail">
                        <div className="doctorImage">
                          <img src={record.doctorId.image} alt="" />
                        </div>
                        <div className="doctorProfile">
                          <p className="doctorName">{record.doctorId.name}</p>
                          <p className="doctorEmail">{record.doctorId.phone}</p>
                        </div>
                      </div>
                      <div className="doctorCategory">
                        <p>Category</p>
                        <p className="doctorField">{record.doctorId.category}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="examination">
                        <p className="examinationTitle">Examination</p>
                        <p className="examinationDetails">{record.examinationDetail}</p>
                      </div>
                      <div className="prescription">
                        <p className="prescriptionTitle">Prescription</p>
                        <ul className="prescriptionList">
                        {record.prescriptions?.map((prescription, index) => (
                        <li key={index} className="prescriptionItem">
                          {prescription.prescription} <span>on</span> {prescription.time} <span>till</span> {prescription.till}
                        </li>
                      ))}
                        </ul>
                      </div>
                      <div className="expandButton">
                        <p className="expand" onClick={() => handleExpand(record)}>Expand</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            
          })}
          {/* <div className="records">
            <div className="date">
              <p className="day">01</p>
              <p className="month">Jan</p>
              <p className="year">2080</p>
            </div>

            <div className="cardBody">
              <div className="cardTitle">
                <div className="hospitalName">
                  <p>Hams</p>
                </div>
                <div className="hospitalAddress">
                  <p>Budhanilkantha</p>
                </div>
              </div>
              <div className=" row cardInfo">
                <div className="col-md-6">
                  <h4>Diagnosed By:</h4>
                  <div className="doctorDetail">
                    <div className="doctorImage">
                      <img src="../doctors/IMG_1001.png" alt="" />
                    </div>
                    <div className="doctorProfile">
                      <p className="doctorName">Suresh</p>
                      <p className="doctorEmail">suresh@gmail.com</p>
                    </div>
                  </div>
                  <div className="doctorCategory">
                    <p>Category</p>
                    <p className="doctorField">Dental</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="examination">
                    <p className="examinationTitle">Examination</p>
                    <p className="examinationDetails">details</p>
                  </div>
                  <div className="prescription">
                    <p className="prescriptionTitle">prescription</p>
                    <ul className="prescriptionList">
                      <li className="prescriptionItem">paracetamol</li>
                      <li className="prescriptionItem">derma Moist</li>
                    </ul>
                  </div>
                  <div className="expandButton">
                    <p className="expand">Expand</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          
        </div>
      </div>
  
      { 
      expanded && 
      <ExpandedDetails record={expandedRecord} onback={handleBack} />
      }
    </>
  );
}

export default HomeComponent;
