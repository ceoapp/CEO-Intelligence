
import React, { useState, useCallback } from 'react';
import { generateBiography } from './services/geminiService';
import ArticleRenderer from './components/ArticleRenderer';
import Spinner from './components/Spinner';
import CategoryDiscovery from './components/CategoryDiscovery';
import { ArticleData, GenerationStatus } from './types';
import { Search, TrendingUp, BookOpen, Share2, Feather, ArrowRight, AlertCircle, FileText, Download } from 'lucide-react';

const App: React.FC = () => {
  const [personName, setPersonName] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const triggerAnalysis = useCallback(async (name: string) => {
    if (!name.trim()) return;

    // Update UI state immediately
    setPersonName(name);
    setStatus(GenerationStatus.LOADING);
    setArticle(null);
    setErrorMsg('');

    try {
      const data = await generateBiography(name);
      setArticle(data);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setStatus(GenerationStatus.ERROR);
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ AI');
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAnalysis(personName);
  };

  const scrollToDiscovery = () => {
    const element = document.getElementById('search-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-article');
    if (!element) return;

    // Using html2pdf via global window object since it's loaded via script tag
    const opt = {
      margin:       [10, 10, 10, 10], // mm
      filename:     `${personName.replace(/\s+/g, '_')}_CEO_Channels.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true }, // Higher scale for better resolution
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    if (window.html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save();
    } else {
      alert("PDF Module is loading, please try again in a second.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg relative overflow-x-hidden selection:bg-brand-orange selection:text-white flex flex-col">
      
      {/* Top Accent Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-orange to-brand-red z-50"></div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center flex-grow max-w-6xl">
        
        {/* Header Section */}
        <header className="text-center mb-10 w-full animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-text mb-4">
            CEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red">CHANNELS</span>
          </h1>
          
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <p className="text-brand-secondary text-lg font-normal max-w-2xl mx-auto leading-relaxed border-t border-gray-200 pt-6 mt-6">
                ถอดรหัสวิธีคิด เจาะลึกชีวิตนักธุรกิจระดับโลก
            </p>
            
            {/* Feature Cards (Compact Mode) - Only visible when IDLE */}
            {status === GenerationStatus.IDLE && (
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <FeatureCard 
                    icon={<BookOpen />}
                    title="เจาะลึกประวัติรอบด้าน"
                    desc="ข้อมูลชีวประวัติที่สรุปมาแล้ว จากแหล่งข้อมูลทั่วโลก"
                    onClick={scrollToDiscovery}
                />
                <FeatureCard 
                    icon={<TrendingUp />}
                    title="วิเคราะห์กลยุทธ์ธุรกิจ"
                    desc="ถอดรหัสโมเดลธุรกิจ กลยุทธ์ และวิธีคิดระดับโลก"
                    onClick={scrollToDiscovery}
                />
                <FeatureCard 
                    icon={<Feather />}
                    title="บทสรุปสำหรับผู้นำ"
                    desc="Insight สำคัญของเรื่องราวทั้งหมดรวมไว้ในหน้าเดียว"
                    onClick={scrollToDiscovery}
                />
                </div>
            )}
          </div>
        </header>

        {/* Search Section */}
        <section id="search-section" className="w-full max-w-3xl mb-12 relative z-20 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          
          <form onSubmit={handleFormSubmit} className="relative flex items-center bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl">
            <div className="pl-6 text-gray-400">
               <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Enter Executive Name (e.g., 'Jensen Huang')"
              className="w-full bg-transparent text-brand-text text-xl font-medium rounded-xl py-6 px-4 focus:outline-none placeholder:text-gray-300"
              disabled={status === GenerationStatus.LOADING}
            />
            <div className="absolute right-2 top-2 bottom-2">
              <button
                type="submit"
                disabled={status === GenerationStatus.LOADING || !personName.trim()}
                className="h-full bg-brand-text hover:bg-black text-white px-8 rounded-lg font-bold uppercase tracking-wide text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === GenerationStatus.LOADING ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Analyze</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
          
        </section>

        {/* Content Area */}
        <div className="w-full flex-grow">
          
          {/* Discovery Component (Only visible when IDLE) */}
          {status === GenerationStatus.IDLE && (
              <div id="discovery-section">
                 <CategoryDiscovery onSelect={triggerAnalysis} />
              </div>
          )}

          {status === GenerationStatus.LOADING && <Spinner />}

          {status === GenerationStatus.ERROR && (
            <div className="p-8 bg-red-50 border-l-4 border-brand-red shadow-sharp animate-fade-in mx-auto max-w-2xl mb-12">
              <div className="flex items-start gap-4">
                <div className="text-brand-red">
                   <TrendingUp className="w-8 h-8 rotate-180" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">Analysis Interrupted</h3>
                  <p className="text-gray-700 mb-6">{errorMsg}</p>
                  <button 
                    onClick={() => setStatus(GenerationStatus.IDLE)}
                    className="text-xs font-bold text-white bg-brand-red hover:bg-red-800 px-6 py-2 uppercase tracking-wider transition-colors"
                  >
                    Retry Operation
                  </button>
                </div>
              </div>
            </div>
          )}

          {status === GenerationStatus.SUCCESS && article && (
            <div className="animate-slide-up pb-24">
              {/* Return to Search Button */}
              <div className="mb-8 flex justify-center">
                 <button 
                    onClick={() => {
                        setStatus(GenerationStatus.IDLE);
                        setPersonName('');
                    }}
                    className="flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors font-medium text-sm uppercase tracking-wide"
                 >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Start New Analysis
                 </button>
              </div>

              {/* Article Container - Corporate Report Style */}
              <article id="printable-article" className="bg-white shadow-sharp-xl border border-gray-200 overflow-hidden relative max-w-4xl mx-auto">
                
                {/* Header Strip */}
                <div className="bg-gray-50 border-b border-gray-200 px-8 md:px-12 py-4 flex flex-wrap justify-between items-center gap-4">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-8 bg-brand-orange"></div>
                      <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Executive Profile</span>
                   </div>
                   
                   <div className="flex items-center gap-4 md:gap-6">
                      <div className="text-xs font-mono text-gray-500 hidden md:block border-r border-gray-300 pr-4 h-5 flex items-center">
                        ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} | {new Date().toLocaleDateString()}
                      </div>
                      
                      <button 
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange hover:bg-orange-50 px-3 py-1.5 rounded transition-colors border border-transparent hover:border-brand-orange group"
                      >
                         <FileText className="w-4 h-4" />
                         <span>ดาวน์โหลดเนื้อหา PDF</span>
                         <Download className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                      </button>
                   </div>
                </div>

                <div className="p-8 md:p-12 lg:p-16">
                  <ArticleRenderer content={article.markdown} />

                  {/* Disclaimer Section (Article) */}
                  <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex items-start gap-3 max-w-4xl mx-auto">
                        <AlertCircle className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-900 font-normal italic leading-relaxed">
                            Disclaimer: เนื้อหาเรียบเรียงโดยเทคโนโลยีปัญญาประดิษฐ์ (Generative AI) เพื่อวัตถุประสงค์ในการให้ข้อมูลเบื้องต้นเท่านั้น แม้ระบบจะพยายามอ้างอิงจากแหล่งข่าวที่น่าเชื่อถือ แต่ก็มีโอกาสมีข้อผิดพลาด ผู้ใช้งานโปรดใช้วิจารณญาณในการรับข้อมูล
                        </p>
                    </div>
                  </div>
                </div>

                {/* Sources Footer */}
                {article.sources.length > 0 && (
                  <div className="bg-gray-900 px-8 md:px-12 py-12 text-white">
                    <h4 className="flex items-center gap-3 text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">
                      <Share2 className="w-4 h-4" />
                      Reference Material
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {article.sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between py-3 border-b border-gray-800 hover:border-brand-orange group transition-colors"
                        >
                          <span className="text-sm text-gray-300 font-light group-hover:text-white truncate pr-4">
                            {source.title}
                          </span>
                          <span className="text-gray-600 group-hover:text-brand-orange text-xs font-mono">LINK</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          )}

        </div>

        {/* Global Footer Disclaimer */}
        <footer className="w-full mt-16 pt-8 pb-4 border-t border-gray-200">
           <div className="max-w-4xl mx-auto text-center px-4">
              <p className="text-xs text-gray-900 leading-relaxed font-medium">
                Disclaimer: เนื้อหาเรียบเรียงโดยเทคโนโลยีปัญญาประดิษฐ์ (Generative AI) เพื่อวัตถุประสงค์ในการให้ข้อมูลเบื้องต้นเท่านั้น แม้ระบบจะพยายามอ้างอิงจากแหล่งข่าวที่น่าเชื่อถือ แต่ก็มีโอกาสมีข้อผิดพลาด ผู้ใช้งานโปรดใช้วิจารณญาณในการรับข้อมูล
              </p>
           </div>
        </footer>

      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; onClick?: () => void }> = ({ icon, title, desc, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-start gap-4 p-4 bg-white border border-gray-200 shadow-lg rounded-lg hover:border-brand-orange transition-all duration-300 group ${onClick ? 'cursor-pointer hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1' : ''}`}
  >
    <div className="w-10 h-10 bg-brand-orange text-white flex-shrink-0 flex items-center justify-center rounded-md shadow-sm group-hover:scale-105 transition-transform duration-300">
      {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
    </div>
    <div className="text-left">
      <h3 className="text-brand-text font-bold text-sm uppercase tracking-tight mb-1">{title}</h3>
      <p className="text-gray-500 text-xs font-normal leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default App;
