import { useParams, Link, useNavigate } from 'react-router-dom';
import videos from '../data/videos.json';

function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find((v) => v.id === Number(id));

  if (!video) {
    return (
      <div className="article-not-found">
        <h1>404</h1>
        <p>作品不存在或已被删除</p>
        <Link to="/videos" className="back-link">← 返回作品列表</Link>
      </div>
    );
  }

  return (
    <div className="video-detail-page">
      <button className="back-btn" onClick={() => navigate('/videos')}>
        ← 返回作品列表
      </button>

      {/* 视频播放器 */}
      <div className="video-player-wrap">
        {video.file ? (
          <video
            controls
            poster={video.thumbnail || undefined}
            className="video-player"
          >
            <source src={`/videos/${video.file}`} type="video/mp4" />
            您的浏览器不支持视频播放
          </video>
        ) : (
          <div className="video-placeholder-large">
            <span className="placeholder-icon">🎬</span>
            <p>请将视频文件放入 public/videos/ 目录</p>
            <p className="placeholder-hint">并在 videos.json 中填写 file 字段</p>
          </div>
        )}
      </div>

      {/* 视频信息 */}
      <div className="video-detail-info">
        <h1>{video.title}</h1>
        <div className="video-detail-meta">
          <span className="video-category">{video.category}</span>
          <span className="meta-sep">·</span>
          <span>{video.date}</span>
          <span className="meta-sep">·</span>
          <span>{video.duration}</span>
        </div>
        <p className="video-detail-desc">{video.description}</p>
        <div className="video-detail-software">
          <span className="sw-label">使用软件：</span>
          {video.software.map((s) => (
            <span key={s} className="sw-chip">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
