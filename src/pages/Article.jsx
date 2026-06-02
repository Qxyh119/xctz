import { useParams, Link, useNavigate } from 'react-router-dom';
import articles from '../data/articles.json';

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>404</h1>
        <p>文章不存在或已被删除</p>
        <Link to="/" className="back-link">← 返回首页</Link>
      </div>
    );
  }

  // 简单的 Markdown 渲染（支持标题、代码块、加粗、列表、表格等）
  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    lines.forEach((line, i) => {
      // 代码块
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`}><code>{codeContent.trim()}</code></pre>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.slice(3);
        }
        return;
      }
      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // 标题
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i}>{line.slice(4)}</h3>);
      }
      // 表格
      else if (line.startsWith('|')) {
        const cells = line.split('|').filter((c) => c.trim());
        const isHeader = lines[i + 1] && lines[i + 1].includes('---');
        if (isHeader) {
          elements.push(
            <table key={i}>
              <thead>
                <tr>
                  {cells.map((c, j) => (
                    <th key={j}>{c.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody key={`tbody-${i}`}>
                {lines
                  .slice(i + 2)
                  .filter((l) => l.startsWith('|'))
                  .map((l, ri) => (
                    <tr key={ri}>
                      {l
                        .split('|')
                        .filter((c) => c.trim())
                        .map((c, ci) => (
                          <td key={ci}>{c.trim()}</td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          );
        } else if (!lines[i - 1]?.startsWith('|') || !lines[i - 1]?.includes('---')) {
          // Skip if already rendered as part of table
        }
      }
      // 列表
      else if (line.match(/^\d+\.\s/)) {
        elements.push(
          <li key={i} className="ol-item">
            {renderInline(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="ul-item">
            {renderInline(line.slice(2))}
          </li>
        );
      }
      // 空行
      else if (line.trim() === '') {
        elements.push(<br key={i} />);
      }
      // 普通段落
      else {
        elements.push(<p key={i}>{renderInline(line)}</p>);
      }
    });

    return elements;
  };

  // 渲染行内格式（加粗、代码）
  const renderInline = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="inline-code">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="article-detail">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 返回首页
      </button>

      <article>
        <header className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="article-author">✍️ {article.author}</span>
            <span className="meta-sep">·</span>
            <span className="article-date">📅 {article.date}</span>
          </div>
          <div className="article-tags">
            {article.tags.map((tag) => (
              <span key={tag} className="card-tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="article-content">{renderMarkdown(article.content)}</div>
      </article>

      <div className="article-footer">
        <Link to="/" className="home-link">
          ← 查看所有文章
        </Link>
      </div>
    </div>
  );
}

export default Article;
