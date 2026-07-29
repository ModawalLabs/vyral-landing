/** Empty media slot. Swap in an <Image>/<video> and the geometry is unchanged. */
export function MediaPlaceholder({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-zinc-900 text-zinc-600">
      <div className="flex flex-col items-center gap-1.5">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <circle cx="8.5" cy="10" r="1.4" />
          <path d="M3.5 17l5-5 4.5 4.5 3-3 4.5 4.5" />
        </svg>
        {label && (
          <span className="font-mono text-[10px] tracking-widest">{label}</span>
        )}
      </div>
    </div>
  );
}
