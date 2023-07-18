import { login } from '../../../../services/user';

export async function GET(request) {
  return new Response(JSON.stringify(request.json()));
}

export async function POST(request) {
  try {
    const user = await login(request.json());
    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json(err.message);
  }
}