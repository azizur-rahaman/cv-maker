'use client';

import React from 'react';
import { ContactInfo } from '@/types/cv';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface ContactInfoFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+123-456-7890"
            type="tel"
            required
          />
          <Input
            label="Email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="hello@reallygreatsite.com"
            type="email"
            required
          />
        </div>
        <Input
          label="Address"
          value={data.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="123 Anywhere St., Any City"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Website (Optional)"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.reallygreatsite.com"
            type="url"
          />
          <Input
            label="LinkedIn (Optional)"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/yourprofile"
            type="url"
          />
        </div>
        <Input
          label="GitHub (Optional)"
          value={data.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="github.com/yourusername"
          type="url"
        />
      </CardContent>
    </Card>
  );
};