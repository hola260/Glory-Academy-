'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  X,
  ChevronDown,
  GraduationCap,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Download,
} from 'lucide-react';

interface Document {
  id: string;
  type: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

interface Application {
  id: string;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  program: string;
  previousSchool: string | null;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string | null;
  address: string;
  status: string;
  notes: string | null;
  createdAt: string;
  documents: Document[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  reviewing: 'Reviewing',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

const documentTypeLabels: Record<string, string> = {
  academic_records: 'Academic Records',
  student_photo: 'Student Photo',
  id_document: 'ID Document',
  payment_proof: 'Payment Proof',
};

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/applications?${params}`);
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplications();
  };

  const updateStatus = async (appId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === appId ? { ...app, status: newStatus } : app
          )
        );
        if (selectedApp?.id === appId) {
          setSelectedApp((prev) =>
            prev ? { ...prev, status: newStatus } : null
          );
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    reviewing: applications.filter((a) => a.status === 'reviewing').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
  };

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 via-brand-blue to-navy-800 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-brand-green-light" />
            <h1 className="text-2xl font-bold text-white">
              Admissions Dashboard
            </h1>
          </div>
          <p className="text-white/60 text-sm">
            Glory Primary and Secondary Academy — Manage Applications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-navy-100">
            <p className="text-2xl font-bold text-navy-900">
              {stats.total}
            </p>
            <p className="text-navy-500 text-sm">Total Applications</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-navy-100">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
            <p className="text-navy-500 text-sm">Pending</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-navy-100">
            <p className="text-2xl font-bold text-blue-600">
              {stats.reviewing}
            </p>
            <p className="text-navy-500 text-sm">Under Review</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-navy-100">
            <p className="text-2xl font-bold text-green-600">
              {stats.accepted}
            </p>
            <p className="text-navy-500 text-sm">Accepted</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-navy-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or reference..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
            />
          </form>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 text-sm border border-navy-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
              <p className="text-navy-500 text-sm">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-navy-200 mx-auto mb-4" />
              <p className="text-navy-600 font-medium">
                No applications found
              </p>
              <p className="text-navy-400 text-sm mt-1">
                Applications will appear here once students start applying.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-navy-600 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-navy-600 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-navy-600 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-navy-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-navy-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-navy-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-navy-50 hover:bg-navy-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-navy-900 text-sm">
                          {app.firstName} {app.lastName}
                        </p>
                        <p className="text-navy-500 text-xs">{app.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono font-medium text-brand-blue bg-brand-mint px-2 py-1 rounded">
                          {app.referenceNumber}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-navy-600">
                          {app.program.length > 30
                            ? app.program.substring(0, 30) + '...'
                            : app.program}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-navy-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            statusColors[app.status] ||
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {statusLabels[app.status] || app.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-blue border border-brand-blue/20 rounded-lg hover:bg-brand-mint transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-6 pt-20 overflow-y-auto"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mb-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-navy-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">
                    {selectedApp.firstName} {selectedApp.lastName}
                  </h2>
                  <p className="text-navy-500 text-sm font-mono">
                    {selectedApp.referenceNumber}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
                >
                  <X className="w-5 h-5 text-navy-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-6">
                {/* Status Update */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-navy-700">
                    Status:
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => updateStatus(selectedApp.id, key)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          selectedApp.status === key
                            ? `${statusColors[key]} ring-2 ring-offset-1 ring-current`
                            : 'bg-navy-100 text-navy-500 hover:bg-navy-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div>
                  <h3 className="font-bold text-navy-900 mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem
                      icon={<Mail className="w-4 h-4" />}
                      label="Email"
                      value={selectedApp.email}
                    />
                    <InfoItem
                      icon={<Phone className="w-4 h-4" />}
                      label="Phone"
                      value={selectedApp.phone}
                    />
                    <InfoItem
                      icon={<Calendar className="w-4 h-4" />}
                      label="Date of Birth"
                      value={selectedApp.dateOfBirth}
                    />
                    <InfoItem label="Gender" value={selectedApp.gender} />
                    <InfoItem
                      icon={<MapPin className="w-4 h-4" />}
                      label="Address"
                      value={selectedApp.address}
                      className="col-span-2"
                    />
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 className="font-bold text-navy-900 mb-3">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem
                      label="Program"
                      value={selectedApp.program}
                      className="col-span-2"
                    />
                    <InfoItem
                      label="Previous School"
                      value={selectedApp.previousSchool || 'N/A'}
                      className="col-span-2"
                    />
                  </div>
                </div>

                {/* Guardian Info */}
                <div>
                  <h3 className="font-bold text-navy-900 mb-3">
                    Guardian Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem
                      label="Guardian Name"
                      value={selectedApp.guardianName}
                    />
                    <InfoItem
                      icon={<Phone className="w-4 h-4" />}
                      label="Guardian Phone"
                      value={selectedApp.guardianPhone}
                    />
                    <InfoItem
                      icon={<Mail className="w-4 h-4" />}
                      label="Guardian Email"
                      value={selectedApp.guardianEmail || 'N/A'}
                    />
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="font-bold text-navy-900 mb-3">Documents</h3>
                  {selectedApp.documents.length === 0 ? (
                    <p className="text-navy-500 text-sm">
                      No documents uploaded.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedApp.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-navy-50 border border-navy-100"
                        >
                          <FileText className="w-5 h-5 text-navy-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-navy-900 truncate">
                              {documentTypeLabels[doc.type] || doc.type}
                            </p>
                            <p className="text-xs text-navy-500 truncate">
                              {doc.fileName} (
                              {(doc.fileSize / 1024).toFixed(1)} KB)
                            </p>
                          </div>
                          <a
                            href={doc.filePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-navy-100 transition-colors"
                          >
                            <Download className="w-4 h-4 text-navy-500" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  className = '',
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon && <span className="text-navy-400">{icon}</span>}
        <span className="text-xs text-navy-500">{label}</span>
      </div>
      <p className="text-sm text-navy-900 font-medium">{value}</p>
    </div>
  );
}
