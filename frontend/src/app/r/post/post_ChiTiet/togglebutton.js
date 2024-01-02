"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ToggleButton = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra xem đường dẫn có phải là '/r/post/post_TomTat' không
    if (router.pathname === '/r/post/post_TomTat') {
      setIsToggled(true);
    }
  }, [router.pathname]);

  const handleClick = () => {
    setIsToggled(!isToggled);
    router.push('/r/post/post_TomTat');
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isToggled} readOnly />
          <div onClick={handleClick} className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content- [''] after:absolute after:top-0.5 after:left- [2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          <span className="ml-2 text-sm font-medium text-gray-900">{isToggled ? 'ON' : 'OFF'}</span>
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;
