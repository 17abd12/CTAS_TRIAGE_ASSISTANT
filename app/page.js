'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    chiefComplaint: '',
    age: '',
    sex: '',
    hr: '',
    rr: '',
    bp: '',
    temp: '',
    o2: '',
    gcs: '',
    onset: '',
    risk: '',
    arrival: 'Walk-in',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const assessPatient = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/assess', formData);
      setResult(response.data);
    } catch (error) {
      setResult({
        error: error.response?.data?.error || 'Unknown error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToDemo = () => {
    document.getElementById('demo-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#b21e2a] to-[#8a1621] text-white px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
            🏥 CTAS Triage Assistant
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-100 font-light">
            AI-Powered Emergency Department Triage
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
            Revolutionizing patient assessment with advanced artificial intelligence to help healthcare professionals make faster, more accurate triage decisions using the Canadian Triage and Acuity Scale (CTAS).
          </p>
          <button
            onClick={scrollToDemo}
            className="bg-[#d4a14a] hover:bg-[#c89139] text-white font-bold py-4 px-10 rounded-full text-xl transition-all transform hover:scale-105 shadow-2xl"
          >
            Try Frontend Demo →
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#b21e2a]">
            What is CTAS Triage Assistant?
          </h2>
          <div className="text-lg leading-relaxed text-gray-700 space-y-6">
            <p>
              The <span className="font-bold text-[#b21e2a]">CTAS Triage Assistant</span> is an intelligent decision-support system designed to assist healthcare professionals in emergency departments with rapid and accurate patient triage assessment.
            </p>
            <p>
              Using the <span className="font-semibold">Canadian Triage and Acuity Scale (CTAS)</span>, our system analyzes patient vital signs, chief complaints, and clinical indicators to recommend appropriate triage levels from Level 1 (Resuscitation) to Level 5 (Non-urgent).
            </p>
            <p>
              By leveraging artificial intelligence, we aim to reduce assessment time, minimize human error, and ensure consistent triage decisions across different healthcare settings.
            </p>
          </div>
        </div>
      </section>

      {/* MODEL SECTION */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#b21e2a]">
            Powered by Llama 3.1 8B
          </h2>
          <div className="bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0] p-10 rounded-3xl shadow-2xl border-t-8 border-[#d4a14a]">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-[#b21e2a] text-white px-6 py-3 rounded-full font-bold text-xl">
                🤖 Llama 3.1 8B Model
              </div>
            </div>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Our system is built on <span className="font-bold text-[#b21e2a]">Meta's Llama 3.1 8B</span>, a state-of-the-art large language model optimized for medical reasoning and clinical decision support.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#b21e2a]">
                  <h3 className="font-bold text-xl mb-3 text-[#b21e2a]">⚡ Fast Response</h3>
                  <p className="text-gray-600">Delivers triage recommendations in seconds, enabling rapid decision-making in critical situations.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#d4a14a]">
                  <h3 className="font-bold text-xl mb-3 text-[#d4a14a]">🎯 High Accuracy</h3>
                  <p className="text-gray-600">Trained on extensive medical datasets to provide clinically relevant and accurate assessments.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#b21e2a]">
                  <h3 className="font-bold text-xl mb-3 text-[#b21e2a]">🔒 Privacy-Focused</h3>
                  <p className="text-gray-600">Can be deployed on-premises to maintain patient data privacy and compliance with healthcare regulations.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#d4a14a]">
                  <h3 className="font-bold text-xl mb-3 text-[#d4a14a]">💡 Evidence-Based</h3>
                  <p className="text-gray-600">Provides detailed justifications based on CTAS guidelines and clinical best practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#b21e2a]">
            Key Features & Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#b21e2a]">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#b21e2a]">Time Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduces triage assessment time from minutes to seconds, allowing healthcare staff to focus on patient care rather than documentation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#d4a14a]">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-[#d4a14a]">Consistency</h3>
              <p className="text-gray-600 leading-relaxed">
                Ensures standardized triage decisions across different shifts, staff members, and emergency departments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#b21e2a]">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-4 text-[#b21e2a]">Training Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Serves as an educational tool for nursing students and new triage nurses to learn CTAS guidelines.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#d4a14a]">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#d4a14a]">Risk Detection</h3>
              <p className="text-gray-600 leading-relaxed">
                Identifies high-risk patients requiring immediate attention and flags potential deterioration indicators.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#b21e2a]">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-[#b21e2a]">User-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface designed for quick data entry in high-pressure emergency department environments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#d4a14a]">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-4 text-[#d4a14a]">Quality Improvement</h3>
              <p className="text-gray-600 leading-relaxed">
                Helps track triage accuracy and identify areas for improvement in emergency department workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANCE SECTION */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#b21e2a]">
            Why CTAS Matters
          </h2>
          <div className="bg-gradient-to-r from-[#b21e2a] to-[#8a1621] text-white p-10 md:p-16 rounded-3xl shadow-2xl">
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                In emergency departments, <span className="font-bold">every second counts</span>. Proper triage ensures that the most critical patients receive immediate care while managing resources effectively for all patients.
              </p>
              <p>
                The Canadian Triage and Acuity Scale (CTAS) is the gold standard for emergency triage in Canada and many other countries. However, manual triage can be subject to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Variability between different triage nurses</li>
                <li>Fatigue-related errors during busy shifts</li>
                <li>Delayed assessment during high patient volumes</li>
                <li>Inconsistent application of guidelines</li>
              </ul>
              <p className="pt-4">
                Our AI-powered assistant addresses these challenges by providing <span className="font-bold">instant, consistent, and evidence-based triage recommendations</span> that support healthcare professionals in making critical decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section id="demo-section" className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-[#b21e2a] mb-4 tracking-wide">
            Frontend Demo
          </h2>
          <div className="text-center mb-12 bg-yellow-100 border-2 border-yellow-500 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-xl font-semibold text-yellow-800">
              ⚠️ LLM Not Deployed Yet
            </p>
            <p className="text-base text-yellow-700 mt-2">
              This is a demonstration of the user interface. The Llama 3.1 8B model for CTAS assessment is not currently deployed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT PANEL */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-[#b21e2a] hover:shadow-red-500/40 transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-[#d4a14a] uppercase tracking-wide">
                Patient Information
              </h2>
              <div className="space-y-4">
                <input
                  name="chiefComplaint"
                  placeholder="Chief Complaint"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b21e2a]"
                  onChange={handleChange}
                />

                <div className="flex gap-4">
                  <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  />
                  <select
                    name="sex"
                    className="w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  >
                    <option value="">Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="hr"
                    type="number"
                    placeholder="HR"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  />
                  <input
                    name="rr"
                    type="number"
                    placeholder="RR"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  />
                  <input
                    name="bp"
                    placeholder="BP"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  />
                  <input
                    name="temp"
                    type="number"
                    placeholder="Temp (°F)"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  />
                  <input
                    name="o2"
                    type="number"
                    placeholder="O₂ Sat (%)"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  />
                  <input
                    name="gcs"
                    type="number"
                    placeholder="GCS"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                    onChange={handleChange}
                  />
                </div>

                <textarea
                  name="onset"
                  placeholder="Onset Details"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                  onChange={handleChange}
                />
                <textarea
                  name="risk"
                  placeholder="Risk Factors"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                  onChange={handleChange}
                />
                <select
                  name="arrival"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b21e2a]"
                  onChange={handleChange}
                >
                  <option value="Walk-in">Walk-in</option>
                  <option value="EMS">EMS</option>
                </select>

                <button
                  className="w-full bg-[#b21e2a] hover:bg-[#d8303f] p-3 rounded-lg font-bold mt-6 text-white transition-colors"
                  onClick={assessPatient}
                >
                  {loading ? 'Assessing...' : 'Assess Patient'}
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-[#f9f9f9] p-8 rounded-2xl shadow-xl border-t-8 border-[#d4a14a] hover:shadow-yellow-500/40 transition-shadow">
              <h2 className="text-3xl font-extrabold mb-6 text-[#b21e2a] uppercase tracking-wide">
                Triage Assessment
              </h2>
              {result ? (
                result.error ? (
                  <p className="text-red-600 text-lg font-semibold">{result.error}</p>
                ) : (
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>
                      <span className="font-bold text-[#b21e2a]">CTAS Level:</span> {result.ctasLevel}
                    </p>
                    <p>
                      <span className="font-bold text-[#b21e2a]">Description:</span> {result.description}
                    </p>
                    <p>
                      <span className="font-bold text-[#b21e2a]">Justification:</span> {result.justification}
                    </p>
                    <p>
                      <span className="font-bold text-[#b21e2a]">Life-saving Intervention Required:</span>{' '}
                      {result.interventionRequired}
                    </p>
                  </div>
                )
              ) : (
                <p className="text-gray-600 text-base">
                  Fill the form and press{' '}
                  <span className="font-semibold text-[#d4a14a]">&quot;Assess Patient&quot;</span> to see results here.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#b21e2a] text-white py-8 px-8 text-center">
        <p className="text-lg">
          CTAS Triage Assistant &copy; 2025 | Powered by Llama 3.1 8B
        </p>
        <p className="text-sm mt-2 text-gray-300">
          Built for healthcare professionals to enhance emergency department efficiency
        </p>
      </footer>
    </div>
  );
}
