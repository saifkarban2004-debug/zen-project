import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { saveCustomProduct, getAllProducts, deleteProduct as storeDeleteProduct } from '../../utils/productStore';
import type { Product } from '../../data/products';

export function DashboardPage() {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageType, setImageType] = useState<'url' | 'upload'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFileData, setImageFileData] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setProducts(getAllProducts());
    }
  }, [isAuthenticated]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageFileData(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      storeDeleteProduct(productId);
      setProducts(getAllProducts());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !price) return;
    
    const finalImage = imageType === 'url' ? imageUrl : imageFileData;
    if (!finalImage) {
      alert("Please provide an image url or upload an image.");
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      slug,
      name,
      tagline: 'Custom added product',
      description: description || 'This is a custom product added via the admin dashboard.',
      price: parseFloat(price),
      size: 'Custom',
      images: [finalImage],
      thumbnail: finalImage,
      benefits: ['Custom Benefit'],
      ingredients: ['Custom Ingredient'],
      howToUse: 'Custom instructions',
      category: 'custom',
      rating: 5,
      reviewCount: 0,
      inStock: true
    };

    saveCustomProduct(newProduct);
    setProducts(getAllProducts()); // refresh list
    
    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setImageFileData('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    setSuccessMsg(`Successfully added "${name}"!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-slate-900">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-slate-900 underline"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-medium mb-6">Add New Product</h2>
            
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Product Name</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-slate-500"
                  placeholder="e.g. Lavender Body Wash"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-600 mb-2">Price (EGP)</label>
                <input 
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-slate-500"
                  placeholder="e.g. 24.99"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-2">Description</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-slate-500 min-h-[100px]"
                  placeholder="Describe your product..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-2">Product Photo</label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={imageType === 'url'} 
                      onChange={() => setImageType('url')}
                    />
                    <span className="text-sm">Image URL</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={imageType === 'upload'} 
                      onChange={() => setImageType('upload')}
                    />
                    <span className="text-sm">Upload File</span>
                  </label>
                </div>

                {imageType === 'url' ? (
                  <input 
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-slate-500 mb-4"
                    placeholder="https://example.com/image.jpg"
                    required={imageType === 'url'}
                  />
                ) : (
                  <input 
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-slate-500 mb-4"
                    required={imageType === 'upload'}
                  />
                )}
                
                {/* Image Preview */}
                {(imageType === 'url' && imageUrl) && (
                  <div className="mt-4 p-2 border border-slate-200 rounded inline-block bg-slate-50">
                    <img src={imageUrl} alt="Preview" className="h-32 w-32 object-cover rounded" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                  </div>
                )}
                {(imageType === 'upload' && imageFileData) && (
                  <div className="mt-4 p-2 border border-slate-200 rounded inline-block bg-slate-50">
                    <img src={imageFileData} alt="Preview" className="h-32 w-32 object-cover rounded" />
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-3 rounded text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors mt-8"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-6">Manage Products</h2>
            <div className="space-y-4">
              {products.length === 0 ? (
                <p className="text-slate-500 text-sm">No products found.</p>
              ) : (
                products.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-slate-100 rounded hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-12 h-12 flex-shrink-0 bg-slate-100 rounded overflow-hidden">
                        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate">
                        <p className="font-medium text-slate-900 truncate">{product.name}</p>
                        <p className="text-sm text-slate-500">EGP {product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="ml-4 flex-shrink-0 text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
