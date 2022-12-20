const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({
      message: "Only POST requests are allowed",
    });
    return;
  }

  // IF they did make a POST request...
  const { input } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    max_tokens: 400,
    prompt: `You are a famous poet. Given a subject matter, write a humorous haiku.

Subject: ${input}
Poem:`,
  });
  console.log(completion.data.choices[0].text);

  res.status(201).send({
    poem: completion.data.choices[0].text,
  });
}
