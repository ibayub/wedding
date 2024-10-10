import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

// Load credentials from environment variables
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route called with query:', req.query);

  if (req.method !== 'GET') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name } = req.query;

  if (!name || typeof name !== 'string') {
    console.log('Invalid name parameter:', name);
    return res.status(400).json({ message: 'Name is required and must be a string' });
  }

  try {
    console.log('Initializing Google Auth');
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    console.log('Initializing Google Sheets');
    const sheets = google.sheets({ version: 'v4', auth });

    console.log('Fetching data from Google Sheets');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID, // Updated to use environment variable
      range: 'Tables!A:B',
    });

    console.log('Data fetched successfully');
    const rows = response.data.values;
    if (rows) {
      console.log('Searching for matching name');
      const matchingRow = rows.find(row => row[0].toLowerCase() === name.toLowerCase());
      if (matchingRow) {
        console.log('Match found:', matchingRow);
        return res.status(200).json({ tableNumber: matchingRow[1] });
      } else {
        console.log('No match found for name:', name);
        return res.status(404).json({ message: 'Name not found in the guest list' });
      }
    } else {
      console.log('No data found in the spreadsheet');
      return res.status(404).json({ message: 'No data found in the spreadsheet' });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ message: 'Error fetching data from Google Sheets', error: error.message });
  }
}
