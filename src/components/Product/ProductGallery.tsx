import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const validImages = images.filter(img => img !== '');
  const [currentIndex, setCurrentIndex] = useState(0);

  const getGradient = () => {
    // Quick hash to pick a gradient if no images
    const length = productName.length;
    if (length % 3 === 0) return 'bg-gradient-to-br from-blue-400 to-indigo-600';
    if (length % 3 === 1) return 'bg-gradient-to-br from-purple-400 to-pink-500';
    return 'bg-gradient-to-br from-teal-400 to-emerald-600';
  };

  if (validImages.length === 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className={`w-full aspect-square md:aspect-[4/3] rounded-2xl ${getGradient()} flex items-center justify-center p-8 shadow-sm`}>
          <h2 className="text-4xl text-white font-serif text-center font-bold">{productName}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
        {validImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${productName} view ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>
      
      {validImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                idx === currentIndex ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
