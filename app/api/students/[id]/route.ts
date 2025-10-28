/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET /api/students/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await context.params).id);
    const student = await prisma.student.findUnique({
      where: { id },
    });
    if (!student)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    return NextResponse.json({
      data: student,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT /api/students/:id
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const id = (await context.params).id;

    const student = await prisma.$transaction(
      async (db) =>
        await db.student.update({
          where: { id: Number(id) },
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            major: body.major,
            gpa: body.gpa,
            dob: body.dob ? new Date(body.dob) : undefined,
            phone: body.phone,
            address: body.address,
          },
        })
    );
    revalidatePath("/students", "page");

    return NextResponse.json({
      data: student,
      message: "Update student successfully!",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/students/:slug
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const id = (await context.params).id;
  revalidatePath("/students", "page");
  try {
    await prisma.student.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Deleted student successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
