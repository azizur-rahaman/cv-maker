'use client';

import React, { useState, useEffect } from 'react';
import { CVData, defaultCVData } from '@/types/cv';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { ContactInfoForm } from '@/components/forms/ContactInfoForm';
import { WorkExperienceForm } from '@/components/forms/WorkExperienceForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { LanguagesForm } from '@/components/forms/LanguagesForm';
import { ReferencesForm } from '@/components/forms/ReferencesForm';
import { CVPreview } from '@/components/CVPreview';
import { SimplePDFExport } from '@/components/SimplePDFExport';
import { BetterPDFExport } from '@/components/BetterPDFExport';
import { PDFExport } from '@/components/PDFExport';
import { Button } from '@/components/ui/Button';
import { FileText, Eye, Settings, ChevronRight, ChevronLeft, Check, User, Mail, Briefcase, GraduationCap, Code, Languages, Users } from 'lucide-react';

const STORAGE_KEY = 'cv-maker-data';

export default function CVMaker() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setCvData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever cvData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User, description: 'Your basic personal information' },
    { id: 'contact', label: 'Contact', icon: Mail, description: 'How employers can reach you' },
    { id: 'experience', label: 'Experience', icon: Briefcase, description: 'Your work history' },
    { id: 'education', label: 'Education', icon: GraduationCap, description: 'Your educational background' },
    { id: 'skills', label: 'Skills', icon: Code, description: 'Your technical and soft skills' },
    { id: 'languages', label: 'Languages', icon: Languages, description: 'Languages you speak' },
    { id: 'references', label: 'References', icon: Users, description: 'Professional references' },
  ];

  const isPreviewStep = currentStep === sections.length;

  const renderFormSection = () => {
    const activeSection = sections[currentStep].id;
    
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={cvData.personalInfo}
            onChange={(data) => setCvData(prev => ({ ...prev, personalInfo: data }))}
          />
        );
      case 'contact':
        return (
          <ContactInfoForm
            data={cvData.contactInfo}
            onChange={(data) => setCvData(prev => ({ ...prev, contactInfo: data }))}
          />
        );
      case 'experience':
        return (
          <WorkExperienceForm
            data={cvData.workExperience}
            onChange={(data) => setCvData(prev => ({ ...prev, workExperience: data }))}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={cvData.education}
            onChange={(data) => setCvData(prev => ({ ...prev, education: data }))}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={cvData.skills}
            onChange={(data) => setCvData(prev => ({ ...prev, skills: data }))}
          />
        );
      case 'languages':
        return (
          <LanguagesForm
            data={cvData.languages}
            onChange={(data) => setCvData(prev => ({ ...prev, languages: data }))}
          />
        );
      case 'references':
        return (
          <ReferencesForm
            data={cvData.references}
            onChange={(data) => setCvData(prev => ({ ...prev, references: data }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">CV Maker</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isPreviewStep && (
                <div className="flex flex-wrap gap-2">
                  <SimplePDFExport 
                    elementId="cv-preview" 
                    filename={`${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV` || 'CV'} 
                  />
                  <PDFExport 
                    data={cvData}
                    filename={`${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV` || 'CV'} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isPreviewStep ? (
          /* Form Steps */
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {/* Horizontal Progress Stepper */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your CV</h2>
                  <p className="text-sm text-gray-600">Complete all sections to generate your professional CV</p>
                </div>
                
                {/* Horizontal Stepper */}
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200" 
                       style={{ marginLeft: '2.5rem', marginRight: '2.5rem' }}>
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${(currentStep / (sections.length - 1)) * 100}%` }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="relative flex justify-between">
                    {sections.map((section, index) => {
                      const Icon = section.icon;
                      const isCompleted = index < currentStep;
                      const isCurrent = index === currentStep;
                      
                      return (
                        <div key={section.id} className="flex flex-col items-center" style={{ flex: '1' }}>
                          {/* Step Circle */}
                          <button
                            onClick={() => isCompleted || isCurrent ? setCurrentStep(index) : null}
                            disabled={!isCompleted && !isCurrent}
                            className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${
                              isCurrent
                                ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg scale-110'
                                : isCompleted
                                ? 'bg-gradient-to-br from-purple-400 to-pink-400 shadow-md hover:scale-105'
                                : 'bg-gray-300 cursor-not-allowed'
                            }`}
                          >
                            {isCompleted && !isCurrent ? (
                              <Check className="w-8 h-8 text-white" />
                            ) : (
                              <Icon className="w-8 h-8 text-white" />
                            )}
                            
                            {/* Current step indicator dot */}
                            {isCurrent && (
                              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500"></span>
                              </span>
                            )}
                          </button>
                          
                          {/* Step Label */}
                          <div className="mt-4 text-center max-w-[120px]">
                            <p className={`text-sm font-semibold ${
                              isCurrent ? 'text-purple-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {section.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active Form Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {sections[currentStep].label}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {sections[currentStep].description}
                  </p>
                </div>
                
                {renderFormSection()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  {currentStep < sections.length - 1 ? (
                    <Button
                      variant="primary"
                      onClick={() => setCurrentStep(prev => prev + 1)}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => setCurrentStep(sections.length)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview & Download
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Step */
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your CV</h2>
                  <p className="text-sm text-gray-600">
                    Review your CV and download it as PDF. You can go back to edit any section.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(0)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Sections
                </Button>
              </div>

              {/* Quick Edit Navigation */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Edit</h3>
                <div className="flex flex-wrap gap-2">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setCurrentStep(index)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {section.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CV Preview */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CVPreview data={cvData} />
            </div>

            {/* Bottom Navigation */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(sections.length - 1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Editing
                </Button>
                <div className="flex gap-2">
                  <SimplePDFExport 
                    elementId="cv-preview" 
                    filename={`${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV` || 'CV'} 
                  />
                  <PDFExport 
                    data={cvData}
                    filename={`${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV` || 'CV'} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}