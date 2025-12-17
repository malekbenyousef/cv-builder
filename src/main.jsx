import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style/style.css'

/* --- HELPER COMPONENT: ACCORDION --- */
const ExpandableSection = ({ title, isOpen, setOpen, children }) => {
  return (
    <div className="section-box">
      <div className="section-header" onClick={() => setOpen(!isOpen)}>
        <span className="section-title-text">{title}</span>
        <span className="arrow-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

/* --- EDITOR COMPONENT (LEFT SIDE) --- */
const Editor = ({ 
  general, setGeneral, 
  education, setEducation, 
  experience, setExperience,
  loadExample, clearResume
}) => {
  
  const [activeSection, setActiveSection] = useState(null);

  // General Info Handler
  const handleGeneralChange = (e) => {
    setGeneral({ ...general, [e.target.name]: e.target.value });
  };

  // Education Handlers
  const handleEducationChange = (e, id) => {
    const { name, value } = e.target;
    setEducation(education.map(item => item.id === id ? { ...item, [name]: value } : item));
  };
  const addEducation = () => {
    const newId = crypto.randomUUID();
    setEducation([...education, { id: newId, school: 'New School', titleOfStudy: '', dateOfStudy: '', location: '' }]);
    setActiveSection(newId);
  };
  const deleteEducation = (id, e) => {
    e.stopPropagation();
    setEducation(education.filter(item => item.id !== id));
  };

  // Experience Handlers
  const handleExperienceChange = (e, id) => {
    const { name, value } = e.target;
    setExperience(experience.map(item => item.id === id ? { ...item, [name]: value } : item));
  };
  const addExperience = () => {
    const newId = crypto.randomUUID();
    setExperience([...experience, { id: newId, companyName: 'New Company', positionTitle: '', fromUntil: '', location: '', mainResponsibility: '' }]);
    setActiveSection(newId);
  };
  const deleteExperience = (id, e) => {
    e.stopPropagation();
    setExperience(experience.filter(item => item.id !== id));
  };

  return (
    <div className="editor-section">
      <div className="editor-toolbar">
        <button className="clear-btn" onClick={clearResume}>Clear Resume</button>
        <button className="load-btn" onClick={loadExample}>Load Example</button>
      </div>

      <h2 className="editor-heading">Personal Details</h2>
      <div className="form-group">
         <input name="name" value={general.name} onChange={handleGeneralChange} placeholder="Full Name" />
         <input name="email" value={general.email} onChange={handleGeneralChange} placeholder="Email" />
         <input name="phone" value={general.phone} onChange={handleGeneralChange} placeholder="Phone" />
      </div>

      <div className="form-group">
        <div className="group-header">
          <h3>Education</h3>
          <button className="add-btn" onClick={addEducation}>+ Add</button>
        </div>
        {education.map(edu => (
          <ExpandableSection 
            key={edu.id} 
            title={edu.school || "New School"}
            isOpen={activeSection === edu.id}
            setOpen={(isOpen) => setActiveSection(isOpen ? edu.id : null)}
          >
            <div className="input-group">
              <input name="school" value={edu.school} onChange={(e) => handleEducationChange(e, edu.id)} placeholder="School / University" />
              <input name="titleOfStudy" value={edu.titleOfStudy} onChange={(e) => handleEducationChange(e, edu.id)} placeholder="Degree / Major" />
              <input name="dateOfStudy" value={edu.dateOfStudy} onChange={(e) => handleEducationChange(e, edu.id)} placeholder="Date (e.g. 2020 - 2024)" />
              <input name="location" value={edu.location} onChange={(e) => handleEducationChange(e, edu.id)} placeholder="Location" />
              <button className="delete-btn" onClick={(e) => deleteEducation(edu.id, e)}>Delete Entry</button>
            </div>
          </ExpandableSection>
        ))}
      </div>

      <div className="form-group">
        <div className="group-header">
          <h3>Experience</h3>
          <button className="add-btn" onClick={addExperience}>+ Add</button>
        </div>
        {experience.map(exp => (
          <ExpandableSection 
            key={exp.id} 
            title={exp.companyName || "New Company"}
            isOpen={activeSection === exp.id}
            setOpen={(isOpen) => setActiveSection(isOpen ? exp.id : null)}
          >
            <div className="input-group">
              <input name="companyName" value={exp.companyName} onChange={(e) => handleExperienceChange(e, exp.id)} placeholder="Company Name" />
              <input name="positionTitle" value={exp.positionTitle} onChange={(e) => handleExperienceChange(e, exp.id)} placeholder="Position Title" />
              <input name="fromUntil" value={exp.fromUntil} onChange={(e) => handleExperienceChange(e, exp.id)} placeholder="Start - End Date" />
              <input name="location" value={exp.location} onChange={(e) => handleExperienceChange(e, exp.id)} placeholder="Location" />
              <textarea 
                className="textarea-field"
                name="mainResponsibility" 
                value={exp.mainResponsibility} 
                onChange={(e) => handleExperienceChange(e, exp.id)} 
                placeholder="Description of responsibilities..." 
                rows={5}
              />
              <button className="delete-btn" onClick={(e) => deleteExperience(exp.id, e)}>Delete Entry</button>
            </div>
          </ExpandableSection>
        ))}
      </div>

      <div className="print-section">
         <button className="download-btn" onClick={() => window.print()}>Download PDF</button>
      </div>
    </div>
  );
};

/* --- PREVIEW COMPONENT (RIGHT SIDE - A4 PAPER) --- */
const ResumePreview = ({ general, education, experience }) => {
  return (
    <div className="preview-section">
      <div className="resume-paper">
        
        {/* Header */}
        <div className="resume-header">
          <h1>{general.name}</h1>
          <div className="contact-info">
            {general.email && <span>{general.email}</span>}
            {general.email && general.phone && <span>•</span>}
            {general.phone && <span>{general.phone}</span>}
          </div>
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="entry">
                <div className="entry-header">
                  <h3 className="entry-title">{edu.school}</h3>
                  <div className="entry-meta">
                    <span>{edu.location}</span>
                    {edu.location && edu.dateOfStudy && <span> | </span>}
                    <span>{edu.dateOfStudy}</span>
                  </div>
                </div>
                <div className="entry-subheader">{edu.titleOfStudy}</div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="entry">
                <div className="entry-header">
                  <h3 className="entry-title">{exp.companyName}</h3>
                  <div className="entry-meta">
                    <span>{exp.location}</span>
                    {exp.location && exp.fromUntil && <span> | </span>}
                    <span>{exp.fromUntil}</span>
                  </div>
                </div>
                <div className="entry-subheader">{exp.positionTitle}</div>
                <p className="entry-details">{exp.mainResponsibility}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

/* --- MAIN APP --- */
const App = () => {
  const exampleData = {
    general: { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '(555) 123-4567' },
    education: [{ id: 1, school: 'Stanford University', titleOfStudy: 'B.S. Computer Science', dateOfStudy: '2018 - 2022', location: 'Stanford, CA' }],
    experience: [{ id: 1, companyName: 'Google', positionTitle: 'Software Engineer', fromUntil: '2022 - Present', location: 'Mountain View, CA', mainResponsibility: '• Developed scalable web applications using React and Node.js.\n• Collaborated with cross-functional teams to define, design, and ship new features.\n• Improved application performance by 20%.' }]
  };

  const [general, setGeneral] = useState(exampleData.general);
  const [education, setEducation] = useState(exampleData.education);
  const [experience, setExperience] = useState(exampleData.experience);

  const loadExample = () => {
    setGeneral(exampleData.general);
    setEducation(exampleData.education);
    setExperience(exampleData.experience);
  };

  const clearResume = () => {
    setGeneral({ name: '', email: '', phone: '' });
    setEducation([]);
    setExperience([]);
  };

  return (
    <div className="app-container">
      <Editor 
        general={general} setGeneral={setGeneral}
        education={education} setEducation={setEducation}
        experience={experience} setExperience={setExperience}
        loadExample={loadExample} clearResume={clearResume}
      />
      <ResumePreview general={general} education={education} experience={experience} />
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
