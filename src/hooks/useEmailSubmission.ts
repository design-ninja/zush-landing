import { useState } from 'react';
import { SUPABASE_URL } from '@/utils/supabase';

type SubmitEvent = {
  preventDefault: () => void;
};

interface UseEmailSubmissionOptions {
  endpoint: string;
  onSubmitStart?: () => void;
  onSuccess: (response: Response) => Promise<void> | void;
  getErrorMessage?: (response: Response) => Promise<string> | string;
  messages?: {
    emailRequired?: string;
    genericError?: string;
    connectionError?: string;
  };
}

export function useEmailSubmission({
  endpoint,
  messages,
  onSubmitStart,
  onSuccess,
  getErrorMessage,
}: UseEmailSubmissionOptions) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (!email) {
      setError(messages?.emailRequired ?? 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    onSubmitStart?.();

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        await onSuccess(response);
      } else {
        setError(
          getErrorMessage
            ? await getErrorMessage(response)
            : messages?.genericError ?? 'Something went wrong. Please try again.',
        );
      }
    } catch {
      setError(messages?.connectionError ?? 'Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    error,
    handleSubmit,
    isLoading,
    setEmail,
  };
}
