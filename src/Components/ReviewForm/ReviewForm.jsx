import { useState,useEffect } from "react";
import "./ReviewForm.css";
import { useNavigate } from "react-router-dom";


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
    const [viewReview,setViewReview] = useState(false);
    const navigate = useNavigate();

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
        const email = sessionStorage.getItem("email");
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

    useEffect(()=>{
            if(isLogged){
                setViewReview(true)
            }
            else{
                navigate("/Doctor-Appointment-Front-End/login");
            }
        },[])

    return(
        <>
        {isLogged && (
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
                            Give Review
                          </button>
                        )}
                      </td>
                      <td className="table-data">
                        {apt.review?.name && (
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
                            See Review
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2>No Appointments Found</h2>
            )}
          </div>

          {/* Review Form Modal */}
          {showReviewForm && (
            <div className="review-form" onClick={() => setShowReviewForm(false)}>
              <div className="review-form-1" onClick={(e) => e.stopPropagation()}>
                <h1>Give Your Review</h1>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review"
                  required
                />
                <div className="stars">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <React.Fragment key={star}>
                      <input
                        type="radio"
                        id={`star${star}`}
                        name="rating"
                        value={star}
                        onChange={() => setRating(star)}
                        checked={rating === star}
                      />
                      <label htmlFor={`star${star}`}>★</label>
                    </React.Fragment>
                  ))}
                </div>
                <button onClick={(e) => handleReviewSubmit(e, aptId)}>Submit</button>
              </div>
            </div>
          )}

          {/* See Review Modal */}
          {seeReview && (
            <div className="review-form" onClick={() => setSeeReview(false)}>
              <div className="review-form-1" onClick={(e) => e.stopPropagation()}>
                <h1>Review</h1>
                <p><strong>Name:</strong> {reviewName}</p>
                <p><strong>Review:</strong> {reviewText}</p>
                <p><strong>Rating:</strong> {"★".repeat(reviewRating)}</p>
                <button onClick={(e) => deleteReview(e, aptId)}>Delete</button>
                <button onClick={() => setSeeReview(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ReviewForm;