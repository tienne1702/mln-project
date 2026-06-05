'use client';

import { useState } from 'react';
import { Network, ChevronDown, ChevronUp } from 'lucide-react';

const terms = [
  {
    term: 'Dân tộc (Nation)',
    color: '#e8171e',
    short: 'Quốc gia dân tộc',
    def: 'Cộng đồng người ổn định, có lãnh thổ riêng, nền kinh tế thống nhất, ngôn ngữ chung và ý thức thống nhất, gắn bó bởi quyền lợi chính trị, kinh tế, truyền thống văn hóa.',
  },
  {
    term: 'Tộc người (Ethnie)',
    color: '#f0b429',
    short: 'Cộng đồng tộc người',
    def: 'Cộng đồng tộc người có chung đặc điểm nhân chủng, ngôn ngữ, văn hóa, tâm lý và ý thức tự giác tộc người. Hình thức cộng đồng phát triển cao hơn bộ lạc, bộ tộc.',
  },
  {
    term: 'Quyền tự quyết dân tộc',
    color: '#3b82f6',
    short: 'Tự quyết vận mệnh',
    def: 'Quyền của mỗi dân tộc tự quyết định vận mệnh lịch sử của mình, tự lựa chọn chế độ chính trị - xã hội và con đường phát triển mà không có sự can thiệp từ bên ngoài.',
  },
  {
    term: 'Cương lĩnh dân tộc Lênin',
    color: '#a855f7',
    short: '3 nguyên tắc cơ bản',
    def: 'Hệ thống 3 nguyên tắc: (A) Bình đẳng dân tộc — (B) Quyền tự quyết dân tộc — (C) Liên hiệp công nhân tất cả các dân tộc. Là nền tảng lý luận Mác - Lênin về vấn đề dân tộc.',
  },
  {
    term: 'Đại đoàn kết dân tộc',
    color: '#10b981',
    short: 'Thống nhất ý chí & hành động',
    def: 'Sự thống nhất ý chí và hành động của toàn thể các dân tộc trong một quốc gia, là nguồn sức mạnh và là nhân tố quyết định thắng lợi của cách mạng và công cuộc xây dựng chủ nghĩa xã hội.',
  },
  {
    term: 'Chủ nghĩa Mác - Lênin về dân tộc',
    color: '#f59e0b',
    short: 'Học thuyết khoa học',
    def: 'Học thuyết khoa học về nguồn gốc, bản chất, quy luật vận động và phát triển của dân tộc, làm cơ sở cho việc giải quyết vấn đề dân tộc trong thực tiễn cách mạng.',
  },
  {
    term: 'Hai xu hướng khách quan',
    color: '#ec4899',
    short: 'Tách rã & Liên hiệp',
    def: 'Xu hướng 1: Sự thức tỉnh của các dân tộc, đấu tranh giành độc lập. Xu hướng 2: Sự liên hiệp, xích lại gần nhau của các dân tộc do toàn cầu hóa kinh tế và nhu cầu hợp tác quốc tế.',
  },
  {
    term: 'Ý thức tự giác tộc người',
    color: '#06b6d4',
    short: 'Đặc trưng quan trọng nhất',
    def: 'Biểu hiện tâm lý tự nhận biết tộc người của mình, niềm tự hào về truyền thống tộc người, sự gắn bó và gìn giữ bản sắc tộc người bất kể không gian cư trú.',
  },
];

export default function GlossaryView() {
  const [search, setSearch] = useState('');
  const [showMindmap, setShowMindmap] = useState(false);

  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Từ điển Khái niệm Cốt lõi
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Tra cứu nhanh các thuật ngữ và khái niệm trong Chương 6.
          </p>
        </div>
        <button
          onClick={() => setShowMindmap(!showMindmap)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all"
          style={{ 
            background: showMindmap ? 'rgba(240,180,41,0.15)' : 'var(--bg-card)', 
            border: `1px solid ${showMindmap ? 'var(--accent-gold)' : 'var(--border)'}`,
            color: showMindmap ? 'var(--accent-gold)' : 'var(--text-primary)'
          }}
        >
          <Network className="w-4 h-4" />
          <span className="hidden sm:inline">{showMindmap ? 'Ẩn Mindmap' : 'Xem Mindmap'}</span>
          {showMindmap ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Mindmap Section */}
      {showMindmap && (
        <div className="card-glass p-6 overflow-x-auto animate-fade-in-up">
          <div className="css-tree min-w-[800px] flex justify-center pb-4">
            <ul>
              <li>
                <div className="node-card" style={{ border: '2px solid #e8171e', background: 'rgba(232,23,30,0.1)' }}>
                  <span className="font-bold text-lg text-[#ff6b6b]">CHƯƠNG 6</span>
                  <p className="text-xs text-gray-400 mt-1">Dân tộc & Tôn giáo</p>
                </div>
                <ul>
                  <li>
                    <div className="node-card">
                      <span className="font-bold text-[#f0b429]">Khái Niệm</span>
                    </div>
                    <ul>
                      <li><div className="node-card"><p className="text-xs">Tộc người<br/>(Nghĩa hẹp)</p></div></li>
                      <li><div className="node-card"><p className="text-xs">Quốc gia dân tộc<br/>(Nghĩa rộng)</p></div></li>
                    </ul>
                  </li>
                  <li>
                    <div className="node-card">
                      <span className="font-bold text-[#3b82f6]">Hai Xu Hướng</span>
                    </div>
                    <ul>
                      <li><div className="node-card"><p className="text-xs">Tách rã<br/>(Độc lập)</p></div></li>
                      <li><div className="node-card"><p className="text-xs">Liên hiệp<br/>(Toàn cầu hóa)</p></div></li>
                    </ul>
                  </li>
                  <li>
                    <div className="node-card">
                      <span className="font-bold text-[#a855f7]">Cương lĩnh Lênin</span>
                    </div>
                    <ul>
                      <li><div className="node-card"><p className="text-xs">Bình đẳng</p></div></li>
                      <li><div className="node-card"><p className="text-xs">Tự quyết</p></div></li>
                      <li><div className="node-card"><p className="text-xs">Liên hiệp CN</p></div></li>
                    </ul>
                  </li>
                  <li>
                    <div className="node-card">
                      <span className="font-bold text-[#10b981]">Dân Tộc VN</span>
                    </div>
                    <ul>
                      <li><div className="node-card"><p className="text-xs">6 Đặc điểm<br/>(Cư trú, chênh lệch...)</p></div></li>
                      <li><div className="node-card"><p className="text-xs">5 Trụ cột<br/>Chính sách</p></div></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Tìm kiếm khái niệm..."
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
        }}
        onFocus={e => (e.target.style.borderColor = 'rgba(232,23,30,0.5)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
      />

      {/* Terms grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((t, i) => (
          <div key={i} className="card-glass p-5" style={{ borderLeft: `3px solid ${t.color}` }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.term}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}>
                {t.short}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.def}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-4xl mb-3">🔍</p>
          <p>Không tìm thấy kết quả cho "<strong>{search}</strong>"</p>
        </div>
      )}
    </div>
  );
}
