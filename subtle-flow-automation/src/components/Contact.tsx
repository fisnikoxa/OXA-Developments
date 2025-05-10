import React, { useState } from 'react';
import { services } from '../lib/services';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import emailjs from '@emailjs/browser';
import { toast } from './ui/sonner';

const Contact = () => {
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (fields: { name: string; email: string; service: string; message: string }) => {
    const newErrors: { [key: string]: string } = {};
    if (!fields.name) newErrors.name = 'This field is required';
    if (!fields.email) newErrors.email = 'This field is required';
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(fields.email)) newErrors.email = 'Please enter a valid email address';
    if (!fields.service) newErrors.service = 'This field is required';
    if (!fields.message) newErrors.message = 'This field is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
    const service = selectedService;

    const fieldErrors = validate({ name, email, service, message });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setLoading(false);
      return;
    }

    const publicKey = '2V63q4R5heVI0HEPI';
    const serviceId = 'service_qq8bzo6';

    try {
      // Send auto-reply to user
      await emailjs.send(
        serviceId,
        'template_ljd9z1v',
        { name, email, service, message },
        publicKey
      );
      // Send admin notification
      await emailjs.send(
        serviceId,
        'template_3j307mm',
        { name, email, service, message, to_email: 'nick@oxadevelopments.com' },
        publicKey
      );
      toast.success('Message sent!');
      form.reset();
      setSelectedService('');
      setErrors({});
    } catch (err) {
      toast.error('There was an error sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="py-24 bg-offwhite">
      <div className="container max-w-xl mx-auto px-4">
        <h2 className="text-4xl font-cal mb-6 text-center">Let's Build Together</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-inter mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-charcoal bg-offwhite p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
            />
            {errors.name && (
              <div className="text-muted-foreground font-inter text-xs mt-1">{errors.name}</div>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block font-inter mb-1">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border border-charcoal bg-offwhite p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
            />
            {errors.email && (
              <div className="text-muted-foreground font-inter text-xs mt-1">{errors.email}</div>
            )}
          </div>
          
          <div>
            <label htmlFor="service" className="block font-inter mb-1">Service</label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger
                id="service"
                className="w-full h-12 border border-charcoal bg-offwhite px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal text-base"
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service, idx) => (
                  <SelectItem key={service.title} value={service.title}>{service.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <div className="text-muted-foreground font-inter text-xs mt-1">{errors.service}</div>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block font-inter mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full border border-charcoal bg-offwhite p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
            ></textarea>
            {errors.message && (
              <div className="text-muted-foreground font-inter text-xs mt-1">{errors.message}</div>
            )}
          </div>
          
          <div>
            <button 
              type="submit"
              className="w-full bg-charcoal text-offwhite font-inter px-8 py-3 rounded lift-on-hover"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
