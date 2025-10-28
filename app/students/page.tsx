import { Plus } from "lucide-react";
import Link from "next/link";
import StudentTable from "./_component/student-table";

export default async function StudentPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center p-2">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          🎓 Danh sách sinh viên
        </h2>

        <Link
          href="/students/new"
          className="inline-flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Plus />
          <span className="font-medium">Thêm sinh viên</span>
        </Link>
      </div>

      <StudentTable />
    </div>
  );
}
