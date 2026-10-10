import './App.css'
import { useEffect, useState } from "react";
function App() {
  const [contactForm, setContactForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const [contactStatus, setContactStatus] = useState("");
const [sendingMessage, setSendingMessage] = useState(false);
  const [projects, setProjects] = useState([]);
const [loadingProjects, setLoadingProjects] = useState(true);
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  fetchProjects();
}, []);
const handleContactSubmit = async (event) => {
  event.preventDefault();
  setSendingMessage(true);
  setContactStatus("");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactForm),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message.");
    }

    setContactStatus("Message sent successfully!");

    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    setContactStatus(
      error.message || "Unable to send your message. Please try again."
    );
  } finally {
    setSendingMessage(false);
  }
};
  return (
    <div>
      <nav>
        <h2>SHREYAS</h2>

        <div>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home">
  <div className="hero-content">

    <p className="intro">HELLO, I'M</p>

    <h1>Shreyas</h1>

    <h2>
      Computer Science Student & Developer
    </h2>

    <p className="hero-description">
      I build software, explore cybersecurity, and create
      practical technology projects that solve real-world problems.
    </p>

    <div className="hero-buttons">
      <a href="#projects" className="primary-button">
        View My Projects
      </a>

      <a href="#contact" className="secondary-button">
        Contact Me
      </a>
    </div>

  </div>
</section>

      <section id="about">
  <div className="about-container">

    <div className="about-heading">
      <p className="section-label">ABOUT ME</p>
      <h2>Who I Am</h2>
    </div>

    <div className="about-content">

      <div className="about-text">
        <p>
          I'm a Computer Science student passionate about
          software development, cybersecurity, IoT, and
          emerging technologies.
        </p>

        <p>
          I enjoy learning by building practical projects
          and solving real-world problems through technology.
          I'm continuously improving my programming,
          problem-solving, and development skills.
        </p>

        <p>
          My current focus is becoming a strong software
          developer while exploring cybersecurity and
          full-stack development.
        </p>
      </div>

      <div className="about-info">

        <div className="info-card">
          <h3>🎓 Education</h3>
          <p>Computer Science Engineering</p>
        </div>

        <div className="info-card">
          <h3>💻 Focus</h3>
          <p>Software Development</p>
        </div>

        <div className="info-card">
          <h3>🔐 Interest</h3>
          <p>Cybersecurity</p>
        </div>

        <div className="info-card">
          <h3>⚙️ Technology</h3>
          <p>IoT & Emerging Tech</p>
        </div>

      </div>

    </div>

  </div>
</section>

      <section id="skills">
  <div className="skills-container">

    <div className="skills-heading">
      <p className="section-label">MY SKILLS</p>
      <h2>What I Work With</h2>
      <p>
        Technologies and tools I'm currently learning and
        using to build projects.
      </p>
    </div>

    <div className="skills-grid">

      <div className="skill-card">
        <span className="skill-icon">💻</span>
        <h3>Programming</h3>
        <div className="skill-list">
          <span>C, </span>
          <span>C++, </span>
          <span>Python </span>
        </div>
      </div>

      <div className="skill-card">
        <span className="skill-icon">🌐</span>
        <h3>Web Development,</h3>
        <div className="skill-list">
          <span>HTML,</span>
          <span>CSS,</span>
          <span>JavaScript,</span>
          <span>React</span>
        </div>
      </div>

      <div className="skill-card">
        <span className="skill-icon">🗄️</span>
        <h3>Database</h3>
        <div className="skill-list">
          <span>SQL</span>
          <span>MariaDB</span>
          <span>MySQL</span>
        </div>
      </div>

      <div className="skill-card">
        <span className="skill-icon">🛠️</span>
        <h3>Tools</h3>
        <div className="skill-list">
          <span>Git</span>
          <span>GitHub</span>
          <span>VS Code</span>
          <span>Linux</span>
        </div>
      </div>

      <div className="skill-card">
        <span className="skill-icon">🔐</span>
        <h3>Cybersecurity</h3>
        <div className="skill-list">
          <span>Kali Linux</span>
          <span>Nmap</span>
          <span>Burp Suite</span>
        </div>
      </div>

      <div className="skill-card">
        <span className="skill-icon">⚙️</span>
        <h3>IoT & Hardware</h3>
        <div className="skill-list">
          <span>ESP32</span>
          <span>LoRa</span>
          <span>Sensors</span>
        </div>
      </div>

    </div>

  </div>
</section>

      <section id="projects">
  <div className="projects-container">

    <div className="projects-heading">
      <p className="section-label">MY WORK</p>
      <h2>Featured Projects</h2>

      <p>
        Some of the projects I've worked on while learning
        software development, IoT, and cybersecurity.
      </p>
    </div>

   <div className="projects-grid">
  {loadingProjects ? (
    <p>Loading projects...</p>
  ) : projects.length > 0 ? (
    projects.map((project, index) => (
      <div className="project-card" key={project.id}>
        <div className="project-number">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="project-content">
          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <div className="project-tech">
            {project.technologies
              ? project.technologies.split(",").map((technology) => (
                  <span key={technology.trim()}>
                    {technology.trim()}
                  </span>
                ))
              : null}
          </div>

          <div className="project-links">
            {project.github_url && (
              <a
                href={project.github_url}
                className="project-button"
                target="_blank"
                rel="noreferrer"
              >
                GitHub →
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                className="project-button outline"
                target="_blank"
                rel="noreferrer"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No projects available yet.</p>
  )}
</div>

  </div>
</section>
<section id="education">
  <div className="education-container">

    <div className="education-heading">
      <p className="section-label">MY JOURNEY</p>
      <h2>Education & Resume</h2>
      <p>
        My academic journey and the skills I'm developing
        along the way.
      </p>
    </div>

    <div className="education-card">

      <div className="education-year">
        2024 — Present
      </div>

      <div className="education-details">
        <h3>Bachelor of Engineering</h3>

        <h4>Computer Science & Engineering</h4>

        <p>
          BMS Institute of Technology and Management,
          Bengaluru.
        </p>

        <div className="education-tags">
          <span>Computer Science</span>
          <span>Programming</span>
          <span>Data Structures</span>
          <span>Web Development</span>
        </div>
      </div>

    </div>

    <div className="resume-box">

      <h3>Want to know more about me?</h3>

      <p>
        Download my resume to see my education, projects,
        skills and other achievements.
      </p>

      <a
        href="/resume.pdf"
        className="primary-button"
        download
      >
        Download Resume ↓
      </a>

    </div>

  </div>
</section>
      <section id="contact">
  <div className="contact-container">

    <div className="contact-heading">
      <p className="section-label">GET IN TOUCH</p>
      <h2>Let's Connect</h2>

      <p>
        Have a project idea, opportunity, or just want to
        say hello? Feel free to reach out.
      </p>
    </div>

    <div className="contact-content">

      <div className="contact-info">

        <div className="contact-item">
          <span>📧</span>
          <div>
            <h3>Email</h3>
            <p>your-email@example.com</p>
          </div>
        </div>

        <div className="contact-item">
          <span>💻</span>
          <div>
            <h3>GitHub</h3>
            <p>github.com/yourusername</p>
          </div>
        </div>

        <div className="contact-item">
          <span>🔗</span>
          <div>
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/yourusername</p>
          </div>
        </div>

      </div>

      <form className="contact-form" onSubmit={handleContactSubmit}>
  <input
    type="text"
    placeholder="Your Name"
    value={contactForm.name}
    onChange={(event) =>
      setContactForm({ ...contactForm, name: event.target.value })
    }
    maxLength={100}
    required
  />

  <input
    type="email"
    placeholder="Your Email"
    value={contactForm.email}
    onChange={(event) =>
      setContactForm({ ...contactForm, email: event.target.value })
    }
    maxLength={150}
    required
  />

  <input
    type="text"
    placeholder="Subject (optional)"
    value={contactForm.subject}
    onChange={(event) =>
      setContactForm({ ...contactForm, subject: event.target.value })
    }
    maxLength={200}
  />

  <textarea
    placeholder="Tell me about your project, opportunity, or idea..."
    rows="6"
    value={contactForm.message}
    onChange={(event) =>
      setContactForm({ ...contactForm, message: event.target.value })
    }
    maxLength={5000}
    required
  />

  <button type="submit" disabled={sendingMessage}>
    {sendingMessage ? "Sending..." : "Send Message →"}
  </button>

  {contactStatus && (
    <p role="status" aria-live="polite">
      {contactStatus}
    </p>
  )}
</form>

    </div>

  </div>
</section>
<footer>
  <div className="footer-content">

    <h2>SHREYAS</h2>

    <p>
      Building. Learning. Growing.
    </p>

    <div className="footer-links">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>

    <p className="copyright">
      © 2026 Shreyas. All rights reserved.
    </p>

  </div>
</footer>
    </div>
  )
}

export default App