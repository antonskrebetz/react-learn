export const httpService = () => {
	const request = async (
		url: string,
		method = 'GET',
		body: BodyInit | null = null,
		headers: HeadersInit = { 'Content-Type': 'application/json' }
	) => {
		try {
			const response = await fetch(url, { method, body, headers });
			if (!response.ok) {
				throw new Error(`Could not fetch ${url}, status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	return { request };
};

export const _apiBase = 'http://localhost:4000/';
