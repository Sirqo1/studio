'use client';

import type { LucideProps } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ElementType } from 'react';

interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: ElementType<LucideProps>;
  className?: string;
  actions?: React.ReactNode;
}

export function FeatureCard({ title, description, icon: Icon, className, actions }: FeatureCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="h-6 w-6 text-primary" />}
            <CardTitle className="font-headline text-lg">{title}</CardTitle>
          </div>
          {actions && <div className="ml-auto">{actions}</div>}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    </Card>
  );
}
