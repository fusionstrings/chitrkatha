const items = []

const gallery = () => {
  const body = JSON.stringify(items)
  const headers = { 'Content-type': 'application/json' }
  return new Response(body, { headers })
}

export default gallery