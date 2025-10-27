'use client';

import React from 'react';
import { PersonalInfo } from '@/types/cv';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g., Richard Sanchez"
            required
          />
          <Input
            label="Job Title"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Marketing Manager"
            required
          />
        </div>
        <Textarea
          label="Profile Summary"
          value={data.profileSummary}
          onChange={(e) => handleChange('profileSummary', e.target.value)}
          placeholder="Write a brief summary about yourself..."
          rows={4}
          required
        />
        <Input
          label="Profile Image URL (Optional)"
          value={data.profileImage || ''}
          onChange={(e) => handleChange('profileImage', e.target.value)}
          placeholder="https://example.com/your-photo.jpg"
          type="url"
        />
      </CardContent>
    </Card>
  );
};