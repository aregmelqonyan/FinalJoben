import React, { useState } from "react";
import axios from "axios"; // Import Axios
import styles from "./VerificationCompany.module.css";
import VerifiedCompany from "../VerifiedCompany";
const VerificationCompany = () => {
    const [inputs, setInputs] = useState(Array.from({ length: 6 }, () => ""));
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
   
    const email = localStorage.getItem('storedEmail')
    const company = localStorage.getItem('storedCompany')
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        const filledInputs = newInputs.filter((input) => input !== "").length;
        setButtonDisabled(filledInputs !== 6);
    };
    const handleResendCode = () => {
        // Implement resend functionality
    };
    const [showSuccess, setShowSuccess] = useState(false);
    const handleVerifyClick = () => {
        const input_code = inputs.join(""); 
        axios.post("http://localhost:8000/verify_company", {email, 
            input_code, company
        })
        .then(response => {
            // Assuming the verification is successful based on the response
            setShowSuccess(true);
            setSuccessMessage("Verified Successfully!")
          })
        
        .catch((error) => {
            setSuccessMessage("Incorrect verification code! ")
            console.error("Error sending verification code:", error);
        });
    };
    return (
        <div className={styles.Container}>
            <div className={styles.optCard}>
            <div className={styles.mytitleVerify}>
                <h3>Account Verification</h3>
            </div>
                <h1>Account Verification</h1>
                <p>Code has been sent to your E-Mail</p>
                <div className={styles.optCard_inputs}>
                    {inputs.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))}
                </div>
                <p>
                    Didn't get the Code! <a href="#" onClick={handleResendCode}>Resend</a>
                </p>
                <button disabled={buttonDisabled} className={styles.button} onClick={handleVerifyClick}>Verify</button>
                {<p>{successMessage}</p>}
                {showSuccess && <VerifiedCompany />}
            </div>
        </div>
    );
};
export default VerificationCompany;
