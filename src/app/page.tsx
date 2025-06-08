
'use client';

import React from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { FeatureCard } from '@/components/feature-card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Welcome to Your Firebase Studio App
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">
                This is your starting point. Customize it to build something amazing with Next.js, React, and Genkit.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
                <Icons.ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/600x400.png"
                alt="App placeholder image"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint="modern technology"
              />
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Modern Stack"
                icon={Icons.Layers}
                description="Built with Next.js, React, Tailwind CSS, and ShadCN UI components for a cutting-edge development experience."
              />
              <FeatureCard
                title="AI-Powered"
                icon={Icons.Cpu}
                description="Easily integrate generative AI features into your application using Genkit."
              />
              <FeatureCard
                title="Ready to Customize"
                icon={Icons.Wrench}
                description="This template is a starting point. Modify and extend it to fit your project's unique needs."
              />
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
