import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate a PDF document with the provided data
 * @param {Object} data - The data to include in the PDF
 * @param {string} filename - The name for the downloaded file (without extension)
 * @param {string} title - The title to display at the top of the PDF
 * @param {Object} options - Additional options for PDF generation
 */
export const generatePDF = (data, filename = 'download', title = 'Document', options = {}) => {
  // Create a new PDF document
  const doc = new jsPDF(options.orientation || 'portrait', 'mm', options.format || 'a4');
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  
  // Add timestamp
  const date = new Date();
  doc.text(`Generated on: ${date.toLocaleString()}`, 14, 22);
  
  // Add content based on data type
  if (Array.isArray(data)) {
    // If data is an array, create a table
    if (data.length > 0) {
      const headers = Object.keys(data[0]).map(key => ({
        header: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        dataKey: key
      }));
      
      doc.autoTable({
        startY: 30,
        head: [headers.map(h => h.header)],
        body: data.map(row => headers.map(h => row[h.dataKey])),
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [66, 66, 66] }
      });
    }
  } else if (typeof data === 'object') {
    // If data is an object, create a list of key-value pairs
    let y = 30;
    Object.entries(data).forEach(([key, value]) => {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`${formattedKey}:`, 14, y);
      doc.setFont(undefined, 'normal');
      doc.text(`${value}`, 60, y);
      y += 8;
    });
  } else {
    // If data is a string or other type, just add it as text
    doc.text(String(data), 14, 30);
  }
  
  // Save the PDF with the provided filename
  doc.save(`${filename}.pdf`);
};

/**
 * Generate a PDF for student marks
 * @param {Object} studentData - The student data including marks
 * @param {string} studentName - The name of the student
 */
export const generateStudentMarksPDF = (studentData, studentName) => {
  const filename = `${studentName.toLowerCase().replace(/\s+/g, '_')}_marks`;
  const title = `${studentName} - Academic Performance Report`;
  
  const doc = new jsPDF();
  
  // Add title and header
  doc.setFontSize(18);
  doc.text(title, 14, 15);
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
  
  // Add subject marks table
  const subjectRows = [];
  let totalMarks = 0;
  let maxMarks = 0;
  
  // Process subject marks
  Object.entries(studentData.marks).forEach(([subject, marks]) => {
    const row = [subject];
    let subjectTotal = 0;
    let subjectMax = 0;
    
    if (marks.internal !== undefined) {
      row.push(marks.internal);
      subjectTotal += marks.internal;
      subjectMax += 30; // Assuming max internal is 30
    } else {
      row.push('-');
    }
    
    if (marks.external !== undefined) {
      row.push(marks.external);
      subjectTotal += marks.external;
      subjectMax += 70; // Assuming max external is 70
    } else {
      row.push('-');
    }
    
    if (marks.lab !== undefined) {
      row.push(marks.lab);
      subjectTotal += marks.lab;
      subjectMax += 30; // Assuming max lab is 30
    } else {
      row.push('-');
    }
    
    row.push(subjectTotal);
    row.push(`${Math.round((subjectTotal / subjectMax) * 100)}%`);
    
    subjectRows.push(row);
    totalMarks += subjectTotal;
    maxMarks += subjectMax;
  });
  
  // Add the table
  doc.autoTable({
    startY: 30,
    head: [['Subject', 'Internal', 'External', 'Lab', 'Total', 'Percentage']],
    body: subjectRows,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [66, 66, 66] }
  });
  
  // Add overall performance
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Overall Performance', 14, finalY);
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Total Marks: ${totalMarks} / ${maxMarks}`, 14, finalY + 7);
  doc.text(`Overall Percentage: ${Math.round((totalMarks / maxMarks) * 100)}%`, 14, finalY + 14);
  
  // Grade calculation
  let grade = 'F';
  const percentage = (totalMarks / maxMarks) * 100;
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  else if (percentage >= 40) grade = 'E';
  
  doc.text(`Grade: ${grade}`, 14, finalY + 21);
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
};

/**
 * Generate a PDF for tasks and reminders
 * @param {Object} data - The tasks and reminders data
 * @param {string} username - The name of the user
 */
export const generateTasksPDF = (data, username = 'User') => {
  const filename = `${username.toLowerCase().replace(/\s+/g, '_')}_tasks_${new Date().toISOString().split('T')[0]}`;
  const title = `${username}'s Tasks and Reminders`;
  
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 15);
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
  
  let yPos = 30;
  
  // Add reminders section
  if (data.today_remainder && data.today_remainder.length > 0) {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Reminders', 14, yPos);
    yPos += 7;
    
    data.today_remainder.forEach((remainder, index) => {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`To: ${remainder.to}`, 14, yPos);
      yPos += 6;
      
      remainder.assigner.forEach(assigner => {
        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text(`From: ${assigner.by}`, 20, yPos);
        yPos += 5;
        
        if (assigner.value && assigner.value.length > 0) {
          doc.setFont(undefined, 'normal');
          assigner.value.forEach(val => {
            doc.text(`• ${val}`, 25, yPos);
            yPos += 5;
          });
        }
        
        yPos += 2;
      });
      
      yPos += 5;
    });
  }
  
  // Add tasks section
  if (data.today_task && data.today_task.length > 0) {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Tasks', 14, yPos);
    yPos += 7;
    
    data.today_task.forEach((task, index) => {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`To: ${task.to}`, 14, yPos);
      yPos += 6;
      
      task.assigner.forEach(assigner => {
        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text(`From: ${assigner.by}`, 20, yPos);
        yPos += 5;
        
        if (assigner.context && assigner.context.length > 0) {
          doc.setFont(undefined, 'normal');
          assigner.context.forEach(ctx => {
            doc.text(`• ${ctx.value} (${ctx.status})`, 25, yPos);
            yPos += 5;
          });
        }
        
        yPos += 2;
      });
      
      yPos += 5;
    });
  }
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
};