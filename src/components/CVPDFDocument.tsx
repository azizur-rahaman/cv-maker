'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// Register fonts
Font.register({
  family: 'Arial',
  src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf'
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Arial',
    fontSize: 10,
  },
  header: {
    backgroundColor: '#334155',
    color: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#CBD5E1',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '33%',
    backgroundColor: '#F1F5F9',
    padding: 15,
  },
  mainContent: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    fontSize: 9,
  },
  contactIcon: {
    width: 3,
    height: 3,
    backgroundColor: '#475569',
    borderRadius: 2,
    marginRight: 8,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    fontSize: 9,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: '#475569',
    borderRadius: 2,
    marginRight: 8,
  },
  experienceItem: {
    marginBottom: 15,
    borderLeft: '2px solid #CBD5E1',
    paddingLeft: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  positionName: {
    fontSize: 9,
    color: '#475569',
  },
  dateRange: {
    fontSize: 9,
    color: '#475569',
  },
  responsibility: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 2,
    marginLeft: 10,
  },
  profileSummary: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
    borderLeft: '2px solid #CBD5E1',
    paddingLeft: 10,
  },
  referenceItem: {
    marginBottom: 10,
    fontSize: 9,
  },
  referenceName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  referenceDetails: {
    color: '#475569',
  },
});

interface CVPDFDocumentProps {
  data: CVData;
}

export const CVPDFDocument: React.FC<CVPDFDocumentProps> = ({ data }) => {
  const { personalInfo, contactInfo, workExperience, education, skills, languages, references } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          {personalInfo.profileImage && (
            <Image
              style={styles.profileImage}
              src={personalInfo.profileImage}
            />
          )}
          <View style={styles.headerContent}>
            <Text style={styles.name}>
              {personalInfo.fullName || 'Your Name'}
            </Text>
            <Text style={styles.title}>
              {personalInfo.title || 'Your Job Title'}
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {/* Contact Section */}
            <View>
              <Text style={styles.sectionTitle}>Contact</Text>
              {contactInfo.phone && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text>{contactInfo.phone}</Text>
                </View>
              )}
              {contactInfo.email && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text>{contactInfo.email}</Text>
                </View>
              )}
              {contactInfo.address && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text>{contactInfo.address}</Text>
                </View>
              )}
              {contactInfo.website && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text>{contactInfo.website}</Text>
                </View>
              )}
            </View>

            {/* Skills Section */}
            {skills.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {skills.map((skill) => (
                  <View key={skill.id} style={styles.skillItem}>
                    <View style={styles.bullet} />
                    <Text>{skill.name}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages Section */}
            {languages.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {languages.map((language) => (
                  <View key={language.id} style={styles.skillItem}>
                    <View style={styles.bullet} />
                    <Text>{language.name} ({language.proficiency})</Text>
                  </View>
                ))}
              </View>
            )}

            {/* References Section */}
            {references.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Reference</Text>
                {references.map((reference) => (
                  <View key={reference.id} style={styles.referenceItem}>
                    <Text style={styles.referenceName}>{reference.name}</Text>
                    <Text style={styles.referenceDetails}>
                      {reference.company} / {reference.position}
                    </Text>
                    <Text style={styles.referenceDetails}>
                      Phone: {reference.phone}
                    </Text>
                    <Text style={styles.referenceDetails}>
                      Email: {reference.email}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Profile Section */}
            {personalInfo.profileSummary && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={styles.profileSummary}>
                  {personalInfo.profileSummary}
                </Text>
              </View>
            )}

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {workExperience.map((experience) => (
                  <View key={experience.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View>
                        <Text style={styles.companyName}>{experience.company}</Text>
                        <Text style={styles.positionName}>{experience.position}</Text>
                      </View>
                      <Text style={styles.dateRange}>
                        {experience.startDate} - {experience.endDate}
                      </Text>
                    </View>
                    {experience.responsibilities.map((responsibility, index) => (
                      <Text key={index} style={styles.responsibility}>
                        • {responsibility}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View>
                        <Text style={styles.companyName}>{edu.degree}</Text>
                        <Text style={styles.positionName}>{edu.institution}</Text>
                        {edu.gpa && (
                          <Text style={styles.positionName}>GPA: {edu.gpa}</Text>
                        )}
                      </View>
                      <Text style={styles.dateRange}>
                        {edu.startDate} - {edu.endDate}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};