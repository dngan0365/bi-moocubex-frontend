# BI dữ liệu MOOCCubeX và dự đoán kết quả học tập của học viên

Đây là một ứng dụng web được xây dựng bằng Next.js, một framework React phổ biến để phát triển các ứng dụng web hiện đại, nhanh chóng và tối ưu cho SEO.

## 🎯 Mục Đích của Repository

Bộ dữ liệu cho việc phân tích là: [MOOCCubeX](https://github.com/THU-KEG/MOOCCubeX)

Dự án bao gồm các tính năng sau:

* **Xác thực người dùng:** Phân chia quyền truy cập cho khách (guest) và người dùng đã đăng nhập (user).
* **Quản lý khóa học:** Hiển thị danh sách khóa học, chi tiết từng khóa học.
* **Nội dung chuyên biệt:** Có các trang dành riêng cho các chủ đề như "data-mining" (khai phá dữ liệu) và "data-quality" (chất lượng dữ liệu), có thể bao gồm nội dung tổng quan và các giai đoạn cụ thể (ví dụ: `phase1.json`).
* **Trang thông tin chung:** Các trang như "about" (giới thiệu).
* **API backend:** Có thể có các API tùy chỉnh được định nghĩa trong thư mục `src/api`.

## 🚀 Cách Khởi Động

Để khởi chạy dự án này trên máy cục bộ của bạn, hãy làm theo các bước sau:

1.  **Clone repository:**
    ```bash
    git clone <URL_REPOSITORY_CỦA_BẠN>
    cd <TÊN_THƯ_MỤC_DỰ_ÁN>
    ```

2.  **Cài đặt dependencies:**
    Sử dụng npm:
    ```bash
    npm install
    ```
    Hoặc sử dụng yarn:
    ```bash
    yarn install
    ```

3.  **Chạy server phát triển:**
    Sử dụng npm:
    ```bash
    npm run dev
    ```
    Hoặc sử dụng yarn:
    ```bash
    yarn dev
    ```
    Mở trình duyệt và truy cập `http://localhost:3000` (hoặc một cổng khác nếu được cấu hình) để xem ứng dụng.

4.  **Build dự án cho production:**
    Sử dụng npm:
    ```bash
    npm run build
    ```
    Hoặc sử dụng yarn:
    ```bash
    yarn build
    ```

5.  **Chạy server production:**
    Sử dụng npm:
    ```bash
    npm run start
    ```
    Hoặc sử dụng yarn:
    ```bash
    yarn start
    ```

## 📂 Hướng Dẫn Thư Mục

Dưới đây là mô tả về cấu trúc thư mục chính của dự án Next.js này:
```
.
├── .github/                # Cấu hình liên quan đến GitHub (ví dụ: Workflows cho CI/CD)
├── public/                 # Chứa các tệp tĩnh được phục vụ trực tiếp (ví dụ: ảnh, favicon.ico)
│   └── favicon.ico         # Biểu tượng của trang web
├── src/                    # Thư mục chính chứa mã nguồn của ứng dụng
│   ├── api/                # Chứa các định nghĩa API endpoint (Route Handlers trong Next.js 13+)
│   ├── app/                # Thư mục chính cho App Router của Next.js (thường từ Next.js 13 trở đi)
│   │   ├── (guest)/        # Các route dành cho khách truy cập (chưa đăng nhập)
│   │   │   ├── about/      # Trang giới thiệu
│   │   │   │   └── page.tsx
│   │   │   └── experiment/ # Trang thử nghiệm
│   │   │       └── page.tsx
│   │   ├── (user)/         # Các route dành cho người dùng đã đăng nhập
│   │   │   ├── courses/    # Trang quản lý hoặc hiển thị các khóa học
│   │   │   │   ├── [courseid]/ # Route động cho chi tiết một khóa học cụ thể
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── data-mining/ # Trang cụ thể cho khóa học/chủ đề "data-mining"
│   │   │   │   │   └── page.tsx
│   │   │   │   └── data-quality/ # Trang cụ thể cho khóa học/chủ đề "data-quality"
│   │   │   │       ├── page.tsx
│   │   │   │       └── phase1.json # Dữ liệu JSON liên quan đến "data-quality", có thể là giai đoạn 1
│   │   │   ├── overview/   # Trang tổng quan cho người dùng
│   │   │   │   └── page.tsx
│   │   │   └── profile/    # Trang hồ sơ người dùng
│   │   │       └── page.tsx
│   │   ├── layout.tsx      # Layout chung cho các route trong (guest) và (user) (hoặc một phần của app)
│   │   ├── favicon.ico     # (Có vẻ như là bản sao, favicon thường đặt ở public/)
│   │   ├── globals.css     # Các kiểu CSS toàn cục cho ứng dụng
│   │   ├── layout.tsx      # Layout gốc của ứng dụng (root layout)
│   │   └── page.tsx        # Trang chủ của ứng dụng
│   ├── components/         # Chứa các React components tái sử dụng
│   └── context/            # Chứa React Context API cho quản lý state toàn cục
├── .gitignore              # Các tệp và thư mục được Git bỏ qua
├── README.md               # Tệp này, cung cấp thông tin về dự án
├── eslint.config.mjs       # Cấu hình cho ESLint (công cụ kiểm tra lỗi và định dạng code)
├── next.config.ts          # Tệp cấu hình cho Next.js
├── package-lock.json       # Ghi lại chính xác các phiên bản của dependencies (nếu dùng npm)
├── package.json            # Chứa metadata của dự án, scripts và danh sách dependencies
└── postcss.config.mjs      # Cấu hình cho PostCSS (công cụ xử lý CSS)
```
**Giải thích chi tiết hơn về một số thành phần:**

* **`src/app/`**: Đây là nơi bạn định nghĩa các routes (đường dẫn) và UI cho ứng dụng sử dụng **App Router** của Next.js.
    * **`(guest)` và `(user)`**: Đây là các **Route Groups**. Chúng không ảnh hưởng đến URL path nhưng cho phép bạn tổ chức các route và áp dụng layout riêng cho từng nhóm. Ví dụ, các trang trong `(guest)` có thể có một layout khác với các trang trong `(user)`.
    * **`page.tsx`**: Đại diện cho UI của một route cụ thể.
    * **`layout.tsx`**: Định nghĩa UI chung được chia sẻ giữa nhiều trang. Có một `layout.tsx` gốc trong `src/app` và có thể có các layout lồng nhau trong các thư mục con.
    * **`[courseid]`**: Đây là một **Dynamic Route Segment**, cho phép bạn tạo các trang dựa trên tham số động (ví dụ: `/courses/123`, `/courses/abc`).
* **`src/api/`**: Nếu bạn đang sử dụng App Router, các **Route Handlers** (thay thế cho API Routes trong Pages Router) sẽ được đặt trong thư mục `app` theo cấu trúc route. Tuy nhiên, nếu thư mục `src/api/` vẫn được sử dụng, nó có thể chứa các logic backend hoặc là một cấu trúc cũ hơn.
* **`public/`**: Bất kỳ tệp nào trong thư mục này (ví dụ: `favicon.ico`, hình ảnh) sẽ được phục vụ tĩnh tại root của ứng dụng. Ví dụ: `/favicon.ico` sẽ trỏ đến `public/favicon.ico`.
* **`src/components/`**: Nơi lưu trữ các UI components nhỏ, tái sử dụng được trong toàn bộ ứng dụng.
* **`src/context/`**: Nếu ứng dụng của bạn sử dụng React Context API để quản lý trạng thái (state) phức tạp hoặc chia sẻ dữ liệu giữa các components mà không cần prop drilling, thì đây là nơi chứa các context đó.
* **`next.config.ts`**: Cho phép bạn tùy chỉnh các cài đặt nâng cao của Next.js như redirects, rewrites, biến môi trường, cấu hình Webpack, v.v.
* **`eslint.config.mjs` và `postcss.config.mjs`**: Các tệp cấu hình cho công cụ linting (ESLint) và xử lý CSS (PostCSS).

## 📜 Scripts có sẵn

Trong tệp `package.json`, bạn sẽ tìm thấy các scripts sau (hoặc tương tự):

* `"dev"`: Chạy ứng dụng ở chế độ phát triển với hot-reloading.
* `"build"`: Build ứng dụng cho môi trường production.
* `"start"`: Khởi động server production sau khi đã build.
* `"lint"`: Chạy ESLint để kiểm tra lỗi và phong cách code.

## 🛠️ Công Nghệ Sử Dụng

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/) (dựa trên phần mở rộng `.ts` và `.tsx`)
* [Tailwind CSS](https://tailwindcss.com/) (có thể, dựa trên `globals.css` và `postcss.config.mjs` là phổ biến) - *Xác nhận nếu bạn có sử dụng*

## 🤝 Đóng Góp

Nếu bạn muốn đóng góp cho dự án này, vui lòng [Mô tả quy trình đóng góp của bạn, ví dụ: fork repository, tạo branch mới, submit pull request].

## 📄 Giấy Phép

Dự án này được cấp phép theo [Tên Giấy Phép, ví dụ: MIT License]. Xem tệp `LICENSE` để biết thêm chi tiết (nếu có).

---

Hy vọng README này hữu ích! Hãy tùy chỉnh nó thêm để phù hợp chính xác với dự án của bạn.
