import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Legacy upgrade page - redirects to pricing section with upgrade parameters
 */
const Upgrade = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const deviceId = searchParams.get('device_id');

  useEffect(() => {
    // Build the redirect URL with parameters
    const params = new URLSearchParams();
    if (email) params.set('email', email);
    if (deviceId) params.set('device_id', deviceId);
    
    const queryString = params.toString();
    const redirectUrl = queryString ? `/?${queryString}#pricing` : '/#pricing';
    
    navigate(redirectUrl, { replace: true });
  }, [email, deviceId, navigate]);

  return null;
};

export default Upgrade;
