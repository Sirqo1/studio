'use client';

import React, { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { FeatureCard } from '@/components/feature-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface BuildLog {
  id: string;
  message: string;
  timestamp: string;
  status: 'success' | 'failure' | 'pending';
}

const initialBuildLogs: BuildLog[] = [
  { id: '3', message: 'Deployment to my-app.github.io complete', timestamp: '2023-10-26 10:05:00', status: 'success' },
  { id: '2', message: 'Build started for commit #a1b2c3d', timestamp: '2023-10-26 10:00:00', status: 'pending' },
  { id: '1', message: 'Webhook received from repository', timestamp: '2023-10-26 09:55:00', status: 'success' },
];

const sampleYamlConfig = `# Sample jekyll-gh-pages.yml for a React App
# This is a conceptual representation.
# Actual GitHub Actions workflow for React would differ.

source: ./build # Assumes React build output is in 'build' directory
destination: ./_site

# Custom build command for React (if needed before gh-pages step)
# build_command: npm run build

# GitHub Pages settings
# repository: your-username/your-repo-name
# branch: gh-pages # branch to deploy to

# Custom domain (optional)
# cname: your.customdomain.com

# Exclude files/folders from deployment
exclude:
  - node_modules/
  - src/
  - public/
  - .gitignore
  - README.md
`;

export default function HomePage() {
  const { toast } = useToast();
  const [buildLogs, setBuildLogs] = useState<BuildLog[]>(initialBuildLogs);
  const [isBuilding, setIsBuilding] = useState(false);
  const [yamlConfig, setYamlConfig] = useState(sampleYamlConfig);
  const [customDomain, setCustomDomain] = useState('your-app.github.io');
  const [enableHttps, setEnableHttps] = useState(true);
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);


  const handleTriggerBuild = () => {
    setIsBuilding(true);
    toast({
      title: "Build Triggered",
      description: "A new build process has been initiated.",
    });
    const newLogId = (buildLogs.length + 1).toString();
    const newLog: BuildLog = {
      id: newLogId,
      message: 'New build manually triggered',
      timestamp: new Date().toLocaleString(),
      status: 'pending',
    };
    setBuildLogs(prevLogs => [newLog, ...prevLogs]);

    setTimeout(() => {
      setBuildLogs(prevLogs =>
        prevLogs.map(log =>
          log.id === newLogId ? { ...log, status: 'success', message: 'Build successful for manual trigger' } : log
        )
      );
      setIsBuilding(false);
      toast({
        title: "Build Successful",
        description: "The new build has completed successfully.",
        variant: "default",
      });
    }, 3000);
  };

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Your jekyll-gh-pages.yml configuration has been updated (simulated).",
    });
  };

  const handleSaveDomain = () => {
     toast({
      title: "Domain Updated",
      description: `Custom domain set to ${customDomain} (simulated).`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Deployment Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage and monitor your React application deployments to GitHub Pages.
            </p>
            {currentTime !== null && (
               <p className="text-sm text-muted-foreground mt-1">Current time: {currentTime}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Automated Builds"
              icon={Icons.GitCommit}
              description="Monitor and trigger your application builds."
              className="md:col-span-2"
              actions={
                <Button onClick={handleTriggerBuild} disabled={isBuilding} variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isBuilding ? <Icons.Loader2 className="mr-2" /> : <Icons.PlayCircle className="mr-2" />}
                  Trigger New Build
                </Button>
              }
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Recent Activity:</h4>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2 rounded-md border p-3 bg-muted/20">
                  {buildLogs.map((log) => (
                    <div key={log.id} className="text-xs p-2 rounded-md bg-background shadow-sm border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{log.message}</span>
                        {log.status === 'success' && <Icons.CheckCircle2 className="h-4 w-4 text-green-500" />}
                        {log.status === 'failure' && <Icons.XCircle className="h-4 w-4 text-red-500" />}
                        {log.status === 'pending' && <Icons.Loader2 className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <p className="text-muted-foreground">{log.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FeatureCard>

            <FeatureCard
              title="Configuration File"
              icon={Icons.Wrench}
              description="Manage your jekyll-gh-pages.yml content."
              className="lg:col-span-1 md:col-span-2"
                 actions={
                <Button onClick={handleSaveConfig} size="sm">
                  <Icons.Settings2 className="mr-2 h-4 w-4" /> Save Config
                </Button>
              }
            >
              <Textarea
                value={yamlConfig}
                onChange={(e) => setYamlConfig(e.target.value)}
                rows={10}
                className="font-code text-xs h-60"
                placeholder="Enter your YAML configuration..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                This editor allows you to modify the conceptual content of your deployment configuration file.
              </p>
            </FeatureCard>

            <FeatureCard
              title="GitHub Pages Compliance"
              icon={Icons.BookCheck}
              description="Ensure your app meets GitHub Pages requirements."
            >
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Build output served from <code className="font-code bg-muted px-1 py-0.5 rounded">docs/</code> folder or <code className="font-code bg-muted px-1 py-0.5 rounded">gh-pages</code> branch.</li>
                <li>Ensure an <code className="font-code bg-muted px-1 py-0.5 rounded">index.html</code> file is at the root of your deployment source.</li>
                <li>Asset paths should be relative or correctly configured for the repository path.</li>
              </ul>
               <Button variant="link" size="sm" asChild className="mt-2 px-0">
                <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages" target="_blank" rel="noopener noreferrer">
                  Learn More <Icons.ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </FeatureCard>

            <FeatureCard
              title="Custom Domain"
              icon={Icons.Globe}
              description="Configure a custom domain for your deployed application."
            >
              <div className="space-y-2">
                <Label htmlFor="custom-domain-input">Domain Name</Label>
                <Input
                  id="custom-domain-input"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="e.g., www.your-app.com"
                />
              </div>
              <Button onClick={handleSaveDomain} className="mt-4 w-full" variant="outline">
                <Icons.Settings2 className="mr-2 h-4 w-4" /> Save Domain
              </Button>
            </FeatureCard>

            <FeatureCard
              title="HTTPS Support"
              icon={Icons.Lock}
              description="Manage HTTPS for your application."
            >
              <div className="flex items-center space-x-2 mb-2">
                <Switch
                  id="https-switch"
                  checked={enableHttps}
                  onCheckedChange={setEnableHttps}
                  aria-label="Toggle HTTPS"
                />
                <Label htmlFor="https-switch" className="cursor-pointer">Enable HTTPS</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                GitHub Pages provides HTTPS for sites on <code className="font-code bg-muted px-1 py-0.5 rounded">*.github.io</code> domains and custom domains.
              </p>
              <Alert variant={enableHttps ? "default" : "destructive"} className="mt-4">
                <div className="flex items-center">
                  {enableHttps ? <Icons.CheckCircle2 className="h-5 w-5 mr-2" /> : <Icons.AlertTriangle className="h-5 w-5 mr-2" />}
                  <AlertTitle className="font-semibold">{enableHttps ? "HTTPS Enabled" : "HTTPS Recommended"}</AlertTitle>
                </div>
                <AlertDescription className="text-xs">
                  {enableHttps
                    ? "Your site is configured to be served over a secure HTTPS connection."
                    : "HTTPS is currently disabled. It's highly recommended for security and user trust."}
                </AlertDescription>
              </Alert>
            </FeatureCard>

          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
