import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-32 animate-fade-in w-full">
    <div className="relative w-20 h-20">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-orange rounded-full border-t-transparent animate-spin"></div>
    </div>
    <div className="mt-8 text-center max-w-lg mx-auto px-4">
      <p className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-3">
        กำลังถอดรหัสความสำเร็จ
      </p>
      <p className="text-sm text-gray-500 font-normal leading-relaxed">
        ⚠️ ระบบประมวลผลข้อมูลมหาศาลด้วย AI เนื้อหาอาจมีความคลาดเคลื่อน โปรดใช้วิจารณญาณในการรับข้อมูล
      </p>
    </div>
  </div>
);

export default Spinner;