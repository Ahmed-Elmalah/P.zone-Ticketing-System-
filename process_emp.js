import * as XLSX from "xlsx";
import * as fs from "fs";

try {
  const buf = fs.readFileSync("src/emp.xlsx");
  const workbook = XLSX.read(buf);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  // Read as array of arrays so we don't lose the first row (which was treated as header)
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
  
  const formattedData = [
    ["Employee ID", "Full Name", "Email", "Password", "Laptop Number", "Phone Number", "Role"]
  ];

  let skippedCount = 0;

  // Start from index 0 since there are no actual headers
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    
    // Column mapping:
    // row[0] = Employee ID
    // row[2] = Arabic Name
    
    let rawEmpId = (row[0] || "").toString().trim();
    // Convert to 4 digits (e.g. 5 -> 0005, 65 -> 0065)
    // Extract only numbers just in case there are spaces or characters
    let numericEmpId = rawEmpId.replace(/\D/g, '');
    let empId = numericEmpId ? numericEmpId.padStart(4, '0') : "";
    
    // The user stated the username is strictly in Column C (index 2)
    let rawName = (row[2] || "").toString().trim();
    // Make the name exactly 3 parts
    let nameParts = rawName.split(/\s+/).filter(part => part.length > 0);
    let name = nameParts.slice(0, 3).join(" ");
    
    // Find device number by pattern /pzwks\d{3}/i anywhere in the row
    let deviceNum = "";
    for (let cell of row) {
      if (cell && typeof cell === 'string') {
        const match = cell.match(/pzwks\d{3}/i);
        if (match) {
          deviceNum = match[0];
          break;
        }
      }
    }
    
    // Fallback to row[4] just in case it doesn't match the strict 3-digit pattern but is there
    if (!deviceNum) {
      deviceNum = (row[4] || "").toString().trim();
    }

    // Set email strictly based on the padded Employee ID
    let email = empId ? `${empId}@pzoneinternational.com` : "";
    
    // Uniform password
    const password = "00000000";
    
    if (!name && !deviceNum && !email && !empId) {
      continue;
    }

    formattedData.push([
      empId,
      name,
      email,
      password,
      deviceNum,
      "", // Phone Number empty
      "Authenticated" // Default Role
    ]);
  }

  const newWs = XLSX.utils.aoa_to_sheet(formattedData);
  const newWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWb, newWs, "Ready Users");
  
  const outputPath = "src/Ready_Users_V7.xlsx";
  const outBuf = XLSX.write(newWb, { type: "buffer", bookType: "xlsx" });
  fs.writeFileSync(outputPath, outBuf);
  

} catch (error) {
  console.error("Error processing file:", error);
}
