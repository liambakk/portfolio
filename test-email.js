// Test script for access request email functionality
// Run with: node test-email.js

require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    reason: "This is a test submission to verify the email functionality is working correctly."
  };

  try {
    console.log('Testing access request API...');
    console.log('API Key configured:', !!process.env.RESEND_API_KEY);
    
    const response = await fetch('http://localhost:3000/api/access-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Success:', result);
    } else {
      console.log('❌ Error:', result);
    }
    
    console.log('Response status:', response.status);
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Direct API test (without going through Next.js)
async function testResendDirectly() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.log('❌ RESEND_API_KEY not found in environment');
    return;
  }

  console.log('\nTesting Resend API directly...');
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <contact@noreply.bakk3r.com>',
        to: 'liam@bakk3r.com',
        subject: 'Test Email from Portfolio',
        html: '<p>This is a test email to verify Resend configuration.</p>',
        reply_to: 'test@example.com',
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Direct API Success:', result);
    } else {
      console.log('❌ Direct API Error:', result);
    }
  } catch (error) {
    console.error('❌ Direct API Network error:', error.message);
  }
}

// Run tests
console.log('=== Access Request Email Test ===\n');

// Test direct Resend API first
testResendDirectly().then(() => {
  console.log('\nNote: To test the full flow, make sure your Next.js server is running on localhost:3000');
  console.log('Then uncomment the line below:');
  console.log('// testEmail();');
});