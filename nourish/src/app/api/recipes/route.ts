import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // const where: any = {};
  // const queries = request.nextUrl.searchParams.keys().toArray();
  // if (queries.length > 0) {
  //   for (const key in queries) {
  //     switch (key) {
  //       case "id":
  //         where.id = request.nextUrl.searchParams.get("id");
  //         break;
  //       case "name":
  //         where.id = request.nextUrl.searchParams.get("id");
  //         break;
  //     }
  //   }
  // }

  const recipe = await prisma.recipe.findMany();
  return NextResponse.json(recipe);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const recipe = await prisma.recipe.create({
      data: body
    });
    return NextResponse.json(recipe);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to Create" });
  }
}
