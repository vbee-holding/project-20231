const NotFound = () => {
  return (
      <div className="max-w-2xl mx-auto flex flex-col items-center py-44 gap-20">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Không tìm thấy kết quả
          </h1>
          <p className="text-sm max-w-xs mx-auto">
            Vui lòng kiểm tra lại từ khóa hoặc bộ lọc
          </p>
        </div>
      </div>
  );
};
export default NotFound