const BirdsSVG = () => (
  <>
    <svg
      className="fixed pointer-events-none z-40 w-8 h-8"
      viewBox="0 0 24 24"
      style={{ animation: "fly 8s linear forwards 0.5s", opacity: 0 }}
    >
      <path
        d="M21 5l-1.5 1.5L15 4l-2 2 4 4-4 4 2 2 4.5-2.5L21 19V5z"
        fill="hsl(350, 74%, 21%)"
        opacity="0.25"
      />
    </svg>
    <svg
      className="fixed pointer-events-none z-40 w-6 h-6"
      viewBox="0 0 24 24"
      style={{ animation: "fly 10s linear forwards 1.2s", opacity: 0 }}
    >
      <path
        d="M21 5l-1.5 1.5L15 4l-2 2 4 4-4 4 2 2 4.5-2.5L21 19V5z"
        fill="hsl(350, 74%, 21%)"
        opacity="0.15"
      />
    </svg>
  </>
);

export default BirdsSVG;
