'use client';

import React, { useState } from 'react';
import { WorkExperience } from '@/types/cv';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Plus, X } from 'lucide-react';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  data,
  onChange,
}) => {
  const [responsibilities, setResponsibilities] = useState<{ [key: string]: string }>({});

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      responsibilities: [],
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
    const newResponsibilities = { ...responsibilities };
    delete newResponsibilities[id];
    setResponsibilities(newResponsibilities);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addResponsibility = (id: string) => {
    const responsibilityText = responsibilities[id]?.trim();
    if (!responsibilityText) return;

    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'responsibilities', [...experience.responsibilities, responsibilityText]);
      setResponsibilities(prev => ({ ...prev, [id]: '' }));
    }
  };

  const removeResponsibility = (expId: string, index: number) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(expId, 'responsibilities', newResponsibilities);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={addExperience} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No work experience added yet. Click "Add Experience" to get started.</p>
        ) : (
          <div className="space-y-6">
            {data.map((experience) => (
              <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Experience #{data.indexOf(experience) + 1}</h4>
                  <Button
                    onClick={() => removeExperience(experience.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Company"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Borcelle Studio"
                  />
                  <Input
                    label="Position"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    placeholder="Marketing Manager & Specialist"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    label="Start Date"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    placeholder="2030"
                  />
                  <Input
                    label="End Date"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    placeholder="PRESENT"
                    disabled={experience.isPresent}
                  />
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id={`present-${experience.id}`}
                      checked={experience.isPresent}
                      onChange={(e) => {
                        updateExperience(experience.id, 'isPresent', e.target.checked);
                        if (e.target.checked) {
                          updateExperience(experience.id, 'endDate', 'PRESENT');
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`present-${experience.id}`}
                      className="text-sm text-gray-700"
                    >
                      Current Position
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Responsibilities
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={responsibilities[experience.id] || ''}
                      onChange={(e) => setResponsibilities(prev => ({ ...prev, [experience.id]: e.target.value }))}
                      placeholder="Add a responsibility..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addResponsibility(experience.id);
                        }
                      }}
                    />
                    <Button
                      onClick={() => addResponsibility(experience.id)}
                      size="sm"
                      type="button"
                    >
                      Add
                    </Button>
                  </div>
                  {experience.responsibilities.length > 0 && (
                    <ul className="space-y-1 mt-2">
                      {experience.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                          <span>• {responsibility}</span>
                          <Button
                            onClick={() => removeResponsibility(experience.id, index)}
                            variant="ghost"
                            size="sm"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};