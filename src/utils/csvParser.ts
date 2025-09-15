// CSV Parser utility functions
export interface CSVRow {
  [key: string]: string;
}

export function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  
  const rows: CSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: CSVRow = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    rows.push(row);
  }
  
  return rows;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

export function arrayFromString(str: string, delimiter: string = '|'): string[] {
  if (!str || str.trim() === '') return [];
  return str.split(delimiter).map(item => item.trim()).filter(item => item !== '');
}

export function booleanFromString(str: string): boolean {
  return str.toLowerCase() === 'true' || str === '1';
}