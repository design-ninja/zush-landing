import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, CheckCircle, ArrowDown, Sparkles } from 'lucide-react';
import Button from '@/components/Button';
import { SUPABASE_URL } from '@/utils/supabase';
import { useRemoteConfig } from '@/hooks/useRemoteConfig';
import styles from './Upgrade.module.scss';

type UpgradeState = 'form' | 'loading' | 'confirm' | 'upgrading' | 'success' | 'error';

interface SubscriptionInfo {
  subscription_type: string;
  subscription_status: string;
}

const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toLocaleString('en-US') : String(num);
};

const Upgrade = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailFromUrl = searchParams.get('email');
  const deviceId = searchParams.get('device_id');

  const [email, setEmail] = useState(emailFromUrl || '');
  const [state, setState] = useState<UpgradeState>(emailFromUrl ? 'loading' : 'form');
  const [error, setError] = useState('');
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const autoCheckTriggered = useRef(false);

  const { config } = useRemoteConfig();

  const monthlyLimit = config?.pro_monthly_limit_monthly ?? 1000;
  const annualLimit = config?.pro_monthly_limit_annual ?? 5000;

  const getEligibilityError = (info: SubscriptionInfo | null): string | null => {
    if (!info?.subscription_type || !info?.subscription_status) {
      return 'Subscription details are missing. Please try again.';
    }
    if (info.subscription_type === 'annual') {
      return 'Your subscription is already on the Annual plan.';
    }
    if (info.subscription_type !== 'monthly') {
      return 'Upgrade is available only for monthly subscriptions.';
    }
    if (info.subscription_status !== 'active') {
      return 'Your monthly subscription is not active.';
    }
    return null;
  };

  const runSubscriptionCheck = async (emailToCheck: string) => {
    if (!deviceId) {
      setError('Please open this page from the app to upgrade your subscription.');
      setState('form');
      return;
    }

    setState('loading');
    setError('');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/get-customer-portal-url`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailToCheck.trim(), device_id: deviceId }),
        }
      );

      if (response.status === 404) {
        setError('No active subscription found for this email.');
        setState('form');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setState('form');
        return;
      }

      const info: SubscriptionInfo = {
        subscription_type: data.subscription_type,
        subscription_status: data.subscription_status,
      };

      const eligibilityError = getEligibilityError(info);
      if (eligibilityError) {
        setError(eligibilityError);
        setState('form');
        return;
      }

      setSubscriptionInfo(info);
      setState('confirm');

    } catch {
      setError('Connection error. Please check your internet and try again.');
      setState('form');
    }
  };

  // Auto-check subscription if email is in URL
  useEffect(() => {
    if (emailFromUrl && !autoCheckTriggered.current) {
      autoCheckTriggered.current = true;
      runSubscriptionCheck(emailFromUrl);
    }
  }, [emailFromUrl, deviceId]);

  const checkSubscription = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }
    await runSubscriptionCheck(email);
  };

  const handleUpgrade = async () => {
    if (!deviceId) {
      setError('Please open this page from the app to upgrade your subscription.');
      setState('confirm');
      return;
    }

    const eligibilityError = getEligibilityError(subscriptionInfo);
    if (eligibilityError) {
      setError(eligibilityError);
      setState('confirm');
      return;
    }

    setState('upgrading');
    setError('');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/upgrade-subscription`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim(), device_id: deviceId }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setState('success');
      } else {
        setError(data.error || 'Failed to upgrade subscription. Please try again.');
        setState('confirm');
      }
    } catch {
      setError('Connection error. Please check your internet and try again.');
      setState('confirm');
    }
  };

  if (state === 'success') {
    return (
      <section className={styles.Upgrade}>
        <div className={styles.Upgrade__Container}>
          <div className={styles.Upgrade__SuccessIcon}>
            <CheckCircle size={64} />
          </div>
          <h1 className={styles.Upgrade__SuccessTitle}>Upgrade Complete! 🎉</h1>
          <p className={styles.Upgrade__SuccessText}>
            Your subscription has been upgraded to the Annual plan.
            <br />
            You now have access to {formatNumber(annualLimit)} renames per month.
          </p>
          <Button as={Link} to="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </section>
    );
  }

  if (state === 'confirm' || state === 'upgrading') {
    return (
      <section className={styles.Upgrade}>
        <div className={styles.Upgrade__Container}>
          <div className={styles.Upgrade__Icon}>
            <Sparkles size={48} />
          </div>

          <h1 className={styles.Upgrade__Title}>Upgrade Your Plan</h1>

          <div className={styles.Upgrade__Plans}>
            <div className={`${styles.Upgrade__Plan} ${styles.Upgrade__Plan_current}`}>
              <div className={styles.Upgrade__PlanInfo}>
                <div className={styles.Upgrade__PlanLabel}>CURRENT PLAN</div>
                <div className={styles.Upgrade__PlanName}>Pro Monthly</div>
              </div>
              <div className={styles.Upgrade__PlanLimit}>
                {formatNumber(monthlyLimit)} renames/month
              </div>
            </div>

            <div className={styles.Upgrade__Arrow}>
              <ArrowDown size={24} />
            </div>

            <div className={`${styles.Upgrade__Plan} ${styles.Upgrade__Plan_new}`}>
              <div className={styles.Upgrade__PlanInfo}>
                <div className={styles.Upgrade__PlanLabel}>NEW PLAN</div>
                <div className={styles.Upgrade__PlanName}>Pro Annual 🌟</div>
              </div>
              <div className={styles.Upgrade__PlanLimit}>
                {formatNumber(annualLimit)} renames/month
              </div>
            </div>
          </div>

          <div className={styles.Upgrade__ProrationNote}>
            💳 You'll be charged the prorated difference immediately.
            Your billing cycle will reset to annual.
          </div>

          {error && <p className={styles.Upgrade__Error}>{error}</p>}

          <div className={styles.Upgrade__Actions}>
            <Button
              variant="primary"
              onClick={handleUpgrade}
              disabled={state === 'upgrading'}
            >
              {state === 'upgrading' ? 'Upgrading...' : 'Confirm Upgrade to PRO Annual'}
            </Button>

            <Link to="/" className={styles.Upgrade__BackLink}>
              ← Cancel
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.Upgrade}>
      <div className={styles.Upgrade__Container}>
        <div className={styles.Upgrade__Icon}>
          <ArrowUp size={48} />
        </div>

        <h1 className={styles.Upgrade__Title}>Upgrade Your Plan</h1>

        <p className={styles.Upgrade__Subtitle}>
          Enter the email address associated with your Zush PRO Monthly
          subscription to upgrade to the Annual plan and get more renames.
        </p>

        <form onSubmit={checkSubscription} className={styles.Upgrade__Form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={styles.Upgrade__Input}
            disabled={state === 'loading'}
          />

          <Button type="submit" variant="primary" disabled={state === 'loading'}>
            {state === 'loading' ? 'Checking...' : 'Check Subscription'}
          </Button>
        </form>

        {error && <p className={styles.Upgrade__Error}>{error}</p>}

        <Link to="/" className={styles.Upgrade__BackLink}>
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Upgrade;
