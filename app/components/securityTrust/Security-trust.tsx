"use client";

import React, { useMemo } from 'react';
import { Smartphone, ShieldCheck, CreditCard, Lock, LucideIcon } from 'lucide-react';

export interface SecurityFeature {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
}

interface SecurityTrustProps {
  features?: SecurityFeature[];
  isLoading?: boolean;
  onFeatureClick?: (id: string | number) => void;
}

const DEFAULT_SECURITY_DATA: SecurityFeature[] = [
  { id: "sec-1", title: "ID & Phone Verification", description: "Confirm identity for a trusted community.", Icon: Smartphone },
  { id: "sec-2", title: "End-to-End Encryption", description: "All your personal data is fully encrypted.", Icon: ShieldCheck },
  { id: "sec-3", title: "Stripe-Powered Payments", description: "Secure, global standard transactions.", Icon: CreditCard },
  { id: "sec-4", title: "Private Video Streaming", description: "Your content is protected from unauthorized access.", Icon: Lock }
];

export default function SecurityTrust({ 
  features = DEFAULT_SECURITY_DATA,
  isLoading = false,
  onFeatureClick
}: SecurityTrustProps): React.JSX.Element {

  const renderedFeatures = useMemo(() => features, [features]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-24 space-y-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-50 rounded-[2rem] max-w-5xl" />
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 bg-white selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#064E3B]">
            Security & Trust
          </h2>
        </div>

        <div className="max-w-5xl flex flex-col gap-5">
          {renderedFeatures.map((item) => (
            <article 
              key={item.id} 
              onClick={() => onFeatureClick?.(item.id)}
              /**
               * EXACT SAME STYLING AS LEARNER SECTION:
               * - Rounded-2rem
               * - Border #D1FAE5
               * - Shadow-sm to hover:shadow-xl
               * - Transition-all duration-300
               */
              className="group flex items-center p-6 bg-white rounded-[2rem] border border-[#D1FAE5] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Icon Container - Identical to Learner features */}
              <div className="w-14 h-14 bg-white border border-[#F0FDF4] text-[#10B981] rounded-2xl flex items-center justify-center mr-6 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300 shrink-0">
                 <item.Icon size={26} strokeWidth={1.5} aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#064E3B]">
                  {item.title}
                </h3>
                <p className="text-[#64748B] text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}