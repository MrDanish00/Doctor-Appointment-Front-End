import { useState } from "react";
import "./ReviewForm.css";


function ReviewForm({isLogged, setIsLogged,appointments,setAppointments,showNotification}){
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [name, setName] = useState("");
    const [review,setReview] = useState("");
    const [rating,setRating] = useState(3);
    const [aptId,setAptId] = useState(null);
    const [seeReview,setSeeReview] = useState(false);
    const [reviewName,setReviewName] = useState("");
    const [reviewText,setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(3);

    const deleteReview = (e,aptId)=>{
        e.preventDefault();

        const updatedApt = appointments.map((apt)=>{
            if(apt.id === aptId){
                return ({...apt,review:null})
            }
            return apt;
        })
        setReviewName("");
        setReviewText("");
        setReviewRating(null);
        setAppointments(updatedApt)
        setSeeReview(false);
        showNotification("Review Deleted Successfully!")

    }

    const handleReviewSubmit = (e,aptId)=>{
        e.preventDefault();
        // onSubmit({name,review,rating});
        console.log("Apt Id: ",aptId)
        console.log("Name: ",name);
        console.log("Review: ",review);
        console.log("Ratings: ",rating);
        const reviewData = {
            name : name,
            reviewText : review,
            rating : rating
        }
        const updatedApt = appointments.map((apt)=>{
            if(apt.id === aptId){
                return ({...apt,review:reviewData})
            }
            return apt;
        });
        console.log("Apt Object: ",updatedApt);
        localStorage.setItem(`appointments_${email}`,JSON.stringify(updatedApt)) || [];
        setShowReviewForm(false);
        showNotification("Review Submiitted!");
        setAppointments(updatedApt)
        setName("");
        setReview("");
        setRating(3);
    }
    const renderReviewForm = (aptid)=>{
        setShowReviewForm(true);
        setAptId(aptid)
    }
    const seeReviewForm = (aptID,aptName,aptText,aptRating)=>{
        setSeeReview(true);
        setAptId(aptID);
        setReviewName(aptName);
        setReviewText(aptText);
        setReviewRating(aptRating)

    }
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
                                    <td className="table-data">
                                    {(!apt.review) && !apt.review.name && (
                                        <button onClick={() => renderReviewForm(apt.id)}>Give Review</button>
                                    )}
                                    </td>
                                    <td className="table-data">
                                    {apt.review && apt.review.name && (
                                        <button onClick={() =>
                                            seeReviewForm(apt.id, apt.review.name, apt.review.reviewText, apt.review.rating)
                                        }>
                                        See Review
                                        </button>
                                    )}
                                    </td>

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
                <form action="" onSubmit={(e)=>handleReviewSubmit(e,aptId)}>


                    <div className="review-form" onClick={()=>setShowReviewForm(false)}>
                        <div className="review-form-1" onClick={(e)=>e.stopPropagation()}>
                            <h1>Give Your Review</h1><br />
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="name" style={{ textAlign: "left" }}>Name:</label>
                            </div>
                            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} required/><br /><br /><br />
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="review"  style={{ textAlign: "left" }}>Review: </label>
                            </div>
                            <textarea value={review} id="review" onChange={(e)=>setReview(e.target.value)} style={{ display:"inline-block", width:"80%",height:"auto" }} name="" required></textarea><br /><br />
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="name" style={{ textAlign: "left" }}>Ratings:</label>
                            </div>
                            <div className="stars">
                                <input type="radio" id="star5" name="rating" onChange={()=>setRating(5)} value="5" />
                                <label htmlFor="star5">★</label>

                                <input type="radio" id="star4" name="rating" onChange={()=>setRating(4)} value="4" />
                                <label htmlFor="star4">★</label>

                                <input type="radio" id="star3" name="rating" onChange={()=>setRating(3)} value="3"/>
                                <label htmlFor="star3">★</label>

                                <input type="radio" id="star2" name="rating" onChange={()=>setRating(2)} value="2" />
                                <label htmlFor="star2">★</label>

                                <input type="radio" id="star1" name="rating" onChange={()=>setRating(1)} value="1" />
                                <label htmlFor="star1">★</label>
                            </div><br />
                            <button type="submit" className="review-submit-btn">Submit</button>

                        </div>
                    </div>
                </form>
                </>
            )}
            {seeReview && (
                <>
                    <div className="review-form" onClick={()=>setSeeReview(false)}>
                        <div className="review-form-1" onClick={(e)=>e.stopPropagation()}>
                            <h1>Review</h1><br />
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="name" style={{ textAlign: "left" }}>Name: <p style={{fontWeight:"500"}}>{reviewName}</p></label>
                            </div>
                            
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="review"  style={{ textAlign: "left" }}>Review: <p style={{fontWeight:"500"}}>{reviewText}</p></label>
                            </div>
                            
                            <div style={{ width: "80%", margin: "auto" }}>

                                <label htmlFor="name" style={{ textAlign: "left" }}>Ratings: <p style={{color:"gold"}}>{"★".repeat(reviewRating)}</p></label>
                            </div>
                            <br />
                            <div style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
                                <button className="see-rev-btn-1" onClick={(e)=>deleteReview(e,aptId)}>Delete</button>
                                <button className="see-rev-btn-2" onClick={()=>setSeeReview(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ReviewForm;