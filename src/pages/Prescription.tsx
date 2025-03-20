
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Upload, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Prescription: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    // Check file type and size
    const validFiles = newFiles.filter(file => {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(fileType)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid file type. Only JPG, PNG, and PDF are accepted.`,
          variant: "destructive",
        });
        return false;
      }
      
      if (fileSize > 10) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No prescription uploaded",
        description: "Please upload your prescription before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Prescription submitted successfully",
        description: "We will process your prescription and contact you shortly.",
      });
      
      // Reset form
      setFiles([]);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="heading-2 text-gray-900 mb-2">{t('prescription.title')}</h1>
          <p className="paragraph mb-8">{t('prescription.subtitle')}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragging ? 'border-pharmacy-500 bg-pharmacy-50' : 'border-gray-300 hover:border-pharmacy-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="font-medium text-gray-700 mb-2">{t('prescription.dragDrop')}</h3>
                    <p className="text-sm text-gray-500 mb-4">{t('prescription.formats')}</p>
                    
                    <input
                      type="file"
                      id="prescription-upload"
                      className="hidden"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="prescription-upload" className="cursor-pointer">
                        Browse Files
                      </label>
                    </Button>
                  </div>
                  
                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="font-medium text-gray-700 mb-2">Uploaded Files</h4>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-pharmacy-100 rounded-md flex items-center justify-center mr-3">
                              {file.type.includes('image') ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="preview"
                                  className="w-8 h-8 object-cover rounded"
                                />
                              ) : (
                                <span className="text-pharmacy-600 text-xs font-medium">PDF</span>
                              )}
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Why Submit Your Prescription?</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Legally required for prescription medications</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Our licensed pharmacists will verify your prescription</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>We'll contact you if we need additional information</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Your data is secured with end-to-end encryption</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{t('prescription.contact')}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('prescription.name')}</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('prescription.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('prescription.phone')}</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">{t('prescription.notes')}</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : t('prescription.submit')}
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

export default Prescription;
