import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '../Button';
import styles from './Recover.module.scss';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://sjzrgmvinyxjzvshfvjy.supabase.co';

const Recover = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-magic-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section className={styles.Recover}>
        <div className={styles.Recover__Container}>
          <div className={styles.Recover__Icon}>
            <CheckCircle size={64} />
          </div>
          
          <h1 className={styles.Recover__Title}>Check your inbox!</h1>
          
          <p className={styles.Recover__Subtitle}>
            If a purchase exists for <strong>{email}</strong>, we've sent an activation link.
            <br />
            Check your spam folder if you don't see it.
          </p>
          
          <Button as={Link} to="/" variant="primary" size="lg">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.Recover}>
      <div className={styles.Recover__Container}>
        <div className={styles.Recover__IconMail}>
          <Mail size={48} />
        </div>
        
        <h1 className={styles.Recover__Title}>Request Activation Link</h1>
        
        <p className={styles.Recover__Subtitle}>
          Enter the email address you used when purchasing Zush PRO. 
          We'll send you a new activation link.
        </p>

        <form onSubmit={handleSubmit} className={styles.Recover__Form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={styles.Recover__Input}
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            variant="primary"
            size="lg"
            fluid
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : (
              <>
                Send Activation Link
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </form>
        
        {error && (
          <p className={styles.Recover__Error}>{error}</p>
        )}
        
        <Link to="/" className={styles.Recover__BackLink}>
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Recover;
