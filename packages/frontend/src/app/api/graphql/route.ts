export async function POST(request: Request) {
	const body = await request.json();
	const data = await getGQLData(body);
	return new Response(data);
}

export async function getGQLData(query) {
	// Fetch data from external API
	const requestBody = query;

	const options: RequestInit = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(requestBody),
		cache: "no-store",
	};

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, options);
	const data = await res.json();

	return JSON.stringify(data);
}
