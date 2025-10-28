import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <section className="hero bg-white rounded-2xl shadow-lg p-12 md:p-20 text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          🎓 Quản lý sinh viên
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Trang quản lý sinh viên: dễ dàng thêm, chỉnh sửa, xóa và theo dõi
          thông tin.
        </p>

        <Link
          href="/students"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-md font-semibold transition-all duration-200"
        >
          Xem danh sách sinh viên
        </Link>
      </section>
    </main>
  );
}
