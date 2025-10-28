import StudentForm from "@/components/student-form";
import { getBaseUrl } from "@/lib/utils";

interface EditStudentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;
    const baseUrl = await getBaseUrl();


  // Fetch student data
  const res = await fetch(`${baseUrl}/api/students/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-10">
        <h2 className="text-2xl font-bold text-red-600">
          Không tìm thấy sinh viên
        </h2>
      </div>
    );
  }

  const student = await res.json();

  // Format the date for the form
  const formattedStudent = {
    ...student.data,
    dob: student.data.dob
      ? new Date(student.data.dob).toISOString().split("T")[0]
      : "",
  };

  return (
    <StudentForm
      initialData={formattedStudent}
      isEdit={true}
      studentId={Number(id)}
    />
  );
}
