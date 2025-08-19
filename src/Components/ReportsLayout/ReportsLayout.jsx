import { useEffect, useState } from "react";
import "./ReportsLayout.css";
import { useNavigate } from "react-router-dom";

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
                                                        {!apt.review?.name && (
                                                            <button
                                                                className="table-rev-btn"
                                                                onClick={() => renderReviewForm(apt.id)}
                                                            >
                                                               View Report
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="table-data">
                                                        
                                                            <button
                                                                className="table-rev-btn"
                                                                onClick={() =>
                                                                    seeReviewForm(
                                                                        apt.id,
                                                                        apt.review.name,
                                                                        apt.review.reviewText,
                                                                        apt.review.rating
                                                                    )
                                                                }
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