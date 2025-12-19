import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Clock, AlertCircle, Info, CheckCircle2, Star, TrendingUp } from 'lucide-react';
import { detailedDisclosures } from '../../../mockData';

export default function DisclosureEvaluation() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find disclosure by ID
  const disclosure = detailedDisclosures.find(d => d.id === id) || detailedDisclosures[0];

  // Evaluation form state
  const [evaluation, setEvaluation] = useState({
    technical: {
      novelty: 4,
      feasibility: 4,
      competitiveAdvantage: 4,
      comments: '',
      readinessLevel: 'TRL 4'
    },
    ip: {
      patentability: 4,
      freedomToOperate: 4,
      priorArt: 4,
      comments: ''
    },
    market: {
      marketSize: 4,
      competition: 4,
      commercializationPotential: 4,
      comments: ''
    },
    recommendation: 'go',
    overallComments: ''
  });

  const handleRatingChange = (section, field, value) => {
    setEvaluation(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleTextChange = (section, field, value) => {
    setEvaluation(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const calculateSectionScore = (section) => {
    const scores = Object.entries(evaluation[section])
      .filter(([key]) => typeof evaluation[section][key] === 'number')
      .map(([, value]) => value);
    return scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
  };

  const calculateOverallScore = () => {
    const techScore = parseFloat(calculateSectionScore('technical'));
    const ipScore = parseFloat(calculateSectionScore('ip'));
    const marketScore = parseFloat(calculateSectionScore('market'));
    return ((techScore + ipScore + marketScore) / 3).toFixed(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert('Evaluation submitted successfully!');
    navigate(`/otc/disclosures/${disclosure.id}`);
  };

  const RatingInput = ({ value, onChange, label }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="label">{label}</label>
        <span className="text-2xl font-bold text-blue-600">{value}/5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`flex-1 py-2 rounded-xl border-2 transition-all ${
              rating <= value
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400'
            }`}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );

  // Calculate days remaining in 30-day evaluation period
  const evaluationDeadline = new Date(disclosure.submissionDate);
  evaluationDeadline.setDate(evaluationDeadline.getDate() + 30);
  const today = new Date();
  const daysRemaining = Math.ceil((evaluationDeadline - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate(`/otc/disclosures/${disclosure.id}`)} className="btn-secondary mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Disclosure
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluate Disclosure</h1>
            <h2 className="text-xl text-gray-700 mb-2">{disclosure.title}</h2>
            <p className="text-sm text-gray-500">Process Flow: OTC-FLOW-001 • Disclosure ID: {disclosure.id}</p>
          </div>
        </div>
      </div>

      {/* Timeline Alert */}
      <div className={`card border-2 ${daysRemaining > 7 ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-300'}`}>
        <div className="flex items-start">
          <Clock className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${daysRemaining > 7 ? 'text-blue-600' : 'text-yellow-600'}`} />
          <div>
            <h3 className={`font-semibold mb-1 ${daysRemaining > 7 ? 'text-blue-900' : 'text-yellow-900'}`}>
              Evaluation Timeline: {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
            </h3>
            <p className={`text-sm ${daysRemaining > 7 ? 'text-blue-700' : 'text-yellow-800'}`}>
              30-day evaluation period from submission date ({new Date(disclosure.submissionDate).toLocaleDateString()}).
              Deadline: {evaluationDeadline.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Evaluation Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Technical Evaluation */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Technical Evaluation
                </h3>
                <span className="text-2xl font-bold text-blue-600">{calculateSectionScore('technical')}/5</span>
              </div>

              <div className="space-y-6">
                <RatingInput
                  label="Novelty & Innovation"
                  value={evaluation.technical.novelty}
                  onChange={(val) => handleRatingChange('technical', 'novelty', val)}
                />

                <RatingInput
                  label="Technical Feasibility"
                  value={evaluation.technical.feasibility}
                  onChange={(val) => handleRatingChange('technical', 'feasibility', val)}
                />

                <RatingInput
                  label="Competitive Advantage"
                  value={evaluation.technical.competitiveAdvantage}
                  onChange={(val) => handleRatingChange('technical', 'competitiveAdvantage', val)}
                />

                <div>
                  <label className="label">Technology Readiness Level (TRL)</label>
                  <select
                    value={evaluation.technical.readinessLevel}
                    onChange={(e) => handleTextChange('technical', 'readinessLevel', e.target.value)}
                    className="input"
                  >
                    <option value="TRL 1">TRL 1 - Basic Principles</option>
                    <option value="TRL 2">TRL 2 - Concept Formulated</option>
                    <option value="TRL 3">TRL 3 - Proof of Concept</option>
                    <option value="TRL 4">TRL 4 - Lab Validation</option>
                    <option value="TRL 5">TRL 5 - Pre-clinical</option>
                    <option value="TRL 6">TRL 6 - Prototype</option>
                    <option value="TRL 7">TRL 7 - Demonstration</option>
                    <option value="TRL 8">TRL 8 - Qualified</option>
                    <option value="TRL 9">TRL 9 - Market Ready</option>
                  </select>
                </div>

                <div>
                  <label className="label">Technical Comments & Assessment</label>
                  <textarea
                    value={evaluation.technical.comments}
                    onChange={(e) => handleTextChange('technical', 'comments', e.target.value)}
                    rows={4}
                    placeholder="Detail strengths, weaknesses, development needs, and technical risks..."
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* IP Evaluation */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-purple-600" />
                  Intellectual Property Evaluation
                </h3>
                <span className="text-2xl font-bold text-purple-600">{calculateSectionScore('ip')}/5</span>
              </div>

              <div className="space-y-6">
                <RatingInput
                  label="Patentability Assessment"
                  value={evaluation.ip.patentability}
                  onChange={(val) => handleRatingChange('ip', 'patentability', val)}
                />

                <RatingInput
                  label="Freedom to Operate"
                  value={evaluation.ip.freedomToOperate}
                  onChange={(val) => handleRatingChange('ip', 'freedomToOperate', val)}
                />

                <RatingInput
                  label="Prior Art Review"
                  value={evaluation.ip.priorArt}
                  onChange={(val) => handleRatingChange('ip', 'priorArt', val)}
                />

                <div>
                  <label className="label">IP Comments & Strategy</label>
                  <textarea
                    value={evaluation.ip.comments}
                    onChange={(e) => handleTextChange('ip', 'comments', e.target.value)}
                    rows={4}
                    placeholder="Describe IP protection strategy, patentability issues, prior art concerns, and recommended filing approach..."
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Market Evaluation */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Market Evaluation
                </h3>
                <span className="text-2xl font-bold text-green-600">{calculateSectionScore('market')}/5</span>
              </div>

              <div className="space-y-6">
                <RatingInput
                  label="Market Size & Opportunity"
                  value={evaluation.market.marketSize}
                  onChange={(val) => handleRatingChange('market', 'marketSize', val)}
                />

                <RatingInput
                  label="Competitive Landscape"
                  value={evaluation.market.competition}
                  onChange={(val) => handleRatingChange('market', 'competition', val)}
                />

                <RatingInput
                  label="Commercialization Potential"
                  value={evaluation.market.commercializationPotential}
                  onChange={(val) => handleRatingChange('market', 'commercializationPotential', val)}
                />

                <div>
                  <label className="label">Market Comments & Analysis</label>
                  <textarea
                    value={evaluation.market.comments}
                    onChange={(e) => handleTextChange('market', 'comments', e.target.value)}
                    rows={4}
                    placeholder="Describe target market, competitors, barriers to entry, potential partners, and commercialization pathway..."
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Overall Recommendation */}
            <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-blue-600" />
                Overall Recommendation
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="label">Final Decision</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setEvaluation(prev => ({ ...prev, recommendation: 'go' }))}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                        evaluation.recommendation === 'go'
                          ? 'bg-green-600 border-green-600 text-white shadow-lg'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-green-400'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 mx-auto mb-1" />
                      GO
                    </button>
                    <button
                      type="button"
                      onClick={() => setEvaluation(prev => ({ ...prev, recommendation: 'no-go' }))}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                        evaluation.recommendation === 'no-go'
                          ? 'bg-red-600 border-red-600 text-white shadow-lg'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-red-400'
                      }`}
                    >
                      <AlertCircle className="w-5 h-5 mx-auto mb-1" />
                      NO-GO
                    </button>
                    <button
                      type="button"
                      onClick={() => setEvaluation(prev => ({ ...prev, recommendation: 'investigate' }))}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                        evaluation.recommendation === 'investigate'
                          ? 'bg-yellow-600 border-yellow-600 text-white shadow-lg'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400'
                      }`}
                    >
                      <Info className="w-5 h-5 mx-auto mb-1" />
                      INVESTIGATE
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {evaluation.recommendation === 'go' && '✓ Proceed to project development and commercialization'}
                    {evaluation.recommendation === 'no-go' && '✗ Do not proceed with this disclosure'}
                    {evaluation.recommendation === 'investigate' && '◆ Further investigation needed before decision'}
                  </div>
                </div>

                <div>
                  <label className="label">Overall Comments & Justification</label>
                  <textarea
                    value={evaluation.overallComments}
                    onChange={(e) => setEvaluation(prev => ({ ...prev, overallComments: e.target.value }))}
                    rows={4}
                    placeholder="Summarize your overall assessment and justify your recommendation..."
                    className="input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="card bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <h3 className="font-semibold mb-2">Overall Score</h3>
              <div className="text-5xl font-bold mb-2">{calculateOverallScore()}</div>
              <p className="text-blue-100 text-sm">out of 5.0</p>
              <div className="mt-4 pt-4 border-t border-blue-400 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Technical:</span>
                  <span className="font-semibold">{calculateSectionScore('technical')}</span>
                </div>
                <div className="flex justify-between">
                  <span>IP:</span>
                  <span className="font-semibold">{calculateSectionScore('ip')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Market:</span>
                  <span className="font-semibold">{calculateSectionScore('market')}</span>
                </div>
              </div>
            </div>

            {/* Disclosure Info */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Disclosure Info</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">ID:</span>
                  <p className="font-semibold">{disclosure.id}</p>
                </div>
                <div>
                  <span className="text-gray-600">Inventor:</span>
                  <p className="font-semibold">{disclosure.inventor}</p>
                </div>
                <div>
                  <span className="text-gray-600">Submitted:</span>
                  <p className="font-semibold">{new Date(disclosure.submissionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Cluster:</span>
                  <p><span className="badge badge-info text-xs">{disclosure.cluster.toUpperCase()}</span></p>
                </div>
              </div>
            </div>

            {/* Evaluation Guidelines */}
            <div className="card bg-yellow-50 border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2 text-yellow-600" />
                Evaluation Guidelines
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>1 - Poor:</strong> Significant concerns, not viable</p>
                <p><strong>2 - Below Average:</strong> Major issues to address</p>
                <p><strong>3 - Average:</strong> Acceptable with development</p>
                <p><strong>4 - Good:</strong> Strong with minor improvements</p>
                <p><strong>5 - Excellent:</strong> Outstanding, ready to proceed</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button type="submit" className="btn-success w-full">
                <Save className="w-5 h-5 mr-2" />
                Submit Evaluation
              </button>
              <button type="button" className="btn-secondary w-full">
                Save as Draft
              </button>
              <button 
                type="button" 
                onClick={() => navigate(`/otc/disclosures/${disclosure.id}`)}
                className="btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
