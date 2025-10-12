// Test email deliverability
require('dotenv').config({ path: '.env.local' });

async function testAlternativeEmail() {
  const apiKey = process.env.RESEND_API_KEY;
  
  console.log('=== Email Deliverability Test ===\n');
  console.log('Sending test email to check deliverability...\n');
  
  try {
    // Test with a different recipient to see if it's a domain-specific issue
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <contact@noreply.bakk3r.com>',
        to: ['liam@bakk3r.com', 'delivered@resend.dev'], // resend.dev is a test inbox
        subject: 'Portfolio Deliverability Test - ' + new Date().toISOString(),
        html: `
          <h2>Email Deliverability Test</h2>
          <p>This email tests if messages are being delivered correctly.</p>
          <p>Time sent: ${new Date().toLocaleString()}</p>
          <hr>
          <p>Check the following:</p>
          <ul>
            <li>Primary inbox</li>
            <li>Spam/Junk folder</li>
            <li>Promotions tab (Gmail)</li>
            <li>All Mail folder</li>
          </ul>
        `,
        reply_to: 'test@example.com',
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('Email ID:', result.id);
      console.log('\nCheck these locations:');
      console.log('1. Resend dashboard: https://resend.com/emails');
      console.log('2. Look for the email with ID:', result.id);
      console.log('3. Check the delivery status and any bounce messages');
      console.log('\nAlso sent to delivered@resend.dev for testing');
    } else {
      console.log('❌ Failed to send:', result);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAlternativeEmail();