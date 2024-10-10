import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

// Load credentials from environment variables
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}');

// Google Sheets ID and Range (using environment variables)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const RANGE = 'Tables!A:B'; // Fetches names and table numbers from column A and B

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    await client.authorize();

    const sheets = google.sheets({ version: 'v4', auth: client });

    // Fetch column A (names) and column B (table numbers)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'No data found in the spreadsheet' });
    }

    // Skip the header row (assumes first row is the header)
    const dataRows = rows.slice(1);

    const { name } = req.query;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing name parameter' });
    }

    const loweredName = name.toLowerCase();

    // Log all available names for debugging (skipping the header row)
    console.log("Available names:", dataRows.map(row => row[0]));

    // Perform exact matching with safety checks
    const result = dataRows.find(row => {
      // Ensure the row exists, has a valid name (row[0]), and is not empty
      if (row && row[0] && typeof row[0] === 'string') {
        return row[0].toLowerCase() === loweredName;
      }
      return false; // Skip rows without a valid name
    });

    if (result) {
      return res.status(200).json({ tableNumber: result[1] || 'No table number found' });
    } else {
      console.log('No match found for name:', name);
      return res.status(404).json({ message: `No table number found for ${name}` });
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
