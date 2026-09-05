import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { contact, personal, socials } from '../data';
import { Section } from './Section';

/**
 * Sección de contacto: datos directos + formulario sencillo (opcional).
 *
 * El formulario NO envía nada a un servidor: abre el cliente de correo del
 * usuario con el mensaje ya redactado (mailto). Para envío real, sustituye
 * `handleSubmit` por una llamada a tu backend o a un servicio como
 * Formspree / EmailJS / Web3Forms.
 */
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contacto desde el portafolio — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" title="Contacto" subtitle={contact.message}>
      <div className="grid gap-10 md:grid-cols-2">
        {/* Datos de contacto directos */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {contact.heading}
          </h3>

          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-3 text-slate-600 transition-colors hover:text-indigo-500 dark:text-slate-400"
          >
            <Mail size={18} /> {personal.email}
          </a>

          <p className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <MapPin size={18} /> {personal.location}
          </p>

          <div className="flex gap-3 pt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="rounded-lg border border-slate-200 p-2.5 text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-500 dark:border-slate-800 dark:text-slate-400 dark:hover:border-indigo-500"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Formulario sencillo (opcional: puedes eliminar este <form>) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            <Send size={16} /> Enviar mensaje
          </button>
        </form>
      </div>
    </Section>
  );
}
