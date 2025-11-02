# PreCare - Your Digital Intake Assistant

PreCare is a modern, AI-powered web application designed to streamline the pre-appointment intake process for medical clinics. It intelligently collects patient information, asks context-aware medical questions, and generates a concise summary for the doctor, along with helpful self-care tips for the patient.

## ✨ Features

- **Dual User Roles:** Separate, secure interfaces for Patients and Doctors.
- **Secure Doctor Login:** Demo credentials for multiple doctors to access their specific dashboards.
- **Intelligent Appointment Booking:** Patients can book appointments in 15-minute slots. The system automatically blocks times that are already taken for a specific doctor, preventing double-booking.
- **AI-Powered Intake:** Utilizes the Google Gemini API to dynamically generate relevant follow-up questions based on a patient's chief complaint.
- **Automated Summarization:** The AI processes patient answers to create a structured, professional summary for the doctor, highlighting key information like allergies.
- **Patient Self-Care Tips:** Provides patients with simple, actionable self-care advice to follow before their appointment.
- **Robust Input Validation:** Ensures data integrity for patient information like name, email, and phone number.
- **Responsive UI:** Clean, modern, and easy-to-use interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **AI & Language Model:** Google Gemini API (`gemini-2.5-flash`)
- **Runtime Environment:** Runs directly in the browser using ES Modules. **No build step or `npm install` is required.**

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1.  **Visual Studio Code:** Or any other code editor.
2.  **A Modern Web Browser:** Chrome, Firefox, Edge, etc.
3.  **Live Server Extension for VS Code:** This is the easiest way to serve the project locally. You can install it from the VS Code Marketplace.
4.  **Google Gemini API Key:** You must have your own API key to run the application. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Create the Project Folder:** Create a new folder on your computer and place all the project files (`index.html`, `App.tsx`, `components/`, etc.) inside it.

2.  **Configure Your API Key (Crucial Step):**
    -   Open the file: `services/geminiService.ts`.
    -   Find the following line of code:
        ```typescript
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        ```
    -   Replace `process.env.API_KEY as string` with your actual Gemini API key in quotes:
        ```typescript
        const ai = new GoogleGenAI({ apiKey: "YOUR_GEMINI_API_KEY_HERE" });
        ```
    > **⚠️ Security Warning:** Do not commit your API key to a public repository. This method is for local development only.

3.  **Run the Application:**
    -   In VS Code, right-click on the `index.html` file.
    -   Select **"Open with Live Server"**.
    -   Your default browser will open with the application running.

## Usage

The application has two primary user flows:

### 1. Patient Flow

-   Select "I am a Patient" on the home screen.
-   Fill in your personal information.
-   Book an appointment with your preferred doctor.
-   Describe your chief complaint.
-   Answer the AI-generated follow-up questions.
-   Review your self-care tips and submit an optional final question for the doctor.

### 2. Doctor Flow

-   Select "I am a Doctor" on the home screen.
-   Log in using one of the demo credentials below.
-   You will be taken to your dashboard, which will only show patients who have booked an appointment with you.
-   Select a patient from the list on the left to view their detailed intake summary on the right.

#### Demo Doctor Credentials

| Email                   | Password      |
| ----------------------- | ------------- |
| `drcarter@clinic.com`   | `password123` |
| `dradams@clinic.com`    | `password123` |
| `drdavis@clinic.com`    | `password123` |

## ❗ Backend Note

This demonstration version of PreCare uses in-browser state management. This means that all appointment data will be cleared when you refresh the page. For a production environment, the `patientRecords` state in `App.tsx` would be replaced with API calls to a persistent backend database. The application's data structures are designed to be "backend-ready" for this transition.
