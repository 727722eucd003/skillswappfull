import React from 'react';
import styles from './About.module.css'; // Import the CSS module

const About = () => {
  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Skill Swap</div>
        <ul className={styles.navLinks}>
          <li><a href="/Skills" className={styles.navLink}>Skills</a></li>
          <li><a href="/" className={styles.navLink}>Home</a></li>
          <li><a href="/Profile" className={styles.navLink}>Profile</a></li>
          <li><a href="/contact" className={styles.navLink}>Contact</a></li>
        </ul>
        <button className={styles.signInBtn}>Sign In</button>
      </nav>

      <div className={styles.content}>
        <section className={styles.introduction}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>About SkillSwap</h1>
            <p className={styles.description}>
              SkillSwap is a dynamic platform designed to connect individuals who want to share their skills and knowledge. Our mission is to create a thriving community where people can learn from each other, enhance their expertise, and exchange valuable skills. Whether you're looking to pick up a new hobby, advance your career, or simply connect with others who share your interests, SkillSwap is here to help.
            </p>
          </div>
          <div className={styles.imageContainer}>
            {/* Removed the image */}
          </div>
        </section>

        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" alt="Sign Up" className={styles.stepImage} />
              <h3 className={styles.stepTitle}>1. Sign Up</h3>
              <p className={styles.stepDescription}>
                Create an account to get started. Fill in your details and start exploring the platform.
              </p>
            </div>
            <div className={styles.step}>
              <img src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg" alt="Set Up Your Profile" className={styles.stepImage} />
              <h3 className={styles.stepTitle}>2. Set Up Your Profile</h3>
              <p className={styles.stepDescription}>
                Complete your profile by adding information about your skills and interests.
              </p>
            </div>
            <div className={styles.step}>
              <img src="https://images.pexels.com/photos/3183138/pexels-photo-3183138.jpeg" alt="Browse Skills" className={styles.stepImage} />
              <h3 className={styles.stepTitle}>3. Browse Skills</h3>
              <p className={styles.stepDescription}>
                Explore the range of skills offered by other users and find those that match your interests.
              </p>
            </div>
            <div className={styles.step}>
              <img src="https://images.pexels.com/photos/3184308/pexels-photo-3184308.jpeg" alt="Connect and Exchange" className={styles.stepImage} />
              <h3 className={styles.stepTitle}>4. Connect and Exchange</h3>
              <p className={styles.stepDescription}>
                Reach out to others to arrange skill exchanges and start learning or teaching.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.vision}>
          <div className={styles.visionDescription}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p>
              At SkillSwap, we envision a world where knowledge is freely shared, and everyone has access to learn and grow. Our platform aims to bridge the gap between learners and experts, fostering an environment of continuous improvement and collaboration.
            </p>
          </div>
          <div className={styles.visionImage}>
            {/* Removed the vision image */}
          </div>
        </section>

        <section className={styles.contactUs}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.contactDescription}>
            Have questions or feedback? Reach out to us at <a href="mailto:contact@skillswap.com" className={styles.emailLink}>contact@skillswap.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
