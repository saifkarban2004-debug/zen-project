import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8edf2] flex flex-col justify-center items-center px-4 pt-24">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <h1 className="text-2xl font-serif text-slate-900 mb-6 text-center">Admin Access</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-slate-500"
              placeholder="Enter password (admin123)"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">Incorrect password</p>}
          
          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
