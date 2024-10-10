import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export function getGoogleAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}');

  const client = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    SCOPES
  );

  return client;
}
