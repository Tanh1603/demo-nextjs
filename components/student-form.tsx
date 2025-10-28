"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  major: string;
  gpa: number;
  dob: string;
  phone: string;
  address: string;
}

interface StudentFormProps {
  initialData?: Partial<StudentFormData>;
  isEdit?: boolean;
  studentId?: number;
}

export default function StudentForm({
  initialData,
  isEdit = false,
  studentId,
}: StudentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    gender: initialData?.gender || "MALE",
    major: initialData?.major || "COMPUTER_SCIENCE",
    gpa: initialData?.gpa || 0,
    dob: initialData?.dob || new Date().toISOString().split("T")[0],
    phone: initialData?.phone || "",
    address: initialData?.address || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = isEdit ? `/api/students/${studentId}` : "/api/students";
      const method = isEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/students");
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Lỗi: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Có lỗi xảy ra khi lưu sinh viên");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name === "gpa" ? Number(value) : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {/* Cột phải: form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-5 rounded-3xl w-[700px]"
      >
        {/* Họ và tên */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Họ *
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className=" text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tên *
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Email + Số điện thoại */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className=" text-black  w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Địa chỉ + ngày sinh */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Địa chỉ *
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ngày sinh *
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Giới tính + Chuyên ngành */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Giới tính *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full text-black border rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option className="text-black" value="MALE">
              Nam
            </option>
            <option className="text-black" value="FEMALE">
              Nữ
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Chuyên ngành *
          </label>
          <select
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option className="text-black" value="COMPUTER_SCIENCE">
              Khoa học máy tính
            </option>
            <option className="text-black" value="MATHEMATICS">
              Toán học
            </option>
            <option className="text-black" value="PHYSICS">
              Vật lý
            </option>
            <option className="text-black" value="CHEMISTRY">
              Hóa học
            </option>
            <option className="text-black" value="BIOLOGY">
              Sinh học
            </option>
            <option className="text-black" value="ENGINEERING">
              Kỹ thuật
            </option>
          </select>
        </div>

        {/* GPA + Biography */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            GPA
          </label>
          <input
            type="number"
            name="gpa"
            value={formData.gpa || ""}
            onChange={handleChange}
            min="0"
            max="4"
            step="0.01"
            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Nút hành động */}
        <div className="md:col-span-2 flex gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isSubmitting
              ? "Đang lưu..."
              : isEdit
              ? "Cập nhật sinh viên"
              : "Thêm sinh viên mới"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 cursor-pointer bg-red-400-500 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
