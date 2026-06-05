'use client';
import Image from 'next/image';

const characteristics = [
  {
    letter: 'a',
    title: 'Chênh lệch số dân giữa các tộc người',
    color: '#e8171e',
    stat: '85.32%',
    statLabel: 'Dân tộc Kinh',
    desc: 'Dân tộc Kinh chiếm đa số khoảng 85,32% trong tổng số dân, còn các dân tộc thiểu số chiếm tỉ lệ nhỏ hơn. Có những dân tộc có dân số rất đông hơn 1 triệu người như Tày, Thái, Mường, Mông, Khmer, Nùng, nhưng cũng có những dân tộc chỉ vài trăm người.',
    note: 'Đảng và Nhà nước luôn có chính sách quan tâm đặc biệt đối với các dân tộc ít người.',
  },
  {
    letter: 'b',
    title: 'Các dân tộc cư trú xen kẽ nhau',
    color: '#f0b429',
    stat: '54',
    statLabel: 'dân tộc anh em',
    desc: 'Do quá trình di cư lâu dài trong lịch sử, không có dân tộc nào sinh sống hoàn toàn tách biệt trên một lãnh thổ riêng. Việc cư trú xen kẽ tạo điều kiện để các dân tộc giao lưu văn hóa, tăng cường hiểu biết và hỗ trợ nhau phát triển.',
    note: 'Tuy nhiên, đặc điểm này cũng dễ phát sinh mâu thuẫn và có thể bị thế lực thù địch lợi dụng để gây chia rẽ.',
  },
  {
    letter: 'c',
    title: 'Phân bố ở địa bàn chiến lược quan trọng',
    color: '#3b82f6',
    stat: '14.3%',
    statLabel: 'dân số, 2/3 lãnh thổ',
    desc: 'Mặc dù chỉ chiếm 14,3% dân số, nhưng đồng bào 53 dân tộc thiểu số cư trú trên phần lớn diện tích lãnh thổ, nhất là ở vùng biên giới, miền núi, hải đảo — những khu vực có ý nghĩa đặc biệt về kinh tế, quốc phòng, an ninh và bảo vệ môi trường sinh thái.',
    note: 'Một số dân tộc còn có quan hệ đồng tộc với cư dân ở các nước láng giềng.',
  },
  {
    letter: 'd',
    title: 'Các dân tộc phát triển không đều',
    color: '#a855f7',
    stat: '≠',
    statLabel: 'Trình độ phát triển',
    desc: 'Các dân tộc ở Việt Nam có sự khác biệt khá lớn về kinh tế, văn hóa và xã hội. Một số dân tộc vẫn còn đời sống khó khăn, trình độ dân trí và chuyên môn kỹ thuật còn thấp, trong khi nhiều dân tộc khác đã từng bước phát triển theo hướng công nghiệp hóa, hiện đại hóa.',
    note: 'Thu hẹp khoảng cách phát triển giữa các dân tộc là nhiệm vụ quan trọng để bảo đảm bình đẳng và phát triển bền vững.',
  },
  {
    letter: 'e',
    title: 'Truyền thống đoàn kết lâu đời',
    color: '#10b981',
    stat: '4000+',
    statLabel: 'năm lịch sử chung',
    desc: 'Trong suốt quá trình dựng nước và giữ nước, các dân tộc đã cùng nhau lao động, đấu tranh chống thiên tai và ngoại xâm, hình thành tinh thần đoàn kết bền chặt.',
    note: 'Truyền thống đó trở thành nguồn sức mạnh to lớn giúp dân tộc Việt Nam vượt qua mọi khó khăn.',
  },
  {
    letter: 'f',
    title: 'Mỗi dân tộc có bản sắc văn hóa riêng',
    color: '#f59e0b',
    stat: '54',
    statLabel: 'bản sắc văn hóa',
    desc: 'Mỗi dân tộc có những phong tục, tập quán, tiếng nói, trang phục và giá trị văn hóa đặc sắc riêng. Tuy nhiên, tất cả đều cùng chung lịch sử dựng nước và giữ nước, cùng hướng tới ý thức về một quốc gia độc lập, thống nhất.',
    note: 'Tạo nên nền văn hóa Việt Nam thống nhất trong đa dạng và giàu bản sắc dân tộc.',
  },
];

export default function VNCharView() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Banner Image */}
      <div className="w-full h-64 sm:h-80 relative rounded-2xl overflow-hidden shadow-2xl mb-8" style={{ border: '1px solid var(--border)' }}>
        <Image 
          src="/images/vnchar.png" 
          alt="Đặc điểm dân tộc Việt Nam" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-primary) 5%, transparent 60%)' }} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Đặc điểm Dân tộc ở Việt Nam
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Số liệu từ Tổng điều tra dân số và nhà ở năm 2019
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: '54', label: 'dân tộc anh em', color: '#e8171e' },
          { value: '85.32%', label: 'Dân tộc Kinh', color: '#f0b429' },
          { value: '14.3%', label: '53 dân tộc thiểu số', color: '#3b82f6' },
        ].map((s, i) => (
          <div key={i} className="card-glass p-5 text-center">
            <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Characteristics grid */}
      <div className="grid grid-cols-2 gap-4">
        {characteristics.map(c => (
          <div key={c.letter} className="principle-card" style={{
            borderLeft: `3px solid ${c.color}`,
          }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` }}>
                  {c.letter.toUpperCase()}
                </span>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{c.title}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-black" style={{ color: c.color, lineHeight: 1 }}>{c.stat}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.statLabel}</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{c.desc}</p>
            <p className="text-xs italic p-2 rounded-lg" style={{ color: c.color, background: `${c.color}10` }}>
              💡 {c.note}
            </p>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className="card-glass p-6">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Do các đặc điểm trên, <strong style={{ color: 'var(--text-primary)' }}>Đảng và Nhà nước luôn coi chính sách dân tộc là vấn đề chính trị – xã hội rộng lớn và toàn diện</strong>,
          gắn với mục tiêu xây dựng chủ nghĩa xã hội. Chính sách này phải gắn với mục tiêu phát triển đất nước,
          nâng cao đời sống nhân dân và giữ gìn bản sắc văn hóa của các dân tộc.
        </p>
      </div>
    </div>
  );
}
