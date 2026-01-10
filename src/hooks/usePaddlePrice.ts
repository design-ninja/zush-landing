import { useState, useEffect } from 'react';
import { getPaddlePrice } from '../utils/paddle';

const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;

export const usePaddlePrice = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!PADDLE_PRICE_ID) {
      setLoading(false);
      return;
    }

    getPaddlePrice(PADDLE_PRICE_ID)
      .then((priceData) => {
        if (priceData?.formatted) {
          setPrice(priceData.formatted);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { price, loading };
};
