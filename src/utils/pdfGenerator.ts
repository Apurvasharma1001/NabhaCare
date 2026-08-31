import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Prescription, Patient } from '../types';

export const generatePrescriptionPDF = (prescription: Prescription) => {
  const doc = new jsPDF();

  // Primary Header: Nabha Telemedicine Portal
  doc.setFillColor(30, 64, 175); // Dark Medical Blue
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('NABHA TELEMEDICINE HUB', 14, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Civil Hospital Nabha, District Patiala, Punjab | Govt. Telehealth Initiative', 14, 21);
  doc.text('EHR Digital Prescription • Valid under IT Act 2000 & Telemedicine Guidelines 2020', 14, 27);

  // Doctor & Hospital Block (Right aligned in header area)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(prescription.doctorName, 135, 14);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(prescription.doctorSpecialization, 135, 19);
  doc.text(prescription.hospitalName, 135, 24);

  // Patient Meta Details Box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 38, 182, 30, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('PATIENT INFORMATION', 18, 44);

  doc.setFont('helvetica', 'normal');
  doc.text(`Patient Name: ${prescription.patientName}`, 18, 51);
  doc.text(`Age / Gender: ${prescription.patientAge} Years / ${prescription.patientGender}`, 18, 57);
  doc.text(`Village / Location: ${prescription.patientVillage}`, 18, 63);

  doc.text(`Prescription ID: ${prescription.id}`, 115, 51);
  doc.text(`Date of Issue: ${prescription.date}`, 115, 57);
  doc.text(`Status: ${prescription.status}`, 115, 63);

  // Rx Symbol
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Rx', 14, 76);

  // Medicines Table
  const tableData = prescription.medicines.map((med, index) => [
    index + 1,
    med.name,
    med.dosage,
    med.frequency,
    med.duration,
    med.instructions || 'As directed',
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['#', 'Medicine Name', 'Dosage', 'Frequency', 'Duration', 'Instructions']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 64, 175],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 50, fontStyle: 'bold' },
      2: { cellWidth: 25 },
      3: { cellWidth: 35 },
      4: { cellWidth: 20 },
      5: { cellWidth: 44 },
    },
  });

  // Post-Table Notes & Advice
  const finalY = (doc as any).lastAutoTable.finalY + 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('General Instructions & Dietary Advice:', 14, finalY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const splitInstructions = doc.splitTextToSize(prescription.instructions || 'Take medicines strictly as prescribed.', 182);
  doc.text(splitInstructions, 14, finalY + 5);

  if (prescription.followUp) {
    doc.setFont('helvetica', 'bold');
    doc.text(`Follow-up Advice: ${prescription.followUp}`, 14, finalY + 14);
  }

  // Doctor Signature Stamp Block
  doc.setDrawColor(203, 213, 225);
  doc.line(135, finalY + 36, 195, finalY + 36);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(prescription.doctorName, 135, finalY + 41);
  doc.setFont('helvetica', 'normal');
  doc.text('Digitally Signed & Authenticated', 135, finalY + 45);
  doc.text(`Reg: PB-MED-84920-A`, 135, finalY + 49);

  // Footer Disclaimer
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'This prescription is generated electronically via Nabha Telemedicine Portal for rural healthcare assistance.',
    14,
    285
  );
  doc.text('In case of acute emergency, visit the Emergency Ward at Civil Hospital Nabha immediately.', 14, 289);

  doc.save(`Prescription_${prescription.id}_${prescription.patientName.replace(/\s+/g, '_')}.pdf`);
};

export const generatePatientRecordPDF = (patient: Patient) => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 30, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('NABHA TELEMEDICINE — LONGITUDINAL PATIENT EHR RECORD', 14, 14);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Official Clinical Summary Document • Civil Hospital Nabha Health System', 14, 21);

  // Patient Info
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Patient: ${patient.name} (${patient.patientId})`, 14, 40);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Age/Gender: ${patient.age} Years / ${patient.gender}`, 14, 46);
  doc.text(`Village: ${patient.village}`, 14, 52);
  doc.text(`Phone: ${patient.phone}`, 14, 58);
  doc.text(`Blood Group: ${patient.medicalHistory.bloodGroup}`, 110, 46);
  doc.text(`Allergies: ${patient.medicalHistory.allergies.join(', ') || 'None reported'}`, 110, 52);
  doc.text(`Chronic Conditions: ${patient.medicalHistory.chronicConditions.join(', ') || 'None reported'}`, 110, 58);

  // Past Consultations Table
  const consultData = patient.consultationHistory.map((c, i) => [
    i + 1,
    c.date,
    c.doctorName,
    c.chiefComplaint,
    c.assessment,
    c.prescriptionId || 'None',
  ]);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Consultation History Summary', 14, 70);

  autoTable(doc, {
    startY: 74,
    head: [['#', 'Date', 'Doctor', 'Chief Complaint', 'Assessment', 'Prescription ID']],
    body: consultData.length > 0 ? consultData : [['-', '-', 'No prior consultations recorded', '-', '-', '-']],
    theme: 'grid',
    headStyles: { fillColor: [30, 64, 175], fontSize: 8 },
    styles: { fontSize: 8 },
  });

  const nextY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 14, nextY);

  doc.save(`Patient_EHR_Record_${patient.patientId}_${patient.name.replace(/\s+/g, '_')}.pdf`);
};
