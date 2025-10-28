/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET /api/students => lấy tất cả student
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(
      {
        data: students,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const student = await prisma.$transaction(
      async (db) =>
        await db.student.create({
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            major: body.major,
            gpa: body.gpa,
            dob: new Date(body.dob),
            phone: body.phone,
            address: body.address,
          },
        })
    );
    revalidatePath("/students", "page");

    return NextResponse.json({
      data: student,
      message: "Create student successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
