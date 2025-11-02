import React, { useState, useEffect } from 'react';
import { PatientRecord } from '../types';

interface DoctorDashboardProps {
  records: PatientRecord[];
  onLogout: () => void;
  doctorName: string;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ records, onLogout, doctorName }) => {
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);

  useEffect(() => {
    // Select the first record by default if the list of records changes
    if (records.length > 0) {
      setSelectedRecord(records[0]);
    } else {
      setSelectedRecord(null);
    }
  }, [records]);

  const PatientListItem: React.FC<{ record: PatientRecord }> = ({ record }) => (
    <button
      onClick={() => setSelectedRecord(record)}
      className={`w-full text-left p-4 rounded-lg transition-colors ${selectedRecord?.id === record.id ? 'bg-teal-100' : 'hover:bg-slate-100'}`}
    >
      <h3 className="font-semibold text-slate-800">{record.info.name}</h3>
      <p className="text-sm text-slate-600">{record.appointmentDetails.date} at {record.appointmentDetails.time}</p>
    </button>
  );

  const DetailView: React.FC<{ record: PatientRecord }> = ({ record }) => (
    <div className="p-1 animate-fade-in">
        <div className="border-b border-slate-200 pb-4 mb-6">
            <h3 className="text-2xl font-bold text-slate-800">{record.info.name}</h3>
            <p className="text-slate-500 mt-1">
                <span className="font-medium">ID:</span> {record.id} | <span className="font-medium">Contact:</span> {record.info.phone}
            </p>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-slate-700 mb-2 text-lg">Appointment Details</h4>
                <p className="text-sm text-slate-600">
                    <span className="font-medium">Date & Time:</span> {record.appointmentDetails.date} at {record.appointmentDetails.time}
                </p>
                <p className="text-sm text-slate-600">
                    <span className="font-medium">Type:</span> {record.appointmentDetails.type.replace('_', '-')}
                </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-slate-700 mb-2 text-lg">Chief Complaint</h4>
                <p className="text-sm text-slate-800">{record.chiefComplaint}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-teal-500">
                <h4 className="font-semibold text-teal-800 mb-3 text-lg">Summary for Review</h4>
                
                {record.doctorSummary.allergies.length > 0 && (
                    <div className="mb-4">
                        <h5 className="font-semibold text-slate-700">Known Allergies:</h5>
                        <ul className="list-disc list-inside text-sm text-red-700 pl-2 space-y-1 mt-1">
                            {record.doctorSummary.allergies.map((allergy, i) => <li key={i}>{allergy}</li>)}
                        </ul>
                    </div>
                )}

                <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">{record.doctorSummary.summaryParagraph}</p>
            </div>

            {record.additionalQuestions && (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-slate-700 text-lg">Patient Question</h4>
                    <p className="text-sm text-slate-800 mt-2 italic">"{record.additionalQuestions}"</p>
                </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="animate-fade-in w-full">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">PreCare Dashboard</h2>
            <p className="text-slate-600">Welcome, {doctorName}</p>
        </div>
        <button onClick={onLogout} className="font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors">Logout</button>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-8 min-h-[60vh]">
        <aside className="md:col-span-4 lg:col-span-3 border-r pr-4">
            <h3 className="font-semibold text-slate-700 mb-2 px-4">Upcoming Appointments</h3>
            {records.length > 0 ? (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {records.map((record) => <PatientListItem key={record.id} record={record} />)}
                </div>
            ) : (
                <div className="text-center py-10 px-4">
                    <p className="text-slate-500">You have no upcoming appointments.</p>
                </div>
            )}
        </aside>

        <main className="md:col-span-8 lg:col-span-9 mt-6 md:mt-0">
            {selectedRecord ? (
                <DetailView record={selectedRecord} />
            ) : (
                 <div className="flex items-center justify-center h-full rounded-lg bg-slate-50">
                    <p className="text-slate-500">Select a patient to view their details.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;