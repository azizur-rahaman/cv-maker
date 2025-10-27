'use client';

import React from 'react';
import { Reference } from '@/types/cv';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Plus, X } from 'lucide-react';

interface ReferencesFormProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({
  data,
  onChange,
}) => {
  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: '',
      position: '',
      company: '',
      phone: '',
      email: '',
    };
    onChange([...data, newReference]);
  };

  const removeReference = (id: string) => {
    onChange(data.filter(ref => ref.id !== id));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onChange(data.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>References</CardTitle>
          <Button onClick={addReference} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Reference
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No references added yet. Click "Add Reference" to get started.</p>
        ) : (
          <div className="space-y-6">
            {data.map((reference) => (
              <div key={reference.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Reference #{data.indexOf(reference) + 1}</h4>
                  <Button
                    onClick={() => removeReference(reference.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={reference.name}
                    onChange={(e) => updateReference(reference.id, 'name', e.target.value)}
                    placeholder="Estelle Darcy"
                  />
                  <Input
                    label="Position"
                    value={reference.position}
                    onChange={(e) => updateReference(reference.id, 'position', e.target.value)}
                    placeholder="CTO"
                  />
                </div>

                <Input
                  label="Company"
                  value={reference.company}
                  onChange={(e) => updateReference(reference.id, 'company', e.target.value)}
                  placeholder="Wardiere Inc."
                  className="mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    value={reference.phone}
                    onChange={(e) => updateReference(reference.id, 'phone', e.target.value)}
                    placeholder="123-456-7890"
                    type="tel"
                  />
                  <Input
                    label="Email"
                    value={reference.email}
                    onChange={(e) => updateReference(reference.id, 'email', e.target.value)}
                    placeholder="hello@reallygreatsite.com"
                    type="email"
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