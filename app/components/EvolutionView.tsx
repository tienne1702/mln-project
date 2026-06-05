'use client';

import { useState } from 'react';
import { ChevronRight, Info } from 'lucide-react';

interface EvolutionStage {
  id: number;
  name: string;
  narrowDef: string;
  broadDef: string;
}

export default function EvolutionView() {
  const [expandedStage, setExpandedStage] = useState<number | null>(1);
  const [showBroadDef, setShowBroadDef] = useState(false);

  const stages: EvolutionStage[] = [
    {
      id: 1,
      name: 'Thị tộc',
      narrowDef: 'Nhóm người có chung tổ tiên, sống bằng động vật học và canh tác sơ khai',
      broadDef: 'Quốc gia: Nhà nước Thị tộc với chính quyền và lãnh thổ nhất định',
    },
    {
      id: 2,
      name: 'Bộ lạc',
      narrowDef: 'Liên minh của những thị tộc cùng ngôn ngữ, tập tục, tôn giáo',
      broadDef: 'Quốc gia: Bộ lạc có tổ chức chính trị và đặc quyền riêng',
    },
    {
      id: 3,
      name: 'Bộ tộc',
      narrowDef: 'Cộng đồng người có chung nguồn gốc, ngôn ngữ, văn hóa, tâm lý',
      broadDef: 'Quốc gia: Cộng đồng có ranh giới lãnh thổ xác định rõ',
    },
    {
      id: 4,
      name: 'Dân tộc',
      narrowDef: 'Cộng đồng có chung lịch sử, văn hóa, ngôn ngữ, tâm lý tập thể',
      broadDef: 'Quốc gia: Nhà nước quốc gia với chủ quyền độc lập hoàn toàn',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Tiến hóa Cộng đồng Người
        </h2>
        <p className="text-lg text-slate-600">
          Quá trình phát triển từ nhóm nhỏ đến quốc gia - nhà nước
        </p>
      </div>

      {/* Toggle Button */}
      <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-lg">
        <button
          onClick={() => setShowBroadDef(!showBroadDef)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            showBroadDef
              ? 'bg-slate-700 text-white shadow-lg'
              : 'bg-white text-slate-700 border-2 border-slate-300'
          }`}
        >
          Nghĩa {showBroadDef ? 'Rộng (Quốc gia)' : 'Hẹp (Tộc người)'}
        </button>
        <p className="text-slate-600 text-sm">
          {showBroadDef
            ? 'Xem định nghĩa liên quan đến quốc gia và nhà nước'
            : 'Xem định nghĩa dân tộc học cơ bản'}
        </p>
      </div>

      {/* Evolution Chain */}
      <div className="grid grid-cols-4 gap-4 lg:gap-6">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex flex-col items-center">
            {/* Card */}
            <div
              onClick={() =>
                setExpandedStage(expandedStage === stage.id ? null : stage.id)
              }
              className={`w-full cursor-pointer transition-all duration-300 transform relative ${
                expandedStage === stage.id ? 'scale-105 z-10' : 'hover:scale-102'
              }`}
            >
              <div
                className={`p-6 rounded-lg text-center transition-all duration-300 ${
                  expandedStage === stage.id
                    ? 'bg-slate-700 text-white shadow-2xl'
                    : 'bg-gradient-to-br from-slate-100 to-slate-50 text-slate-900 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-3xl font-bold mb-2">{stage.id}</div>
                <h3 className="text-xl font-bold mb-2">{stage.name}</h3>
                <p
                  className={`text-sm transition-opacity duration-300 ${
                    expandedStage === stage.id ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <Info className="w-4 h-4 inline mr-1" />
                  Click để xem chi tiết
                </p>
              </div>
            </div>

            {/* Expanded Definition */}
            {expandedStage === stage.id && (
              <div
                className="mt-6 w-full bg-slate-50 border-l-4 border-slate-700 p-5 rounded-r-lg animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">
                      {showBroadDef ? 'Định nghĩa Rộng' : 'Định nghĩa Hẹp'}
                    </p>
                    <p className="text-slate-800 text-sm leading-relaxed">
                      {showBroadDef ? stage.broadDef : stage.narrowDef}
                    </p>
                  </div>
                  {!showBroadDef && (
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">
                        Mở rộng
                      </p>
                      <p className="text-slate-700 text-sm leading-relaxed font-medium">
                        {stage.broadDef}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Arrow */}
            {index < stages.length - 1 && (
              <div className="mt-8 col-span-full flex justify-center -mb-8">
                <ChevronRight className="w-8 h-8 text-slate-400 transform rotate-0 hidden lg:block" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.id}>
            <div
              onClick={() =>
                setExpandedStage(expandedStage === stage.id ? null : stage.id)
              }
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                expandedStage === stage.id
                  ? 'bg-slate-700 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold">{stage.name}</h4>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedStage === stage.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </div>

            {expandedStage === stage.id && (
              <div className="mt-2 p-4 bg-slate-50 border-l-4 border-slate-700 rounded-r-lg">
                <p className="text-sm text-slate-800 mb-2">
                  <span className="font-bold">
                    {showBroadDef ? 'Nghĩa rộng:' : 'Nghĩa hẹp:'}
                  </span>{' '}
                  {showBroadDef ? stage.broadDef : stage.narrowDef}
                </p>
              </div>
            )}

            {index < stages.length - 1 && (
              <div className="flex justify-center my-2">
                <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-6 bg-amber-50 border-l-4 border-amber-600 rounded-r-lg">
        <p className="text-sm text-amber-900">
          <span className="font-bold">💡 Lưu ý:</span> Quá trình tiến hóa này không phải tuyến tính,
          các giai đoạn có thể xảy ra song hành hoặc theo thứ tự khác nhau tùy thuộc vào hoàn cảnh lịch sử.
        </p>
      </div>
    </div>
  );
}
