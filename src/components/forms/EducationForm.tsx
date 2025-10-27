'use client';

import React from 'react';
import { Education } from '@/types/cv';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Plus, X } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  data,
  onChange,
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={addEducation} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No education added yet. Click "Add Education" to get started.</p>
        ) : (
          <div className="space-y-6">
            {data.map((education) => (
              <div key={education.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Education #{data.indexOf(education) + 1}</h4>
                  <Button
                    onClick={() => removeEducation(education.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Institution"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder="School of business | Wardiere University"
                  />
                  <Input
                    label="Degree"
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder="Master of Business Management"
                  />
                </div>

                <Input
                  label="Field of Study"
                  value={education.fieldOfStudy}
                  onChange={(e) => updateEducation(education.id, 'fieldOfStudy', e.target.value)}
                  placeholder="Business Management"
                  className="mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Start Date"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    placeholder="2029"
                  />
                  <Input
                    label="End Date"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    placeholder="2031"
                  />
                  <Input
                    label="GPA (Optional)"
                    value={education.gpa || ''}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    placeholder="3.8 / 4.0"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};