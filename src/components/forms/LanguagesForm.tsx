'use client';

import React, { useState } from 'react';
import { Language } from '@/types/cv';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Plus, X } from 'lucide-react';

interface LanguagesFormProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

export const LanguagesForm: React.FC<LanguagesFormProps> = ({
  data,
  onChange,
}) => {
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'Fluent' as Language['proficiency'] });

  const addLanguage = () => {
    if (!newLanguage.name.trim()) return;
    
    const language: Language = {
      id: Date.now().toString(),
      name: newLanguage.name.trim(),
      proficiency: newLanguage.proficiency,
    };
    onChange([...data, language]);
    setNewLanguage({ name: '', proficiency: 'Fluent' });
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter(lang => lang.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange(data.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const proficiencyOptions: Language['proficiency'][] = ['Basic', 'Intermediate', 'Fluent', 'Native'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              value={newLanguage.name}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Language name (e.g., English, Spanish)"
              className="md:col-span-2"
            />
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, proficiency: e.target.value as Language['proficiency'] }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {proficiencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <Button onClick={addLanguage} size="sm" className="md:col-span-3">
              <Plus className="w-4 h-4 mr-1" />
              Add Language
            </Button>
          </div>

          {data.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No languages added yet. Add your first language above.</p>
          ) : (
            <div className="space-y-2">
              {data.map((language) => (
                <div key={language.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 flex-1">
                    <Input
                      value={language.name}
                      onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                      className="border-none bg-transparent flex-1"
                    />
                    <select
                      value={language.proficiency}
                      onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                      className="border-none bg-transparent text-sm focus:outline-none"
                    >
                      {proficiencyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    onClick={() => removeLanguage(language.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};