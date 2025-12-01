import { NextResponse } from 'next/server';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({
    message: `Fetch seller ${id} endpoint not implemented yet.`,
  });
}

export async function PATCH(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Update seller ${id} endpoint not implemented yet.` },
    { status: 501 },
  );
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Delete seller ${id} endpoint not implemented yet.` },
    { status: 501 },
  );
}


