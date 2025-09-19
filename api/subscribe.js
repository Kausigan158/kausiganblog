// Simple API endpoint to handle email subscriptions
// This would typically be hosted on your backend server

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, notificationEmail } = req.body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Log the subscription (in a real app, you'd save to database)
    console.log(`New subscription: ${email}`);
    console.log(`Notification will be sent to: ${notificationEmail || 'kausigansrinivasan@gmail.com'}`);

    // Here you would typically:
    // 1. Save the subscriber to your database
    // 2. Send a notification email to kausigansrinivasan@gmail.com
    // 3. Send a welcome email to the subscriber
    
    // For demonstration, we'll simulate sending the notification
    await sendNotificationEmail(email, notificationEmail || 'kausigansrinivasan@gmail.com');

    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function sendNotificationEmail(subscriberEmail, adminEmail) {
  // This is where you would integrate with an email service
  // Examples: SendGrid, Mailgun, AWS SES, Nodemailer, etc.
  
  console.log(`📧 Sending notification to ${adminEmail}:`);
  console.log(`New subscriber: ${subscriberEmail}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Example with Nodemailer (uncomment and configure if using)
  /*
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS  // your app password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: 'New Newsletter Subscription',
    html: `
      <h2>New Newsletter Subscription</h2>
      <p>A new user has subscribed to your newsletter:</p>
      <ul>
        <li><strong>Email:</strong> ${subscriberEmail}</li>
        <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
        <li><strong>IP:</strong> ${req.ip || 'Unknown'}</li>
      </ul>
      <p>Please add this email to your mailing list.</p>
    `
  };

  await transporter.sendMail(mailOptions);
  */
  
  // For now, we'll just log the details
  // In a production environment, you would configure your email service here
  console.log('✅ Email notification prepared (configure email service to actually send)');
}
