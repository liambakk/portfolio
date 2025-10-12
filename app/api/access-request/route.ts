import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, reason } = body;

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
      console.error("RESEND_API_KEY is not configured");
      // Fallback to logging the request if email service is not configured
      console.log("Access Request:", { name, email, reason, timestamp: new Date().toISOString() });

      // You can still return success to the user
      return NextResponse.json(
        { message: "Request received successfully" },
        { status: 200 }
      );
    }

    // Send email using Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio <send@noreply.bakk3r.com>", // Using your verified domain
        to: "liam@bakk3r.com",
        subject: emailSubject,
        html: emailBody,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send email:", errorData);

      // Log the request even if email fails
      console.log("Access Request (email failed):", { name, email, reason, timestamp: new Date().toISOString() });

      return NextResponse.json(
        { error: "Failed to send request. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Request sent successfully" },
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