'use client';

import { useState } from 'react';
import {
  BookOpen,
  ArrowLeftRight,
  ScrollText,
  Flag,
  Users,
  Microscope,
  BookMarked,
  MessageCircle,
  Gamepad2,
  Home,
  Network,
} from 'lucide-react';
import Link from 'next/link';
import OverviewView from '../components/OverviewView';
import TrendsView from '../components/TrendsView';
import LeninView from '../components/LeninView';
import VNPoliciesView from '../components/VNPoliciesView';
import VNCharView from '../components/VNCharView';
import SignificanceView from '../components/SignificanceView';
import GlossaryView from '../components/GlossaryView';
import AIChatbotView from '../components/AIChatbotView';
import MiniGameView from '../components/MiniGameView';
import Map3DView from '../components/Map3DView';

interface MenuItem {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: 'Tổng quan',
      sublabel: 'Khái niệm dân tộc',
      icon: <BookOpen className="w-5 h-5" />,
      component: <OverviewView />,
    },
    {
      id: 2,
      label: 'Hai xu hướng',
      sublabel: 'Khách quan của Lênin',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      component: <TrendsView />,
    },
    {
      id: 3,
      label: 'Cương lĩnh Lênin',
      sublabel: '3 nguyên tắc cốt lõi',
      icon: <ScrollText className="w-5 h-5" />,
      component: <LeninView />,
    },
    {
      id: 4,
      label: 'Chính sách VN',
      sublabel: '5 trụ cột Đảng & Nhà nước',
      icon: <Flag className="w-5 h-5" />,
      component: <VNPoliciesView />,
    },
    {
      id: 5,
      label: 'Đặc điểm VN',
      sublabel: '54 dân tộc anh em',
      icon: <Users className="w-5 h-5" />,
      component: <VNCharView />,
    },
    {
      id: 6,
      label: 'Ý nghĩa',
      sublabel: 'Khoa học & Thực tiễn',
      icon: <Microscope className="w-5 h-5" />,
      component: <SignificanceView />,
    },
    {
      id: 7,
      label: 'Từ điển',
      sublabel: 'Khái niệm cốt lõi',
      icon: <BookMarked className="w-5 h-5" />,
      component: <GlossaryView />,
    },
    {
      id: 8,
      label: 'Trợ lý AI',
      sublabel: 'Hỏi đáp thông minh',
      icon: <MessageCircle className="w-5 h-5" />,
      component: <AIChatbotView />,
    },
    {
      id: 9,
      label: 'Mini Game',
      sublabel: 'Ôn tập kiến thức',
      icon: <Gamepad2 className="w-5 h-5" />,
      component: <MiniGameView />,
    },
    {
      id: 10,
      label: 'Bản đồ 3D',
      sublabel: 'Vũ trụ kiến thức',
      icon: <Network className="w-5 h-5" />,
      component: <Map3DView onNavigate={setActiveTab} />,
    },
  ];

  const activeItem = menuItems.find(item => item.id === activeTab);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 flex flex-col overflow-hidden" style={{
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
      }}>
        {/* Logo */}
        <div className="p-6 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #e8171e, #c0392b)' }}>
              ★
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
                Lý Luận Chính Trị
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Chương 6 · Vấn đề Dân tộc</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-left group ${
                activeTab === item.id ? 'tab-active' : ''
              }`}
              style={{
                background: activeTab === item.id ? undefined : 'transparent',
                border: '1px solid transparent',
                color: activeTab === item.id ? undefined : 'var(--text-secondary)',
              }}
              onMouseEnter={e => {
                if (activeTab !== item.id) {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== item.id) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.label}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{item.sublabel}</p>
              </div>
              {activeTab === item.id && (
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#ff6b6b' }} />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 flex-shrink-0 flex flex-col gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all" 
            style={{ 
              color: 'var(--text-primary)', 
              background: 'var(--bg-card)',
              border: '1px solid var(--border)' 
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--accent-gold)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <Home className="w-4 h-4" />
            Về Trang chủ
          </Link>
          
          <div className="text-center space-y-1.5 mt-2 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--text-muted)' }}>AI Usage Declaration</p>
            <p className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              📝 Nội dung: <span className="text-[#10a37f]">ChatGPT</span>
            </p>
            <p className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              💻 Lập trình: <span className="text-[#1a73e8]">Gemini</span>
            </p>
          </div>

          <p className="text-[10px] text-center mt-1" style={{ color: 'var(--text-muted)' }}>
            © 2024 · Nhóm Lý Luận Chính Trị
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 py-4" style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              {activeItem?.label}
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{activeItem?.sublabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-red">Chương 6</span>
            <span className="badge-gold">MLN131</span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className={(activeTab === 8 || activeTab === 10) ? 'h-full' : 'p-8'}>
            {activeItem?.component}
          </div>
        </div>
      </main>
    </div>
  );
}
