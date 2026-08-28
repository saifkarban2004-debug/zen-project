import React from 'react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  size = 'md'
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const btnClass = `flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors ${
    size === 'sm' ? 'w-6 h-6 text-sm' : 'w-8 h-8'
  }`;

  return (
    <div className={`flex items-center border border-gray-300 rounded-md overflow-hidden ${
      size === 'sm' ? 'h-6' : 'h-8'
    }`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className={`${btnClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <span className="sr-only">Decrease</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
      </button>
      <div className={`flex items-center justify-center font-medium text-gray-700 bg-gray-50 border-x border-gray-300 ${
        size === 'sm' ? 'w-8 text-xs' : 'w-10 text-sm'
      }`}>
        {value}
      </div>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className={`${btnClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        <span className="sr-only">Increase</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;
