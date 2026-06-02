import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../data/site-config.json';
import videos from '../data/videos.json';

function About() {
  const { about } = config;

  // 统计各分类视频数量
  const categoryCounts = {};
  videos.forEach((v) => {
    categoryCounts[v.category] = (categoryCounts[v.category] || 0) + 1;
  });

  return (
    <div className="about-page">
      {/* 个人介绍卡片 */}
      <section className="about-hero">
        <div className="about-avatar">
          {about.avatar ? (
            <img src={about.avatar} alt={about.name} />
          ) : (
            <div className="avatar-placeholder">🎬</div>
          )}
        </div>
        <h1>{about.name}</h1>
        <p className="about-bio">{about.bio}</p>
      </section>

      {/* 技能 */}
      <section className="about-section">
        <h2>🛠 使用软件</h2>
        <div className="skills-list">
          {about.skills.map((skill) => (
            <span key={skill} className="skill-chip">{skill}</span>
          ))}
        </div>
      </section>

      {/* 作品统计 */}
      <section className="about-section">
        <h2>📊 作品概览</h2>
        <div className="stats-grid">
          <Link to="/videos" className="stat-card">
            <span className="stat-number">{videos.length}</span>
            <span className="stat-label">总作品数</span>
          </Link>
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <Link to={`/videos?category=${encodeURIComponent(cat)}`} key={cat} className="stat-card">
              <span className="stat-number">{count}</span>
              <span className="stat-label">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 联系方式 */}
      <section className="about-section">
        <h2>📬 联系方式</h2>
        <div className="contact-list">
          {about.contact.email && (
            <a href={`mailto:${about.contact.email}`} className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <div className="contact-label">邮箱</div>
                <div className="contact-value">{about.contact.email}</div>
              </div>
            </a>
          )}
          {about.contact.wechat && (
            <div className="contact-item">
              <span className="contact-icon">💬</span>
              <div>
                <div className="contact-label">微信</div>
                <div className="contact-value">{about.contact.wechat}</div>
              </div>
            </div>
          )}
          {about.contact.qq && (
            <div className="contact-item">
              <span className="contact-icon">🐧</span>
              <div>
                <div className="contact-label">QQ</div>
                <div className="contact-value">{about.contact.qq}</div>
              </div>
            </div>
          )}
          {about.contact.phone && (
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <div className="contact-label">电话</div>
                <div className="contact-value">{about.contact.phone}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default About;
