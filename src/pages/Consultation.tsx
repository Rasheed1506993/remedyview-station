
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, Clock, UserRound, PhoneCall, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Consultation: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Consultation request submitted",
        description: "We will contact you shortly to confirm your appointment.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setTopic('');
      setMessage('');
      setPreferredDate('');
      setPreferredTime('');
      setIsSubmitting(false);
    }, 1500);
  };

  const consultationTopics = [
    'Medication Review',
    'Drug Interactions',
    'Side Effects',
    'Dosage Adjustments',
    'Over-the-Counter Recommendations',
    'Chronic Disease Management',
    'Health and Wellness',
    'Other'
  ];

  // Generate time slots (9 AM to 5 PM with 30-minute intervals)
  const timeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minutes of ['00', '30']) {
        if (hour === 17 && minutes === '30') continue; // Skip 5:30 PM
        const time = `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push(time);
      }
    }
    return slots;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="heading-2 text-gray-900 mb-2">{t('consultation.title')}</h1>
          <p className="paragraph mb-8">{t('consultation.subtitle')}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Information Section */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-6">How It Works</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-pharmacy-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-pharmacy-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Schedule an Appointment</h4>
                        <p className="text-gray-600 text-sm">Fill out the form with your preferred date and time.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-pharmacy-100 p-3 rounded-full">
                        <PhoneCall className="h-6 w-6 text-pharmacy-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Confirmation Call</h4>
                        <p className="text-gray-600 text-sm">Our team will call you to confirm your appointment details.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-pharmacy-100 p-3 rounded-full">
                        <UserRound className="h-6 w-6 text-pharmacy-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Meet the Pharmacist</h4>
                        <p className="text-gray-600 text-sm">Choose between a video call, phone consultation, or in-person meeting.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-pharmacy-100 p-3 rounded-full">
                        <MessageSquare className="h-6 w-6 text-pharmacy-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Personalized Advice</h4>
                        <p className="text-gray-600 text-sm">Receive expert guidance and answers to all your health questions.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-4">Meet Our Pharmacists</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop"
                        alt="Pharmacist"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">Dr. Sarah Johnson</h4>
                        <p className="text-sm text-gray-600">Clinical Pharmacist</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop"
                        alt="Pharmacist"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">Dr. Michael Chen</h4>
                        <p className="text-sm text-gray-600">Senior Pharmacist</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100&auto=format&fit=crop"
                        alt="Pharmacist"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">Dr. Emily Rodriguez</h4>
                        <p className="text-sm text-gray-600">Pharmacy Manager</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop"
                        alt="Pharmacist"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">Dr. James Wilson</h4>
                        <p className="text-sm text-gray-600">Pediatric Specialist</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Consultation Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-6">{t('consultation.schedule')}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('consultation.name')}</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('consultation.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('consultation.phone')}</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="topic">{t('consultation.topic')}</Label>
                      <Select value={topic} onValueChange={setTopic} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {consultationTopics.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time</Label>
                        <Select value={preferredTime} onValueChange={setPreferredTime} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots().map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">{t('consultation.message')}</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : t('consultation.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;
