export default async function userHandler(req, res)  {
    const {
      query: { id }
    } = req

    const api = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${id}&type=series`);
	const response = await api.json();
  
    res.status(200).json(response)
}