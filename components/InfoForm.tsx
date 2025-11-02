import React, { useState, FormEvent, useMemo } from 'react';
import { PatientInfo } from '../types';

interface InfoFormProps {
  onSubmit: (info: PatientInfo) => void;
  onBackToHome: () => void;
}

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone: string) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};

const InfoForm: React.FC<InfoFormProps> = ({ onSubmit, onBackToHome }) => {
  const [info, setInfo] = useState<PatientInfo>({
    name: '',
    phone: '',
    email: '',
  });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const errors = useMemo(() => {
    const errs: { [key: string]: string } = {};
    if (!info.name) errs.name = 'Full name is required.';
    if (!validateEmail(info.email)) errs.email = 'Please enter a valid email address.';
    if (!validatePhone(info.phone)) errs.phone = 'Please enter a valid 10-digit phone number.';
    return errs;
  }, [info]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    if (Object.keys(errors).length === 0) {
      onSubmit(info);
    }
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">Your Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-600">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={info.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
          />
          {touched.name && errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-600">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={info.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
          />
          {touched.phone && errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={info.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
          />
          {touched.email && errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={!isFormValid && (touched.name || touched.phone || touched.email)}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
           <button
            type="button"
            onClick={onBackToHome}
            className="w-full flex justify-center py-2 px-4 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoForm;