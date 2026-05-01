interface WindowsIconProps {
  colored?: boolean;
}

const WindowsIcon = ({ colored = false }: WindowsIconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {colored ? (
      <>
        <path fill="#F25022" d="M3 5.548l7.065-.966v6.822H3V5.548z" />
        <path fill="#7FBA00" d="M10.834 4.476L21 3v8.404H10.834V4.476z" />
        <path fill="#00A4EF" d="M3 18.452l7.065.966v-6.822H3v5.856z" />
        <path fill="#FFB900" d="M10.834 19.524L21 21v-8.404H10.834v6.928z" />
      </>
    ) : (
      <path
        fill="currentColor"
        d="M3 5.548l7.065-.966v6.822H3V5.548zm0 12.904l7.065.966v-6.822H3v5.856zm7.834 1.072L21 21V12.596h-10.166v6.928zM21 3l-10.166 1.476v6.928H21V3z"
      />
    )}
  </svg>
);

export default WindowsIcon;
