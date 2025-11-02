import React, { useState, useCallback } from 'react';
import { Step, PatientInfo, QAPair, PatientRecord, AppointmentDetails } from './types';
import { generateQuestions, generateSummaryAndTips } from './services/geminiService';

import Header from './components/Header';
import Login from './components/Login';
import DoctorLogin from './components/DoctorLogin';
import InfoForm from './components/InfoForm';
import ComplaintInput from './components/ComplaintInput';
import AppointmentBooking from './components/AppointmentBooking';
import Questionnaire from './components/Questionnaire';
import SummaryDisplay from './components/SummaryDisplay';
import DoctorDashboard from './components/DoctorDashboard';
import LoadingSpinner from './components/LoadingSpinner';

const generatePatientId = () => `P${Math.floor(100000 + Math.random() * 900000)}`;

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('LOGIN');
  const [patientId, setPatientId] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: '', phone: '', email: '' });
  const [chiefComplaint, setChiefComplaint] = useState<string>('');
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selfCareTips, setSelfCareTips] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>([]);
  const [loggedInDoctor, setLoggedInDoctor] = useState<string | null>(null);

  const handleLogin = (role: 'PATIENT' | 'DOCTOR') => {
    if (role === 'PATIENT') {
      setStep('INFO');
    } else {
      setStep('DOCTOR_LOGIN');
    }
  };

  const handleDoctorLogin = (success: boolean, doctorName?: string) => {
    if (success && doctorName) {
      setLoggedInDoctor(doctorName);
      setStep('DOCTOR_DASHBOARD');
      setError(null);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  }

  const handleInfoSubmit = (info: PatientInfo) => {
    setPatientInfo(info);
    setPatientId(generatePatientId());
    setStep('APPOINTMENT_BOOKING');
  };

  const handleAppointmentBooked = (details: AppointmentDetails) => {
    setAppointmentDetails(details);
    setStep('COMPLAINT');
  };
  
  const handleComplaintSubmit = async (complaint: string) => {
    setChiefComplaint(complaint);
    setIsLoading(true);
    setError(null);
    try {
      const generatedQuestions = await generateQuestions(complaint);
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setStep('QUESTIONS');
    } catch (e) {
      setError('Sorry, I had trouble generating questions. Please start over.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);
      setError(null);

      const qaPairs: QAPair[] = questions.map((q, i) => ({
        question: q,
        answer: newAnswers[i],
      }));

      try {
        const result = await generateSummaryAndTips(patientId, patientInfo, chiefComplaint, qaPairs);
        
        if (!appointmentDetails) {
            throw new Error("Appointment details are missing.");
        }

        const newRecord: PatientRecord = {
          id: patientId,
          info: patientInfo,
          chiefComplaint,
          appointmentDetails,
          qaPairs,
          doctorSummary: result.doctorSummary,
          selfCareTips: result.selfCareTips,
          additionalQuestions: '',
        };

        setPatientRecords(prevRecords => [...prevRecords, newRecord]);
        setSelfCareTips(result.selfCareTips);
        setStep('SUMMARY');
      } catch (e) {
        setError('Sorry, I had trouble generating the summary. Please try again.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [answers, currentQuestionIndex, questions, patientId, patientInfo, chiefComplaint, appointmentDetails]);

  const handleQuestionSubmit = (question: string) => {
     setPatientRecords(prevRecords => {
      const updatedRecords = [...prevRecords];
      if (updatedRecords.length > 0) {
        updatedRecords[updatedRecords.length - 1].additionalQuestions = question;
      }
      return updatedRecords;
    });
    setStep('COMPLETE');
  };

  const handleLogout = () => {
    setStep('LOGIN');
    setPatientId('');
    setPatientInfo({ name: '', phone: '', email: '' });
    setChiefComplaint('');
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSelfCareTips('');
    setAppointmentDetails(null);
    setError(null);
    setLoggedInDoctor(null);
  };
  
  const doctorRecords = patientRecords.filter(
    record => record.appointmentDetails.doctor === loggedInDoctor
  );

  const renderStep = () => {
    if (isLoading) {
      let loadingText = 'Thinking...';
      if(step === 'COMPLAINT') loadingText = 'Preparing relevant questions...';
      if(step === 'QUESTIONS') loadingText = 'Generating your summary and tips...';
      return <div className="flex flex-col items-center justify-center h-full gap-4"><LoadingSpinner /><p className="text-slate-600">{loadingText}</p></div>;
    }
    
    // Clear error on step change
    if (error && step !== 'DOCTOR_LOGIN') {
        setTimeout(() => setError(null), 0);
    }

    switch (step) {
      case 'LOGIN':
        return <Login onLogin={handleLogin} />;
      case 'DOCTOR_LOGIN':
        return <DoctorLogin onLogin={handleDoctorLogin} error={error} onBackToHome={handleLogout} />;
      case 'DOCTOR_DASHBOARD':
        return <DoctorDashboard records={doctorRecords} onLogout={handleLogout} doctorName={loggedInDoctor || ''} />;
       case 'APPOINTMENT_BOOKING':
        return <AppointmentBooking onSubmit={handleAppointmentBooked} allBookings={patientRecords} />;
      case 'COMPLAINT':
        return <ComplaintInput onSubmit={handleComplaintSubmit} />;
      case 'INFO':
        return <InfoForm onSubmit={handleInfoSubmit} onBackToHome={handleLogout} />;
      case 'QUESTIONS':
        return (
          <Questionnaire
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onSubmit={handleAnswerSubmit}
          />
        );
      case 'SUMMARY':
        return (
          <SummaryDisplay
            selfCareTips={selfCareTips}
            onQuestionSubmit={handleQuestionSubmit}
          />
        );
      case 'COMPLETE':
        return (
            <div className="text-center animate-fade-in">
                <h2 className="text-2xl font-semibold text-slate-700">All Set!</h2>
                <p className="text-slate-600 mt-2">Your appointment is booked and your information has been securely sent to the clinic. We look forward to seeing you.</p>
                <div className="pt-6">
                    <button
                    onClick={handleLogout}
                    className="w-full max-w-xs mx-auto flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                    >
                    Logout
                    </button>
                </div>
            </div>
        );
      default:
        return <Login onLogin={handleLogin} />;
    }
  };
  
  const showHeader = !['LOGIN', 'DOCTOR_LOGIN', 'DOCTOR_DASHBOARD', 'APPOINTMENT_BOOKING'].includes(step);

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-50 font-sans p-4">
      <div className="w-full max-w-2xl mx-auto">
        {showHeader && <Header />}
        <main className={`mt-8 bg-white p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-500 min-h-[400px] ${step === 'DOCTOR_DASHBOARD' ? 'max-w-7xl' : 'max-w-2xl'}`}>
            {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default App;