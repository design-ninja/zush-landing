import { useEffect, useState } from 'react';
import { getMicrosoftStoreCampaignId, prepareMicrosoftStoreCampaign } from '@/utils/microsoftStoreCampaign';

export function useMicrosoftStoreCampaign(): string | null {
  const [campaignId, setCampaignId] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    setCampaignId(getMicrosoftStoreCampaignId());
    void prepareMicrosoftStoreCampaign().then(id => { if (active) setCampaignId(id); });
    return () => { active = false; };
  }, []);
  return campaignId;
}
