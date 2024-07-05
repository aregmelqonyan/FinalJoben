import React from 'react';
import styles from './Blog.module.css'; // Import CSS module
import NavBar from '../../Layout/NavBar';
import Footer from '../../Layout/Footer';
import NavBarCompany from '../../Layout/NavBarCompany';
import NavBarUser from '../../Layout/NavBarUser';

const Blog = () => {
  const accessToken = localStorage.getItem('accessToken');
  const company = localStorage.getItem('company');
    return (
        <div>
            {(!accessToken && !company) && <NavBar />}
            {(accessToken && !company) && <NavBarUser />}
            {(accessToken && company) && <NavBarCompany />}

            <div className={styles.container}>
                {/* Blog cards */}
                {/* Card 1 */}
                <div className={styles['card-item']}>
                    <div className={`${styles.image} ${styles.image1}`}></div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>How to write good code?</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam error hic doloremque. Cum sint id error. Eos, laboriosam!</p>
                        <a href="https://www.sitepoint.com/how-to-write-good-code/" target="_blank" className={styles.button} rel='noreferrer'>Read More</a>
                    </div>
                </div>

                {/* Card 2 */}
                <div className={styles['card-item']}>
                    <div className={`${styles.image} ${styles.image2}`}></div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>How to learn javascript?</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam error hic doloremque. Cum sint id error. Eos, laboriosam!</p>
                        <a href="https://www.codecademy.com/learn/introduction-to-javascript" target="_blank" className={styles.button}>Read More</a>
                    </div>
                </div>

                {/* Card 3 */}
                <div className={styles['card-item']}>
                    <div className={`${styles.image} ${styles.image3}`}></div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>What is Geeks Help?</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam error hic doloremque. Cum sint id error. Eos, laboriosam!</p>
                        <a href="https://www.geekshelp.in/#:~:text=Geeks%20Help%20is%20an%20independent,BCA%20and%20Computer%20Science%20Students." target="_blank" className={styles.button}>Read More</a>
                    </div>
                </div>

                {/* Card 4 */}
                <div className={styles['card-item']}>
                    <div className={`${styles.image} ${styles.image4}`}></div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>How 3 screen works?</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam error hic doloremque. Cum sint id error. Eos, laboriosam!</p>
                        <a href="https://www.mobilepixels.us/blogs/blog/how-to-set-up-triple-monitors-for-laptops#:~:text=Simply%20put%2C%20a%20triple%20monitor,%2C%20BGA%2C%20or%20Thunderbolt%20three." target="_blank" className={styles.button}>Read More</a>
                    </div>
                </div>
            </div>

        <Footer />
        </div>
    );
}

export default Blog;
