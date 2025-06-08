import type { LucideProps } from 'lucide-react';
import {
  GitCommit,
  FileText,
  Github,
  Globe,
  Lock,
  CheckCircle2,
  XCircle,
  Loader2,
  Settings2,
  PlayCircle,
  ExternalLink,
  Layers,
  Webhook,
  BookCheck,
  Wrench,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const Icons = {
  Logo: (props: LucideProps) => <Layers {...props} />,
  GitCommit: (props: LucideProps) => <GitCommit {...props} />,
  FileText: (props: LucideProps) => <FileText {...props} />,
  Github: (props: LucideProps) => <Github {...props} />,
  Globe: (props: LucideProps) => <Globe {...props} />,
  Lock: (props: LucideProps) => <Lock {...props} />,
  CheckCircle2: (props: LucideProps) => <CheckCircle2 {...props} />,
  XCircle: (props: LucideProps) => <XCircle {...props} />,
  Loader2: (props: LucideProps) => <Loader2 className={cn("animate-spin", props.className)} {...props} />,
  Settings2: (props: LucideProps) => <Settings2 {...props} />,
  PlayCircle: (props: LucideProps) => <PlayCircle {...props} />,
  ExternalLink: (props: LucideProps) => <ExternalLink {...props} />,
  Webhook: (props: LucideProps) => <Webhook {...props} />,
  BookCheck: (props: LucideProps) => <BookCheck {...props} />,
  Wrench: (props: LucideProps) => <Wrench {...props} />,
  AlertTriangle: (props: LucideProps) => <AlertTriangle {...props} />,
  Info: (props: LucideProps) => <Info {...props} />,
};

// Helper for cn if not globally available in this file context, otherwise remove.
// For components, usually it's imported from "@/lib/utils"
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
