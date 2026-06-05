'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Lightbulb, BookOpen, Sparkles, Trash2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'textbook' | 'free';

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;               // The question (user) or answer (ai)
  sectionTitle?: string;      // For ai messages in textbook mode
  source?: string;            // Textbook excerpt shown
  isApiError?: boolean;
  errorDetail?: string;
  mode: Mode;
  timestamp: Date;
}

// ─── Knowledge base helpers ───────────────────────────────────────────────────

const FALLBACK_KNOWLEDGE_BASE = `
## [MỤC 1] TỔNG QUAN VỀ DÂN TỘC
Dân tộc là một hình thức cộng đồng người phát triển cao nhất trong lịch sử nhân loại.
Theo chủ nghĩa Mác - Lênin, dân tộc là kết quả của quá trình phát triển lâu dài qua: thị tộc, bộ lạc, bộ tộc, dân tộc.

## [MỤC 2] HAI XU HƯỚNG KHÁCH QUAN
Xu hướng 1: Sự thức tỉnh của các dân tộc, phong trào dân tộc giải phóng.
Xu hướng 2: Sự liên hiệp, xích lại gần nhau của các dân tộc do toàn cầu hóa.

## [MỤC 3] CƯƠNG LĨNH DÂN TỘC CỦA LÊNIN
a) Các dân tộc hoàn toàn bình đẳng.
b) Các dân tộc được quyền tự quyết.
c) Liên hiệp công nhân tất cả các dân tộc.

## [MỤC 4] CHÍNH SÁCH DÂN TỘC CỦA VIỆT NAM
5 trụ cột: Chính trị, Kinh tế, Văn hóa, Xã hội, Quốc phòng - An ninh.
`;

const KEYWORD_GROUPS = [
  { section: 3, title: 'Cương lĩnh Lênin', keywords: ['lênin', 'le nin', 'cương lĩnh', 'cuong linh', 'nguyên tắc', 'nguyen tac', 'bình đẳng', 'tự quyết', 'liên hiệp công nhân'] },
  { section: 4, title: 'Chính sách dân tộc Việt Nam', keywords: ['việt nam', 'chính sách', 'chinh sach', 'kinh tế', 'kinh te', 'văn hóa', 'van hoa', 'xã hội', 'xa hoi', 'quốc phòng', 'an ninh', 'chính trị', 'chinh tri'] },
  { section: 2, title: 'Hai xu hướng khách quan', keywords: ['hai xu hướng', 'xu hướng', 'xu huong', 'tách ra', 'tach ra', 'liên hiệp', 'lien hiep', 'xích lại', 'xich lai', 'giải phóng dân tộc'] },
  { section: 5, title: 'Đặc điểm dân tộc Việt Nam', keywords: ['đặc điểm', 'dac diem', '54 dân tộc', 'cư trú xen kẽ', 'chênh lệch', 'thiểu số', 'thieu so', 'kinh'] },
  { section: 6, title: 'Khái niệm dân tộc', keywords: ['khái niệm', 'khai niem', 'nghĩa hẹp', 'nghĩa rộng', 'tộc người', 'ethnie', 'nation', 'đặc trưng'] },
  { section: 8, title: 'Các khái niệm cốt lõi', keywords: ['khái niệm', 'định nghĩa', 'quốc gia', 'nhà nước', 'chủ quyền', 'tự quyết'] },
  { section: 1, title: 'Tổng quan về dân tộc', keywords: ['tổng quan', 'tong quan', 'lý luận', 'ly luan', 'dân tộc', 'dan toc', 'lịch sử', 'lich su', 'thị tộc', 'bộ lạc'] },
];

const normalizeText = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/\s+/g, ' ').trim();

const extractSection = (kb: string, n: number) => {
  const regex = new RegExp(`## \\[MỤC ${n}\\][\\s\\S]*?(?=## \\[MỤC|$)`, 'i');
  return kb.match(regex)?.[0] ?? '';
};

const buildLocalContext = (question: string, kb: string) => {
  const q = normalizeText(question);
  const group = KEYWORD_GROUPS.find(g => g.keywords.some(k => q.includes(normalizeText(k)))) ?? KEYWORD_GROUPS[KEYWORD_GROUPS.length - 1];
  const section = extractSection(kb, group.section);
  const source = section ? section.split('\n').slice(0, 16).join('\n') : 'Không tìm thấy nội dung phù hợp.';
  const fallback = section.split('\n').filter(l => l.trim() && !l.trim().startsWith('#')).join(' ').slice(0, 300) || `Không tìm thấy thông tin liên quan đến "${question}".`;
  return { sectionTitle: group.title, source, fallbackSummary: fallback };
};

// ─── Quick prompts per mode ───────────────────────────────────────────────────

const QUICK_PROMPTS_TEXTBOOK = [
  'Cương lĩnh dân tộc của Lênin gồm những nguyên tắc nào?',
  'Hai xu hướng khách quan trong quan hệ dân tộc là gì?',
  'Chính sách dân tộc của Việt Nam về văn hóa như thế nào?',
  'Đặc điểm nổi bật của 54 dân tộc Việt Nam?',
];

const QUICK_PROMPTS_FREE = [
  'So sánh quan điểm dân tộc của Mác và Lênin',
  'Tại sao vấn đề dân tộc quan trọng trong xây dựng CNXH?',
  'Ảnh hưởng của toàn cầu hóa đến vấn đề dân tộc hiện nay',
  'Hãy giải thích nguyên tắc tự quyết dân tộc bằng ví dụ cụ thể',
];

// ─── API call ─────────────────────────────────────────────────────────────────

const fetchGeminiAnswer = async (
  question: string,
  source: string,
  sectionTitle: string,
  mode: Mode,
  history: ChatTurn[],
) => {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, source, sectionTitle, mode, history }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Gemini API error');
  }
  const data = (await res.json()) as { answer?: string };
  if (!data.answer) throw new Error('Gemini không trả về nội dung.');
  return data.answer;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIChatbotView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState(FALLBACK_KNOWLEDGE_BASE);
  const [kbError, setKbError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('textbook');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  // Load knowledge base
  useEffect(() => {
    let mounted = true;
    fetch('/knowledge-base.md')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(t => { if (mounted) { setKnowledgeBase(t); setKbError(null); } })
      .catch(e => { if (mounted) setKbError(e.message); });
    return () => { mounted = false; };
  }, []);

  // Auto-scroll
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // Build ChatTurn history from existing messages (last 6 turns max to avoid token overflow)
  const buildHistory = (): ChatTurn[] => {
    const recent = messages.slice(-12); // last 12 messages = 6 turns
    const turns: ChatTurn[] = [];
    for (const m of recent) {
      if (m.type === 'user') turns.push({ role: 'user', text: m.text });
      else if (m.text !== undefined || m.text) turns.push({ role: 'model', text: m.text ?? '' });
    }
    return turns;
  };

  const handleSend = async (question: string) => {
    if (!question.trim() || isLoading) return;

    counterRef.current++;
    const userMsg: Message = { id: `m${counterRef.current}`, type: 'user', text: question, mode, timestamp: new Date() };
    setMessages(p => [...p, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const { sectionTitle, source, fallbackSummary } = buildLocalContext(question, knowledgeBase);
    const history = buildHistory();

    try {
      const answer = await fetchGeminiAnswer(question, mode === 'textbook' ? source : '', sectionTitle, mode, history);
      counterRef.current++;
      setMessages(p => [...p, {
        id: `m${counterRef.current}`, type: 'ai', text: answer,
        sectionTitle: mode === 'textbook' ? sectionTitle : undefined,
        source: mode === 'textbook' ? source : undefined,
        isApiError: false, mode, timestamp: new Date(),
      }]);
    } catch (err) {
      const errorDetail = err instanceof Error ? err.message : 'Lỗi không xác định';
      counterRef.current++;
      setMessages(p => [...p, {
        id: `m${counterRef.current}`, type: 'ai',
        text: mode === 'textbook' ? fallbackSummary : 'Gemini API không khả dụng. Vui lòng thử lại sau.',
        sectionTitle: mode === 'textbook' ? sectionTitle : undefined,
        source: mode === 'textbook' ? source : undefined,
        isApiError: true, errorDetail, mode, timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);
  const quickPrompts = mode === 'free' ? QUICK_PROMPTS_FREE : QUICK_PROMPTS_TEXTBOOK;

  return (
    <div className="h-full flex flex-col p-5" style={{ background: 'var(--bg-primary)' }}>

      {/* ── Header + Mode Toggle ── */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6" style={{ color: '#ff6b6b' }} />
          <div>
            <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Trợ lý Tra cứu AI</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {mode === 'textbook' ? 'Dựa trên giáo trình Chương 6' : 'Kiến thức tổng quát · Hội thoại nhiều lượt'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <button
              onClick={() => setMode('textbook')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-all"
              style={{
                background: mode === 'textbook' ? 'rgba(232,23,30,0.15)' : 'var(--bg-card)',
                color: mode === 'textbook' ? '#ff6b6b' : 'var(--text-muted)',
                borderRight: '1px solid var(--border)',
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Giáo trình
            </button>
            <button
              onClick={() => setMode('free')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-all"
              style={{
                background: mode === 'free' ? 'rgba(240,180,41,0.15)' : 'var(--bg-card)',
                color: mode === 'free' ? 'var(--accent-gold)' : 'var(--text-muted)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tự do
            </button>
          </div>

          {/* Clear button */}
          {messages.length > 0 && (
            <button onClick={clearChat} title="Xóa hội thoại"
              className="p-2 rounded-lg transition-all"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ff6b6b')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── KB Error ── */}
      {kbError && mode === 'textbook' && (
        <div className="mb-3 px-4 py-2.5 rounded-xl flex-shrink-0"
          style={{ background: 'rgba(240,180,41,0.08)', border: '1px solid rgba(240,180,41,0.25)' }}>
          <p className="text-xs" style={{ color: 'var(--accent-gold)' }}>
            ⚠️ Không thể tải giáo trình: {kbError}. Đang dùng dữ liệu dự phòng.
          </p>
        </div>
      )}

      {/* ── Mode info banner ── */}
      {mode === 'free' && (
        <div className="mb-3 px-4 py-2.5 rounded-xl flex-shrink-0"
          style={{ background: 'rgba(240,180,41,0.06)', border: '1px solid rgba(240,180,41,0.2)' }}>
          <p className="text-xs" style={{ color: 'var(--accent-gold)' }}>
            ✨ <strong>Chế độ Tự do:</strong> Gemini sẽ trả lời bằng toàn bộ kiến thức về Lý luận chính trị — không giới hạn ở giáo trình.
            Bạn có thể hỏi tiếp, mở rộng và đào sâu theo nhiều chiều.
          </p>
        </div>
      )}

      {/* ── Quick Prompts ── */}
      <div className="mb-3 flex flex-wrap gap-1.5 flex-shrink-0">
        {quickPrompts.map((p, i) => (
          <button key={i} onClick={() => handleSend(p)} disabled={isLoading}
            className="px-3 py-1.5 text-xs rounded-lg transition-all disabled:opacity-40 flex items-center gap-1"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = mode === 'free' ? 'rgba(240,180,41,0.5)' : 'rgba(232,23,30,0.5)'; (e.currentTarget as HTMLElement).style.color = mode === 'free' ? 'var(--accent-gold)' : '#ff6b6b'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          >
            <Lightbulb className="w-3 h-3 flex-shrink-0" />
            <span className="hidden sm:inline max-w-xs truncate">{p}</span>
            <span className="sm:hidden">Gợi ý {i + 1}</span>
          </button>
        ))}
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-3 pr-1">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            {mode === 'free'
              ? <Sparkles className="w-14 h-14 mb-4" style={{ color: 'rgba(240,180,41,0.3)' }} />
              : <BookOpen className="w-14 h-14 mb-4" style={{ color: 'var(--border)' }} />
            }
            <p className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
              {mode === 'free' ? 'Hỏi bất cứ điều gì về Lý luận chính trị' : 'Hỏi đáp dựa trên giáo trình Chương 6'}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {mode === 'free'
                ? 'Chế độ này hỗ trợ hội thoại nhiều lượt — bạn có thể hỏi tiếp, yêu cầu giải thích thêm hoặc cho ví dụ'
                : 'Câu trả lời sẽ ưu tiên nội dung trong giáo trình, kết hợp với Gemini AI'}
            </p>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'user' ? (
              /* User bubble */
              <div className="max-w-sm rounded-2xl rounded-tr-sm px-4 py-3"
                style={{
                  background: msg.mode === 'free' ? 'rgba(240,180,41,0.15)' : 'rgba(232,23,30,0.15)',
                  border: `1px solid ${msg.mode === 'free' ? 'rgba(240,180,41,0.3)' : 'rgba(232,23,30,0.3)'}`,
                  color: 'var(--text-primary)',
                }}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1" style={{ color: msg.mode === 'free' ? 'rgba(240,180,41,0.6)' : 'rgba(232,23,30,0.6)' }}>
                  {msg.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ) : (
              /* AI response */
              <div className="max-w-2xl space-y-2">
                {/* Label */}
                <div className="flex items-center gap-2 ml-1">
                  {msg.mode === 'free'
                    ? <Sparkles className="w-3 h-3" style={{ color: 'var(--accent-gold)' }} />
                    : <BookOpen className="w-3 h-3" style={{ color: '#ff6b6b' }} />
                  }
                  <span className="text-xs font-semibold" style={{ color: msg.mode === 'free' ? 'var(--accent-gold)' : '#ff6b6b' }}>
                    {msg.mode === 'free' ? 'Gemini · Tự do' : msg.sectionTitle}
                  </span>
                </div>

                {/* Error banner */}
                {msg.isApiError && (
                  <div className="px-4 py-2.5 rounded-xl"
                    style={{ background: 'rgba(240,180,41,0.08)', border: '1px solid rgba(240,180,41,0.25)' }}>
                    <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>⚠️ Gemini API lỗi — đang dùng dữ liệu dự phòng</p>
                    <p className="text-xs mt-0.5 font-mono break-all" style={{ color: 'var(--text-muted)' }}>{msg.errorDetail}</p>
                  </div>
                )}

                {/* Answer */}
                <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm"
                  style={{
                    background: msg.isApiError
                      ? 'rgba(240,180,41,0.06)'
                      : msg.mode === 'free'
                        ? 'rgba(240,180,41,0.07)'
                        : 'rgba(16,185,129,0.07)',
                    border: `1px solid ${msg.isApiError ? 'rgba(240,180,41,0.2)' : msg.mode === 'free' ? 'rgba(240,180,41,0.2)' : 'rgba(16,185,129,0.2)'}`,
                  }}>
                  <p className="text-xs font-bold mb-2" style={{ color: msg.isApiError ? 'var(--accent-gold)' : msg.mode === 'free' ? 'var(--accent-gold)' : '#10b981' }}>
                    {msg.isApiError ? '📋 Trích dẫn từ Giáo trình (fallback)' : msg.mode === 'free' ? '✨ Câu trả lời mở rộng' : '📝 Câu trả lời từ Gemini AI'}
                  </p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>{msg.text}</p>
                </div>

                {/* Textbook source (only in textbook mode) */}
                {msg.mode === 'textbook' && msg.source && !msg.isApiError && (
                  <details className="group">
                    <summary className="text-xs cursor-pointer select-none px-3 py-2 rounded-lg transition-all"
                      style={{ color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                      📚 Xem trích đoạn giáo trình
                    </summary>
                    <div className="mt-1 px-3 py-2.5 rounded-xl text-xs font-mono whitespace-pre-wrap max-h-32 overflow-y-auto"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {msg.source}
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: mode === 'free' ? 'var(--accent-gold)' : '#ff6b6b' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: mode === 'free' ? 'var(--accent-gold)' : '#ff6b6b', animationDelay: '0.15s' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: mode === 'free' ? 'var(--accent-gold)' : '#ff6b6b', animationDelay: '0.3s' }} />
              <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
                {mode === 'free' ? 'Gemini đang suy nghĩ...' : 'Đang tra cứu giáo trình...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div className="flex gap-2 flex-shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !isLoading) handleSend(inputValue); }}
          disabled={isLoading}
          placeholder={mode === 'free'
            ? 'Hỏi bất cứ điều gì về Lý luận chính trị...'
            : 'Hỏi về nội dung Chương 6...'}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none disabled:opacity-50"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          onFocus={e => (e.target.style.borderColor = mode === 'free' ? 'rgba(240,180,41,0.5)' : 'rgba(232,23,30,0.5)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
        <button
          onClick={() => handleSend(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-40"
          style={{
            background: mode === 'free'
              ? 'linear-gradient(135deg, #f0b429, #d4941a)'
              : 'linear-gradient(135deg, #e8171e, #c0392b)',
            color: 'white',
          }}
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Gửi</span>
        </button>
      </div>

      {/* History hint */}
      {messages.length >= 2 && (
        <p className="text-xs text-center mt-2 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
          💬 Gemini nhớ {Math.min(messages.length, 12)} tin nhắn gần nhất — bạn có thể hỏi tiếp mà không cần nhắc lại ngữ cảnh
        </p>
      )}
    </div>
  );
}
