// api/gemini.js
export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}