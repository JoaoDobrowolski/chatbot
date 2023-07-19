import { getChat, postChat } from '../../../services/chat';

export async function GET() {
  try {
    const data = await getChat();
    return new Response(JSON.stringify(data));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const user = await postChat(body);
    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json(err.message, { status: 404 });
  }
}