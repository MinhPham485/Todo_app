# Todo App - Hướng dẫn sử dụng

## Cài đặt và chạy ứng dụng

### 1. Cài đặt dependencies cho Backend:
```bash
npm install
```

### 2. Cài đặt dependencies cho Frontend:
```bash
cd frontend
npm install
```

### 3. Build React App:
```bash
# Trong thư mục frontend
npm run build
```

### 4. Chạy server:
```bash
# Quay lại thư mục gốc
cd ..
npm run dev
```

### 5. Mở trình duyệt:
Truy cập: http://localhost:5000

## Cấu trúc dự án

- `frontend/` - React application
  - `src/App.js` - Component chính
  - `src/App.css` - Styles
  - `src/index.js` - Entry point
  - `webpack.config.js` - Webpack configuration
  
- `public/` - Static files
  - `index.html` - HTML template
  - `bundle.js` - Built React app (sau khi build)

## API Endpoints

- `GET /todos` - Lấy danh sách todos
- `POST /todos` - Tạo todo mới
- `PATCH /todos/:id` - Toggle completed status
- `DELETE /todos/:id` - Xóa todo

## Tính năng

✅ Thêm công việc mới
✅ Đánh dấu hoàn thành
✅ Xóa công việc
✅ Hiển thị thống kê
✅ Giao diện đẹp, responsive
