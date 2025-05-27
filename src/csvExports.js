export function downloadCSV(headerRows, csvData, defaultName = 'results') {
    
    const keys = Object.keys(csvData[0]);
        const rows = [
          ...headerRows.map(r => r.join(',')),
          keys.join(','),
          ...csvData.map(row =>
            keys
              .map(k => {
                let val = row[k];
                if (typeof val === 'string') {
                  val = `"${val.replace(/"/g, '""')}"`;
                }
                return val;
              })
              .join(',')
          ),
        ];
      
        // Create CSV and download
        const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${defaultName}.csv`;
        link.click();
        URL.revokeObjectURL(url);
  }
  