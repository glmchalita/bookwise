export function Logo() {
  return (
    <strong className="flex items-center gap-2">
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Book Heart</title>
        <path
          d="M19 23.3l-.6-.5c-2-1.9-3.4-3.1-3.4-4.6 0-1.2 1-2.2 2.2-2.2.7 0 1.4.3 1.8.8.4-.5 1.1-.8 1.8-.8 1.2 0 2.2.9 2.2 2.2 0 1.5-1.4 2.7-3.4 4.6l-.6.5z"
          fill="#50B2C0"
        />
        <path
          d="M18 2c1.1 0 2 .9 2 2v9.08L19 13l-1 .08V4h-5v8l-2.5-2.25L8 12V4H6v16h7.08c.12.72.37 1.39.72 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h12z"
          fill="#8381D9"
        />
      </svg>
      <span className="font-bold text-gradient-horizontal text-xl leading-relaxed">BookWise</span>
    </strong>
  )
}
