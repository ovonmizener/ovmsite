import { NextResponse } from 'next/server';
import { z } from 'zod';
// import nodemailer from 'nodemailer';

// Define the schema for input validation using Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  email: z.string().email('Invalid email address.'),
  subject: z.string().min(3, 'Subject must be at least 3 characters long.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

// Create a transporter using environment variables
// const transporter = nodemailer.createTransporter({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_APP_PASSWORD,
//   },
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input against the schema
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input.', issues: validation.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL, // This will be your email, stored in env
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    // await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
