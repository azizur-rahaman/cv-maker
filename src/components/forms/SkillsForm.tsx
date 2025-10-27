'use client';

import React, { useState } from 'react';
import { Skill } from '@/types/cv';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Plus, X } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  data,
  onChange,
}) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
    };
    onChange([...data, skill]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, name: string) => {
    onChange(data.map(skill => 
      skill.id === id ? { ...skill, name } : skill
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., Project Management, Digital Marketing)"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button onClick={addSkill} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {data.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No skills added yet. Add your first skill above.</p>
          ) : (
            <div className="space-y-2">
              {data.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, e.target.value)}
                    className="border-none bg-transparent flex-1 mr-2"
                  />
                  <Button
                    onClick={() => removeSkill(skill.id)}
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