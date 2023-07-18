import { register } from '@/services/user';

export async function GET(request) {
  return new Response(JSON.stringify(request.json()));
}

export async function POST(request) {
  try {
    const newUser = await register(request.json());
    return Response.json(newUser, { status: 201 });
  } catch (err) {
    return Response.json(err.message, { status: 404 });
  }
}