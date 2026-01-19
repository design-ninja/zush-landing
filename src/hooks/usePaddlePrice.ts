import { useState, useEffect } from 'react';
import { getPaddlePrice } from '../utils/paddle';

export const usePaddlePrice = (priceId?: string | null) => {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!priceId) {
      setLoading(false);
      setPrice(null);
      return;
    }

    getPaddlePrice(priceId)
      .then((priceData) => {
        if (priceData?.formatted) {
          setPrice(priceData.formatted);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [priceId]);

  return { price, loading };
};
