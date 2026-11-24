import type { Transaction } from '@/context/FinanceContext';
import type { Row, Worksheet } from 'exceljs';

export interface ExportOptions {
  transactions: Transaction[];
  periodLabel: string;
  filterNote?: string;
  fileDate: string; // YYYY-MM-DD
}

type Align = 'left' | 'center' | 'right';

const GREEN = 'FF224431';
const INK = 'FF1E3A2B';
const LINE = 'FF9DB0A2';
const MUTED = 'FF5C7063';
const TOTAL_FILL = 'FFE8EFEA';
const WHITE = 'FFFFFFFF';
const RUPIAH = '"Rp"#,##0';
const FONT = 'Calibri';

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

// Build the date in UTC so Excel shows the same calendar day in every timezone
function isoToUtcDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1] ?? ''} ${y}`;
}

const thinBorder = {
  top: { style: 'thin' as const, color: { argb: LINE } },
  left: { style: 'thin' as const, color: { argb: LINE } },
  bottom: { style: 'thin' as const, color: { argb: LINE } },
  right: { style: 'thin' as const, color: { argb: LINE } },
};

// Draws a medium green frame around a rectangular block, keeping the inner borders
function frameRange(ws: Worksheet, r1: number, r2: number, c1: number, c2: number) {
  const edge = { style: 'medium' as const, color: { argb: GREEN } };
  for (let r = r1; r <= r2; r += 1) {
    for (let c = c1; c <= c2; c += 1) {
      const cell = ws.getCell(r, c);
      const b = { ...cell.border };
      if (r === r1) b.top = edge;
      if (r === r2) b.bottom = edge;
      if (c === c1) b.left = edge;
      if (c === c2) b.right = edge;
      cell.border = b;
    }
  }
}

// Centered report title, subtitle and a green divider line
function addTitleBlock(ws: Worksheet, colCount: number, title: string, subtitle: string) {
  const lastCol = String.fromCharCode(64 + colCount);

  ws.mergeCells(`A1:${lastCol}1`);
  const t = ws.getCell('A1');
  t.value = title;
  t.font = { name: FONT, size: 16, bold: true, color: { argb: GREEN } };
  t.alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getRow(1).height = 30;

  ws.mergeCells(`A2:${lastCol}2`);
  const s = ws.getCell('A2');
  s.value = subtitle;
  s.font = { name: FONT, size: 11, color: { argb: MUTED } };
  s.alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getRow(2).height = 20;

  ws.getRow(3).height = 6;
  for (let c = 1; c <= colCount; c += 1) {
    ws.getCell(3, c).border = { bottom: { style: 'medium', color: { argb: GREEN } } };
  }
}

function styleHeaderRow(row: Row, aligns: Align[]) {
  row.height = 24;
  row.eachCell((cell, col) => {
    cell.font = { name: FONT, size: 11, bold: true, color: { argb: WHITE } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
    cell.alignment = { vertical: 'middle', horizontal: aligns[col - 1], wrapText: true };
    cell.border = thinBorder;
  });
}

function styleBodyRow(row: Row, colCount: number, aligns: Align[], wrapCols: number[]) {
  for (let c = 1; c <= colCount; c += 1) {
    const cell = row.getCell(c);
    cell.font = { name: FONT, size: 11, color: { argb: INK } };
    cell.border = thinBorder;
    cell.alignment = {
      vertical: 'middle',
      horizontal: aligns[c - 1],
      wrapText: wrapCols.includes(c),
    };
  }
}

function styleTotalRow(row: Row, colCount: number, aligns: Align[]) {
  row.height = 24;
  for (let c = 1; c <= colCount; c += 1) {
    const cell = row.getCell(c);
    cell.font = { name: FONT, size: 11, bold: true, color: { argb: GREEN } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TOTAL_FILL } };
    cell.border = thinBorder;
    cell.alignment = { vertical: 'middle', horizontal: aligns[c - 1] };
  }
}

function setupPrint(ws: Worksheet, headerRow: number) {
  ws.pageSetup = {
    paperSize: 9, // A4
    orientation: 'portrait',
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    horizontalCentered: true,
    printTitlesRow: `${headerRow}:${headerRow}`,
    margins: { left: 0.6, right: 0.6, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 },
  };
  ws.headerFooter.oddFooter = '&L&8Sakuwise - Laporan Pengeluaran&R&8Halaman &P dari &N';
}

export async function exportTransactionsXlsx(opts: ExportOptions): Promise<void> {
  const { transactions, periodLabel, filterNote, fileDate } = opts;
  if (transactions.length === 0) return;

  // Loaded only when the user exports, so the library does not slow down the dashboard
  const ExcelJS = (await import('exceljs')).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Sakuwise';
  wb.title = 'Laporan Pengeluaran Sakuwise';
  wb.created = new Date();

  // ---------- Sheet 1: Transaksi ----------
  const HEADER_ROW = 9;
  const COLS = 6;
  const aligns1: Align[] = ['center', 'center', 'left', 'left', 'right', 'left'];

  const ws = wb.addWorksheet('Transaksi', {
    views: [{ state: 'frozen', ySplit: HEADER_ROW, showGridLines: false }],
  });
  ws.columns = [
    { width: 6 },
    { width: 14 },
    { width: 34 },
    { width: 22 },
    { width: 20 },
    { width: 34 },
  ];

  addTitleBlock(ws, COLS, 'LAPORAN PENGELUARAN', 'Sakuwise - Pengelola Keuangan Pribadi');

  const info: Array<[string, string]> = [
    ['Periode', periodLabel],
    ['Cakupan data', filterNote || 'Semua transaksi'],
    ['Tanggal ekspor', formatLongDate(fileDate)],
    ['Jumlah transaksi', `${transactions.length} transaksi`],
  ];
  info.forEach(([label, value], i) => {
    const r = 4 + i;
    ws.mergeCells(`A${r}:B${r}`);
    ws.mergeCells(`C${r}:F${r}`);
    const l = ws.getCell(`A${r}`);
    l.value = label;
    l.font = { name: FONT, size: 11, bold: true, color: { argb: INK } };
    l.alignment = { vertical: 'middle', horizontal: 'left' };
    const v = ws.getCell(`C${r}`);
    v.value = `: ${value}`;
    v.font = { name: FONT, size: 11, color: { argb: INK } };
    v.alignment = { vertical: 'middle', horizontal: 'left' };
    ws.getRow(r).height = 18;
  });
  ws.getRow(8).height = 8;

  const headerRow = ws.getRow(HEADER_ROW);
  headerRow.values = ['No', 'Tanggal', 'Deskripsi', 'Kategori', 'Jumlah', 'Keterangan'];
  styleHeaderRow(headerRow, aligns1);

  const first = HEADER_ROW + 1;
  transactions.forEach((t, i) => {
    const row = ws.getRow(first + i);
    row.values = [i + 1, isoToUtcDate(t.date), t.name, t.category, t.amount, t.note ?? ''];
    styleBodyRow(row, COLS, aligns1, [3, 6]);
    row.getCell(2).numFmt = 'dd/mm/yyyy';
    row.getCell(5).numFmt = RUPIAH;
  });

  const last = first + transactions.length - 1;
  const total = transactions.reduce((s, t) => s + t.amount, 0);

  const totalRowNo = last + 1;
  ws.mergeCells(`A${totalRowNo}:D${totalRowNo}`);
  const totalRow = ws.getRow(totalRowNo);
  totalRow.getCell(1).value = 'TOTAL PENGELUARAN';
  totalRow.getCell(5).value = { formula: `SUM(E${first}:E${last})`, result: total };
  totalRow.getCell(5).numFmt = RUPIAH;
  styleTotalRow(totalRow, COLS, ['left', 'left', 'left', 'left', 'right', 'left']);
  frameRange(ws, HEADER_ROW, totalRowNo, 1, COLS);

  ws.mergeCells(`A${totalRowNo + 2}:F${totalRowNo + 2}`);
  const note = ws.getCell(`A${totalRowNo + 2}`);
  note.value = 'Dokumen ini dihasilkan secara otomatis oleh aplikasi Sakuwise.';
  note.font = { name: FONT, size: 9, italic: true, color: { argb: MUTED } };
  note.alignment = { vertical: 'middle', horizontal: 'left' };

  ws.autoFilter = { from: `A${HEADER_ROW}`, to: `F${last}` };
  setupPrint(ws, HEADER_ROW);

  // ---------- Sheet 2: Ringkasan Kategori ----------
  const byCategory = new Map<string, { count: number; sum: number }>();
  for (const t of transactions) {
    const cur = byCategory.get(t.category) ?? { count: 0, sum: 0 };
    byCategory.set(t.category, { count: cur.count + 1, sum: cur.sum + t.amount });
  }
  const cats = [...byCategory.entries()].sort((a, b) => b[1].sum - a[1].sum);

  const HEADER2 = 5;
  const COLS2 = 5;
  const aligns2: Align[] = ['center', 'left', 'right', 'right', 'right'];

  const ws2 = wb.addWorksheet('Ringkasan Kategori', {
    views: [{ state: 'frozen', ySplit: HEADER2, showGridLines: false }],
  });
  ws2.columns = [{ width: 6 }, { width: 30 }, { width: 20 }, { width: 24 }, { width: 16 }];

  addTitleBlock(ws2, COLS2, 'RINGKASAN PENGELUARAN PER KATEGORI', `Periode: ${periodLabel}`);
  ws2.getRow(4).height = 8;

  const h2 = ws2.getRow(HEADER2);
  h2.values = ['No', 'Kategori', 'Jumlah Transaksi', 'Total Pengeluaran', 'Persentase'];
  styleHeaderRow(h2, aligns2);

  const catFirst = HEADER2 + 1;
  const catLast = catFirst + cats.length - 1;
  const rangeCat = `Transaksi!$D$${first}:$D$${last}`;
  const rangeAmt = `Transaksi!$E$${first}:$E$${last}`;
  const totalRef = `$D$${catLast + 1}`;

  cats.forEach(([name, v], i) => {
    const r = catFirst + i;
    const row = ws2.getRow(r);
    row.getCell(1).value = i + 1;
    row.getCell(2).value = name;
    row.getCell(3).value = { formula: `COUNTIF(${rangeCat},B${r})`, result: v.count };
    row.getCell(4).value = { formula: `SUMIF(${rangeCat},B${r},${rangeAmt})`, result: v.sum };
    row.getCell(5).value = { formula: `D${r}/${totalRef}`, result: total > 0 ? v.sum / total : 0 };
    styleBodyRow(row, COLS2, aligns2, [2]);
    row.getCell(4).numFmt = RUPIAH;
    row.getCell(5).numFmt = '0.0%';
  });

  const t2No = catLast + 1;
  ws2.mergeCells(`A${t2No}:B${t2No}`);
  const t2Row = ws2.getRow(t2No);
  t2Row.getCell(1).value = 'TOTAL';
  t2Row.getCell(3).value = { formula: `SUM(C${catFirst}:C${catLast})`, result: transactions.length };
  t2Row.getCell(4).value = { formula: `SUM(D${catFirst}:D${catLast})`, result: total };
  t2Row.getCell(5).value = { formula: `SUM(E${catFirst}:E${catLast})`, result: total > 0 ? 1 : 0 };
  t2Row.getCell(4).numFmt = RUPIAH;
  t2Row.getCell(5).numFmt = '0.0%';
  styleTotalRow(t2Row, COLS2, ['left', 'left', 'right', 'right', 'right']);
  frameRange(ws2, HEADER2, t2No, 1, COLS2);
  setupPrint(ws2, HEADER2);

  // ---------- Download ----------
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer as ArrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sakuwise-transaksi-${fileDate}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
