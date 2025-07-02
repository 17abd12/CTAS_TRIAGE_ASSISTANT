// pages/api/assess.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  const prompt = `
I will provide you with a patient's brief clinical history and vital signs. Your task is to analyze the information using the principles of CTAS (Canadian Triage and Acuity Scale) and return the following:

CTAS Level (1 to 5)

Level Description (e.g., Resuscitation, Emergent, Urgent, etc.)

Justification for assigning that CTAS level, based on clinical indicators such as chief complaint, vitals, pain scale, and risk of deterioration.

Mention if immediate life-saving intervention is required or not.

---

Patient Info:
- Chief Complaint: ${data.chiefComplaint}
- Age: ${data.age}
- Sex: ${data.sex}
- Heart Rate: ${data.hr} bpm
- Respiratory Rate: ${data.rr} bpm
- BP: ${data.bp}
- Temperature: ${data.temp} °C
- O2 Sat: ${data.o2}%
- GCS: ${data.gcs}
- Onset: ${data.onset}
- Risk Factors: ${data.risk}
- Mode of Arrival: ${data.arrival}
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log(text);
    // You can parse the text if it follows a structured format.
const rawJustification = text.match(/\*\*Justification:\*\*\s*([\s\S]*?)\*\*Immediate Life-Saving Intervention Required/i)?.[1]?.trim() || 'N/A';

// Clean markdown bold stars from justification
const cleanedJustification = rawJustification.replace(/\*\*/g, '');

res.status(200).json({
  raw: text,
  ctasLevel: text.match(/\*\*CTAS Level:\*\*\s*(\d)/i)?.[1] || 'N/A',
  description: text.match(/\*\*Level Description:\*\*\s*(.+)/i)?.[1]?.trim() || 'N/A',
  justification: cleanedJustification,
  interventionRequired: text.match(/\*\*Immediate Life-Saving Intervention Required:\*\*\s*([\s\S]*)$/i)?.[1]?.trim() || 'N/A',
});


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
