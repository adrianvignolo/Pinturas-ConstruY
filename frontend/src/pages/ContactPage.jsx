import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Instagram, ArrowLeft, Send, ShieldCheck, CheckCircle } from 'lucide-react';

export default function ContactPage({ onGoToHome }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Cotización de Proyecto');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    const fullMsg = `Hola Pinturas ConstruY 👋\nMi nombre es ${name} (Tel: ${phone}).\nAsunto: ${subject}\nMensaje: ${message}`;
    window.open(`https://wa.me/584242803167?text=${encodeURIComponent(fullMsg)}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-[1280px] mx-auto min-h-screen">
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={onGoToHome}
          className="inline-flex items-center gap-2 text-xs font-headline font-bold text-primary hover:text-secondary bg-surface-container-lowest px-4 py-2 rounded-xl border border-surface-border transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo / Inicio</span>
        </button>
      </div>

      {/* Header */}
      <div className="mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-secondary mb-2 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
          <Phone className="w-3.5 h-3.5 text-orange-vibrant" />
          <span>Atención al Cliente & Despacho</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
          Contacto y Ubicación
        </h1>
        <p className="font-body text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
          Atendemos requerimientos de constructoras, arquitectos, ferreterías y particulares. Puedes visitarnos directamente en fábrica o comunicarte con nuestros asesores comerciales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Contact Information & Location */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl border-2 border-surface-border p-7 sm:p-9 shadow-sm">
            <h2 className="font-headline font-extrabold text-xl text-primary mb-6 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span>Canales Oficiales de Fábrica</span>
            </h2>

            <dl className="space-y-5 text-xs sm:text-sm">
              {/* Phone */}
              <div className="flex items-start gap-4 pb-4 border-b border-surface-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-on-surface-variant font-headline font-semibold text-xs">Llamadas Directas</dt>
                  <dd className="mt-0.5">
                    <a href="tel:+584242803167" className="font-mono font-bold text-base text-primary hover:text-secondary transition-colors">
                      +58 424 280 3167
                    </a>
                  </dd>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 pb-4 border-b border-surface-border">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-on-surface-variant font-headline font-semibold text-xs">Atención por WhatsApp</dt>
                  <dd className="mt-0.5">
                    <a
                      href="https://wa.me/584242803167?text=Hola%20Pinturas%20ConstruY%2C%20quiero%20hacer%20una%20consulta."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-base text-emerald-800 hover:underline"
                    >
                      +58 424 280 3167
                    </a>
                    <span className="text-[11px] font-mono text-gray-500 block mt-0.5">Respuesta inmediata en horario comercial</span>
                  </dd>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pb-4 border-b border-surface-border">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-on-surface-variant font-headline font-semibold text-xs">Correo Electrónico</dt>
                  <dd className="mt-0.5">
                    <a href="mailto:materialesconstruy@gmail.com" className="font-medium text-sm text-primary hover:underline">
                      materialesconstruy@gmail.com
                    </a>
                  </dd>
                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-4 pb-4 border-b border-surface-border">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 border border-secondary/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-on-surface-variant font-headline font-semibold text-xs">Dirección de Retiro y Tienda</dt>
                  <dd className="font-body text-xs sm:text-sm text-primary font-bold mt-0.5 leading-relaxed">
                    Avenida Principal de Macaracuay, Caracas 1071, Estado Miranda, Venezuela.
                  </dd>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-warm/20 text-gold-warm flex items-center justify-center shrink-0 border border-gold-warm/30">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <dt className="text-on-surface-variant font-headline font-semibold text-xs">Horario de Despacho y Tienda</dt>
                  <dd className="font-mono text-xs sm:text-sm text-primary font-bold mt-0.5">
                    Lunes a viernes de 8:00 AM a 5:00 PM
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Card: Quick Inquiry Form */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-3xl border-2 border-surface-border p-7 sm:p-9 shadow-sm">
          <h2 className="font-headline font-extrabold text-xl text-primary mb-2">
            Envía tu Consulta Directa
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
            Completa tus datos y serás atendido por un asesor técnico especializado para cotizaciones al detal o por volumen.
          </p>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-xs font-headline font-bold text-primary mb-1">
                Tu Nombre o Nombre de Empresa *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Ing. Carlos Pérez / Constructora Bolívar"
                className="w-full px-3.5 py-2.5 text-xs border-2 border-surface-border rounded-xl focus:outline-none focus:border-secondary bg-surface-subtle font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-headline font-bold text-primary mb-1">
                Teléfono o WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0424 000 0000"
                className="w-full px-3.5 py-2.5 text-xs border-2 border-surface-border rounded-xl focus:outline-none focus:border-secondary bg-surface-subtle font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-headline font-bold text-primary mb-1">
                Motivo de Consulta
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border-2 border-surface-border rounded-xl focus:outline-none focus:border-secondary bg-surface-subtle font-headline font-semibold text-primary"
              >
                <option value="Cotización de Proyecto">Cotización de Proyecto / Obra</option>
                <option value="Ventas al Mayor">Ventas al Mayor y Distribución</option>
                <option value="Consulta de Colores">Consulta de Carta de Colores</option>
                <option value="Horarios y Retiro en Tienda">Horarios y Retiro en Tienda</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-headline font-bold text-primary mb-1">
                Mensaje o Metros Cuadrados a Pintar
              </label>
              <textarea
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe aquí tu consulta, color deseado o los metros cuadrados de tu proyecto..."
                className="w-full px-3.5 py-2.5 text-xs border-2 border-surface-border rounded-xl focus:outline-none focus:border-secondary bg-surface-subtle font-sans leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary-container text-white font-headline font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Consulta a WhatsApp de Fábrica</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
