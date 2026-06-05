'use client';

import { useState } from 'react';
import Image from 'next/image';

const principles = [
  {
    id: 'a',
    letter: 'A',
    title: 'Các dân tộc hoàn toàn bình đẳng',
    subtitle: 'Quyền thiêng liêng, cơ sở cốt lõi',
    color: '#e8171e',
    colorSoft: 'rgba(232,23,30,0.1)',
    points: [
      'Không phân biệt dân tộc lớn hay nhỏ, trình độ phát triển cao hay thấp — tất cả đều có nghĩa vụ và quyền lợi ngang nhau.',
      'Trong quan hệ quốc tế, không một dân tộc nào được quyền áp đặt, cưỡng bức, bóc lột hay có đặc quyền đặc lợi đối với dân tộc khác.',
      'Trong quốc gia đa tộc người: quyền bình đẳng phải thể hiện trên phương diện pháp lý (Hiến pháp, luật pháp) và trên thực tế (Nhà nước đầu tư, hỗ trợ dân tộc thiểu số).',
    ],
  },
  {
    id: 'b',
    letter: 'B',
    title: 'Các dân tộc được quyền tự quyết',
    subtitle: 'Tự do lựa chọn con đường phát triển',
    color: '#f0b429',
    colorSoft: 'rgba(240,180,41,0.1)',
    points: [
      'Quyền của mỗi dân tộc tự quyết định vận mệnh lịch sử của mình, tự lựa chọn chế độ chính trị - xã hội và con đường phát triển.',
      'Bao gồm: quyền tự do phân lập thành quốc gia độc lập (khi bị áp bức bởi ngoại bang) và quyền tự nguyện liên hiệp với dân tộc khác.',
      'Kiên quyết đấu tranh chống lại việc lợi dụng "quyền tự quyết" để kích động ly khai, chia rẽ, can thiệp vào nội bộ các quốc gia độc lập.',
    ],
  },
  {
    id: 'c',
    letter: 'C',
    title: 'Liên hiệp công nhân tất cả các dân tộc',
    subtitle: 'Linh hồn của Cương lĩnh dân tộc',
    color: '#3b82f6',
    colorSoft: 'rgba(59,130,246,0.1)',
    points: [
      'Nội dung quan trọng nhất — thể hiện bản chất giai cấp công nhân trong việc giải quyết vấn đề dân tộc.',
      'Giai cấp công nhân các dân tộc khác nhau có chung địa vị kinh tế - xã hội, chung lợi ích và chung mục tiêu đấu tranh chống áp bức bóc lột.',
      'Sự liên hiệp công nhân là sức mạnh tiên quyết giúp phong trào giải phóng dân tộc giành thắng lợi, đồng thời là động lực xóa bỏ hận thù dân tộc cũ.',
    ],
  },
];

export default function LeninView() {
  const [expanded, setExpanded] = useState<string | null>('a');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Banner Image */}
      <div className="w-full h-64 sm:h-80 relative rounded-2xl overflow-hidden shadow-2xl mb-8" style={{ border: '1px solid var(--border)' }}>
        <Image 
          src="/images/lenin.png" 
          alt="Cương lĩnh Lênin" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-primary) 5%, transparent 60%)' }} />
      </div>

      {/* Header */}
      <div className="rounded-2xl p-6" style={{
        background: 'linear-gradient(135deg, rgba(232,23,30,0.1), rgba(240,180,41,0.05))',
        border: '1px solid rgba(232,23,30,0.2)',
      }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-red">V.I. Lênin</span>
          <span className="badge-gold">3 Nguyên tắc</span>
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Cương lĩnh Dân tộc của Chủ nghĩa Mác - Lênin
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Dựa trên hai xu hướng khách quan và lập trường giai cấp công nhân, V.I. Lênin đã khái quát thành
          Cương lĩnh dân tộc gồm <strong style={{ color: 'var(--accent-gold)' }}>3 nguyên tắc cơ bản</strong>:
        </p>
      </div>

      {/* 3 principles accordion */}
      <div className="space-y-3">
        {principles.map(p => (
          <div key={p.id} className="card-glass overflow-hidden transition-all duration-300">
            <button
              className="w-full flex items-center gap-4 p-5 text-left"
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base flex-shrink-0"
                style={{ background: p.colorSoft, color: p.color, border: `1px solid ${p.color}40` }}>
                {p.letter}
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
                <p className="text-xs mt-0.5" style={{ color: p.color }}>{p.subtitle}</p>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1 }}>
                {expanded === p.id ? '−' : '+'}
              </span>
            </button>

            {expanded === p.id && (
              <div className="px-5 pb-5 animate-fade-in-up">
                <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
                <div className="space-y-3">
                  {p.points.map((point, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ background: p.colorSoft }}>
                      <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: p.color }}>
                        {i + 1}.
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card-glass p-6">
        <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          🔗 Mối quan hệ giữa 3 nguyên tắc
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          {principles.map(p => (
            <div key={p.id} className="rounded-xl p-4" style={{ background: p.colorSoft, border: `1px solid ${p.color}30` }}>
              <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center font-black"
                style={{ background: p.color, color: 'white' }}>
                {p.letter}
              </div>
              <p className="text-xs font-semibold" style={{ color: p.color }}>{p.title.split(' ').slice(0, 4).join(' ')}...</p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--accent-gold)' }}>A (Bình đẳng)</strong> là nền tảng pháp lý và đạo đức.{' '}
          <strong style={{ color: '#ff6b6b' }}>B (Tự quyết)</strong> là quyền chính trị của mỗi dân tộc.{' '}
          <strong style={{ color: '#93c5fd' }}>C (Liên hiệp)</strong> là linh hồn — thể hiện bản chất giai cấp công nhân, đảm bảo thắng lợi hoàn toàn cho phong trào giải phóng dân tộc.
        </p>
      </div>
    </div>
  );
}
