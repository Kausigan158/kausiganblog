import React, { useState } from 'react';
import { toast } from 'sonner';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { sendSubscriptionNotification, type SubscriptionData } from '../lib/emailService';

interface EmailSubscriptionProps {
  className?: string;
}

const EmailSubscription: React.FC<EmailSubscriptionProps> = ({ className = "" }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in a real implementation, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the email to your backend
      // For now, we'll simulate a successful subscription
      console.log('New subscription:', email);
      
      // Send notification email to kausigansrinivasan@gmail.com
      await sendSubscriptionNotificationToAdmin(email);
      
      setIsSubscribed(true);
      toast.success('Successfully subscribed! Thank you for joining our newsletter.');
      setEmail('');
      
      // Reset subscription state after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendSubscriptionNotificationToAdmin = async (subscriberEmail: string) => {
    const subscriptionData: SubscriptionData = {
      email: subscriberEmail,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ipAddress: 'Client-side (not available)' // IP would be available on server-side
    };

    // Send notification to kausigansrinivasan@gmail.com
    await sendSubscriptionNotification(subscriptionData);
    
    // Also try to call the API endpoint if it exists
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: subscriberEmail,
          notificationEmail: 'kausigansrinivasan@gmail.com'
        }),
      });
    } catch (error) {
      // API endpoint might not exist in development - that's okay
      console.log('API endpoint not available (development mode)');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="relative w-full sm:w-96">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={isSubmitting || isSubscribed}
            className="w-full pl-12 pr-6 py-4 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button 
          type="submit"
          disabled={isSubmitting || isSubscribed}
          className="netflix-button w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : isSubscribed ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Subscribed!</span>
            </>
          ) : (
            <span>Subscribe Now</span>
          )}
        </button>
      </form>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        No spam, unsubscribe at any time. We respect your privacy.
      </p>
    </div>
  );
};

export default EmailSubscription;
