'use client';
import Image from 'next/image';

export default function OverviewView() {
  const stages = [
    { label: 'Thị tộc', desc: 'Nhóm người có chung tổ tiên, sống bằng săn bắt và canh tác sơ khai' },
    { label: 'Bộ lạc', desc: 'Liên minh của những thị tộc cùng ngôn ngữ, tập tục, tôn giáo' },
    { label: 'Bộ tộc', desc: 'Cộng đồng người có chung nguồn gốc, ngôn ngữ, văn hóa, tâm lý' },
    { label: 'Dân tộc', desc: 'Cộng đồng có chung lịch sử, văn hóa, ngôn ngữ, tâm lý tập thể — hình thức cao nhất' },
  ];

  const narrowFeatures = [
    { icon: '🗣️', title: 'Ngôn ngữ chung', desc: 'Bao gồm tiếng mẹ đẻ và ngôn ngữ chung dùng để giao tiếp' },
    { icon: '🎨', title: 'Văn hóa chung', desc: 'Văn hóa vật thể và phi vật thể phản ánh đặc sắc riêng từng tộc người' },
    { icon: '🪪', title: 'Ý thức tự giác', desc: 'Tâm lý tự nhận biết tộc người, niềm tự hào và gắn bó bản sắc tộc người' },
  ];

  const broadFeatures = [
    { icon: '🗺️', title: 'Lãnh thổ chung ổn định', desc: 'Không gian sinh tồn, biểu tượng chủ quyền quốc gia trong quan hệ quốc tế' },
    { icon: '⚙️', title: 'Phương thức kinh tế chung', desc: 'Đặc trưng quan trọng nhất — cơ sở gắn kết và tạo nên tính thống nhất của dân tộc' },
    { icon: '🗣️', title: 'Ngôn ngữ quốc gia chung', desc: 'Ngôn ngữ nói và chữ viết làm công cụ giao tiếp xã hội thống nhất' },
    { icon: '🎭', title: 'Văn hóa & Tâm lý chung', desc: 'Phong tục tập quán, lối sống tạo nên bản sắc và diện mạo riêng của dân tộc' },
    { icon: '🏛️', title: 'Nhà nước chung', desc: 'Một chính quyền thống nhất, đại diện cho dân tộc trong quan hệ quốc tế' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      {/* Banner Image */}
      <div className="w-full h-64 sm:h-80 relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--border)' }}>
        <Image 
          src="/images/overview.png" 
          alt="Sự tiến hóa của cộng đồng người" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-primary) 5%, transparent 60%)' }} />
      </div>

      {/* Hero */}
      <div className="rounded-2xl p-8 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(232,23,30,0.12) 0%, rgba(240,180,41,0.06) 100%)',
        border: '1px solid rgba(232,23,30,0.2)',
      }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #e8171e, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-red">Chương 6</span>
            <span className="badge-gold">Phần 1</span>
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Dân tộc trong Thời kỳ Quá độ
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Dân tộc là một hình thức cộng đồng người <strong style={{ color: 'var(--accent-gold)' }}>phát triển cao nhất</strong> cho đến nay trong lịch sử nhân loại.
            Theo quan điểm của chủ nghĩa Mác - Lênin, dân tộc là kết quả của một quá trình phát triển lâu dài,
            trải qua các hình thức cộng đồng từ thấp đến cao.
          </p>
        </div>
      </div>

      {/* Evolution chain */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          📈 Tiến trình phát triển cộng đồng người
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {stages.map((s, i) => (
            <div key={i} className="relative">
              <div className="card-glass p-4 h-full" style={{
                borderLeft: i === 3 ? '3px solid var(--accent-red)' : '1px solid var(--border)',
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: i === 3 ? 'var(--accent-red)' : 'var(--bg-card-hover)', color: 'white' }}>
                    {i + 1}
                  </div>
                  <span className="font-bold text-sm" style={{ color: i === 3 ? '#ff6b6b' : 'var(--text-primary)' }}>
                    {s.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>
              {i < 3 && (
                <div className="absolute top-1/2 -right-2 z-10 w-4 h-4 flex items-center justify-center"
                  style={{ transform: 'translateY(-50%)' }}>
                  <span style={{ color: 'var(--accent-gold)', fontSize: '1rem', fontWeight: 'bold' }}>›</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          💡 Sự biến đổi của <strong>phương thức sản xuất</strong> chính là nguyên nhân quyết định sự biến đổi của các hình thức cộng đồng dân tộc.
        </p>
      </div>

      {/* Two definitions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Nghĩa hẹp */}
        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(240,180,41,0.15)', color: 'var(--accent-gold)', border: '1px solid rgba(240,180,41,0.3)' }}>
              Nghĩa hẹp
            </div>
            <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Tộc người · Ethnie</h3>
          </div>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Cộng đồng tộc người được hình thành trong lịch sử, có chung đặc điểm về nhân chủng, ngôn ngữ,
            văn hóa, tâm lý và ý thức tự giác tộc người.
          </p>
          <div className="space-y-3">
            {narrowFeatures.map((f, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg" style={{ background: 'var(--bg-card-hover)' }}>
                <span className="text-lg flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--accent-gold)' }}>{f.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 italic" style={{ color: 'var(--text-muted)' }}>
            Ví dụ: Tộc người Kinh, Tày, Thái, Êđê... tại Việt Nam
          </p>
        </div>

        {/* Nghĩa rộng */}
        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(232,23,30,0.15)', color: '#ff6b6b', border: '1px solid rgba(232,23,30,0.3)' }}>
              Nghĩa rộng
            </div>
            <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Quốc gia dân tộc · Nation</h3>
          </div>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Cộng đồng người ổn định làm thành nhân dân một nước, có lãnh thổ riêng, nền kinh tế thống nhất,
            quốc ngữ chung, gắn bó bởi quyền lợi chính trị, kinh tế, truyền thống văn hóa và đấu tranh chung.
          </p>
          <div className="space-y-3">
            {broadFeatures.map((f, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg" style={{ background: 'var(--bg-card-hover)' }}>
                <span className="text-lg flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#ff6b6b' }}>{f.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 italic" style={{ color: 'var(--text-muted)' }}>
            Ví dụ: Dân tộc Việt Nam, Dân tộc Ấn Độ...
          </p>
        </div>
      </div>
    </div>
  );
}
