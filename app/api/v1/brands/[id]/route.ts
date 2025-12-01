import { NextResponse } from 'next/server';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({
    message: `Fetch brand ${id} endpoint not implemented yet.`,
  });
}

export async function PATCH(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Update brand ${id} endpoint not implemented yet.` },
    { status: 501 },
  );
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Delete brand ${id} endpoint not implemented yet.` },
    { status: 501 },
  );
}


