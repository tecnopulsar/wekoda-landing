'use client';

import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  FOUNDER_PROGRAM_INTEREST,
  requestContactWithInterest,
} from '@/lib/constants';

type FounderApplyButtonProps = {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: ReactNode;
};

export function FounderApplyButton({
  size = 'lg',
  className,
  children = 'Quiero ser sitio fundador',
}: FounderApplyButtonProps) {
  return (
    <Button
      type='button'
      size={size}
      className={
        className ??
        'group bg-primary text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40'
      }
      data-action='apply-founder-site'
      data-entity='lead'
      onClick={() => requestContactWithInterest(FOUNDER_PROGRAM_INTEREST)}
    >
      {children}
      <ArrowRight
        className='size-4 transition-transform group-hover:translate-x-0.5'
        aria-hidden
      />
    </Button>
  );
}
