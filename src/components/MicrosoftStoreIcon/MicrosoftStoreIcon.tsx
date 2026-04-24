interface MicrosoftStoreIconProps {
  size?: number;
}

const MicrosoftStoreIcon = ({ size = 24 }: MicrosoftStoreIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 248 248"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="ms-store-grad-bg"
        gradientUnits="userSpaceOnUse"
        x1="109.37"
        y1="72.28"
        x2="151.79"
        y2="230.9"
      >
        <stop offset="0" stopColor="#0669BC" />
        <stop offset="0.7147" stopColor="#1B4779" />
        <stop offset="1" stopColor="#233B61" />
      </linearGradient>
      <linearGradient
        id="ms-store-grad-top"
        gradientUnits="userSpaceOnUse"
        x1="124"
        y1="7.2"
        x2="124"
        y2="43.5"
      >
        <stop offset="0" stopColor="#30DAFF" />
        <stop offset="1" stopColor="#0194D4" />
      </linearGradient>
      <linearGradient
        id="ms-store-grad-bar"
        gradientUnits="userSpaceOnUse"
        x1="124"
        y1="2.54"
        x2="124"
        y2="14.08"
      >
        <stop offset="0" stopColor="#1FB8FD" />
        <stop offset="1" stopColor="#0591F2" />
      </linearGradient>
    </defs>
    <path
      fill="url(#ms-store-grad-bg)"
      d="M248,42c0-5.523-4.477-10-10-10H10C4.477,32,0,36.477,0,42v166c0,22.091,17.909,40,40,40h168c22.091,0,40-17.909,40-40V42z"
    />
    <path fill="#F25022" d="M120,88H72v48h48V88z" />
    <path fill="#7FBA00" d="M176,88h-48v48h48V88z" />
    <path fill="#00A4EF" d="M120,144H72v48h48V144z" />
    <path fill="#FFB900" d="M176,144h-48v48h48V144z" />
    <path
      fill="url(#ms-store-grad-top)"
      d="M56,16c0-8.837,7.163-16,16-16h104c8.837,0,16,7.163,16,16v24c0,4.418-3.582,8-8,8s-8-3.582-8-8V16H72v24c0,4.418-3.582,8-8,8s-8-3.582-8-8V16z"
    />
    <path fill="url(#ms-store-grad-bar)" d="M176,0H72v16h104V0z" />
  </svg>
);

export default MicrosoftStoreIcon;
