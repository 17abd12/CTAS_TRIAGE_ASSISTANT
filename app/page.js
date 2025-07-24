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

  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-16 font-sans">
      <h1 className="text-center text-4xl font-extrabold text-[#b21e2a] mb-12 tracking-wide drop-shadow">
        🏥 Patient Triage Assessment
      </h1>

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
  );
}
