import { useState, useEffect } from 'react';
import { getPaddlePrice } from '../utils/paddle';

const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;

export const usePaddlePrice = (priceId?: string | null) => {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finalPriceId = priceId || PADDLE_PRICE_ID;
    
    if (!finalPriceId) {
      setLoading(false);
      return;
    }

    getPaddlePrice(finalPriceId)
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
