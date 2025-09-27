import React, { useEffect, useState } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import avatar from './assets/images/avatar.png'
import $ from "jquery";
window.$ = $;
window.jQuery = $;

function App() {
  const [contact_info, setContactInfo] = useState(null);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // contact_info
    fetch('https://ntquang.infinityfreeapp.com/api/contact_info')
      .then(res => res.json())
      .then(data => setContactInfo(data))
      .catch(() => setContactInfo(null));

    // experience (nhiều dòng)
    fetch('https://ntquang.infinityfreeapp.com/api/experience')
      .then(res => res.json())
      .then(data => setExperience(data))
      .catch(() => setExperience([]));

    // education (1 dòng cuối)
    fetch('https://ntquang.infinityfreeapp.com/api/education')
      .then(res => res.json())
      .then(data => setEducation(data))
      .catch(() => setEducation(null));

    // skills (nhiều dòng)
    fetch('https://ntquang.infinityfreeapp.com/api/skill')
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(() => setSkills([]));

    setLoading(false);
  }, []);


  if (loading) {
    return <h3 className="loading_text">Đang tải...</h3>;
  }

  return (
    <div className="cv-container container py-5">
      {/* Header */}
      <div className="row header-section align-items-center mb-5 g-5">
        <div className="col-md-3 text-center">
          <img
            src={avatar}
            alt="avatar"
            className="profile-img img-fluid rounded"
          />
        </div>
        <div className="col-md-9">
          <h2 className="name">NGUYỄN THẾ QUANG</h2>
          {contact_info ? (
            <>
              {/* Lấy dữ liệu dòng mới nhất (cuối cùng) trong bảng contact_info trong csdl */}
              <ul className="contact-info list-unstyled">
                <li>📅 {contact_info.birthday}</li>
                <li>📞 {contact_info.phone_number}</li>
                <li>📧 {contact_info.email}</li>
                <li>📍 {contact_info.work_location}</li>
              </ul>
              <p className="intro">
                {contact_info.intro}
              </p>
            </>
          ) : (
            <h5 className="loading_header">Không có dữ liệu thông tin liên hệ</h5>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="section mb-5">
        <h4 className="section-title">Kinh Nghiệm Thực Tập</h4>
        {experience.length === 0 ? (
          <h5 className="loading_exp">Không có dữ liệu kinh nghiệm thực tập</h5>
        ) : (
          experience.map((exp) => (
            <div className="experience-item mb-4" key={exp.id}>
              <p className="time">
                🕒 {exp.from_month}
                {exp.from_year === exp.to_year ? "" : ` - ${exp.from_year}`} / {exp.to_month} - {exp.to_year} : {exp.title}
              </p>
              <div className="exp-grid">
                <div className="label">Công ty:</div>
                <div className="value">{exp.company}</div>

                <div className="label">Vị trí:</div>
                <div className="value">{exp.my_position}</div>

                <div className="label">Mô tả:</div>
                <div className="value">
                  {exp.my_description}
                  {exp.description_link && (
                    <span>
                      {" "}
                      <a href={exp.description_link} target="_blank" rel="noreferrer">
                        {exp.description_link}
                      </a>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Education */}
      <div className="section mb-5">
        <h4 className="section-title">Trình Độ Học Vấn</h4>
        {education ? (
          <>
            <p className="time">🕒 {education.from_year} - {education.to_year}</p>
            <div className="edu-flex">
              <p className="col-md-6">
                {education.work_location} <br />
                {education.work_info} <br />
                GPA {education.gpa}
              </p>
              <ul className="col-md-6">
                <li>{education.prize1}</li>
                <li>{education.prize2}</li>
              </ul>
            </div>
          </>
        ) : (
          <h5 className='loading_edu'>Không có dữ liệu học vấn</h5>
        )}
      </div>


      {/* Skills */}
      <div className="section">
        <h4 className="section-title">Kỹ Năng</h4>
        {skills.length === 0 ? (
          <h5 className='loading_sk'>Không có dữ liệu kỹ năng</h5>
        ) : (
          <div className="row">
            {skills.map((sk) => (
              <div className="col-md-4" key={sk.id}>
                <p>{sk.sk_name}</p>
                <div className="skill-bar">
                  <div
                    className="level"
                    style={{ width: `${sk.percent_proficient}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
