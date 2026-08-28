import React from 'react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, size = 'md' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="text-amber-400">★</span>);
  }
  
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-amber-400 relative inline-block">
        <span className="absolute overflow-hidden w-1/2">★</span>
        <span className="text-gray-300">★</span>
      </span>
    );
  }
  
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
  }

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <div className="flex mr-2">
        {stars}
      </div>
      {reviewCount !== undefined && (
        <span className="text-gray-500 text-sm">({reviewCount})</span>
      )}
    </div>
  );
};
