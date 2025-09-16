import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number.parseInt((await params).id);
  const account = await prisma.recipe.findUnique({
    where: { id: id },
  });
  return NextResponse.json(account);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number.parseInt((await params).id);
  const body = await request.json();
  const account = await prisma.recipe.update({
    data: body,
    where: { id: id },
  });
  return NextResponse.json(account);
}
