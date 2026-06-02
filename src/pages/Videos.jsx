import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import videos from '../data/videos.json';

function Videos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const categories = useMemo(() => {
    const cats = new Set(videos.map((v) => v.category));
    return [...cats];
  }, []);

  const filtered = activeCategory
    ? videos.filter((v) => v.category === activeCategory)
    : videos;

  const setCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="videos-page">
      <header className="page-header">
        <h1>🎥 作品展示</h1>
        <p className="page-subtitle">共 {videos.length} 个作品</p>
      </header>

      {/* 分类筛选 */}
      <div className="category-filter">
        <button
          className={`cat-chip ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => setCategory('')}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setCategory(activeCategory === cat ? '' : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 视频网格 */}
      <div className="video-grid">
        {filtered.map((video) => (
          <Link to={`/video/${video.id}`} key={video.id} className="video-card">
            <div className="video-thumb">
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.title} />
              ) : (
                <div className="thumb-placeholder">
                  <span className="play-icon">▶</span>
                  <span className="thumb-duration">{video.duration}</span>
                </div>
              )}
              {!video.file && (
                <div className="no-file-badge">待上传</div>
              )}
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <div className="video-meta">
                <span className="video-category">{video.category}</span>
                <span className="meta-sep">·</span>
                <span>{video.date}</span>
              </div>
              <p className="video-desc">{video.description}</p>
              <div className="video-software">
                {video.software.map((s) => (
                  <span key={s} className="sw-chip">{s}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>📂 该分类下暂无作品</p>
        </div>
      )}
    </div>
  );
}

export default Videos;
