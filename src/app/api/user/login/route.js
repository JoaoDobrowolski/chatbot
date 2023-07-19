import { login } from '../../../../services/user';

export async function POST(request) {
  try {
    const body = await request.json();
    const user = await login(body);
    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json(err.message, { status: 404 });
  }
}