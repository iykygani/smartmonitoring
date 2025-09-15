import React, { useState } from 'react';
import { Shield, User, MapPin, Phone, Calendar, FileText, ChevronRight } from 'lucide-react';

interface TouristRegistrationProps {
  onComplete: () => void;
}

export function TouristRegistration({ onComplete }: TouristRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    idType: 'passport',
    idNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    destination: '',
    checkIn: '',
    checkOut: '',
    purpose: 'tourism'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration process
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="min-h-screen landing-hero py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Tourist Registration</h1>
          <p className="text-blue-100">Generate your secure digital tourist ID</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`progress-step ${step >= num ? 'active' : 'inactive'}`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`progress-line ${step > num ? 'completed' : 'incomplete'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Step {step} of 3: {step === 1 ? 'Personal Information' : step === 2 ? 'Travel Details' : 'Verification'}
          </div>
        </div>

        {/* Form */}
        <div className="registration-form">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">ID Type</label>
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="passport">Passport</option>
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="driving_license">Driving License</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">ID Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Travel & Emergency Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Emergency Phone</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., Guwahati, Assam"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Purpose of Visit</label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="tourism">Tourism</option>
                      <option value="business">Business</option>
                      <option value="medical">Medical</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Check-in Date</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Check-out Date</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Verification & Agreement</h2>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Digital Tourist ID Preview</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                    <p><span className="font-medium">ID:</span> {formData.idType.toUpperCase()} - {formData.idNumber}</p>
                    <p><span className="font-medium">Destination:</span> {formData.destination}</p>
                    <p><span className="font-medium">Duration:</span> {formData.checkIn} to {formData.checkOut}</p>
                    <p><span className="font-medium">Purpose:</span> {formData.purpose}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="form-checkbox" required />
                    <span className="text-sm text-gray-600">
                      I agree to share my location data for safety monitoring during my visit. This data will be used only for emergency response and safety purposes.
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="form-checkbox" required />
                    <span className="text-sm text-gray-600">
                      I understand that my digital ID is valid only for the specified duration and I must comply with local safety guidelines and restricted area notifications.
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="form-checkbox" required />
                    <span className="text-sm text-gray-600">
                      I consent to automated emergency alert dispatch to authorities and my emergency contacts in case of distress signals or anomalous activity detection.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn btn-outline"
                >
                  Previous
                </button>
              )}
              
              <div className="flex-1" />
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-secondary flex items-center space-x-2" style={{ padding: '0.75rem 2rem' }}
                >
                  <Shield className="h-4 w-4" />
                  <span>Generate Digital ID</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}