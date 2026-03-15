import React from 'react';

interface TagCloudProps {
  tags: string[];
  selected: string;
  onSelect: (tag: string) => void;
  className?: string;
}

const TagCloud: React.FC<TagCloudProps> = ({ tags, selected, onSelect, className = '' }) => (
  <div className={`flex gap-2 overflow-x-auto pb-4 scrollbar-hide select-none ${className}`}>
    {tags.map((tag) => (
      <button
        key={tag}
        onClick={() => onSelect(tag)}
        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
          selected === tag
            ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white"
        }`}
        aria-pressed={selected === tag}
        aria-label={`Filter by ${tag}`}
      >
        {tag}
      </button>
    ))}
  </div>
);

export default TagCloud;