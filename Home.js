import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // No need for useNavigate
import { useAuth } from './AuthContext'; // Import useAuth hook
import styles from './Home.module.css'; // Import CSS module
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import threedLogo from '../assets/threedlogo.png'; // Adjust the path if necessary
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // Use AuthContext

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleLogout = () => {
    logout();
    // No navigation here, stay on the same page
  };

  return (
    <div className={styles.mainhome}>
      <div className={styles.homeContainer}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>Skill Swap</div>
          <div className={styles.navLinksContainer}>
            <ul className={styles.navLinks}>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          {user.token ? (
            <div className={styles.userMenu}>
              <img src={user.profileImage} alt="Profile" className={styles.profileImage} />
              <span className={styles.username}>{user.username}</span>
              <button onClick={toggleDropdown} className={styles.dropdownToggle}>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <button onClick={handleLogout} className={styles.signOutBtn}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.signInBtn}>Sign In</Link>
          )}
        </nav>

        {/* Rest of the Home component */}
        <section id="hero" className={`${styles.section} ${styles.heroSection}`} data-aos="fade-up">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Connecting Talents<br /> Creating Futures</h1>
            <p className={styles.heroSubtitle}>Swap your skills and learn from others. Connect, collaborate, and grow together.</p>
            <button className={styles.glassmorphicButton}>Get Started</button>
          </div>
          <div className={styles.heroMedia}>
            <div className={styles.socialIconsContainer}>
              <div className={styles.socialIcons}>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
              </div>
            </div>
            <img src={threedLogo} alt="3D Icon" className={styles.heroImage} />
          </div>
        </section>

        <section id="combined" className={styles.section} data-aos="fade-up">
          <div className={styles.combinedContainer}>
            <div className={styles.tag}>
              <h2>Why Skill Swap</h2>
              <p>Skill Swap is the perfect place to share your skills and learn new ones. Join a community of passionate individuals eager to grow and help each other.</p>
            </div>
            <div className={styles.tag}>
              <h2>Events</h2>
              <p>Join our events to connect with others, share your skills, and learn new ones. Check out our upcoming events and sign up today.</p>
            </div>
            <div className={styles.combinedTags}>
              <div className={styles.tag}>
                <h3>Collaborate</h3>
                <p>Work together with like-minded individuals on projects and initiatives. Share your expertise and benefit from others' knowledge.</p>
              </div>
              <div className={styles.tag}>
                <h3>Grow</h3>
                <p>Expand your skill set and personal growth through diverse learning opportunities. Embrace new challenges and improve your capabilities.</p>
              </div>
              <div className={styles.tag}>
                <h3>Learn</h3>
                <p>Discover new skills and knowledge from experienced professionals. Engage in educational activities and workshops tailored to your interests.</p>
              </div>
              <div className={styles.tag}>
                <h3>Innovate</h3>
                <p>Bring fresh ideas and innovative solutions to the table. Participate in creative projects and contribute to groundbreaking developments.</p>
              </div>
              <div className={styles.tag}>
                <h3>Connect</h3>
                <p>Build meaningful relationships with others in the community. Network with professionals and enthusiasts to enhance your personal and career growth.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="membership" className={styles.membershipContainer} data-aos="fade-up">
          <div className={styles.membershipHeader}>
            <h2>Become a Member</h2>
          </div>
          <div className={styles.membershipContent}>
            <p className={styles.membershipDescription}>
              Join us to unlock a world of opportunities. As a member, you'll gain access to exclusive content, events, and a vibrant community dedicated to growth and learning.
            </p>

            <div className={styles.membershipLevels}>
              <div className={styles.level}>
                <i className="fas fa-crown"></i>
                <h3>Exclusive Content</h3>
                <p>Access premium articles, videos, and resources tailored for our members.</p>
              </div>
              <div className={styles.level}>
                <i className="fas fa-calendar-check"></i>
                <h3>Special Events</h3>
                <p>Enjoy early access and discounts to events, webinars, and workshops.</p>
              </div>
              <div className={styles.level}>
                <i className="fas fa-users"></i>
                <h3>Community Access</h3>
                <p>Connect with like-minded individuals and experts through our exclusive community platforms.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>About Us</h3>
              <p>Skill Swap is a platform dedicated to connecting individuals through the exchange of skills. Join us and be part of a growing community.</p>
            </div>
            <div className={styles.footerSection}>
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/skills">Skills</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Follow Us</h3>
              <div className={styles.socialIcons2}>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcons}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcons}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcons}>
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 Skill Swap. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
