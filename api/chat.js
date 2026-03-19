export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
  return res.status(400).json({ reply: "Escribe un mensaje." });
}
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

    // ⚠️ Si algo falla en OpenAI
    if (!data.output) {
      return res.status(500).json({
        reply: "Error del servidor. Inténtalo de nuevo."
      });
    }

    res.status(200).json({
      reply: data.output[0].content[0].text
    });

  } catch (error) {
    res.status(500).json({
      reply: "Error interno."
    });
  }
}
