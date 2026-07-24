import React from 'react';
import { Star } from 'lucide-react';
import { Card } from '../ui/Cards';

export const Testimonials = ({ accentText, accentBorder }) => {
  const testimonials = [
    {
      name: 'Aditya Sen',
      role: 'Software Engineer @ Amazon',
      text: 'The ATS resume suggestions and structural score predictions pinpointed exactly what I was lacking. Landed an internship within 3 weeks!',
      avatar: 'AS',
    },
    {
      name: 'Pooja Hegde',
      role: 'Data Scientist @ Microsoft',
      text: 'The Placement Predictor returned an 84% probability, which motivated me to clean up my machine learning projects. The career paths suggested were highly accurate.',
      avatar: 'PH',
    },
    {
      name: 'Rahul Verma',
      role: 'Frontend Engineer @ Razorpay',
      text: 'Mock interview rounds felt like real technical screening calls. Dynamic feedback on my React rendering answers gave me a competitive edge.',
      avatar: 'RV',
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto w-full select-none">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-gradient">
          Loved by <span className="text-gradient-neon">Successful SDEs</span>
        </h2>
        <p className="text-slate-400 text-sm font-sans">
          Hear from engineering graduates who optimized their profiles and secured positions at top tier enterprises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {testimonials.map((test, idx) => (
          <Card key={idx} hoverEffect={true} className="flex flex-col justify-between p-6 border-white/5">
            <div className="space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-xs italic leading-relaxed">
                "{test.text}"
              </p>
            </div>
            
            <div className="flex items-center gap-3.5 mt-6 border-t border-white/5 pt-4">
              <div className={`w-8 h-8 rounded-full bg-slate-900 border ${accentBorder} flex items-center justify-center font-bold text-xs ${accentText}`}>
                {test.avatar}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-heading">{test.name}</h4>
                <p className="text-[10px] text-slate-500">{test.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default Testimonials;
