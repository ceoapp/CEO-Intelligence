import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleRendererProps {
  content: string;
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content }) => {
  return (
    <div className="font-sans text-brand-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-10 leading-tight tracking-tight border-b-4 border-black pb-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl md:text-3xl font-bold text-black mt-14 mb-6 tracking-tight flex items-center gap-3" {...props}>
               <span className="w-3 h-3 bg-brand-orange shrink-0"></span>
               {props.children}
            </h2>
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold text-gray-800 mt-12 mb-6 uppercase tracking-wide border-l-4 border-gray-800 pl-4" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-bold text-brand-orange mt-10 mb-4 uppercase tracking-wider border-b border-gray-200 pb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-gray-800 leading-[1.8] mb-6 text-lg font-normal text-justify" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-none mb-8 space-y-3" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 mb-8 space-y-3 text-gray-900 font-bold marker:text-black marker:text-lg" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="relative pl-6 text-gray-800 leading-relaxed text-lg font-normal" {...props}>
              {/* Custom square bullet for UL only */}
              <span className="absolute left-0 top-[10px] w-2 h-2 bg-brand-orange hidden [.list-none_&]:block"></span>
              {props.children}
            </li>
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-black" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="my-12 pl-6 border-l-4 border-brand-orange bg-gray-50 py-4 pr-4 italic text-xl text-gray-700 font-medium leading-relaxed" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-brand-orange hover:text-brand-red font-bold underline decoration-2 underline-offset-2 transition-colors" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-12 border-gray-200 border-t-2" />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-200 shadow-sm bg-white text-left" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100 border-b-2 border-brand-orange" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="bg-white divide-y divide-gray-200" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-gray-50 transition-colors" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-6 py-4 text-xs font-black text-gray-900 uppercase tracking-widest border-r border-gray-200 last:border-r-0 whitespace-nowrap" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-6 py-4 text-sm md:text-base text-gray-700 leading-relaxed border-r border-gray-100 last:border-r-0 align-top" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleRenderer;