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
      setResult({ error: error.response?.data?.error || 'Unknown error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left - Patient Info */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-teal-300 tracking-wide">Patient Information</h2>
        <div className="space-y-4">
          <input name="chiefComplaint" placeholder="Chief Complaint" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <div className="flex gap-4">
            <input name="age" type="number" placeholder="Age" className="w-1/2 p-2 bg-gray-700 rounded" onChange={handleChange} />
            <select name="sex" className="w-1/2 p-2 bg-gray-700 rounded" onChange={handleChange}>
              <option value="">Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="hr" placeholder="HR" className="p-2 bg-gray-700 rounded" onChange={handleChange} />
            <input name="rr" placeholder="RR" className="p-2 bg-gray-700 rounded" onChange={handleChange} />
            <input name="bp" placeholder="BP" className="p-2 bg-gray-700 rounded" onChange={handleChange} />
            <input name="temp" placeholder="Temp (°C)" className="p-2 bg-gray-700 rounded" onChange={handleChange} />
            <input name="o2" placeholder="O₂ Sat (%)" className="p-2 bg-gray-700 rounded" onChange={handleChange} />
            <input name="gcs" placeholder="GCS" className="p-2 bg-gray-700 rounded" onChange={handleChange} />
          </div>
          <textarea name="onset" placeholder="Onset and Progression" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange}></textarea>
          <textarea name="risk" placeholder="Comorbidities / Risk Factors" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange}></textarea>
          <select name="arrival" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange}>
            <option value="Walk-in">Walk-in</option>
            <option value="EMS">EMS</option>
          </select>
          <button className="w-full bg-teal-600 hover:bg-teal-500 p-3 rounded mt-4" onClick={assessPatient}>
            {loading ? 'Assessing...' : 'Assess Patient'}
          </button>
        </div>
      </div>

      {/* Right - Triage Result */}
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg overflow-auto text-white transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-400 tracking-wide">Triage Assessment</h2>
        {result ? (
          result.error ? (
            <p className="text-red-500 text-lg font-medium">{result.error}</p>
          ) : (
            <div className="space-y-5 text-lg leading-relaxed">
              <p>
                <span className="text-teal-400 font-semibold">CTAS Level:</span>{' '}
                <span>{result.ctasLevel}</span>
              </p>
              <p>
                <span className="text-teal-400 font-semibold">Description:</span>{' '}
                <span>{result.description}</span>
              </p>
              <p>
                <span className="text-teal-400 font-semibold">Justification:</span>{' '}
                <span>{result.justification}</span>
              </p>
              <p>
                <span className="text-teal-400 font-semibold">Life-saving Intervention Required:</span>{' '}
                <span>{result.interventionRequired}</span>
              </p>
            </div>
          )
        ) : (
          <p className="text-gray-400 text-base tracking-wide">
            Fill the form and press <span className="font-semibold text-blue-300">&quot;Assess Patient&quot;</span> to see results here.
          </p>
        )}
      </div>
    </div>
  );
}
