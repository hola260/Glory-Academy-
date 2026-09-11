'use client';

import { useState, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle,
  User,
  BookOpen,
  FileText,
  Send,
  AlertCircle,
} from 'lucide-react';

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  // Academic Info
  program: string;
  previousSchool: string;
  // Guardian Info
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  // Documents
  documents: {
    academic_records: File | null;
    student_photo: File | null;
    id_document: File | null;
    payment_proof: File | null;
  };
}

const initialData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  program: '',
  previousSchool: '',
  guardianName: '',
  guardianPhone: '',
  guardianEmail: '',
  documents: {
    academic_records: null,
    student_photo: null,
    id_document: null,
    payment_proof: null,
  },
};

const steps = [
  { label: 'Personal Info', icon: User },
  { label: 'Academic Info', icon: BookOpen },
  { label: 'Documents', icon: FileText },
  { label: 'Review & Submit', icon: Send },
];

const programs = [
  'Primary (Primary 1 – Primary 6)',
  'Junior Secondary (JSS 1 – JSS 3)',
  'Senior Secondary – Software Development',
  'Senior Secondary – DSE Skills',
  'Senior Secondary – Cyber Security Skills',
];

const documentTypes = [
  {
    key: 'academic_records' as const,
    label: 'Academic Records',
    description: 'Upload your last 2 years of report cards (PDF, JPG, PNG)',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    key: 'student_photo' as const,
    label: 'Student Passport Photo',
    description: 'Recent passport-sized photograph (JPG, PNG)',
    accept: '.jpg,.jpeg,.png',
  },
  {
    key: 'id_document' as const,
    label: 'ID Document',
    description: 'Birth certificate or national ID (PDF, JPG, PNG)',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    key: 'payment_proof' as const,
    label: 'Payment Proof',
    description: 'Receipt of entrance examination fee (PDF, JPG, PNG)',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
];

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = (
    key: keyof FormData['documents'],
    file: File | null
  ) => {
    setData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [key]: file },
    }));
    if (errors[`doc_${key}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`doc_${key}`];
        return next;
      });
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!data.firstName.trim())
        newErrors.firstName = 'First name is required';
      if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!data.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        newErrors.email = 'Invalid email address';
      if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!data.dateOfBirth)
        newErrors.dateOfBirth = 'Date of birth is required';
      if (!data.gender) newErrors.gender = 'Gender is required';
      if (!data.address.trim()) newErrors.address = 'Address is required';
    }

    if (stepIndex === 1) {
      if (!data.program) newErrors.program = 'Please select a program';
      if (!data.guardianName.trim())
        newErrors.guardianName = 'Guardian name is required';
      if (!data.guardianPhone.trim())
        newErrors.guardianPhone = 'Guardian phone is required';
    }

    if (stepIndex === 2) {
      if (!data.documents.student_photo)
        newErrors.doc_student_photo = 'Student photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Upload documents first
      const uploadedDocs: {
        type: string;
        fileName: string;
        filePath: string;
        fileSize: number;
        mimeType: string;
      }[] = [];

      for (const [type, file] of Object.entries(data.documents)) {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('type', type);

          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!uploadRes.ok) {
            const err = await uploadRes.json();
            throw new Error(err.error || 'File upload failed');
          }

          const uploadData = await uploadRes.json();
          uploadedDocs.push({
            type,
            fileName: file.name,
            filePath: uploadData.filePath,
            fileSize: file.size,
            mimeType: file.type,
          });
        }
      }

      // Submit application
      const appRes = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          documents: uploadedDocs,
        }),
      });

      if (!appRes.ok) {
        const err = await appRes.json();
        throw new Error(err.error || 'Application submission failed');
      }

      const appData = await appRes.json();
      setReferenceNumber(appData.referenceNumber);
      setSubmitted(true);
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : 'Submission failed. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 md:py-32 bg-brand-mint min-h-screen">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-green to-brand-teal flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Application Submitted!
            </h1>
            <p className="text-navy-600 text-lg mb-8">
              Thank you for applying to Glory Primary and Secondary Academy.
              Your application has been received successfully.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-navy-100 mb-8">
              <p className="text-sm text-navy-500 mb-2">
                Your Reference Number
              </p>
              <p className="text-3xl font-bold text-brand-blue tracking-wider">
                {referenceNumber}
              </p>
              <p className="text-sm text-navy-500 mt-4">
                Please save this reference number. You will need it to track
                your application status.
              </p>
            </div>
            <p className="text-navy-600 text-sm mb-8">
              Our admissions team will review your application within 5–7
              business days. You will receive an email at{' '}
              <span className="font-semibold">{data.email}</span> with updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admissions"
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-xl hover:shadow-lg transition-all"
              >
                Back to Admissions
              </a>
              <a
                href="/"
                className="px-6 py-3 text-sm font-semibold text-navy-800 border border-navy-200 rounded-xl hover:bg-navy-50 transition-all"
              >
                Return to Home
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-brand-mint min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
            Application Form
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Apply to Glory Academy
          </h1>
          <p className="text-navy-600 text-lg">
            Complete the form below to submit your application for the
            2026/2027 academic session.
          </p>
        </ScrollReveal>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 md:gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  i === step
                    ? 'bg-brand-green text-white shadow-md'
                    : i < step
                    ? 'bg-brand-green/20 text-brand-green'
                    : 'bg-navy-100 text-navy-400'
                }`}
              >
                <s.icon className="w-4 h-4 hidden md:block" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-[2px] ${
                    i < step ? 'bg-brand-green' : 'bg-navy-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Error Banner */}
        {errors.submit && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
          <div className="p-8">
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-navy-900 mb-2">
                  Personal Information
                </h2>
                <p className="text-navy-500 text-sm mb-6">
                  Tell us about the applicant.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="First Name"
                    value={data.firstName}
                    onChange={(v) => updateField('firstName', v)}
                    error={errors.firstName}
                    required
                  />
                  <InputField
                    label="Last Name"
                    value={data.lastName}
                    onChange={(v) => updateField('lastName', v)}
                    error={errors.lastName}
                    required
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={data.email}
                    onChange={(v) => updateField('email', v)}
                    error={errors.email}
                    required
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={data.phone}
                    onChange={(v) => updateField('phone', v)}
                    error={errors.phone}
                    required
                  />
                  <InputField
                    label="Date of Birth"
                    type="date"
                    value={data.dateOfBirth}
                    onChange={(v) => updateField('dateOfBirth', v)}
                    error={errors.dateOfBirth}
                    required
                  />
                  <SelectField
                    label="Gender"
                    value={data.gender}
                    onChange={(v) => updateField('gender', v)}
                    options={['Male', 'Female']}
                    error={errors.gender}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-2">
                    Home Address{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
                      errors.address ? 'border-red-400' : 'border-navy-200'
                    }`}
                    placeholder="Enter full home address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Academic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-navy-900 mb-2">
                  Academic Information
                </h2>
                <p className="text-navy-500 text-sm mb-6">
                  Select the program and provide academic history.
                </p>

                <SelectField
                  label="Program of Interest"
                  value={data.program}
                  onChange={(v) => updateField('program', v)}
                  options={programs}
                  error={errors.program}
                  required
                />

                <InputField
                  label="Previous School"
                  value={data.previousSchool}
                  onChange={(v) => updateField('previousSchool', v)}
                  placeholder="Name of last school attended"
                />

                <div className="border-t border-navy-100 pt-6 mt-6">
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    Guardian / Parent Information
                  </h3>
                  <p className="text-navy-500 text-sm mb-6">
                    Details of the parent or legal guardian.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Guardian Full Name"
                      value={data.guardianName}
                      onChange={(v) => updateField('guardianName', v)}
                      error={errors.guardianName}
                      required
                    />
                    <InputField
                      label="Guardian Phone"
                      type="tel"
                      value={data.guardianPhone}
                      onChange={(v) => updateField('guardianPhone', v)}
                      error={errors.guardianPhone}
                      required
                    />
                    <InputField
                      label="Guardian Email (Optional)"
                      type="email"
                      value={data.guardianEmail}
                      onChange={(v) => updateField('guardianEmail', v)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Documents */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-navy-900 mb-2">
                  Upload Documents
                </h2>
                <p className="text-navy-500 text-sm mb-6">
                  Upload the required documents. Student passport photo is
                  mandatory; others are strongly recommended.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {documentTypes.map((doc) => (
                    <div
                      key={doc.key}
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer hover:border-brand-green hover:bg-brand-mint/50 ${
                        errors[`doc_${doc.key}`]
                          ? 'border-red-400 bg-red-50/50'
                          : data.documents[doc.key]
                          ? 'border-brand-green bg-brand-mint/30'
                          : 'border-navy-200'
                      }`}
                      onClick={() =>
                        fileInputRefs.current[doc.key]?.click()
                      }
                    >
                      <input
                        ref={(el) => {
                          fileInputRefs.current[doc.key] = el;
                        }}
                        type="file"
                        accept={doc.accept}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          if (file && file.size > 10 * 1024 * 1024) {
                            setErrors((prev) => ({
                              ...prev,
                              [`doc_${doc.key}`]:
                                'File size must be under 10MB',
                            }));
                            return;
                          }
                          handleFileChange(doc.key, file);
                        }}
                      />
                      <Upload
                        className={`w-8 h-8 mx-auto mb-3 ${
                          data.documents[doc.key]
                            ? 'text-brand-green'
                            : 'text-navy-300'
                        }`}
                      />
                      <p className="font-semibold text-navy-900 text-sm mb-1">
                        {doc.label}
                        {doc.key === 'student_photo' && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </p>
                      <p className="text-navy-500 text-xs mb-3">
                        {doc.description}
                      </p>
                      {data.documents[doc.key] ? (
                        <p className="text-brand-green text-xs font-medium">
                          ✓ {data.documents[doc.key]!.name}
                        </p>
                      ) : (
                        <p className="text-navy-400 text-xs">
                          Click to browse
                        </p>
                      )}
                      {errors[`doc_${doc.key}`] && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors[`doc_${doc.key}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-navy-900 mb-2">
                  Review Your Application
                </h2>
                <p className="text-navy-500 text-sm mb-6">
                  Please verify all information before submitting.
                </p>

                <ReviewSection title="Personal Information">
                  <ReviewRow
                    label="Name"
                    value={`${data.firstName} ${data.lastName}`}
                  />
                  <ReviewRow label="Email" value={data.email} />
                  <ReviewRow label="Phone" value={data.phone} />
                  <ReviewRow label="Date of Birth" value={data.dateOfBirth} />
                  <ReviewRow label="Gender" value={data.gender} />
                  <ReviewRow label="Address" value={data.address} />
                </ReviewSection>

                <ReviewSection title="Academic Information">
                  <ReviewRow label="Program" value={data.program} />
                  <ReviewRow
                    label="Previous School"
                    value={data.previousSchool || 'N/A'}
                  />
                </ReviewSection>

                <ReviewSection title="Guardian Information">
                  <ReviewRow label="Name" value={data.guardianName} />
                  <ReviewRow label="Phone" value={data.guardianPhone} />
                  <ReviewRow
                    label="Email"
                    value={data.guardianEmail || 'N/A'}
                  />
                </ReviewSection>

                <ReviewSection title="Documents">
                  {documentTypes.map((doc) => (
                    <ReviewRow
                      key={doc.key}
                      label={doc.label}
                      value={
                        data.documents[doc.key]
                          ? `✓ ${data.documents[doc.key]!.name}`
                          : 'Not uploaded'
                      }
                      highlight={!!data.documents[doc.key]}
                    />
                  ))}
                </ReviewSection>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-navy-50 border-t border-navy-100 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-navy-700 border border-navy-200 rounded-xl hover:bg-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-green to-brand-teal rounded-xl hover:shadow-lg transition-all"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Helper Components */

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
          error ? 'border-red-400' : 'border-navy-200'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all bg-white ${
          error ? 'border-red-400' : 'border-navy-200'
        } ${!value ? 'text-navy-400' : 'text-navy-900'}`}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-navy-100 rounded-xl overflow-hidden">
      <div className="bg-navy-50 px-5 py-3 border-b border-navy-100">
        <h3 className="font-bold text-navy-900 text-sm">{title}</h3>
      </div>
      <div className="p-5 space-y-3">{children}</div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-navy-500 text-sm w-40 flex-shrink-0">
        {label}
      </span>
      <span
        className={`text-sm ${
          highlight ? 'text-brand-green font-medium' : 'text-navy-900'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
