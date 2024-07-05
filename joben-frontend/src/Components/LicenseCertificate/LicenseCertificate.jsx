import React, {useState} from "react";
import styles from './LicenseCertificate.module.css';

const LicenseCertificate = () => {
    const [licenseCertificate, setLicenseCertificate] = useState([
        {
            logo: <image/>,
            role: "Role",
            companyName: "Company Name",
            date: "Date",
        },
        {
            logo: <image/>,
            role: "Role",
            companyName: "Company Name",
            date: "Date",
        },
        {
            logo: <image/>,
            role: "Role",
            companyName: "Company Name",
            date: "Date",
        },
        {
            logo: <image/>,
            role: "Role",
            companyName: "Company Name",
            date: "Date",
        },
])
    return (
        <div className={styles.LicenseCertificateContainer}>
            <div className={styles.LicenseCertificateHeader}>
                <h3 className={styles.LicenseCertificateTitle}>Licenses and certifications</h3>
                <div className={styles.LicenseCertificateHederLinks}>
                    <p className={styles.addButton}>+</p>
                    <button className={styles.editButton}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.891 3 18.1493 3.05 18.4 3.15C18.6507 3.25 18.8673 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.9543 6.921 20.863 7.163C20.7717 7.405 20.6257 7.62567 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z" fill="black"/>
</svg></button>
                </div>
            </div>
            <div className={styles.LicenseCertificateBody}>
                {licenseCertificate.map((item, index) => (
                    <div className={styles.LicenseCertificateItem} key={index}>
                        <div className={styles.LicenseCertificateItemLogo}>
                            {item.logo}
                        </div>
                        <div className={styles.LicenseCertificateItemTexts}>
                            <p className={styles.LicenseCertificateItemRole}>{item.role}</p>
                            <p className={styles.LicenseCertificateItemCompanyName}>{item.companyName}</p>
                            <p className={styles.LicenseCertificateItemDate}>{item.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className={styles.LicenseCertificateSeeMore}> See More</p>
        </div>
    )
}

export default LicenseCertificate;