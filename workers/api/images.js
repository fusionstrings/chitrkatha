function images(request) {
	try {
		const { image } = request.query
		const imageURL = new URL(image)
		console.log('image: ', image)
		return fetch(image, {
			cf: { cacheTtlByStatus: { "200-299": 86400, 400: 1, "500-599": 0 } },
		})
	} catch (error) {
		const body = error.message
		const status = { status: 400 };
		return new Response(body, status)
	}
}

export default images