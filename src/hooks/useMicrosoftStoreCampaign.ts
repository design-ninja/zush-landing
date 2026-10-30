import { useEffect, useState } from 'react';
import { getMicrosoftStoreCampaignId } from '@/utils/microsoftStoreCampaign';

export function useMicrosoftStoreCampaign(): string | null {
  const [campaignId, setCampaignId] = useState<string | null>(null);
  useEffect(() => { setCampaignId(getMicrosoftStoreCampaignId()); }, []);
  return campaignId;
}
