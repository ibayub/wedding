import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}');
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const RANGE = 'Tables!A:A'; // Fetch only column A (names)

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
    
    // Fetch column A (names only)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;

    if (rows && rows.length > 0) {
      const names = rows.slice(1).map(row => row[0]); // Exclude the header row
      res.status(200).json({ names });
    } else {
      res.status(404).json({ message: 'No data found in the spreadsheet' });
    }
  } catch (error) {
    console.error('Error fetching names from Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch names from Google Sheets' });
  }
}
