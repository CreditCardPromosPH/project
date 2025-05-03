// Function to fetch data from Google Sheets
// This uses the Google Sheets API v4 which requires an API key

const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
const GOOGLE_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '';
const SHEET_NAME = 'Promos';  // The name of the sheet tab

// Debug logging
console.log('Environment variables:', {
  hasApiKey: !!GOOGLE_SHEETS_API_KEY,
  hasSheetId: !!GOOGLE_SHEET_ID,
  apiKeyLength: GOOGLE_SHEETS_API_KEY.length,
  sheetIdLength: GOOGLE_SHEET_ID.length
});

// Define which headers to process and how to map them
const HEADER_MAPPING: Record<string, string> = {
  'Promo_Title': 'title',
  'Promo_Description': 'description',
  'Bank': 'bank',
  'Category': 'category',
  'Promo_Image': 'image',
  'Expiry_Date': 'validUntil',
  'Promo_URL': 'externalLink',
  'Status': 'status'
};

export const fetchPromosFromGoogleSheets = async () => {
  if (!GOOGLE_SHEETS_API_KEY || !GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets API key or Sheet ID not provided');
  }

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_SHEETS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const data = await response.json();
    
    // Debug logging for headers and first row
    console.log('Headers from Google Sheets:', data.values[0]);
    console.log('First row of data:', data.values[1]);
    
    // Process the data
    const headers = data.values[0];
    const rows = data.values.slice(1);
    
    // Find the index of the Status column
    const statusIndex = headers.indexOf('Status');
    
    // Filter rows where Status is 'Active' before processing
    const activeRows = rows.filter(row => row[statusIndex] === 'Active');
    
    return activeRows.map((row: any[]) => {
      const promo: any = {};
      
      headers.forEach((header: string, index: number) => {
        const mappedKey = HEADER_MAPPING[header];
        if (mappedKey) {
          const value = row[index];
          
          // Handle boolean fields
          if (value === 'TRUE' || value === 'true') {
            promo[mappedKey] = true;
          } else if (value === 'FALSE' || value === 'false') {
            promo[mappedKey] = false;
          } else if (mappedKey === 'validUntil' && value) {
            // Simply pass through the value from Expiry_Date
            promo[mappedKey] = value;
          } else {
            promo[mappedKey] = value || '';
          }
        }
      });
      
      // Generate an ID if none is provided
      if (!promo.id) {
        promo.id = crypto.randomUUID();
      }
      
      return promo;
    });
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};