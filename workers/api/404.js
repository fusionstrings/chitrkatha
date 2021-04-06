function notFound() {
	const body = JSON.stringify({message: 'Not Found'})
	const headers = { 'Content-type': 'application/json' }
	const status = { status: 404 };
	return new Response(body, { headers }, status)
}

export default notFound;