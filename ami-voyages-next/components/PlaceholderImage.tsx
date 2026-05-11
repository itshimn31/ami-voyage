import { ImageIcon } from 'lucide-react';

interface Props {
  description: string;
  className?: string;
  ratio?: string;
}

/**
 * Elegant placeholder when a [CLIENT] photo is missing.
 */
export default function PlaceholderImage({
  description,
  className = '',
  ratio = 'aspect-[4/3]',
}: Props) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-magenta ${ratio} ${className}`}
    >
      <div className="absolute inset-0 topo-bg opacity-30" />
      <div className="relative flex flex-col items-center gap-4 px-8 text-center text-white/90">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
          <ImageIcon className="h-6 w-6" strokeWidth={1.6} />
        </div>
        <p className="max-w-xs text-sm font-medium">
          Photo à fournir : {description}
        </p>
      </div>
    </div>
  );
}
