export const getSession = () => {
    try {
      const sessionLocal = localStorage.getItem('userSession');
      if (sessionLocal !== null) {
        const initialSession = sessionLocal ? JSON.parse(sessionLocal) : null;
        return  initialSession;
      } else {
        console.log('Không có session được lưu trữ.');
        return null;
      }
    } catch(error){
      console.error('Lỗi khi truy xuất sesion:',error);
      return null;
    }
  };