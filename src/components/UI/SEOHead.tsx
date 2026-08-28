import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export function SEOHead({ 
  title = 'Zen Arohanc Collection | Premium Hand & Body Care', 
  description = 'Experience the Zen difference with our premium, natural, cruelty-free hand and body care collection.' 
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
}
