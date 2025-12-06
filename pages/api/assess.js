// pages/api/assess.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return dummy response indicating LLM is not deployed
  res.status(200).json({
    ctasLevel: 'N/A',
    description: 'LLM Not Deployed',
    justification: 'This is a frontend demo only. The AI model for CTAS assessment has not been deployed yet. Please check back later when the model is available.',
    interventionRequired: 'N/A - Demo Mode',
  });
}
