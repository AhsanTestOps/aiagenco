
"use client";

import { useState } from "react";

export default function ContactTest() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testContact = async () => {
    setLoading(true);
    setResult("Testing...");
    
    try {
      const response = await fetch("http://localhost:3001/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: "Test User",
          email: "testuser@example.com",
          phone: "+1234567890",
          subject: "Test Contact Form",
          companyName: "Test Company",
          projectDetails: "This is a test contact form submission",
        }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Contact Form Test</h1>
      <button 
        onClick={testContact} 
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Testing..." : "Test Contact Form"}
      </button>
      
      {result && (
        <pre style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          border: "1px solid #ddd",
          overflow: "auto",
        }}>
          {result}
        </pre>
      )}
    </div>
  );
}
