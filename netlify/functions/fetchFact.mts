import fetch from 'node-fetch';

export default async function handler(event: Request) {
  try {
    const urlObj = new URL(event.url);
    const number = urlObj.searchParams.get('number') || 'random';
    const type = urlObj.searchParams.get('type') || 'trivia';

    console.log(`Fetching fact for number: ${number}, type: ${type}`);

    const apiUrl = `http://numbersapi.com/${number}/${type}?json`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data' }),
      { status: 500 }
    );
  }
}
