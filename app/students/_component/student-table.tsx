"use client";
import LoadingSpinner from "@/components/loading-spinner";
import { Student } from "@/lib/types/student.type";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import StudentAction from "./student-actions";

const tableHeader = [
  { title: "Họ và tên" },
  { title: "Email" },
  { title: "Ngành học" },
  { title: "GPA" },
  { title: "Giới tính" },
  { title: "Số điện thoại" },
  { title: "Ngày sinh" },
  { title: "Địa chỉ" },
  { title: "Thao tác" },
];

function StudentTable() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadStudent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/students`);

      const data = (await res.json()).data;
      setStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      await loadStudent();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {tableHeader.map((head) => (
                <th
                  key={head.title}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {head.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-10">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : (
              students?.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  {/* 👤 Sinh viên */}

                  <td className="px-5 py-4 max-w-[150px] truncate">
                    <div className="flex items-center text-gray-900">
                      <span className="truncate">
                        {student.firstName} {student.lastName}
                      </span>
                    </div>
                  </td>

                  {/* ☎️ Email */}
                  <td className="px-5 py-4 truncate">
                    <div className="flex items-center">{student.email}</div>
                  </td>

                  {/* 📘 Ngành học */}
                  <td className="px-5 py-4 max-w-[150px] truncate">
                    <div className="flex items-center text-gray-700">
                      <span className="truncate">{student.major}</span>
                    </div>
                  </td>

                  {/* 🏅 GPA */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">
                        {student.gpa}
                      </span>
                    </div>
                  </td>

                  {/* ⚧ Giới tính */}
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        student.gender === "MALE"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {student.gender === "MALE" ? "Nam" : "Nữ"}
                    </span>
                  </td>

                  {/* ☎️ Số điện thoại */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">{student.phone}</div>
                  </td>

                  {/* 📅 Ngày sinh */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {new Date(student.dob).toISOString().split("T")[0]}
                    </div>
                  </td>

                  {/* 📍 Địa chỉ */}
                  <td className="px-6 py-4 max-w-[200px] truncate">
                    <div className="flex items-center text-gray-700">
                      <span className="truncate">{student.address}</span>
                    </div>
                  </td>

                  {/* 🧩 Thao tác */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <StudentAction id={student.id} onDelete={handleDelete} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* 🧍 Empty state */}
      {students?.length === 0 && (
        <div className="text-center py-16 text-gray-500 bg-gray-50">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-base">Không tìm thấy sinh viên nào</p>
        </div>
      )}
    </div>
  );
}

export default StudentTable;
