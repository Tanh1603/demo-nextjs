"use client";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

type StudentProps = {
  id: number;
  onDelete: (id: number) => Promise<void>;
};

function StudentAction({ id, onDelete }: StudentProps) {
  // const handleDelete = async (id: number) => {
  //   try {
  //     const res = await fetch(`/api/students/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!res.ok) throw new Error("Xóa thất bại");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href={`/students/${id}/edit`}
        className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-medium transition-colors"
      >
        <Edit2 className="w-4 h-4" />
        <p>Sửa</p>
      </Link>

      <button
        onClick={() => onDelete(id)}
        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 font-medium disabled:opacity-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        <p>Xóa</p>
      </button>
    </div>
  );
}

export default StudentAction;
