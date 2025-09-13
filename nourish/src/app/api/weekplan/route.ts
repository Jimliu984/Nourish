import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
  const latest = await prisma.weekRecipePlan.findFirst({
    orderBy: { id : "desc"}
  });
  return NextResponse.json(latest);
}

export async function PUT(request: NextRequest) {
    const body = await request.json();
    const latest = await prisma.weekRecipePlan.findFirst({
        orderBy: { id : "desc"}
    });
    const response = await prisma.weekRecipePlan.upsert({
        create: {
            ...body
        },
        update: {
            ...body
        },
        where: {
            id: latest?.id ?? -1
        }
    })
    return NextResponse.json(response);
}