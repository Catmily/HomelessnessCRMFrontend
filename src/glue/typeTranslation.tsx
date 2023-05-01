// Fancy types for fields in cases and searches
// Why are they not actually types? Complete mystery.

export const caseFieldType = {
  accommodation_status: 'Accommodation Status',
  benefits_notes: 'Benefits',
  client_trauma: 'History of Client Trauma',
  client_violence: 'History of Client Violence',
  contact_with_family: 'Contact with Family',
  disabled_notes: 'Disability',
  education_status: 'Education',
  history_of_rough_sleeping: 'Rough Sleeping',
  income_sources: 'Source(s) of Income',
  care_leaver_status: 'Care Leaver Status',
  employment_status: 'Employment Status',
  lcl_aurthy_homelessness_status: 'Local Authority Case',
  lgbt_notes: 'LGBTQ+ Notes',
  mental_health_diagnosis: 'Mental Health Conditions',
  mental_health_notes: 'Mental Health Notes',
  minority_status: 'Minority Discrimination',
  other_notes: 'Other',
  refugee_status: 'Asylum & Refugee Status',
  relationship_notes: 'Relationship Status',
  substance_use: 'Substance Use',
  summary: 'Case Summary',
  start_date: 'Start Date',
  proposed_end_date: 'Proposed End Date',
  actual_end_date: 'Actual End Date',
  last_update: 'Last Updated',
  support_networks: "Clients' Support Networks"
};

export const personFieldType = {
  preferred_name: 'Preferred Name',
  full_name: 'Full Name',
  address_1: 'Address Line #1',
  address_2: 'Address Line #2',
  address_3: 'Address Line #3',
  city: 'City',
  postcode: 'Postcode',
  gender: 'Gender',
  pronouns: 'Pronouns',
  dob: 'Date of Birth',
  email: 'Email',
  first_language: 'First Language',
  phone: 'Phone Number'
};

export const documentType = {
  title: 'Title',
  description: 'Description',
  filename: 'Filename',
  file_path: 'File Path', // oh oh
  uploaded_date: 'Uploaded Date',
  dated: 'Dated'
};

export const noteType = {
  important: 'Important',
  title: 'Title',
  priority: 'Priority',
  note: 'Note',
  incident_date: 'Incident Date',
  involved: 'Involved',
  note_date: 'Note Date',
  actions_to_take: 'Actions to Take',
  actions_taken: 'Actions Taken'
};
