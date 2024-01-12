"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '') {
      setIsToggled(false);
    }
  }, [router.pathname]);

  const handleClick = () => {
    setIsToggled(!isToggled);

    if (isToggled) {
      // If the button was previously in 'Tóm Tắt' state, go back to the previous page
      router.back();
    } else {
      // If the button was previously in 'Chi Tiết' state, navigate to an empty path (or another path as needed)
      router.push('');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isToggled} readOnly />
          <div
            onClick={handleClick}
            className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content- [''] after:absolute after:top-0.5 after:left- [2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">
            {isToggled ? 'Tóm Tắt' : 'Chi Tiết'}
          </span>
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;
