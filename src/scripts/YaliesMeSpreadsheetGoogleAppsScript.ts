const VITE_SUPABASE_URL = "<Insert Supabase URL>";
const VITE_SUPABASE_ANON_KEY = "<Insert Supabase Anon Key>"


function myFunction() {
  const response = UrlFetchApp.fetch(`${VITE_SUPABASE_URL}/rest/v1/users_facebook_places?id=not.is.null`, {
  headers: {
    Apikey: VITE_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${VITE_SUPABASE_ANON_KEY}`,
  },
  })
  const data = JSON.parse(response.getContentText());
  Logger.log(data);

  // The following code is modified from https://stackoverflow.com/questions/17982546/google-script-json-into-google-sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var dataSet = data
  var rows = []

  for (i = 0; i < dataSet.length; i++) {
    const row = dataSet[i];
    rows.push([row.name, row.year, row.email, row.major, row.description, row.phone, row.instagram, row.linkedin]);
  }

  dataRange = sheet.getRange(1, 1, rows.length, rows[0].length);
  dataRange.setValues(rows);

}
