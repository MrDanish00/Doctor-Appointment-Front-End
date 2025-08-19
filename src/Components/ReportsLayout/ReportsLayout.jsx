import { useEffect, useState } from "react";
import "./ReportsLayout.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import doctorImage from "../../assets/Images/doctor icon.jpg"
function ReportsLayout({showNotification,isLogged, setIsLogged,name,setName,appointments,setAppointments}){

    const [showReports, setShowReports] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLogged){
            setShowReports(true);
        }
        else{
            navigate("/Doctor-Appointment-Front-End/login")
        }
    })
const generatePDF = (apt) => {
  const doc = new jsPDF();
  const email = sessionStorage.getItem("email");

  // Title
  doc.setFontSize(20);
  doc.text(`StayHealthy `, 20, 20);
  doc.addImage(doctorImage, "PNG", 60, 11, 12, 12);
  doc.text("____________________________________________",20,25);
  // Patient Info (Right Side)
  doc.setFontSize(12);
  doc.text("Patient Information:", 140, 40);
  doc.text(`Name: ${apt.name}`, 140, 50);
  doc.text(`Phone Number: ${apt.phoneNumber}`, 140, 60);
  doc.text(`Email: ${email}`, 140, 70);

  // Doctor Info (Left Side)
  doc.text("Prescription Details:", 20, 40);
  doc.text(`Doctor: ${apt.doctorName}`, 20, 50);
  doc.text(`Medical License: 12882-1`, 20, 60);
  doc.text(`Phone: (555) 987-6543`, 20, 70);
  doc.text(`Email: jdoe@stayhealthy.com`, 20, 80);
  doc.text(`Date: July 10, 2023`, 20, 90);

  // Prescription
  doc.text("Prescription:", 20, 110);

  let y = 120;
  const prescriptions = [
    {
      medication: "Amoxicillin",
      dosage: "500mg",
      directions: "Take 1 capsule three times a day with meals.",
      quantity: "30 capsules",
    },
    {
      medication: "Ibuprofen",
      dosage: "200mg",
      directions: "Take 1 tablet every 6 hours as needed for pain.",
      quantity: "60 tablets",
    },
    {
      medication: "Loratadine",
      dosage: "10mg",
      directions: "Take 1 tablet daily for allergies.",
      quantity: "30 tablets",
    },
  ];

  prescriptions.forEach((item) => {
    doc.text(`• Medication: ${item.medication}`, 20, y);
    doc.text(`  Dosage: ${item.dosage}`, 25, y + 10);
    doc.text(`  Directions: ${item.directions}`, 25, y + 20);
    doc.text(`  Quantity: ${item.quantity}`, 25, y + 30);
    y += 40;
  });

  // ✅ return the doc
  return doc;
};


  // View in new tab
  const viewReport = (apt) => {
    const doc = generatePDF(apt);
    const pdfBlob = doc.output("bloburl"); // create blob url
    window.open(pdfBlob, "_blank"); // open in new tab
  };

  // Download directly
  const downloadReport = (apt) => {
    const doc = generatePDF(apt);
    doc.save("doctor-report.pdf"); // triggers download
  };
    return(
        <>
            {showReports && (
                <>
                    <div>
                        <div className="reports-div">
                            <div className="reports-div-2">
                                <h1>Reports</h1>
                                {appointments && appointments.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="table-head">S.No.</th>
                                                <th className="table-head">Doctor Name</th>
                                                <th className="table-head">Doctor Speciality</th>
                                                <th className="table-head">View Report</th>
                                                <th className="table-head">Download Report</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((apt, index) => (
                                                <tr key={apt.id}>
                                                    <td className="table-data">{index + 1}</td>
                                                    <td className="table-data">{apt.doctorName}</td>
                                                    <td className="table-data">{apt.doctorSpeciality}</td>
                                                    <td className="table-data">
                                                       
                                                            <button
                                                                className="table-rev-btn"
                                                                onClick={()=>viewReport(apt)}
                                                            >
                                                               View Report
                                                            </button>
                                                 
                                                    </td>
                                                    <td className="table-data">
                                                        
                                                            <button
                                                                className="table-rev-btn"
                                                                onClick={()=>downloadReport(apt)}
                                                            >
                                                                Download Report
                                                            </button>
                                                       
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <h1>No Appointments Found</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>  
    )}


export default ReportsLayout;