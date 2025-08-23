import "./SelfCheckUp.css";
import selfImage from "../../assets/Images/self-check-up-1.jpg";
import thermometer from "../../assets/Images/thermometer.png"
import { useState } from "react";
function SelfCheckUp(){
    const [readMore,setReadMore] = useState(false);
    return(
        <>
            <div className="self-check-up">
                <img src={selfImage} alt="Self Check Up Image" className="self-check-up-img"/>
                <p className="self-check-up-p">Regular self-checkups are important because they help you stay aware of your body and notice early signs of illness or unusual changes. By paying attention to things like weight, skin, blood pressure, or general health symptoms, you can detect problems sooner and seek medical advice before they become serious. Self-checkups also encourage healthy habits, build confidence in managing your own well-being, and play a vital role in preventing long-term health issues.</p>
            </div><br /><br />

            <div className="self-thermometer-div">
                <img className="self-thermometer-img" src={thermometer} alt="" /><br /><br />
                <h2 className="self-thermometer-h2">Check Your Temperature</h2>
                <p className="self-thermometer-p">Measuring body temperature is one of the simplest and most effective ways to monitor your health. A rise or drop in temperature often serves as an early warning sign of infections, inflammations, or other medical conditions. Detecting fever early allows you to take rest, stay hydrated, or seek medical advice before the illness worsens. For children, elderly people, or patients with weak immunity, temperature checks are especially important because even a small change can indicate a serious problem.</p><br />
                <p className="self-thermometer-p">To get an accurate reading, it is important to use the right type of thermometer. Digital thermometers are the most widely recommended today because they provide quick and reliable results without the risks associated with old mercury thermometers. For infants and toddlers, ear (tympanic) thermometers and forehead (infrared) thermometers are popular choices since they are gentle and comfortable. Adults can use oral, rectal, or underarm digital thermometers depending on convenience and accuracy required, with rectal readings being the most precise.</p><br />
                {readMore && (
                    <>
                    <p className="self-thermometer-p">Knowing the normal range of body temperature helps in interpreting the results. The average body temperature is around 36.5°C to 37.5°C (97.7°F to 99.5°F), but this can slightly vary depending on age, physical activity, or the time of day. In general, a reading of 38°C (100.4°F) or higher is considered a fever, while a temperature below 35°C (95°F) may indicate hypothermia. Since underarm readings are usually lower and rectal readings slightly higher than oral ones, it’s important to interpret the results based on where the measurement was taken.</p><br />
                    <p className="self-thermometer-p">To check your temperature accurately, place the thermometer correctly and follow the manufacturer’s instructions. For oral readings, place the digital thermometer under the tongue and close the mouth until it beeps. For underarm readings, position the thermometer in the armpit, making sure it touches the skin directly. Ear thermometers should be gently inserted into the ear canal, while forehead thermometers are swiped across the skin or held close to it depending on the model. Always clean the thermometer after each use, and record the reading if you are monitoring changes over time. By regularly checking and understanding your temperature, you can take better control of your health and act quickly if needed.</p>
                    
                    </>

                )}
                <button onClick={()=>setReadMore(!readMore)} className="self-thermometer-btn">{readMore ? "Read Less" : "Read More"}</button>
            </div>
        </>
    )
}

export default SelfCheckUp;