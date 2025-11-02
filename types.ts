export type Step = 'LOGIN' | 'DOCTOR_LOGIN' | 'COMPLAINT' | 'APPOINTMENT_BOOKING' | 'INFO' | 'QUESTIONS' | 'SUMMARY' | 'COMPLETE' | 'DOCTOR_DASHBOARD';

export interface PatientInfo {
  name: string;
  phone: string;
  email: string;
}

export interface QAPair {
  question: string;
  answer: string;
}

export interface AppointmentDetails {
  doctor: string;
  date: string;
  time: string;
  type: 'IN_PERSON' | 'TELECONSULT';
}

export interface DoctorSummary {
  summaryParagraph: string;
  allergies: string[];
}

export interface PatientRecord {
  id: string;
  info: PatientInfo;
  chiefComplaint: string;
  appointmentDetails: AppointmentDetails;
  qaPairs: QAPair[];
  doctorSummary: DoctorSummary;
  selfCareTips: string;
  additionalQuestions: string;
}
