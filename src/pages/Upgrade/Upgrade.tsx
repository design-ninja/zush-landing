import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, CheckCircle, ArrowDown, Sparkles } from 'lucide-react';
import Button from '@/components/Button';
import { SUPABASE_URL } from '@/utils/supabase';
import { CreditPack, useRemoteConfig } from '@/hooks/useRemoteConfig';
import styles from './Upgrade.module.scss';

type UpgradeState = 'form' | 'loading' | 'confirm' | 'upgrading' | 'success' | 'error';
type BillingPeriod = 'monthly' | 'annual';

interface SubscriptionInfo {
  subscription_type: string;
  subscription_status: string;
  credits_per_month: number | null;
  paddle_price_id: string | null;
}

const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toLocaleString('en-US') : String(num);
};

const DEFAULT_CREDITS = [500, 2000, 5000, 10000];

const getCreditsByPeriod = (packs: CreditPack[], period: BillingPeriod): number[] => {
  const credits = packs
    .filter((pack) => pack.period === period)
    .map((pack) => pack.credits)
    .filter((value) => Number.isFinite(value));
  return Array.from(new Set(credits)).sort((a, b) => a - b);
};

const getPackByCredits = (
  packs: CreditPack[],
  period: BillingPeriod,
  credits: number
): CreditPack | undefined =>
  packs.find((pack) => pack.period === period && pack.credits === credits);

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

  const creditPacks = useMemo(() => config?.credit_packs ?? [], [config?.credit_packs]);
  const [selectedPeriod, setSelectedPeriod] = useState<BillingPeriod>('monthly');
  const [selectedCredits, setSelectedCredits] = useState(DEFAULT_CREDITS[0]);

  const availableCredits = useMemo(() => {
    const credits = getCreditsByPeriod(creditPacks, selectedPeriod);
    return credits.length > 0 ? credits : DEFAULT_CREDITS;
  }, [creditPacks, selectedPeriod]);

  const currentCredits = useMemo(() => {
    if (!subscriptionInfo) return null;
    if (typeof subscriptionInfo.credits_per_month === 'number') {
      return subscriptionInfo.credits_per_month;
    }
    if (subscriptionInfo.paddle_price_id) {
      const match = creditPacks.find(
        (pack) => pack.price_id === subscriptionInfo.paddle_price_id
      );
      return match?.credits ?? null;
    }
    return null;
  }, [subscriptionInfo, creditPacks]);

  useEffect(() => {
    if (subscriptionInfo?.subscription_type === 'monthly') {
      setSelectedPeriod('monthly');
    } else if (subscriptionInfo?.subscription_type === 'annual') {
      setSelectedPeriod('annual');
    }
  }, [subscriptionInfo?.subscription_type]);

  useEffect(() => {
    if (!availableCredits.includes(selectedCredits)) {
      setSelectedCredits(availableCredits[0]);
    }
  }, [availableCredits, selectedCredits]);

  useEffect(() => {
    if (currentCredits === null) {
      return;
    }
    const nextCredits = availableCredits.find((value) => value > currentCredits);
    if (nextCredits && nextCredits !== selectedCredits) {
      setSelectedCredits(nextCredits);
    }
  }, [availableCredits, currentCredits, selectedCredits]);

  const targetPack = getPackByCredits(
    creditPacks,
    selectedPeriod,
    selectedCredits
  );

  const getEligibilityError = (info: SubscriptionInfo | null): string | null => {
    if (!info?.subscription_type || !info?.subscription_status) {
      return 'Subscription details are missing. Please try again.';
    }
    if (info.subscription_type !== 'monthly' && info.subscription_type !== 'annual') {
      return 'Upgrade is available only for active subscriptions.';
    }
    if (info.subscription_status !== 'active' && info.subscription_status !== 'trialing') {
      return 'Your subscription is not active.';
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
        credits_per_month: data.credits_per_month ?? null,
        paddle_price_id: data.paddle_price_id ?? null,
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

    if (!targetPack?.price_id) {
      setError('Please select a valid plan to upgrade.');
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
          body: JSON.stringify({
            email: email.trim(),
            device_id: deviceId,
            target_price_id: targetPack.price_id,
          }),
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
            Your subscription has been upgraded successfully.
            <br />
            You now have access to {formatNumber(selectedCredits)} credits per month.
          </p>
          <Button as={Link} to="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </section>
    );
  }

  if (state === 'confirm' || state === 'upgrading') {
    const targetCredits = selectedCredits;
    const currentCreditsValue = currentCredits ?? 0;
    const canUpgrade = targetPack?.price_id && targetCredits > currentCreditsValue;

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
                <div className={styles.Upgrade__PlanName}>
                  {subscriptionInfo?.subscription_type === 'annual'
                    ? 'Pro Annual'
                    : 'Pro Monthly'}
                </div>
              </div>
              <div className={styles.Upgrade__PlanLimit}>
                {formatNumber(currentCredits ?? 0)} credits/month
              </div>
            </div>

            <div className={styles.Upgrade__Arrow}>
              <ArrowDown size={24} />
            </div>

            <div className={`${styles.Upgrade__Plan} ${styles.Upgrade__Plan_new}`}>
              <div className={styles.Upgrade__PlanInfo}>
                <div className={styles.Upgrade__PlanLabel}>NEW PLAN</div>
                <div className={styles.Upgrade__PlanName}>
                  {selectedPeriod === 'annual' ? 'Pro Annual 🌟' : 'Pro Monthly 🌟'}
                </div>
              </div>
              <div className={styles.Upgrade__PlanLimit}>
                {formatNumber(selectedCredits)} credits/month
              </div>
            </div>
          </div>

          <div className={styles.Upgrade__ToggleGroup}>
            <div className={styles.ToggleRow__Upgrade}>
              <button
                className={`${styles.ToggleButton__Upgrade} ${
                  selectedPeriod === 'monthly' ? styles.ToggleButton__Upgrade_active : ''
                }`}
                onClick={() => setSelectedPeriod('monthly')}
                disabled={state === 'upgrading'}
              >
                Monthly
              </button>
              <button
                className={`${styles.ToggleButton__Upgrade} ${
                  selectedPeriod === 'annual' ? styles.ToggleButton__Upgrade_active : ''
                }`}
                onClick={() => setSelectedPeriod('annual')}
                disabled={state === 'upgrading'}
              >
                Annual
              </button>
            </div>

            <div className={styles.PackLabel__Upgrade}>
              Choose your monthly credits · 1 credit = 1 rename
            </div>
            <div className={styles.PackToggle__Upgrade}>
              {availableCredits.map((credits) => (
                <button
                  key={credits}
                  className={`${styles.ToggleButton__Upgrade} ${styles.PackToggleButton__Upgrade} ${
                    selectedCredits === credits ? styles.ToggleButton__Upgrade_active : ''
                  }`}
                  onClick={() => setSelectedCredits(credits)}
                  disabled={state === 'upgrading'}
                >
                  {formatNumber(credits)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.Upgrade__ProrationNote}>
            💳 You'll be charged the prorated difference immediately.
            Your billing cycle will reset to {selectedPeriod}.
          </div>

          {error && <p className={styles.Upgrade__Error}>{error}</p>}
          {!canUpgrade && (
            <p className={styles.Upgrade__Hint}>
              Please select a plan with more credits than your current plan.
            </p>
          )}

          <div className={styles.Upgrade__Actions}>
            <Button
              variant="primary"
              onClick={handleUpgrade}
              disabled={state === 'upgrading' || !canUpgrade}
              isLoading={state === 'upgrading'}
            >
              {state === 'upgrading' ? 'Upgrading...' : 'Confirm Upgrade'}
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
          Enter the email address associated with your Zush PRO subscription to
          upgrade your plan and get more credits.
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

          <Button
            type="submit"
            variant="primary"
            disabled={state === 'loading'}
            isLoading={state === 'loading'}
          >
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
