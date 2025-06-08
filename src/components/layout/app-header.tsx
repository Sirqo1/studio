import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">React GitHub Pages</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://github.com/features/pages" target="_blank" rel="noopener noreferrer">
              GitHub Pages Docs
              <Icons.ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
