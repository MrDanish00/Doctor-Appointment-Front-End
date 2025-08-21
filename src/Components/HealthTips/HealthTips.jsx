import "./HealthTips.css";
import drinkWater from "../../assets/Images/drink-water.jpg";
import healthyFood from "../../assets/Images/healthy-food.webp";
import sleepImage from "../../assets/Images/sleep-img.jpg"
import washHands from "../../assets/Images/wash-hands.jpg"
import meditation from "../../assets/Images/meditation.avif";
import noSmoking from "../../assets/Images/no-smoking.jpg";
import bp from "../../assets/Images/bp.webp";
function HealthTips(){
    const healthTips = [
        {
            img: drinkWater,
            text: "Drink at least 7–8 glasses of water daily to stay hydrated."
        },
        {
            img: healthyFood,
            text: "Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins."
        },
        {
            img:  sleepImage,
            text: "Aim for 7–9 hours of restful, quality sleep each night to recharge your body and mind."
        },
        {
            img: washHands,
            text: "Wash your hands frequently to prevent infections."
        },
        {
            img: meditation,
            text: "Practice mindfulness or meditation for stress relief."
        },
        {
            img: noSmoking,
            text: "Avoid smoking and limit alcohol consumption."
        }
    ]
    return(
        <>
            <div className="health-tips-div">
                <h1>Health Tips</h1>
                <div className="tips-outer-div">
                    

                    
                        {healthTips.map((tip,index)=>(
                            <>
                            <div className="tips-div" key={index}>
                                <img className="tips-img" src={tip.img} alt="" /><br />
                                <p className="tips-p">{tip.text}</p>
                            </div>
                            </>
                        ))}
                   

                </div>
            </div>
        </>
    )
}

export default HealthTips;