{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww33700\viewh21080\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
  const \{ message \} = req.body;\
\
  const response = await fetch("https://api.openai.com/v1/chat/completions", \{\
    method: "POST",\
    headers: \{\
      "Authorization": `Bearer $\{process.env.OPENAI_API_KEY\}`,\
      "Content-Type": "application/json"\
    \},\
    body: JSON.stringify(\{\
      model: "gpt-4o-mini",\
      messages: [\
        \{\
          role: "system",\
          content: `\
Eres asistente de cl\'ednica dental.\
\
Servicios:\
- Limpieza 50\'80\
- Blanqueamiento 150\'80\
- Implantes 1200\'80\
\
Responde claro y siempre intenta que reserven cita.\
`\
        \},\
        \{\
          role: "user",\
          content: message\
        \}\
      ]\
    \})\
  \});\
\
  const data = await response.json();\
\
  res.status(200).json(\{\
    reply: data.choices[0].message.content\
  \});\
\}}