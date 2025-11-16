export default async function handler(req, res) {
  const { query } = req.query;

  const apiKey = "10882b1e-03cd-4fe4-982d-bef75fb5d269";

  const response = await fetch(
    `https://content.guardianapis.com/search?q=${query}&api-key=${apiKey}`
  );

  const data = await response.json();

  // Allow your frontend to access this API
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.status(200).json(data);
}

