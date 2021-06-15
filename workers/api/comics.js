/**
 * 
{
  "month": "5",
  "num": 100,
  "link": "",
  "year": "2006",
  "news": "",
  "safe_title": "Family Circus",
  "transcript": "[[Picture shows a pathway winding through trees to a sink inside a house, out to some swings and back to ths sink, out to a ball and back to the sink...]]\nCaption: Jeffy's ongoing struggle with obsessive-compulsive disorder\n{{alt text: This was my friend David's idea}}",
  "alt": "This was my friend David's idea",
  "img": "https://imgs.xkcd.com/comics/family_circus.jpg",
  "title": "Family Circus",
  "day": "10"
}
 */
function comics(request) {
  const { id } = request.params
  return fetch(`https://xkcd.com/${id}/info.0.json`)
}

export default comics