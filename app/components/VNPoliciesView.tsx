'use client';

import { useState } from 'react';
import Image from 'next/image';

const pillars = [
  {
    id: 1, emoji: '🏛️', title: 'Chính trị', color: '#e8171e', colorSoft: 'rgba(232,23,30,0.1)',
    content: 'Nhà nước thực hiện quyền bình đẳng giữa các dân tộc, tăng cường khối đại đoàn kết toàn dân tộc và tạo điều kiện để đồng bào các dân tộc tham gia quản lý nhà nước và xã hội.',
  },
  {
    id: 2, emoji: '📈', title: 'Kinh tế', color: '#f0b429', colorSoft: 'rgba(240,180,41,0.1)',
    content: 'Nhà nước tập trung phát triển kinh tế – xã hội ở vùng dân tộc thiểu số và miền núi, đẩy mạnh xóa đói giảm nghèo, phát triển cơ sở hạ tầng và từng bước nâng cao đời sống của đồng bào.',
  },
  {
    id: 3, emoji: '🎨', title: 'Văn hóa', color: '#a855f7', colorSoft: 'rgba(168,85,247,0.1)',
    content: 'Đảng và Nhà nước chủ trương xây dựng nền văn hóa tiên tiến, đậm đà bản sắc dân tộc; đồng thời giữ gìn và phát huy các giá trị văn hóa truyền thống, tiếng nói, chữ viết và phong tục tập quán tốt đẹp của các dân tộc.',
  },
  {
    id: 4, emoji: '❤️', title: 'Xã hội', color: '#ec4899', colorSoft: 'rgba(236,72,153,0.1)',
    content: 'Nhà nước chú trọng phát triển giáo dục, y tế, an sinh xã hội và nâng cao dân trí cho đồng bào dân tộc thiểu số nhằm thu hẹp khoảng cách phát triển giữa các vùng và các dân tộc.',
  },
  {
    id: 5, emoji: '🛡️', title: 'Quốc phòng – An ninh', color: '#3b82f6', colorSoft: 'rgba(59,130,246,0.1)',
    content: 'Nhà nước tăng cường giữ vững ổn định chính trị, bảo vệ chủ quyền quốc gia và xây dựng thế trận quốc phòng toàn dân ở vùng dân tộc và miền núi.',
  },
];

export default function VNPoliciesView() {
  const [active, setActive] = useState<number>(1);
  const p = pillars.find(x => x.id === active)!;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Banner Image */}
      <div className="w-full h-64 sm:h-80 relative rounded-2xl overflow-hidden shadow-2xl mb-8" style={{ border: '1px solid var(--border)' }}>
        <Image 
          src="/images/vnpolicies.png" 
          alt="Chính sách dân tộc Việt Nam" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-primary) 5%, transparent 60%)' }} />
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Chính sách Dân tộc của Việt Nam
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Đảng và Nhà nước thực hiện bình đẳng, đoàn kết, tôn trọng và giúp nhau cùng phát triển giữa các dân tộc.
        </p>
      </div>

      {/* Quan điểm Đảng */}
      <div className="rounded-2xl p-5" style={{
        background: 'linear-gradient(135deg, rgba(232,23,30,0.08), rgba(240,180,41,0.04))',
        border: '1px solid rgba(232,23,30,0.15)',
      }}>
        <p className="text-sm font-bold mb-2" style={{ color: '#ff6b6b' }}>📜 Quan điểm của Đảng</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Đảng Cộng sản Việt Nam xác định vấn đề dân tộc và đoàn kết dân tộc có <strong style={{ color: 'var(--text-primary)' }}>vị trí chiến lược lâu dài</strong> trong sự nghiệp cách mạng Việt Nam.
          Công tác dân tộc được xem là nhiệm vụ của <strong style={{ color: 'var(--accent-gold)' }}>toàn Đảng, toàn dân, toàn quân và cả hệ thống chính trị</strong>.
        </p>
      </div>

      {/* 5 Pillars selector */}
      <div>
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-muted)' }}>5 TRỤCỘT CHÍNH SÁCH</h3>
        <div className="flex gap-2 flex-wrap">
          {pillars.map(pl => (
            <button
              key={pl.id}
              onClick={() => setActive(pl.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                background: active === pl.id ? pl.colorSoft : 'var(--bg-card)',
                border: `1px solid ${active === pl.id ? pl.color + '60' : 'var(--border)'}`,
                color: active === pl.id ? pl.color : 'var(--text-secondary)',
              }}
            >
              <span>{pl.emoji}</span>
              <span>{pl.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail card */}
      <div key={active} className="card-glass p-6 animate-fade-in-up" style={{
        borderLeft: `3px solid ${p.color}`,
      }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{p.emoji}</span>
          <div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Về {p.title}</h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.content}</p>
      </div>

      {/* Summary: Ý nghĩa */}
      <div className="card-glass p-6">
        <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>✨ Ý nghĩa của Chính sách Dân tộc</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Thực hiện tốt chính sách dân tộc có ý nghĩa quan trọng trong việc củng cố khối đại đoàn kết toàn dân tộc,
          tạo động lực cho phát triển kinh tế – xã hội và giữ vững ổn định chính trị của đất nước.
          Chính sách dân tộc còn góp phần bảo đảm quyền bình đẳng giữa các dân tộc, nâng cao đời sống của
          đồng bào dân tộc thiểu số và tăng cường sức mạnh của quốc gia trong sự nghiệp xây dựng chủ nghĩa xã hội
          và bảo vệ Tổ quốc.
        </p>

        {/* 5 pillars relationship */}
        <div className="mt-4 flex items-center justify-center gap-1 flex-wrap">
          {pillars.map((pl, i) => (
            <div key={pl.id} className="flex items-center gap-1">
              <div className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: pl.colorSoft, color: pl.color, border: `1px solid ${pl.color}30` }}>
                {pl.emoji} {pl.title}
              </div>
              {i < pillars.length - 1 && (
                <span style={{ color: 'var(--text-muted)' }}>→</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-center mt-3" style={{ color: 'var(--text-muted)' }}>
          Năm trụ cột liên kết chặt chẽ, tạo thành hệ thống chính sách dân tộc toàn diện, đồng bộ.
        </p>
      </div>
    </div>
  );
}
