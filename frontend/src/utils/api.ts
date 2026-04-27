const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

console.log('🔌 API_BASE_URL:', API_BASE_URL);

export async function sendContactForm(formData: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  companyName?: string;
  projectDetails: string;
}) {
  console.log('🚀 sendContactForm called with:', formData);
  
  try {
    const url = `${API_BASE_URL}/contact/send`;
    console.log('📤 Sending POST to:', url);

    console.log('⏳ Starting fetch...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('✅ Got response, status:', response.status);
    
    const data = await response.json();
    console.log('📦 Parsed response:', data);

    if (!response.ok) {
      console.error('❌ Response not OK:', response.status, data);
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    console.log('✅ Success! Returning:', data);
    return data;
  } catch (error: any) {
    console.error('❌ ERROR in sendContactForm:', error.message, error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
}
