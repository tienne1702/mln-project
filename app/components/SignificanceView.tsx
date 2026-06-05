'use client';

export default function SignificanceView() {
  const points = [
    {
      icon: '📚',
      title: 'Nền tảng lý luận',
      color: '#e8171e',
      desc: 'Là nền tảng lý luận để Đảng và Nhà nước xã hội chủ nghĩa hoạch định chiến lược, chính sách dân tộc đúng đắn, xây dựng khối đại đoàn kết toàn dân tộc vững chắc.',
    },
    {
      icon: '🛡️',
      title: 'Đấu tranh tư tưởng',
      color: '#f0b429',
      desc: 'Giúp nhận diện, chủ động đấu tranh và bác bỏ các luận điệu xuyên tạc, âm mưu lợi dụng vấn đề dân tộc của các thế lực thù địch nhằm thực hiện "diễn biến hòa bình", bạo loạn lật đổ, ly khai dân tộc.',
    },
    {
      icon: '🌱',
      title: 'Giáo dục thế hệ trẻ',
      color: '#10b981',
      desc: 'Giáo dục tinh thần yêu nước chân chính kết hợp với chủ nghĩa quốc tế vô sản trong sáng cho các thế hệ, nhất là thế hệ trẻ.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Ý nghĩa Khoa học & Thực tiễn
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Việc nghiên cứu và nắm vững lý luận dân tộc có ý nghĩa then chốt đối với sự nghiệp cách mạng Việt Nam.
        </p>
      </div>

      <div className="space-y-4">
        {points.map((p, i) => (
          <div key={i} className="card-glass p-6 flex gap-5 items-start">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
              {p.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: p.color }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="rounded-2xl p-8 text-center" style={{
        background: 'linear-gradient(135deg, rgba(232,23,30,0.08), rgba(240,180,41,0.05))',
        border: '1px solid rgba(232,23,30,0.15)',
      }}>
        <p className="text-xl italic font-semibold mb-3" style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
          "Đoàn kết, đoàn kết, đại đoàn kết.<br />
          Thành công, thành công, đại thành công."
        </p>
        <p className="text-sm" style={{ color: 'var(--accent-gold)' }}>— Chủ tịch Hồ Chí Minh</p>
      </div>
    </div>
  );
}
