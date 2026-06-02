import { useState } from 'react';

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '123456') {
      sessionStorage.setItem('unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="password-gate">
      <div className="gate-card">
        <div className="gate-icon">🎬</div>
        <h1>我的作品集</h1>
        <p className="gate-subtitle">输入密码以查看内容</p>
        <form onSubmit={handleSubmit}>
          <div className="pwd-input-wrap">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="请输入访问密码"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              className={error ? 'error' : ''}
              autoFocus
            />
            <button
              type="button"
              className="toggle-pwd"
              onClick={() => setShowPwd(!showPwd)}
              tabIndex={-1}
            >
              {showPwd ? '🙈' : '👁'}
            </button>
          </div>
          {error && <p className="gate-error">密码错误，请重试</p>}
          <button type="submit" className="gate-btn">
            进入网站
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordGate;
