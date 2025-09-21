// src/components/Contact.js
import { useEffect, useState } from "react";
import api from "../../api/api";
import { MapPin, Globe, Phone } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  reason: "", 
  source: "", 
  message: "",
};

const phoneRegex = /^\+?\d{7,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [config, setConfig] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    api.get("/contact/config/")
      .then(res => setConfig(res.data))
      .catch(err => console.error("Config fetch error", err));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Enter your name (min 2 chars).";
    if (!emailRegex.test(form.email)) e.email = "Enter a valid email.";
    if (!phoneRegex.test(form.phone)) e.phone = "Enter a valid phone (7-15 digits, optional +).";
    if (!form.reason) e.reason = "Select a reason.";
    if (!form.source) e.source = "Select how you found us.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 chars.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSuccessMsg("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await api.post("contact/submit/", {
        ...form,
        reason: Number(form.reason),
        source: Number(form.source)
      });
      setSuccessMsg("Thanks! Your message has been sent.");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: ["An error occurred. Please try again later."] });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!config) return null;

  const { contact_info, reasons, sources } = config;

  // Tailwind classes for glowing inputs
  const inputClass = `w-full rounded px-3 py-2 bg-darkBg text-lightText placeholder-softGlow
    border border-primaryTeal focus:outline-none focus:ring-2 focus:ring-primaryTeal
    hover:border-secondaryTeal transition-all duration-300`;

  const errorClass = "text-red-500 text-sm mt-1 animate-pulse";

  return (
    <div className="bg-darkBg min-h-screen w-full">

    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-center text-3xl font-semibold text-primaryTeal mb-8 animate-pulse py-6">Contact Me</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Form */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`${inputClass} ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              placeholder="E-mail Address"
              value={form.email}
              onChange={handleChange}
              className={`${inputClass} ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className={`${inputClass} ${errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>

          <div>
            <select
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className={`${inputClass} ${errors.reason ? "border-red-500 focus:ring-red-500" : ""}`}
            >
              <option value="">Reason to Contact</option>
              {reasons.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
            {errors.reason && <p className={errorClass}>{errors.reason}</p>}
          </div>

          <div>
            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className={`${inputClass} ${errors.source ? "border-red-500 focus:ring-red-500" : ""}`}
            >
              <option value="">How did you find me?</option>
              {sources.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            {errors.source && <p className={errorClass}>{errors.source}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} ${errors.message ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {errors.message && <p className={errorClass}>{errors.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-primaryTeal text-darkBg px-6 py-2 rounded shadow-glow-primary hover:shadow-glow-hover transition-all duration-300 font-semibold"
            >
              {submitting ? "Sending..." : "Send"}
            </button>
            {successMsg && <p className="text-green-400 mt-3 animate-pulse">{successMsg}</p>}
            {errors.non_field_errors && <p className="text-red-500 mt-3 animate-pulse">{errors.non_field_errors.join?.(", ") || errors.non_field_errors}</p>}
          </div>
        </form>

        {/* Right: Map + Contact Info */}
        <div className="space-y-6">
          {contact_info?.map_image_url ? (
            <img src={contact_info.map_image_url} alt="Map" className="w-full h-64 object-cover rounded shadow-glow-primary hover:shadow-glow-hover transition-shadow duration-500" />
          ) : (
            <div className="w-full h-64 rounded border border-primaryTeal flex items-center justify-center text-softGlow animate-pulse">Map image</div>
          )}

          <div className="space-y-4 bg-darkBg p-6 rounded shadow-glow-primary hover:shadow-glow-hover transition-shadow duration-500">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-primaryTeal" />
              <div>
                <div className="font-semibold text-softGlow">Address:</div>
                <div className="whitespace-pre-line text-lightText">{contact_info.address}</div>
              </div>
            </div>

    

            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primaryTeal" />
              <a href={`tel:${contact_info.phone}`} className="text-lightText hover:text-primaryTeal transition-colors duration-300">{contact_info.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
