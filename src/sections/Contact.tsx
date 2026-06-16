import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { company } from '../data/company';
import { ContactForm } from '../components/ContactForm';

export function Contact() {
  const { phone, email, address, hours } = company.contact;

  return (
    <section id="contact" className="px-6 py-20" aria-labelledby="contact-heading">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        <div>
          <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-slate-900">
            Contact
          </h2>
          <p className="mt-2 text-slate-600">Write or call us — we are happy to help.</p>

          <ul className="mt-8 space-y-4 text-slate-700">
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-brand-700">
                {phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-brand-600" aria-hidden="true" />
              <a href={`mailto:${email}`} className="hover:text-brand-700">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-brand-600" aria-hidden="true" />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-brand-600" aria-hidden="true" />
              <span>{hours}</span>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
