import { NextResponse } from "next/server";
import transporter from '@/app/lib/emailConfig';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, emailAddress, contactNumber, organization, text } = body;

    // Validate required fields
    if (!firstName || !lastName || !emailAddress || !contactNumber || !organization || !text) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send email notification (non-blocking)
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASS) {
      try {
        const adminEmail = process.env.EMAIL_USER || process.env.SMTP_EMAIL;
        
        // Email to admin/company
        const adminEmailContent = {
          from: `"CareerConnect Contact Form" <${process.env.SMTP_EMAIL}>`,
          to: adminEmail,
          subject: `New Contact Form Inquiry from ${firstName} ${lastName}`,
          html: `
            <h2>New Contact Form Inquiry</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${emailAddress}</p>
            <p><strong>Contact Number:</strong> ${contactNumber}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Message:</strong></p>
            <p>${text.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Received on: ${new Date().toLocaleString()}</small></p>
          `,
          text: `
            New Contact Form Inquiry
            
            Name: ${firstName} ${lastName}
            Email: ${emailAddress}
            Contact Number: ${contactNumber}
            Organization: ${organization}
            
            Message:
            ${text}
            
            Received on: ${new Date().toLocaleString()}
          `,
        };

        await transporter.sendMail(adminEmailContent);

        // Optional: Send confirmation email to the user
        const userEmailContent = {
          from: `"CareerConnect" <${process.env.SMTP_EMAIL}>`,
          to: emailAddress,
          subject: "Thank you for contacting CareerConnect",
          html: `
            <h2>Thank you for contacting us!</h2>
            <p>Dear ${firstName} ${lastName},</p>
            <p>We have received your inquiry and will get back to you as soon as possible.</p>
            <p><strong>Your message:</strong></p>
            <p>${text.replace(/\n/g, '<br>')}</p>
            <hr>
            <p>Best regards,<br>The CareerConnect Team</p>
          `,
          text: `
            Thank you for contacting us!
            
            Dear ${firstName} ${lastName},
            
            We have received your inquiry and will get back to you as soon as possible.
            
            Your message:
            ${text}
            
            Best regards,
            The CareerConnect Team
          `,
        };

        await transporter.sendMail(userEmailContent);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't fail the request if email fails, but log it
      }
    }

    return NextResponse.json(
      { message: "Your inquiry has been submitted successfully. We'll get back to you soon!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

