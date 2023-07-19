import { chat } from '../../../../services/user';

export async function GET() {
  try {
    const data = await chat();
    return new Response(JSON.stringify(data));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}