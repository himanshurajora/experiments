import xlsx from "xlsx";

const data = xlsx.readFile("sample.xlsx");

const r = xlsx.utils.sheet_to_json(data.Sheets[data.SheetNames[0]], {
  defval: null,
});

console.log(r);
