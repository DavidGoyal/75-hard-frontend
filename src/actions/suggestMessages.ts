import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);

export async function run() {
	// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const prompt =
		"Suggest me 3 tasks for my 75 day hard challenge that can completed in one day. Each task should be separated by ||. For example: 'Wake up early in the morning.||Read a page of book.||Do 50 pushups.' Provide only task titles. Do not start with ||.";

	const result = await model.generateContent(prompt);
	const response = result.response;
	const text = response.text();
	return text;
}
