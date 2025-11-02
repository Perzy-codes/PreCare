import { GoogleGenAI, Type } from "@google/genai";
import { PatientInfo, QAPair, DoctorSummary } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateQuestions = async (complaint: string): Promise<string[]> => {
  const prompt = `You are a medical intake assistant. A patient reports the following chief complaint: "${complaint}". 
Generate between 5 and 8 concise, medically relevant follow-up questions to ask the patient one at a time. 
Include one specific question about allergies to medicines, food, or other substances.
Do not ask for PII. The questions should be about symptoms, duration, pain level, and lifestyle factors.
Return the questions as a JSON array of strings.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING
        }
      }
    }
  });

  const jsonText = response.text.trim();
  const questions = JSON.parse(jsonText);
  
  if (!Array.isArray(questions) || !questions.every(q => typeof q === 'string')) {
    throw new Error("API did not return a valid array of strings for questions.");
  }
  
  return questions;
};

export const generateSummaryAndTips = async (
  patientId: string,
  patientInfo: PatientInfo,
  chiefComplaint: string,
  qaPairs: QAPair[]
): Promise<{ doctorSummary: DoctorSummary; selfCareTips: string }> => {

  const qaText = qaPairs.map(pair => `Q: ${pair.question}\nA: ${pair.answer}`).join('\n\n');

  const prompt = `
  You are a professional pre-appointment intake assistant for a medical clinic.
  Based on the following patient information, generate two distinct pieces of content: 
  1. A "Doctor Summary": An object containing a paragraph summary and a list of identified allergies.
  2. "Pre-Appointment Self-Care Tips": 3-5 very basic, non-medical suggestions for the patient.
  
  Do not diagnose, prescribe, or mention urgency levels. Keep all outputs short and easy to read.

  Patient Information:
  - Patient ID: ${patientId}
  - Name: ${patientInfo.name}
  - Contact: ${patientInfo.phone}, ${patientInfo.email}
  - Chief Complaint: ${chiefComplaint}

  Questions & Answers:
  ${qaText}

  ---
  
  Generate the response in a JSON object format with two keys: "doctorSummary" and "selfCareTips".
  
  The "doctorSummary" key should correspond to an object with two keys:
  - "summaryParagraph": A concise paragraph containing only the most critical information derived from the patient's complaint and answers. Focus on symptoms, duration, and relevant context. Do not use a list format. End with "Ready for review."
  - "allergies": An array of strings, where each string is a specific allergy mentioned by the patient in their answers. If no allergies are mentioned, return an empty array.

  The "selfCareTips" key should correspond to a string containing a simple, bulleted list of advice like resting or staying hydrated.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
            doctorSummary: {
                type: Type.OBJECT,
                properties: {
                    summaryParagraph: { 
                        type: Type.STRING,
                        description: "A short and structured note for the doctor in paragraph form."
                    },
                    allergies: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of patient's allergies."
                    }
                }
            },
            selfCareTips: {
                type: Type.STRING,
                description: "3-5 basic, non-medical self-care suggestions."
            }
        }
      }
    }
  });

  const jsonText = response.text.trim();
  const result = JSON.parse(jsonText);
  
  if (!result.doctorSummary || typeof result.doctorSummary.summaryParagraph !== 'string' || !Array.isArray(result.doctorSummary.allergies)) {
     throw new Error("API did not return the expected summary object.");
  }

  return result;
};
