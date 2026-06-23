import {
  Globe,
  Smartphone,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export const services: Service[] = [
  {
    title: "Website Development",
    description:
      "Fast, modern, responsive websites built with the latest stack — designed to convert visitors into clients.",
    icon: Globe,
    features: [
      "Custom design & branding",
      "Lightning-fast performance",
      "SEO-ready & mobile-first",
    ],
  },
  {
    title: "App Development",
    description:
      "Cross-platform web and mobile apps tailored to your business, from MVP to full-scale production.",
    icon: Smartphone,
    features: [
      "Web & mobile (iOS / Android)",
      "Scalable architecture",
      "End-to-end product builds",
    ],
  },
  {
    title: "Lead Handling",
    description:
      "Automated lead capture, qualification, and follow-up so no opportunity ever slips through the cracks.",
    icon: UserPlus,
    features: [
      "Instant lead capture",
      "Automated follow-ups",
      "CRM & pipeline sync",
    ],
  },
  {
    title: "Custom Workflows",
    description:
      "Bespoke automations that connect your tools and eliminate manual work — built around your exact process.",
    icon: Workflow,
    features: [
      "Tool integrations & APIs",
      "Process automation",
      "Tailored to your workflow",
    ],
  },
];
