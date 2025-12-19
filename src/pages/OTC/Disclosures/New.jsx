import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, Plus, X, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function NewDisclosure() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    disclosureType: 'invention',
    cluster: 'Engineering',
    keywords: [],
    currentKeyword: '',
    inventors: [{ name: '', email: '', role: '', contribution: '' }],
    background: '',
    description: '',
    advantages: '',
    applications: '',
    developmentStage: 'concept',
    priorArt: '',
    publicDisclosure: 'no',
    publicDisclosureDetails: '',
    fundingSource: '',
    existingIP: 'none',
    ipDetails: '',
    files: []
  });

  const clusters = ['Engineering', 'ICT', 'Life Sciences', 'Physical Sciences', 'Health Sciences', 'Environmental Sciences'];
  const disclosureTypes = [
    { value: 'invention', label: 'Invention/Technology' },
    { value: 'software', label: 'Software' },
    { value: 'process', label: 'Process/Method' },
    { value: 'material', label: 'Material/Composition' },
    { value: 'design', label: 'Design' },
    { value: 'other', label: 'Other' }
  ];
  const developmentStages = [
    { value: 'concept', label: 'Concept Only' },
    { value: 'prototype', label: 'Lab Prototype' },
    { value: 'validated', label: 'Prototype Validated' },
    { value: 'pilot', label: 'Pilot Scale' },
    { value: 'commercial', label: 'Commercial Ready' }
  ];

  const addInventor = () => {
    setFormData({ ...formData, inventors: [...formData.inventors, { name: '', email: '', role: '', contribution: '' }] });
  };

  const removeInventor = (index) => {
    setFormData({ ...formData, inventors: formData.inventors.filter((_, i) => i !== index) });
  };

  const updateInventor = (index, field, value) => {
    const newInventors = [...formData.inventors];
    newInventors[index][field] = value;
    setFormData({ ...formData, inventors: newInventors });
  };

  const addKeyword = () => {
    if (formData.currentKeyword.trim()) {
      setFormData({ ...formData, keywords: [...formData.keywords, formData.currentKeyword.trim()], currentKeyword: '' });
    }
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData({ ...formData, files: [...formData.files, ...newFiles] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Disclosure submitted successfully! Tracking Number: DISC-2025-0023\n\nYou will receive acknowledgment within 2 business days.');
    navigate('/otc/disclosures');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button onClick={() => navigate('/otc/disclosures')} className="btn-secondary mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Disclosures
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">New Invention Disclosure</h1>
        <p className="text-gray-600">Submit disclosure for evaluation (OTC-FLOW-001: Intake &rarr; Evaluation &rarr; Decision within 45 days)</p>
      </div>

      {/* Progress Steps */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          {[{ num: 1, label: 'Basic Info' }, { num: 2, label: 'Description' }, { num: 3, label: 'Development' }, { num: 4, label: 'Review' }].map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                s.num === step ? 'bg-blue-600 text-white' : s.num < step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s.num < step ? <CheckCircle className="w-5 h-5" /> : s.num}
              </div>
              <div className="ml-2 text-sm font-semibold">{s.label}</div>
              {i < 3 && <div className={`h-1 flex-1 mx-2 ${s.num < step ? 'bg-green-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="card space-y-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div>
              <label className="label">Disclosure Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input" placeholder="Brief descriptive title" required />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Type *</label>
                <select value={formData.disclosureType} onChange={(e) => setFormData({ ...formData, disclosureType: e.target.value })} className="input" required>
                  {disclosureTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Cluster *</label>
                <select value={formData.cluster} onChange={(e) => setFormData({ ...formData, cluster: e.target.value })} className="input" required>
                  {clusters.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">Keywords</label>
              <div className="flex gap-2">
                <input type="text" value={formData.currentKeyword} onChange={(e) => setFormData({ ...formData, currentKeyword: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())} className="input" placeholder="Add keywords (press Enter)" />
                <button type="button" onClick={addKeyword} className="btn-primary"><Plus className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.keywords.map((kw, i) => (
                  <span key={i} className="badge badge-info">
                    {kw} <button type="button" onClick={() => setFormData({ ...formData, keywords: formData.keywords.filter((_, idx) => idx !== i) })}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="label mb-0">Inventors *</label>
                <button type="button" onClick={addInventor} className="btn-sm btn-primary"><Plus className="w-4 h-4" />Add</button>
              </div>
              {formData.inventors.map((inv, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 mb-3">
                  <div className="flex justify-between mb-3">
                    <h4 className="font-semibold">Inventor {i + 1}</h4>
                    {formData.inventors.length > 1 && (
                      <button type="button" onClick={() => removeInventor(i)} className="text-red-600"><X className="w-5 h-5" /></button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Name</label>
                      <input type="text" value={inv.name} onChange={(e) => updateInventor(i, 'name', e.target.value)} className="input" required />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input type="email" value={inv.email} onChange={(e) => updateInventor(i, 'email', e.target.value)} className="input" required />
                    </div>
                    <div>
                      <label className="label">Role</label>
                      <input type="text" value={inv.role} onChange={(e) => updateInventor(i, 'role', e.target.value)} className="input" required />
                    </div>
                    <div>
                      <label className="label">Contribution %</label>
                      <input type="number" value={inv.contribution} onChange={(e) => updateInventor(i, 'contribution', e.target.value)} className="input" min="0" max="100" required />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card space-y-6">
            <h2 className="text-xl font-bold mb-4">Technical Description</h2>
            <div>
              <label className="label">Background / Problem *</label>
              <textarea value={formData.background} onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                className="input" rows="4" placeholder="What problem does this solve?" required />
            </div>
            <div>
              <label className="label">Detailed Description *</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input" rows="6" placeholder="How it works, technical details..." required />
            </div>
            <div>
              <label className="label">Advantages & Novel Features *</label>
              <textarea value={formData.advantages} onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
                className="input" rows="4" placeholder="What makes it unique?" required />
            </div>
            <div>
              <label className="label">Potential Applications *</label>
              <textarea value={formData.applications} onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                className="input" rows="4" placeholder="Markets and applications..." required />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card space-y-6">
            <h2 className="text-xl font-bold mb-4">Development & IP Status</h2>
            <div>
              <label className="label">Development Stage *</label>
              <select value={formData.developmentStage} onChange={(e) => setFormData({ ...formData, developmentStage: e.target.value })} className="input" required>
                {developmentStages.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Prior Art</label>
              <textarea value={formData.priorArt} onChange={(e) => setFormData({ ...formData, priorArt: e.target.value })} className="input" rows="3" placeholder="Similar technologies?" />
            </div>
            <div>
              <label className="label">Public Disclosure *</label>
              <select value={formData.publicDisclosure} onChange={(e) => setFormData({ ...formData, publicDisclosure: e.target.value })} className="input" required>
                <option value="no">No</option>
                <option value="publication">Published</option>
                <option value="presentation">Presented</option>
                <option value="thesis">Thesis</option>
              </select>
            </div>
            {formData.publicDisclosure !== 'no' && (
              <div>
                <label className="label">Details *</label>
                <textarea value={formData.publicDisclosureDetails} onChange={(e) => setFormData({ ...formData, publicDisclosureDetails: e.target.value })}
                  className="input" rows="3" placeholder="Title, venue, date..." required />
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-2 text-sm text-red-900">
                  <AlertCircle className="w-5 h-5 inline mr-2" />Public disclosure may affect patentability
                </div>
              </div>
            )}
            <div>
              <label className="label">Funding Source</label>
              <input type="text" value={formData.fundingSource} onChange={(e) => setFormData({ ...formData, fundingSource: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Existing IP *</label>
              <select value={formData.existingIP} onChange={(e) => setFormData({ ...formData, existingIP: e.target.value })} className="input" required>
                <option value="none">None</option>
                <option value="provisional">Provisional</option>
                <option value="full">Full Patent</option>
                <option value="granted">Granted</option>
              </select>
            </div>
            <div>
              <label className="label">Supporting Documents</label>
              <label className="btn-primary cursor-pointer">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                <Upload className="w-5 h-5" />Choose Files
              </label>
              {formData.files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.files.map((f, i) => (
                    <div key={i} className="flex justify-between p-2 bg-gray-50 rounded-xl text-sm">
                      <span>{f.name}</span>
                      <button type="button" onClick={() => setFormData({ ...formData, files: formData.files.filter((_, idx) => idx !== i) })} className="text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="card space-y-6">
            <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
              <h3 className="font-semibold mb-2">Timeline (OTC-FLOW-001)</h3>
              <ul className="space-y-1 text-blue-900">
                <li>• 2 days: Acknowledgment</li>
                <li>• 10 days: Initial meeting</li>
                <li>• 30 days: Evaluation</li>
                <li>• 45 days: Decision</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Title:</span><span className="font-medium">{formData.title || 'Not provided'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Type:</span><span className="font-medium">{disclosureTypes.find(t => t.value === formData.disclosureType)?.label}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Inventors:</span><span className="font-medium">{formData.inventors.length}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Files:</span><span className="font-medium">{formData.files.length}</span></div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <div>
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary">Previous</button>}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate('/otc/disclosures')} className="btn-secondary">Save Draft</button>
            {step < 4 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="btn-primary">Next</button>
            ) : (
              <button type="submit" className="btn-success"><CheckCircle className="w-5 h-5" />Submit</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
