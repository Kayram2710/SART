export function downloadCSV(dataArray, defaultName = 'results') {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      console.warn('CSV export failed: empty or invalid data');
      return;
    }
    
    const filename = `${defaultName}.csv`;
  
    const keys = Object.keys(dataArray[0]);
    const csvRows = [];
  
    // Header
    csvRows.push(keys.join(','));
  
    // Body
    for (const row of dataArray) {
      const values = keys.map(key => {
        let val = row[key];
        if (typeof val === 'string') {
          val = `"${val.replace(/"/g, '""')}"`; // escape quotes
        }
        return val;
      });
      csvRows.push(values.join(','));
    }
  
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  
    URL.revokeObjectURL(url);
  }
  