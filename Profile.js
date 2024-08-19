import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPencilAlt } from 'react-icons/fa';
import styles from './Profile.module.css';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('experience');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [username, setUsername] = useState(user.username || '');
  const [status, setStatus] = useState('Musician');
  const [location, setLocation] = useState('America, NA');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState('Here you can add a brief description or bio about the user.');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');

  useEffect(() => {
    setUsername(user.username || '');
    setEmail(user.email || '');
    setProfileImage(user.profileImage || '');
  }, [user]);

  const handleEditProfileClick = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleEditBioClick = () => {
    setIsEditingBio(!isEditingBio);
  };

  const handleSaveProfile = async () => {
    try {
      await axios.patch('/api/user/profile', {
        username,
        status,
        location,
        email,
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSaveBio = async () => {
    try {
      await axios.patch('/api/user/bio', { bio }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      setIsEditingBio(false);
    } catch (error) {
      console.error('Error saving bio:', error);
    }
  };

  const handleProfileImageUpload = async (event) => {
    const formData = new FormData();
    formData.append('profileImage', event.target.files[0]);

    try {
      const response = await axios.patch('/api/user/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      // Log the profile image URL received from the backend
      console.log('Profile Image URL:', response.data.profileImage);

      // Update state with the new profile image URL
      setProfileImage(response.data.profileImage);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Skill Swap</div>
        <ul className={styles.navLinks}>
          <li><Link to="/about" className={styles.navLink}>About</Link></li>
          <li><Link to="/" className={styles.navLink}>Home</Link></li>
          <li><Link to="/skills" className={styles.navLink}>Skills</Link></li>
          <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
        </ul>
        {user.token ? (
          <button onClick={logout} className={styles.signInBtn}>Sign Out</button>
        ) : (
          <Link to="/login" className={styles.signInBtn}>Sign In</Link>
        )}
      </nav>

      <div className={styles.profileContainer}>
        <div className={styles.leftSection}>
          <div className={styles.leftBlackContainer}>
            <div className={styles.editProfileIcon} onClick={handleEditProfileClick}>
              <FaPencilAlt />
            </div>
            <div className={styles.profileHeader}>
              <div className={styles.profileImageContainer}>
                <img src={profileImage || 'https://via.placeholder.com/150'} alt="Profile" className={styles.profileImage} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className={styles.profileImageInput}
                />
              </div>
              <div className={styles.profileInfo}>
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={styles.editInput}
                    />
                    <input
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className={styles.editInput}
                    />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={styles.editInput}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.editInput}
                    />
                    <button onClick={handleSaveProfile} className={styles.saveBtn}>Save</button>
                  </>
                ) : (
                  <>
                    <h1 className={styles.username}>{username}</h1>
                    <div className={styles.profileStatus}>
                      <span className={styles.statusBadge}>{status}</span>
                      <div className={styles.location}>{location}</div>
                      <p className={styles.email}>Email: {email}</p>
                    </div>
                  </>
                )}
                <div className={styles.socialLinks}>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaTwitter /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaLinkedin /></a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaGithub /></a>
                  <a href="mailto:someone@example.com" className={styles.socialLink}><FaEnvelope /></a>
                </div>
                <div className={styles.actionButtons}>
                  <button className={styles.messageBtn}>Message</button>
                  <button className={styles.shareBtn}>Share</button>
                </div>
              </div>
            </div>
            <div className={styles.bioContainer}>
              <div className={styles.editBioIcon} onClick={handleEditBioClick}>
                <FaPencilAlt />
              </div>
              <div className={styles.bioBox}>
                <h3 className={styles.bioHeading}>Bio</h3>
                {isEditingBio ? (
                  <>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className={styles.editTextarea}
                    />
                    <button onClick={handleSaveBio} className={styles.saveBtn}>Save</button>
                  </>
                ) : (
                  <p className={styles.bioText}>{bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.tabsSection}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'experience' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <span className={styles.tabIcon}>
                  <i className="fas fa-briefcase"></i>
                </span>
                Experience
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'projects' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <span className={styles.tabIcon}>
                  <i className="fas fa-tachometer-alt"></i>
                </span>
                Projects
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'skills' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <span className={styles.tabIcon}>
                  <i className="fas fa-cogs"></i>
                </span>
                Skills
              </button>
            </div>
            <div className={styles.tabContent}>
              {activeTab === 'experience' && <div>Experience content...</div>}
              {activeTab === 'projects' && <div>Projects content...</div>}
              {activeTab === 'skills' && <div>Skills content...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
