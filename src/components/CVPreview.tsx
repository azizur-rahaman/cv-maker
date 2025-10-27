'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { Phone, Mail, MapPin, Globe, User, Briefcase, GraduationCap } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  const { personalInfo, contactInfo, workExperience, education, skills, languages, references } = data;

  return (
    <div className="bg-white shadow-lg" id="cv-preview">
      {/* Header Section */}
      <div className="bg-slate-700 text-white p-8" style={{ backgroundColor: '#334155' }}>
        <div className="flex items-center space-x-6">
          {personalInfo.profileImage && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xl text-slate-200 mb-4">
              {personalInfo.title || 'Your Job Title'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-100 p-6 space-y-6">
          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              CONTACT
            </h2>
            <div className="space-y-3 text-sm">
              {contactInfo.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-slate-600" />
                  <span>{contactInfo.phone}</span>
                </div>
              )}
              {contactInfo.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-slate-600" />
                  <span className="break-all">{contactInfo.email}</span>
                </div>
              )}
              {contactInfo.address && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-slate-600" />
                  <span>{contactInfo.address}</span>
                </div>
              )}
              {contactInfo.website && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-3 text-slate-600" />
                  <span className="break-all">{contactInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4">SKILLS</h2>
              <ul className="space-y-2 text-sm">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-center">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4">LANGUAGES</h2>
              <ul className="space-y-2 text-sm">
                {languages.map((language) => (
                  <li key={language.id} className="flex items-center">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
                    <span className="flex-1">{language.name}</span>
                    <span className="text-xs text-slate-600">({language.proficiency})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* References Section */}
          {references.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4">REFERENCE</h2>
              {references.map((reference) => (
                <div key={reference.id} className="mb-4 text-sm">
                  <p className="font-medium">{reference.name}</p>
                  <p className="text-slate-600">{reference.company} / {reference.position}</p>
                  <p className="text-slate-600">Phone: {reference.phone}</p>
                  <p className="text-slate-600 break-all">Email: {reference.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Profile Section */}
          {personalInfo.profileSummary && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                PROFILE
              </h2>
              <div className="border-l-4 border-slate-300 pl-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {personalInfo.profileSummary}
                </p>
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {workExperience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                WORK EXPERIENCE
              </h2>
              <div className="border-l-4 border-slate-300 pl-4 space-y-6">
                {workExperience.map((experience) => (
                  <div key={experience.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{experience.company}</h3>
                        <p className="text-sm text-slate-600">{experience.position}</p>
                      </div>
                      <div className="text-right text-sm text-slate-600">
                        <p>{experience.startDate} - {experience.endDate}</p>
                      </div>
                    </div>
                    {experience.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                        {experience.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                EDUCATION
              </h2>
              <div className="border-l-4 border-slate-300 pl-4 space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                        <p className="text-sm text-slate-600">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-slate-600">
                        <p>{edu.startDate} - {edu.endDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};