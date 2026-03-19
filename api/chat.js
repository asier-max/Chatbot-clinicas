export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "Eres un asistente de una clínica dental en España. Responde claro, breve y orientado a que el cliente reserve cita."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.output[0].content[0].text
  });
}
