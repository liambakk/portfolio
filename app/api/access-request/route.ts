import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting (for production, use Redis or similar)
const requestMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const requests = requestMap.get(identifier) || [];
  
  // Filter out old requests
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  requestMap.set(identifier, recentRequests);
  
  // Clean up old entries periodically
  if (Math.random() < 0.1) { // 10% chance to clean up
    for (const [key, times] of requestMap.entries()) {
      const recent = times.filter(time => now - time < RATE_LIMIT_WINDOW);
      if (recent.length === 0) {
        requestMap.delete(key);
      } else {
        requestMap.set(key, recent);
      }
    }
  }
  
  return true;
}

export async function POST(request: NextRequest) {
  console.log("[Access Request] Received new request");
  
  try {
    const body = await request.json();
    const { name, email, reason } = body;
    
    console.log("[Access Request] Request data:", { name, email, reason: reason.substring(0, 50) + "..." });

    // Validate required fields
    if (!name || !email || !reason) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check rate limiting (using email as identifier)
    if (!checkRateLimit(email.toLowerCase())) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Create email content
    const emailSubject = `Portfolio Access Request from ${name}`;
    const emailBody = `
      <h2>New Portfolio Access Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Reason:</strong></p>
      <p>${reason}</p>
      <hr>
      <p><small>Sent from portfolio contact form at ${new Date().toLocaleString()}</small></p>
    `;

    // Send email using a service (you can use any email service like SendGrid, Resend, etc.)
    // For this implementation, I'll use the Resend API as it's simple and reliable
    // You'll need to install it: npm install resend

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("[Access Request] ERROR: RESEND_API_KEY is not configured");
      // Fallback to logging the request if email service is not configured
      console.log("[Access Request] Fallback - logging request:", { name, email, reason, timestamp: new Date().toISOString() });

      // You can still return success to the user
      return NextResponse.json(
        { message: "Request received successfully" },
        { status: 200 }
      );
    }
    
    console.log("[Access Request] API key found, sending email...");

    // Send email using Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio <contact@noreply.bakk3r.com>", // Using verified domain
        to: "liam@bakk3r.com",
        subject: emailSubject,
        html: emailBody,
        reply_to: email,
      }),
    });
    
    console.log("[Access Request] Resend API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send email:", errorData);

      // Log the request even if email fails
      console.log("Access Request (email failed):", { 
        name, 
        email, 
        reason, 
        timestamp: new Date().toISOString(),
        error: errorData 
      });

      // Check for specific Resend errors
      if (response.status === 401) {
        console.error("Resend API authentication failed. Check your API key.");
      } else if (response.status === 422 && errorData.message?.includes("from")) {
        console.error("Invalid 'from' address. Ensure the domain is verified in Resend.");
      }

      return NextResponse.json(
        { error: "Failed to send request. Please try again later." },
        { status: 500 }
      );
    }

    const responseData = await response.json();
    console.log("[Access Request] Email sent successfully! ID:", responseData.id);
    
    return NextResponse.json(
      { message: "Request sent successfully", emailId: responseData.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing access request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}