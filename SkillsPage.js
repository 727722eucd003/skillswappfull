import React, { useState } from 'react';
import styles from './SkillsPage.module.css';
import { FaPhone } from 'react-icons/fa';
import VoiceCall from '../components/VoiceCall';

const skills = [
  {
    id: 1,
    name: 'Music',
    description: 'Experience in playing various musical instruments.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAIaj5z-czSMiahndqaSZLgriC04fptT2jGQ&s',
  },
  {
    id: 2,
    name: 'Programming',
    description: 'Skilled in multiple programming languages and technologies.',
    imageUrl: 'https://toppng.com/uploads/preview/code-lines-programming-script-screen-program-web-11570370111bgzith282h.jpg',
  },
  {
    id: 3,
    name: 'Design',
    description: 'Expertise in graphic and web design.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHcKG2rT4TAG5KLNCCHpfEq3RaIvXBP3DW1Q&s',
  },
  {
    id: 4,
    name: 'Writing',
    description: 'Proficient in creative and technical writing.',
    imageUrl: 'https://c4.wallpaperflare.com/wallpaper/302/688/2/vintage-old-paper-pen-watch-wallpaper-preview.jpg',
  },
  {
    id: 5,
    name: 'Marketing',
    description: 'Knowledgeable in digital marketing and strategy.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zoWpvE3HhATtjOmG66L7tE2ja1lzSxxqIQ&s',
  },
  // Add more skills as needed
];

const SkillsPage = () => {
  const [activeCall, setActiveCall] = useState(null);
  const [creatingRoom, setCreatingRoom] = useState(null); // Track which skill is currently creating a room

  const handleCall = (skill) => {
    setActiveCall({ roomName: `${skill.name}Room`, identity: `user_${skill.id}` });
  };

  const createRoom = async (skillName) => {
    setCreatingRoom(skillName);
    try {
      const response = await fetch('/api/twilio/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName: `${skillName}Room` }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const data = await response.json();
      console.log('Room created:', data);
      // Handle room creation result if needed
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setCreatingRoom(null); // Reset the creatingRoom state after completion
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Skill Swap</div>
        <ul className={styles.navLinks}>
          <li><a href="/about" className={styles.navLink}>About</a></li>
          <li><a href="/" className={styles.navLink}>Home</a></li>
          <li><a href="/Profile" className={styles.navLink}>Profile</a></li>
          <li><a href="/contact" className={styles.navLink}>Contact</a></li>
        </ul>
        <button className={styles.signInBtn}>Sign In</button>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Skills Page</h1>
        <p className={styles.subtitle}>Browse and manage the skills you want to exchange.</p>
      </header>

      <div className={styles.skillsContainer}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillCard}>
            <img src={skill.imageUrl} alt={skill.name} className={styles.skillImage} />
            <div className={styles.skillDetails}>
              <h3 className={styles.skillName}>{skill.name}</h3>
              <p className={styles.skillDescription}>{skill.description}</p>
              <div className={styles.skillActions}>
                <button onClick={() => handleCall(skill)} className={styles.callButton}>
                  <FaPhone /> Join room
                </button>
                <button 
                  onClick={() => createRoom(skill.name)} 
                  className={styles.createButton}
                  disabled={creatingRoom === skill.name}
                >
                  {creatingRoom === skill.name ? 'Creating...' : 'Create Room'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeCall && <VoiceCall identity={activeCall.identity} roomName={activeCall.roomName} />}
    </div>
  );
};

export default SkillsPage;
