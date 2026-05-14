export const CSV_URL = process.env.PUBLIC_URL + '/data/Final_quotes.csv';

const DELIMITER = '|||';
let cached = null;

function parseLine(line) {
  const [pdb = '', mutation = '', mechanism = '', source = '', quote = ''] = line.split(DELIMITER);
  return [pdb.trim(), mutation.trim(), mechanism.trim(), source.trim(), quote.trim()];
}

export async function loadDataset() {
  if (cached) return cached;
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error('Failed to load dataset');
  const text = await res.text();
  const lines = text.split(/\r?\n/).filter(Boolean);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const [pdb, mutation, mechanism, source, rowData] = parseLine(lines[i]);
    rows.push({
      globalKey: `${pdb}_${mutation}_${i}`,
      metadataFields: { pdb, mutation, mechanism, source },
      rowData
    });
  }
  cached = rows;
  return rows;
}

const FIELD_MODE = {
  'metadataFields.pdb': 'exact',
  'metadataFields.mutation': 'partial',
  'metadataFields.mechanism': 'partial',
  'metadataFields.source': 'exact',
  rowData: 'partial'
};

function matches(row, field, term) {
  const mode = FIELD_MODE[field];
  if (!mode || !term?.trim()) return false;
  const q = term.trim().toLowerCase();
  const key = field === 'rowData' ? null : field.replace('metadataFields.', '');
  const val = (key ? row.metadataFields?.[key] : row.rowData) ?? '';
  const v = val.toLowerCase();
  return mode === 'exact' ? v === q : v.includes(q);
}

export function searchDataset(rows, search, { page = 1, limit = 50 } = {}) {
  page = Math.max(1, page);
  limit = Math.min(100, Math.max(1, limit));
  let list = rows;
  if (search?.field && search.term) {
    list = rows.filter((r) => matches(r, search.field, search.term));
  }
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    data: list.slice(start, start + limit),
    pagination: {
      total,
      page,
      limit,
      pages,
      hasNextPage: page < pages,
      hasPrevPage: page > 1
    }
  };
}
