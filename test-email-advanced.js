// Advanced email test with multiple scenarios
require('dotenv').config({ path: '.env.local' });

const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function testEmailWithDifferentAddresses() {
  console.log('=== Testing Email Delivery ===\n');
  
  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not found in environment');
    return;
  }

  const testCases = [
    {
      name: 'Original configuration',
      from: 'Portfolio <contact@noreply.bakk3r.com>',
      to: 'liam@bakk3r.com',
    },
    {
      name: 'With explicit name',
      from: 'Liam Bakker Portfolio <contact@noreply.bakk3r.com>',
      to: 'liam@bakk3r.com',
    },
    {
      name: 'Simple from address',
      from: 'contact@noreply.bakk3r.com',
      to: 'liam@bakk3r.com',
    }
  ];

  for (const testCase of testCases) {
    console.log(`\nTesting: ${testCase.name}`);
    console.log(`From: ${testCase.from}`);
    console.log(`To: ${testCase.to}`);
    
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: testCase.from,
          to: testCase.to,
          subject: `Test Email - ${testCase.name} - ${new Date().toISOString()}`,
          html: `
            <h2>Test Email from Portfolio</h2>
            <p>This is a test email for configuration: <strong>${testCase.name}</strong></p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
            <hr>
            <p>If you receive this email, the configuration is working correctly.</p>
          `,
          reply_to: 'test@example.com',
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ Success! Email ID: ${result.id}`);
      } else {
        console.log(`❌ Failed:`, result);
      }
    } catch (error) {
      console.error(`❌ Network error:`, error.message);
    }
    
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n=== Checking Email Status ===\n');
  console.log('Please check:');
  console.log('1. Your inbox at liam@bakk3r.com');
  console.log('2. Your spam/junk folder');
  console.log('3. The Resend dashboard at https://resend.com/emails for delivery status');
  console.log('\nNote: Emails may take a few seconds to arrive.');
}

// Check if email might be going to spam
async function checkEmailHeaders() {
  console.log('\n=== Email Deliverability Tips ===\n');
  console.log('If emails are not arriving, check:');
  console.log('1. SPF records for noreply.bakk3r.com');
  console.log('2. DKIM records (Resend should handle this)');
  console.log('3. Check if bakk3r.com has proper MX records');
  console.log('4. Ensure the "to" email (liam@bakk3r.com) exists and is active');
}

// Run all tests
testEmailWithDifferentAddresses().then(() => {
  checkEmailHeaders();
});