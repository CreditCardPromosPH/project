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
    
    // Process the data
    // Assuming the first row contains headers
    const headers = data.values[0];
    const rows = data.values.slice(1);
    
    return rows.map((row: any[]) => {
      const promo: any = {};
      
      headers.forEach((header: string, index: number) => {
        // Only process headers that are in our mapping
        const mappedKey = HEADER_MAPPING[header];
        if (mappedKey) {
          const value = row[index];
          
          // Handle boolean fields
          if (value === 'TRUE' || value === 'true') {
            promo[mappedKey] = true;
          } else if (value === 'FALSE' || value === 'false') {
            promo[mappedKey] = false;
          } else if (mappedKey === 'validUntil' && value) {
            // Try to parse the date, fallback to original value if parsing fails
            try {
              // First try to parse as is
              let date = new Date(value);
              
              // If that fails, try common date formats
              if (isNaN(date.getTime())) {
                // Try MM/DD/YYYY format
                const parts = value.split('/');
                if (parts.length === 3) {
                  date = new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
                }
              }
              
              if (!isNaN(date.getTime())) {
                // Format as YYYY-MM-DD
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                promo[mappedKey] = `${year}-${month}-${day}`;
              } else {
                promo[mappedKey] = value;
              }
            } catch {
              promo[mappedKey] = value;
            }
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