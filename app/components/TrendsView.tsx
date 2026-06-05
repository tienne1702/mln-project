'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TrendsView() {
  const [active, setActive] = useState<0 | 1>(0);

  const trends = [
    {
      label: 'Xu hướng 1',
      title: 'Tách rã thành Quốc gia Độc lập',
      subtitle: 'Sự thức tỉnh dân tộc & đấu tranh giải phóng',
      color: '#e8171e',
      colorSoft: 'rgba(232,23,30,0.12)',
      colorBorder: 'rgba(232,23,30,0.3)',
      emoji: '🏳️',
      desc: 'Các cộng đồng tộc người đấu tranh chống lại áp bức, bất công của ngoại bang để tiến tới thành lập các quốc gia dân tộc độc lập. Xu hướng này biểu hiện rõ trong giai đoạn chủ nghĩa tư bản tự do cạnh tranh và phong trào giải phóng dân tộc thế kỷ XX.',
      causes: [
        'Sự hình thành của các quốc gia - nhà nước trên cơ sở dân tộc',
        'Phong trào giải phóng dân tộc chống lại chủ nghĩa thực dân',
        'Sự phát triển của ý thức quốc gia và tự quyết dân tộc',
      ],
      examples: ['Cách mạng Mỹ (1776)', 'Chiến tranh Độc lập Mỹ La Tinh (1810–1825)', 'Việt Nam giành độc lập (1945, 1954, 1975)', 'Phong trào giải phóng châu Phi, châu Á'],
    },
    {
      label: 'Xu hướng 2',
      title: 'Liên hiệp các Dân tộc Xích lại Gần Nhau',
      subtitle: 'Hội nhập, hợp tác & toàn cầu hóa',
      color: '#f0b429',
      colorSoft: 'rgba(240,180,41,0.1)',
      colorBorder: 'rgba(240,180,41,0.3)',
      emoji: '🤝',
      desc: 'Do sự phát triển mạnh mẽ của lực lượng sản xuất, khoa học và công nghệ, sự giao lưu kinh tế, văn hóa và thị trường thế giới vượt ra ngoài biên giới quốc gia, làm xuất hiện xu hướng phá bỏ hàng rào ngăn cách, tiến tới liên hiệp các dân tộc.',
      causes: [
        'Sự phát triển kinh tế - xã hội liên kết các quốc gia',
        'Nhu cầu hợp tác giải quyết vấn đề quốc tế chung',
        'Phong trào đoàn kết quốc tế của các lực lượng tiến bộ',
      ],
      examples: ['Thành lập Liên Hiệp Quốc (1945)', 'Khối liên minh kinh tế EU, ASEAN, RCEP', 'Hiệp định thương mại tự do khu vực', 'Hợp tác khoa học, văn hóa, an ninh'],
    },
  ];

  const t = trends[active];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Banner Image */}
      <div className="w-full h-64 sm:h-80 relative rounded-2xl overflow-hidden shadow-2xl mb-8" style={{ border: '1px solid var(--border)' }}>
        <Image 
          src="/images/trends.png" 
          alt="Hai xu hướng khách quan" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-primary) 5%, transparent 60%)' }} />
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Hai Xu hướng Khách quan
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          V.I. Lênin phát hiện ra hai xu hướng khách quan mang tính quy luật trong thời kỳ phát triển của chủ nghĩa tư bản.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex gap-3">
        {trends.map((tr, i) => (
          <button
            key={i}
            onClick={() => setActive(i as 0 | 1)}
            className="flex-1 rounded-xl p-4 text-left transition-all duration-300"
            style={{
              background: active === i ? tr.colorSoft : 'var(--bg-card)',
              border: `1px solid ${active === i ? tr.colorBorder : 'var(--border)'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{tr.emoji}</span>
              <span className="text-xs font-bold" style={{ color: active === i ? tr.color : 'var(--text-muted)' }}>
                {tr.label}
              </span>
            </div>
            <p className="text-sm font-bold" style={{ color: active === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {tr.title}
            </p>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div key={active} className="animate-fade-in-up">
        <div className="rounded-2xl p-6 mb-4" style={{
          background: t.colorSoft,
          border: `1px solid ${t.colorBorder}`,
        }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{t.emoji}</span>
            <div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.title}</h3>
              <p className="text-sm" style={{ color: t.color }}>{t.subtitle}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Nguyên nhân */}
          <div className="card-glass p-5">
            <h4 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>💡</span> Nguyên nhân
            </h4>
            <ul className="space-y-2">
              {t.causes.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: t.color }}>•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Biểu hiện */}
          <div className="card-glass p-5">
            <h4 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>📋</span> Biểu hiện
            </h4>
            <ul className="space-y-2">
              {t.examples.map((e, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: t.color }}>✓</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* So sánh bảng */}
      <div className="card-glass overflow-hidden">
        <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>⚖️ So sánh hai xu hướng</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left py-3 px-6 font-semibold" style={{ color: 'var(--text-muted)', width: '30%' }}>Tiêu chí</th>
                <th className="text-left py-3 px-6 font-semibold" style={{ color: '#ff6b6b' }}>Tách rã</th>
                <th className="text-left py-3 px-6 font-semibold" style={{ color: 'var(--accent-gold)' }}>Liên hiệp</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Mục tiêu', 'Độc lập, tự quyết, chủ quyền', 'Hợp tác, cộng sinh, phát triển chung'],
                ['Lực lượng đẩy', 'Ý thức dân tộc, phong trào giải phóng', 'Kinh tế toàn cầu, vấn đề chung nhân loại'],
                ['Giai đoạn', 'Thế kỷ XVIII–XX', 'Thế kỷ XX–nay'],
                ['Kết quả', 'Tăng số quốc gia, ranh giới rõ ràng', 'Hình thành liên minh, tinh thần toàn cầu'],
              ].map(([label, a, b], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <td className="py-3 px-6 font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</td>
                  <td className="py-3 px-6" style={{ color: 'var(--text-secondary)' }}>{a}</td>
                  <td className="py-3 px-6" style={{ color: 'var(--text-secondary)' }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
