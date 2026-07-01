import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdUpload, MdDownload, MdCheckCircle, MdError } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

export default function ImportUsersModal({ isOpen, onClose, roles, userRepo, onImportComplete }) {
  const [file, setFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDownloadSample = () => {
    const wsData = [
      ["Employee ID", "Full Name", "Email", "Password", "Laptop Number", "Phone Number", "Role"],
      ["EMP-001", "Ahmed Elmalah", "ahmed@example.com", "Pass@123", "LP-101", "01000000000", "Authenticated"],
      ["EMP-002", "IT Support One", "it@example.com", "Secure!45", "LP-102", "01111111111", "help"]
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sample Users");
    XLSX.writeFile(wb, "PZone_Users_Sample.xlsx");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setResults(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsImporting(true);
    setResults(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        
        if (rows.length === 0) {
          toast.error("The Excel file is empty.");
          setIsImporting(false);
          return;
        }

        setTotal(rows.length);
        let successCount = 0;
        let errorCount = 0;
        const errorDetails = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          setProgress(i + 1);

          try {
            const roleName = String(row["Role"] || "").trim().toLowerCase();
            const matchedRole = roles.find(r => r.name.toLowerCase() === roleName);
            
            if (!matchedRole) {
              throw new Error(`Role "${row["Role"]}" not found in system.`);
            }

            const payload = {
              employeeId: String(row["Employee ID"] || "").trim(),
              username: String(row["Full Name"] || "").trim(),
              email: String(row["Email"] || "").trim(),
              password: String(row["Password"] || "").trim(),
              deviceNumber: String(row["Laptop Number"] || "").trim(),
              phoneNumber: String(row["Phone Number"] || "").trim(),
              role: matchedRole.id,
              blocked: false,
              confirmed: true
            };

            if (!payload.username || !payload.email || !payload.password) {
              throw new Error("Missing required fields (Name, Email, or Password).");
            }

            await userRepo.createUser(payload);
            successCount++;
          } catch (err) {
            errorCount++;
            const msg = err?.response?.data?.error?.message || err.message || "Unknown error";
            errorDetails.push(`Row ${i + 2} (${row["Email"] || "Unknown"}): ${msg}`);
          }
        }

        setResults({ success: successCount, errors: errorCount, details: errorDetails });
        
        if (errorCount === 0) {
          toast.success(`Successfully imported ${successCount} users!`);
        } else {
          toast.error(`Import finished with ${errorCount} errors.`);
        }

        if (onImportComplete && successCount > 0) {
          onImportComplete();
        }
      } catch (error) {
        console.error("Excel Parsing Error:", error);
        toast.error("Failed to parse the Excel file.");
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => {
    setFile(null);
    setResults(null);
    setProgress(0);
    setTotal(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    if (!isImporting) {
      handleReset();
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div style={{ backgroundColor: '#ffffff', width: '500px', minHeight: '300px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', color: '#000000', zIndex: 100001 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Import Users (Excel)</h2>
          <button
            onClick={handleClose}
            disabled={isImporting}
            style={{ background: 'none', border: 'none', cursor: isImporting ? 'not-allowed' : 'pointer', opacity: isImporting ? 0.5 : 1 }}
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {!results ? (
            <>
              {/* Instructions */}
              <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', border: '1px solid #dbeafe', fontSize: '14px', color: '#1e3a8a' }}>
                <p style={{ margin: '0 0 8px 0' }}>1. Download the sample Excel file to see the required format.</p>
                <p style={{ margin: '0 0 16px 0' }}>2. Fill it out and upload it below.</p>
                <button
                  onClick={handleDownloadSample}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}
                >
                  <MdDownload size={18} />
                  Download Sample Excel
                </button>
              </div>

              {/* Upload Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: '#374151' }}>Upload .xlsx File</label>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={isImporting}
                  style={{ display: 'block', width: '100%', fontSize: '14px', color: '#6b7280', cursor: 'pointer' }}
                />
              </div>

              {/* Progress indicator */}
              {isImporting && (
                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#111827', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AiOutlineLoading3Quarters className="animate-spin" style={{ color: '#2563eb' }} />
                      Importing users...
                    </span>
                    <span style={{ color: '#6b7280' }}>{progress} / {total}</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                    <div 
                      style={{ backgroundColor: '#2563eb', height: '8px', borderRadius: '9999px', transition: 'width 300ms', width: `${total > 0 ? (progress / total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Results Summary */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a' }}>
                  <MdCheckCircle size={24} />
                  <span style={{ fontWeight: 'bold' }}>Successfully imported: {results.success}</span>
                </div>
                {results.errors > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626' }}>
                      <MdError size={24} />
                      <span style={{ fontWeight: 'bold' }}>Failed: {results.errors}</span>
                    </div>
                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '16px', maxHeight: '128px', overflowY: 'auto' }}>
                      <ul style={{ fontSize: '14px', color: '#dc2626', listStyleType: 'disc', paddingLeft: '16px', margin: 0 }}>
                        {results.details.map((err, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleReset}
                style={{ width: '100%', padding: '8px 0', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: '600', color: '#374151', backgroundColor: 'transparent', cursor: 'pointer' }}
              >
                Import Another File
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!results && (
          <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: 'auto' }}>
            <button
              onClick={handleClose}
              disabled={isImporting}
              style={{ padding: '8px 24px', fontWeight: '600', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'transparent', color: '#374151', cursor: isImporting ? 'not-allowed' : 'pointer', opacity: isImporting ? 0.5 : 1 }}
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!file || isImporting}
              style={{ padding: '8px 24px', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '600', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: (!file || isImporting) ? 'not-allowed' : 'pointer', opacity: (!file || isImporting) ? 0.5 : 1 }}
            >
              {isImporting ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <MdUpload size={18} />
                  Start Import
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
