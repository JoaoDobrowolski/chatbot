import { register } from '@/services/user';

export async function POST(request) {
  try {
    const body = await request.json();
    const newUser = await register(body);
    return Response.json(newUser, { status: 201 });
  } catch (err) {
    return Response.json(err.message, { status: 404 });
  }
}