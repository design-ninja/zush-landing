import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import Button from '../Button';
import { SUPABASE_URL } from '../../utils/supabase';
import styles from './ManageSubscription.module.scss';

const ManageSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/get-customer-portal-url`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (response.ok && data.portal_url) {
        window.location.href = data.portal_url;
      } else if (response.status === 404) {
        setError(
          'No active subscription found for this email. One-time purchases do not require subscription management.'
        );
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.ManageSubscription}>
      <div className={styles.ManageSubscription__Container}>
        <div className={styles.ManageSubscription__Icon}>
          <CreditCard size={48} />
        </div>

        <h1 className={styles.ManageSubscription__Title}>
          Manage Subscription
        </h1>

        <p className={styles.ManageSubscription__Subtitle}>
          Enter the email address associated with your Zush PRO subscription to
          manage your billing, update payment methods, or cancel your
          subscription.
        </p>

        <form onSubmit={handleSubmit} className={styles.ManageSubscription__Form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={styles.ManageSubscription__Input}
            disabled={isLoading}
          />

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                Open Customer Portal
                <ExternalLink size={16} />
              </>
            )}
          </Button>
        </form>

        {error && <p className={styles.ManageSubscription__Error}>{error}</p>}

        <div className={styles.ManageSubscription__Info}>
          <p>
            <strong>Note:</strong> This is only for monthly and annual
            subscriptions. One-time purchases do not require subscription
            management.
          </p>
        </div>

        <Link to="/" className={styles.ManageSubscription__BackLink}>
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ManageSubscription;
