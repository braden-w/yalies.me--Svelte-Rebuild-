const VITE_SUPABASE_URL = "<Insert Supabase URL>";
const VITE_SUPABASE_ANON_KEY = "<Insert Supabase Anon Key>"


function myFunction() {
  clearEntireSpreadsheet();
  const response = UrlFetchApp.fetch(`${VITE_SUPABASE_URL}/rest/v1/users_facebook_places?id=not.is.null`, {
  headers: {
    Apikey: VITE_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${VITE_SUPABASE_ANON_KEY}`,
  },
  })
  const data = JSON.parse(response.getContentText());
  Logger.log(data);

  // The following code is modified from https://stackoverflow.com/questions/17982546/google-script-json-into-google-sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  const rows = []

  data.forEach(function (row) {
    const {name, year, email, major, description, phone, instagram, linkedin} = row
    rows.push([name, year, email, major, description, phone, instagram, linkedin])
  })

  dataRange = sheet.getRange(2, 1, rows.length, rows[0].length);
  dataRange.setValues(rows);

}

function clearEntireSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  sheet.clear();
}