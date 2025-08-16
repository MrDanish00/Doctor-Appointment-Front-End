import { useState } from "react";
import "./ReviewForm.css";


function ReviewForm({appointments,showAppoinments,showNotification}){
    const [showReviewForm, setShowReviewForm] = useState(false);
    return(
        <>
            <div className="reviews-div">
                <div className="reviews-div-2">

                    <h1>Reviews</h1>
                   
                        {appointments && appointments.length > 0 ? (
                            
                        <table>
                            <thead>
                                <tr>
                                    <th className="table-head">S.No.</th>
                                    <th className="table-head">Doctor Name</th>
                                    <th className="table-head">Doctor Speciality</th>
                                    <th className="table-head">Provide Review</th>
                                    <th className="table-head">Review Given</th>
                                </tr>
                            </thead>
                           
                            
                            <tbody>
                                {appointments.map((apt,index)=>(
                                    
                                <tr key={apt.id}>
                                    <td className="table-data">{index+1}</td>
                                    <td className="table-data">{apt.doctorName}</td>
                                    <td className="table-data">{apt.doctorSpeciality}</td>
                                    <td className="table-data"><button onClick={()=>setShowReviewForm(true)}>Give Review</button></td>
                                    <td className="table-data"></td>
                                </tr>
                        
                                ))}
                            </tbody>
                        </table>) : (
                        <h1>No Appointments Found</h1>
                    )}

                        
                    
                </div>

            </div>
            {showReviewForm && (
                <>
                    <div className="review-form" onClick={()=>setShowReviewForm(false)}>
                        <div className="review-form-1" onClick={(e)=>e.stopPropagation()}>
                            <h1>Give Your Review</h1><br />
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="name" style={{ textAlign: "left" }}>Name:</label>
                            </div>
                            <input type="text" /><br /><br />
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="review" style={{ textAlign: "left" }}>Review: </label>
                            </div>
                            <textarea style={{ paddingTop: "3rem", paddingBottom: "3rem" }} name="" id=""></textarea><br />
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="name" style={{ textAlign: "left" }}>Ratings:</label>
                            </div>
                            <div class="stars">
                                <input type="radio" id="star5" name="rating" value="5" />
                                <label for="star5">★</label>

                                <input type="radio" id="star4" name="rating" value="4" />
                                <label for="star4">★</label>

                                <input type="radio" id="star3" name="rating" value="3" />
                                <label for="star3">★</label>

                                <input type="radio" id="star2" name="rating" value="2" />
                                <label for="star2">★</label>

                                <input type="radio" id="star1" name="rating" value="1" />
                                <label for="star1">★</label>
                            </div><br />
                            <button className="review-submit-btn">Submit</button>

                        </div>
                    </div>
                </>
            )}
            
        </>
    )
}

export default ReviewForm;