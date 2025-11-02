import React, { useState, FormEvent, useMemo, useEffect } from 'react';
import { AppointmentDetails, PatientRecord } from '../types';

interface AppointmentBookingProps {
    onSubmit: (details: AppointmentDetails) => void;
    allBookings: PatientRecord[];
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ onSubmit, allBookings }) => {
    const [details, setDetails] = useState<Omit<AppointmentDetails, 'type'>>({
        doctor: '',
        date: '',
        time: '',
    });
    const [consultType, setConsultType] = useState<'IN_PERSON' | 'TELECONSULT' | ''>('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails(prev => ({...prev, [name]: value }));
    };

    const availableTimeSlots = useMemo(() => {
        const baseSlots = [];
        for (let i = 9 * 60; i < 17 * 60; i += 15) { // 9:00 AM to 4:45 PM
            let hours = Math.floor(i / 60);
            const minutes = i % 60;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            const strHours = hours < 10 ? '0' + hours : String(hours);
            const strMinutes = minutes < 10 ? '0' + minutes : String(minutes);
            baseSlots.push(`${strHours}:${strMinutes} ${ampm}`);
        }

        if (!details.doctor || !details.date) {
            return baseSlots;
        }

        const bookedSlots = new Set(
            allBookings
                .filter(booking => booking.appointmentDetails.doctor === details.doctor && booking.appointmentDetails.date === details.date)
                .map(booking => booking.appointmentDetails.time)
        );

        return baseSlots.filter(slot => !bookedSlots.has(slot));
    }, [details.doctor, details.date, allBookings]);

    // Reset time if the selected time becomes unavailable
    useEffect(() => {
        if (details.time && !availableTimeSlots.includes(details.time)) {
            setDetails(prev => ({ ...prev, time: '' }));
        }
    }, [availableTimeSlots, details.time]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(details.doctor && details.date && details.time && consultType) {
            onSubmit({ ...details, type: consultType });
        }
    }
    
    const isFormValid = details.doctor && details.date && details.time && consultType;

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 text-center">Book Your Appointment</h2>
            <p className="text-slate-600 mt-2 text-center mb-8">
                Please select your preferred doctor, date, and time.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="doctor" className="block text-sm font-medium text-slate-600">Doctor</label>
                        <select name="doctor" id="doctor" value={details.doctor} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900">
                            <option value="">Select a doctor</option>
                            <option value="Dr. Emily Carter">Dr. Emily Carter</option>
                            <option value="Dr. Ben Adams">Dr. Ben Adams</option>
                            <option value="Dr. Chloe Davis">Dr. Chloe Davis</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="consultType" className="block text-sm font-medium text-slate-600">Consultation Type</label>
                        <select name="consultType" id="consultType" value={consultType} onChange={(e) => setConsultType(e.target.value as any)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900">
                            <option value="">Select a type</option>
                            <option value="IN_PERSON">In-Person</option>
                            <option value="TELECONSULT">Teleconsult</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-slate-600">Date</label>
                        <input type="date" name="date" id="date" value={details.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900" min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-slate-600">Time</label>
                        <select name="time" id="time" value={details.time} onChange={handleChange} required disabled={!details.doctor || !details.date} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900 disabled:bg-slate-50 disabled:cursor-not-allowed">
                             <option value="">Select a time</option>
                             {availableTimeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                        </select>
                         {details.doctor && details.date && availableTimeSlots.length === 0 && (
                            <p className="text-xs text-red-600 mt-1">No available slots for this doctor on this date.</p>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                    >
                        Book Appointment & Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentBooking;