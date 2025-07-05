export function downloadCSV(headerRows, csvData, defaultName = 'results') {
  const keys   = Object.keys(csvData[0]);
  const BOM    = '\uFEFF';
  const offsetCols = 3;               // how many empty columns → start table at D
  const emptyCells = Array(offsetCols).fill('');

  /* ---------- build rows side-by-side ---------- */
  const maxRows = Math.max(headerRows.length, csvData.length + 1); // +1 for table header
  const rows = [];

  for (let r = 0; r < maxRows; r++) {
    /* ----- LEFT block (overview / config) ----- */
    const left = headerRows[r] ?? [''];           // default empty row
    const leftCells = [...left];                  // clone

    /* pad with blanks so we always occupy exactly offsetCols cells (A-C) */
    while (leftCells.length < offsetCols) leftCells.push('');

    /* ----- RIGHT block (table) ----- */
    let rightCells = [];
    if (r === 0) {
      // first row → table header
      rightCells = keys;
    } else {
      const idx = r - 1;
      if (idx < csvData.length) {
        const obj = csvData[idx];
        rightCells = keys.map(k => {
          let v = obj[k];
          if (typeof v === 'string') v = `"${v.replace(/"/g, '""')}"`;
          return v;
        });
      }
    }

    rows.push([...leftCells, ...rightCells].join(','));
  }

  /* ---------- download ---------- */
  const csvText = BOM + rows.join('\n');
  const blob    = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
  const url     = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${defaultName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
