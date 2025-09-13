import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ startdate: string }> }) {
    const { startdate } = await params;
  const account = await prisma.weekRecipePlan.findUnique({
    where: { startDate: startdate },
  });
  return NextResponse.json(account);
}