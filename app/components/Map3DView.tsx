'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect, useRef } from 'react';

// Import mà không dùng SSR
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] text-white">
      Đang tải Vũ trụ 3D...
    </div>
  )
});
interface Map3DViewProps {
  onNavigate?: (tabId: number) => void;
}

export default function Map3DView({ onNavigate }: Map3DViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    let animationFrameId: number;

    const orbit = () => {
      if (fgRef.current) {
        // Lấy vị trí camera hiện tại để không ghi đè lệnh thu phóng (zoom) của người dùng
        const cam = fgRef.current.cameraPosition();
        
        // Tính khoảng cách hiện tại (bán kính) từ tâm tới camera trên mặt phẳng x-z
        const distance = Math.hypot(cam.x, cam.z);
        
        // Tính góc hiện tại
        let currentAngle = Math.atan2(cam.x, cam.z);
        
        // Tăng góc để xoay
        currentAngle += Math.PI / 1500;
        
        fgRef.current.cameraPosition({
          x: distance * Math.sin(currentAngle),
          y: cam.y, // Giữ nguyên trục y (độ cao camera)
          z: distance * Math.cos(currentAngle)
        });
      }
      animationFrameId = requestAnimationFrame(orbit);
    };
    
    // Start after a slight delay to allow graph to settle
    const timeoutId = setTimeout(() => {
      orbit();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const data = useMemo(() => {
    return {
      nodes: [
        { id: 'root', name: 'CHƯƠNG 6\nVấn đề Dân tộc', group: 0, val: 30, color: '#e8171e', tabId: 1 },
        
        { id: 'c1', name: 'Khái niệm', group: 1, val: 15, color: '#f0b429', tabId: 1 },
        { id: 'c1_1', name: 'Tộc người (Nghĩa hẹp)', group: 1, val: 8, color: '#f0b429', tabId: 1 },
        { id: 'c1_2', name: 'Quốc gia (Nghĩa rộng)', group: 1, val: 8, color: '#f0b429', tabId: 1 },
        
        { id: 'c2', name: 'Hai xu hướng', group: 2, val: 15, color: '#3b82f6', tabId: 2 },
        { id: 'c2_1', name: 'Tách rã (Đấu tranh độc lập)', group: 2, val: 8, color: '#3b82f6', tabId: 2 },
        { id: 'c2_2', name: 'Liên hiệp (Toàn cầu hóa)', group: 2, val: 8, color: '#3b82f6', tabId: 2 },
        
        { id: 'c3', name: 'Cương lĩnh Lênin', group: 3, val: 15, color: '#a855f7', tabId: 3 },
        { id: 'c3_1', name: 'Bình đẳng dân tộc', group: 3, val: 8, color: '#a855f7', tabId: 3 },
        { id: 'c3_2', name: 'Quyền tự quyết', group: 3, val: 8, color: '#a855f7', tabId: 3 },
        { id: 'c3_3', name: 'Liên hiệp công nhân', group: 3, val: 10, color: '#a855f7', tabId: 3 },
        
        { id: 'c4', name: 'Thực tiễn Việt Nam', group: 4, val: 15, color: '#10b981', tabId: 4 },
        { id: 'c4_1', name: 'Đặc điểm', group: 4, val: 10, color: '#10b981', tabId: 5 },
        { id: 'c4_1_1', name: '54 dân tộc anh em', group: 4, val: 5, color: '#059669', tabId: 5 },
        { id: 'c4_1_2', name: 'Cư trú xen kẽ', group: 4, val: 5, color: '#059669', tabId: 5 },
        { id: 'c4_1_3', name: 'Địa bàn chiến lược', group: 4, val: 5, color: '#059669', tabId: 5 },
        { id: 'c4_1_4', name: 'Phát triển không đều', group: 4, val: 5, color: '#059669', tabId: 5 },
        { id: 'c4_1_5', name: 'Đoàn kết lâu đời', group: 4, val: 5, color: '#059669', tabId: 5 },
        { id: 'c4_1_6', name: 'Bản sắc riêng', group: 4, val: 5, color: '#059669', tabId: 5 },
        
        { id: 'c4_2', name: 'Chính sách', group: 4, val: 10, color: '#34d399', tabId: 4 },
        { id: 'c4_2_1', name: 'Chính trị', group: 4, val: 5, color: '#34d399', tabId: 4 },
        { id: 'c4_2_2', name: 'Kinh tế', group: 4, val: 5, color: '#34d399', tabId: 4 },
        { id: 'c4_2_3', name: 'Văn hóa', group: 4, val: 5, color: '#34d399', tabId: 4 },
        { id: 'c4_2_4', name: 'Xã hội', group: 4, val: 5, color: '#34d399', tabId: 4 },
        { id: 'c4_2_5', name: 'Quốc phòng An ninh', group: 4, val: 5, color: '#34d399', tabId: 4 },
      ],
      links: [
        // Nhánh 1
        { source: 'root', target: 'c1' },
        { source: 'c1', target: 'c1_1' },
        { source: 'c1', target: 'c1_2' },
        
        // Nhánh 2
        { source: 'root', target: 'c2' },
        { source: 'c2', target: 'c2_1' },
        { source: 'c2', target: 'c2_2' },
        
        // Nhánh 3
        { source: 'root', target: 'c3' },
        { source: 'c3', target: 'c3_1' },
        { source: 'c3', target: 'c3_2' },
        { source: 'c3', target: 'c3_3' },
        { source: 'c3_1', target: 'c3_2' }, // Liên kết nội bộ
        { source: 'c3_2', target: 'c3_3' },
        
        // Nhánh 4
        { source: 'root', target: 'c4' },
        { source: 'c4', target: 'c4_1' },
        { source: 'c4', target: 'c4_2' },
        
        // Cấu trúc con của Đặc điểm
        { source: 'c4_1', target: 'c4_1_1' },
        { source: 'c4_1', target: 'c4_1_2' },
        { source: 'c4_1', target: 'c4_1_3' },
        { source: 'c4_1', target: 'c4_1_4' },
        { source: 'c4_1', target: 'c4_1_5' },
        { source: 'c4_1', target: 'c4_1_6' },
        
        // Cấu trúc con của Chính sách
        { source: 'c4_2', target: 'c4_2_1' },
        { source: 'c4_2', target: 'c4_2_2' },
        { source: 'c4_2', target: 'c4_2_3' },
        { source: 'c4_2', target: 'c4_2_4' },
        { source: 'c4_2', target: 'c4_2_5' },
      ]
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[600px] relative animate-fade-in-up rounded-2xl overflow-hidden shadow-2xl" 
      style={{ border: '1px solid var(--border)' }}
      ref={containerRef}
    >
      <div className="absolute top-4 left-4 z-10 bg-black/60 p-4 rounded-xl backdrop-blur-md border border-white/10 pointer-events-none">
        <h2 className="text-xl font-bold text-white mb-1">Bản đồ Kiến thức 3D</h2>
        <p className="text-xs text-gray-400">Chuột trái để xoay • Chuột phải để di chuyển • Lăn chuột để thu/phóng</p>
      </div>
      
      {/* 3D Canvas Container */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <ForceGraph3D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          nodeLabel="name"
          nodeColor="color"
          nodeRelSize={6}
          linkWidth={1.5}
          linkColor={() => 'rgba(255,255,255,0.15)'}
          linkDirectionalParticles={3}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={0.005}
          backgroundColor="#0a0a0a"
          showNavInfo={false}
          onNodeClick={(node: any) => {
            if (node.tabId && onNavigate) {
              onNavigate(node.tabId);
            }
          }}
          onNodeHover={(node: any) => {
            if (containerRef.current) {
              containerRef.current.style.cursor = node ? 'pointer' : 'default';
            }
          }}
        />
      </div>
    </div>
  );
}
