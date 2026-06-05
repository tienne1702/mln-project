import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Globe2, ScrollText, Flag } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: 'Khái niệm Cốt lõi',
      desc: 'Sự tiến hóa từ thị tộc, bộ lạc đến quốc gia dân tộc.',
      icon: <BookOpen className="w-6 h-6" />,
      image: '/images/overview.png',
      color: '#e8171e',
    },
    {
      title: 'Hai Xu hướng',
      desc: 'Quy luật phân lập và liên hiệp trong toàn cầu hóa.',
      icon: <Globe2 className="w-6 h-6" />,
      image: '/images/trends.png',
      color: '#f0b429',
    },
    {
      title: 'Cương lĩnh Lênin',
      desc: 'Bình đẳng, Tự quyết và Liên hiệp vô sản.',
      icon: <ScrollText className="w-6 h-6" />,
      image: '/images/lenin.png',
      color: '#3b82f6',
    },
    {
      title: 'Thực tiễn Việt Nam',
      desc: 'Đặc điểm và 5 trụ cột chính sách dân tộc.',
      icon: <Flag className="w-6 h-6" />,
      image: '/images/vnpolicies.png',
      color: '#10b981',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: 'var(--accent-red)' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: 'var(--accent-gold)' }} />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 flex flex-col min-h-screen justify-center">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-red-500/30 bg-red-500/10 text-red-500 text-sm font-bold tracking-wide uppercase">
            <span>✨ Chuyên đề Lý luận Chính trị</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Vấn đề <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Dân tộc</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Tôn giáo</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 leading-relaxed text-gray-400 max-w-2xl mx-auto">
            Hệ thống hóa toàn bộ kiến thức Chương 6 về Chủ nghĩa Mác - Lênin. Khám phá các xu hướng khách quan, cương lĩnh dân tộc và các chính sách thực tiễn của Đảng và Nhà nước Việt Nam.
          </p>
          
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 group"
            style={{ background: 'linear-gradient(135deg, var(--accent-red), var(--accent-red-soft))', color: 'white' }}>
            Bắt đầu Khám phá
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {features.map((f, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden h-72 border border-white/10 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-white/20">
              <Image 
                src={f.image}
                alt={f.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/80 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20 transition-colors"
                  style={{ background: `${f.color}20`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Usage Declaration Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="max-w-max mx-auto px-6 py-3 rounded-full backdrop-blur-md border border-white/10 bg-black/20 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 shadow-2xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">AI Usage Declaration</p>
          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10a37f] animate-pulse"></span>
              <span className="text-gray-400 font-medium">Nội dung biên soạn: <strong className="text-[#10a37f]">ChatGPT</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1a73e8] animate-pulse"></span>
              <span className="text-gray-400 font-medium">Lập trình & Thiết kế: <strong className="text-[#1a73e8] drop-shadow-[0_0_8px_rgba(26,115,232,0.5)]">Gemini</strong></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
