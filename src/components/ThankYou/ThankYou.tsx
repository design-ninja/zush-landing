import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Mail, ArrowRight } from 'lucide-react';
import Button from '../Button';
import styles from './ThankYou.module.scss';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <section className={styles.ThankYou}>
      <div className={styles.ThankYou__Container}>
        <div className={styles.ThankYou__Icon}>
          <CheckCircle size={64} />
        </div>
        
        <h1 className={styles.ThankYou__Title}>
          Thank you for your purchase! 🎉
        </h1>
        
        <p className={styles.ThankYou__Subtitle}>
          Your Zush PRO license has been activated.
        </p>

        <div className={styles.ThankYou__Instructions}>
          <h3>What happens next:</h3>
          <ol>
            <li>The Zush app will automatically unlock PRO features</li>
            <li>An activation link will be sent to <strong>{email || 'your email'}</strong></li>
            <li>Use the link to activate PRO on other devices</li>
          </ol>
        </div>

        <div className={styles.ThankYou__Actions}>
          <Button as={Link} to="/" variant="primary" size="lg">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </div>

        <div className={styles.ThankYou__Help}>
          <p>Need a new activation link?</p>
          <Link to="/recover" className={styles.ThankYou__Link}>
            <span>Request Activation Link</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
