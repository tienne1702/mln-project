'use client';

import { useState, useEffect } from 'react';
import { Gamepad2, Award, RotateCcw, CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

// Ngân hàng câu hỏi
const QUESTIONS = [
  {
    question: 'Dân tộc là hình thức cộng đồng người phát triển cao nhất tiếp nối sau các hình thức nào?',
    options: ['Thị tộc', 'Bộ lạc', 'Bộ tộc', 'Cả 3 hình thức trên'],
    correct: 3,
  },
  {
    question: 'Theo Cương lĩnh dân tộc của Lênin, nguyên tắc nào được coi là "linh hồn" mang bản chất giai cấp công nhân?',
    options: ['Các dân tộc hoàn toàn bình đẳng', 'Các dân tộc được quyền tự quyết', 'Liên hiệp công nhân tất cả các dân tộc', 'Đại đoàn kết toàn dân tộc'],
    correct: 2,
  },
  {
    question: 'V.I. Lênin phát hiện ra hai xu hướng khách quan mang tính quy luật nào?',
    options: ['Tách rã thành Quốc gia độc lập và Liên hiệp các dân tộc', 'Chiến tranh và Hòa bình', 'Độc lập dân tộc và Tự do tôn giáo', 'Toàn cầu hóa và Khu vực hóa'],
    correct: 0,
  },
  {
    question: 'Dân tộc Kinh chiếm khoảng bao nhiêu phần trăm dân số Việt Nam (theo tổng điều tra 2019)?',
    options: ['Khoảng 54%', 'Khoảng 75%', 'Khoảng 85.32%', 'Khoảng 95%'],
    correct: 2,
  },
  {
    question: 'Đặc điểm nào sau đây KHÔNG phải là đặc điểm của các dân tộc ở Việt Nam?',
    options: ['Các dân tộc cư trú đan xen nhau', 'Các dân tộc phát triển không đều', 'Chỉ có một tôn giáo duy nhất được công nhận', 'Mỗi dân tộc có bản sắc văn hóa riêng'],
    correct: 2,
  },
  {
    question: 'Chính sách dân tộc của Đảng và Nhà nước Việt Nam bao gồm bao nhiêu trụ cột chính?',
    options: ['3 trụ cột', '4 trụ cột', '5 trụ cột', '6 trụ cột'],
    correct: 2,
  },
  {
    question: 'Trong nghĩa hẹp (Tộc người - Ethnie), đặc trưng nào là quan trọng nhất để nhận diện?',
    options: ['Có lãnh thổ chung ổn định', 'Có nhà nước chung', 'Ý thức tự giác tộc người', 'Phương thức kinh tế chung'],
    correct: 2,
  },
  {
    question: 'Đối với quốc gia dân tộc (nghĩa rộng), đặc trưng nào là cơ sở gắn kết và tạo nên tính thống nhất?',
    options: ['Phương thức kinh tế chung', 'Lãnh thổ chung ổn định', 'Ngôn ngữ chung', 'Nhà nước chung'],
    correct: 0,
  },
  {
    question: 'Quyền tự quyết dân tộc KHÔNG bao gồm hành động nào dưới đây?',
    options: ['Tự do phân lập thành quốc gia độc lập', 'Tự nguyện liên hiệp với dân tộc khác', 'Lợi dụng quyền tự quyết để kích động ly khai, chống phá', 'Tự lựa chọn chế độ chính trị - xã hội'],
    correct: 2,
  },
  {
    question: 'Mục tiêu bao trùm của chính sách dân tộc tại Việt Nam là gì?',
    options: ['Bình đẳng, đoàn kết, tôn trọng, giúp nhau cùng phát triển', 'Đồng hóa các dân tộc thiểu số vào dân tộc đa số', 'Phân chia lãnh thổ tự trị cho các dân tộc', 'Tập trung toàn bộ quyền lực về trung ương'],
    correct: 0,
  },
];

// Hàm trộn mảng
const shuffleArray = (array: any[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function MiniGameView() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Khởi tạo game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Trộn 10 câu hỏi
    setQuestions(shuffleArray(QUESTIONS).slice(0, 10));
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === questions[currentIndex].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
    }
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Gamepad2 className="w-6 h-6" style={{ color: '#f0b429' }} />
            Đấu trường Lý luận
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Ôn tập kiến thức Chương 6 qua các câu hỏi trắc nghiệm
          </p>
        </div>
        {!isGameOver && (
          <div className="card-glass px-4 py-2 flex items-center gap-2">
            <Award className="w-5 h-5" style={{ color: '#ff6b6b' }} />
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{score}</span>
          </div>
        )}
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
              <span>Câu {currentIndex + 1} / {questions.length}</span>
              <span>{Math.round(progress)}% Hoàn thành</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
              <div className="h-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #e8171e, #f0b429)' }} />
            </div>
          </div>

          {/* Question Card */}
          <div className="card-glass p-8 relative overflow-hidden" style={{ borderTop: '3px solid #ff6b6b' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, #e8171e, transparent)', transform: 'translate(30%, -30%)' }} />
            
            <h3 className="text-xl font-bold leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt: string, idx: number) => {
                let bgColor = 'var(--bg-card)';
                let borderColor = 'var(--border)';
                let textColor = 'var(--text-secondary)';
                let icon = null;

                if (isAnswered) {
                  if (idx === currentQ.correct) {
                    bgColor = 'rgba(16,185,129,0.1)';
                    borderColor = 'rgba(16,185,129,0.5)';
                    textColor = '#10b981';
                    icon = <CheckCircle2 className="w-5 h-5" />;
                  } else if (idx === selectedOption) {
                    bgColor = 'rgba(232,23,30,0.1)';
                    borderColor = 'rgba(232,23,30,0.5)';
                    textColor = '#ff6b6b';
                    icon = <XCircle className="w-5 h-5" />;
                  }
                } else {
                  if (selectedOption === idx) {
                    borderColor = 'rgba(240,180,41,0.5)';
                    bgColor = 'rgba(240,180,41,0.05)';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className="w-full text-left p-4 rounded-xl flex items-center justify-between transition-all duration-200 group"
                    style={{ background: bgColor, border: `1px solid ${borderColor}`, color: textColor }}
                    onMouseEnter={e => {
                      if (!isAnswered) {
                        e.currentTarget.style.borderColor = 'rgba(232,23,30,0.4)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isAnswered) {
                        e.currentTarget.style.borderColor = borderColor;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <span className="font-medium">{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end animate-fade-in-up">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-105 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #e8171e, #c0392b)' }}
              >
                {currentIndex + 1 === questions.length ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="card-glass p-10 text-center animate-fade-in-up">
          <Trophy className="w-24 h-24 mx-auto mb-6" style={{ color: '#f0b429' }} />
          <h3 className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
            Kết Thúc Thử Thách!
          </h3>
          <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            Bạn đã trả lời đúng <strong style={{ color: '#ff6b6b', fontSize: '1.5rem' }}>{score}</strong> / {questions.length} câu hỏi.
          </p>

          <div className="max-w-md mx-auto p-4 rounded-xl mb-8" style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
            <p className="font-semibold" style={{ color: 'var(--accent-gold)' }}>
              {score === questions.length ? '🎉 Xuất sắc! Tuyệt đỉnh lý luận!' : 
               score >= questions.length * 0.7 ? '🌟 Rất tốt! Bạn nắm vững kiến thức.' : 
               '📖 Cần ôn tập thêm giáo trình nhé!'}
            </p>
          </div>

          <button
            onClick={startNewGame}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-transform hover:scale-105 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #e8171e, #c0392b)' }}
          >
            <RotateCcw className="w-5 h-5" />
            Chơi Lại Từ Đầu
          </button>
        </div>
      )}
    </div>
  );
}
