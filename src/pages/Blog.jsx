import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import articles from '../data/articles.json';

function Blog() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const allTags = useMemo(() => {
    const tags = new Set();
    articles.forEach((a) => a.tags.forEach((t) => tags.add(t)));
    return [...tags];
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchQuery =
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchTag = !activeTag || a.tags.includes(activeTag);
      return matchQuery && matchTag;
    });
  }, [query, activeTag]);

  return (
    <div className="blog-page">
      <header className="page-header">
        <h1>📝 技术博客</h1>
        <p className="page-subtitle">分享技术、记录成长</p>
      </header>

      {/* 搜索栏 */}
      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="搜索文章..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear-btn" onClick={() => setQuery('')}>✕</button>
        )}
      </div>

      {/* 标签筛选 */}
      <div className="tags-filter">
        <button
          className={`tag-chip ${activeTag === '' ? 'active' : ''}`}
          onClick={() => setActiveTag('')}
        >
          全部
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag-chip ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      <div className="article-list">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <Link to={`/article/${article.id}`} key={article.id} className="article-card">
              <h2 className="card-title">{article.title}</h2>
              <div className="card-meta">
                <span>{article.author}</span>
                <span className="meta-sep">·</span>
                <span>{article.date}</span>
              </div>
              <p className="card-excerpt">{article.excerpt}</p>
              <div className="card-tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="card-tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <p>😕 没有找到匹配的文章</p>
            <button className="reset-btn" onClick={() => { setQuery(''); setActiveTag(''); }}>
              重置筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
