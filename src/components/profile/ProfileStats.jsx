import React from "react";
import { MdTaskAlt, MdTimer, MdStar } from "react-icons/md";

export default function ProfileStats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
      
      {/* Stat Card 1 */}
      <div className="bg-surface-container-low rounded-xl p-lg flex flex-col items-center text-center shadow-sm">
        <MdTaskAlt className="text-primary mb-sm text-3xl" />
        <span className="font-headline-lg text-headline-lg text-on-surface">1,248</span>
        <span className="font-label-md text-label-md text-on-surface-variant">Resolved Tickets</span>
      </div>
      
      {/* Stat Card 2 */}
      <div className="bg-surface-container-low rounded-xl p-lg flex flex-col items-center text-center shadow-sm">
        <MdTimer className="text-secondary mb-sm text-3xl" />
        <span className="font-headline-lg text-headline-lg text-on-surface">1.2h</span>
        <span className="font-label-md text-label-md text-on-surface-variant">Avg Resolution Time</span>
      </div>
      
      {/* Stat Card 3 */}
      <div className="bg-surface-container-low rounded-xl p-lg flex flex-col items-center text-center shadow-sm">
        <MdStar className="text-tertiary mb-sm text-3xl" />
        <span className="font-headline-lg text-headline-lg text-on-surface">4.9</span>
        <span className="font-label-md text-label-md text-on-surface-variant">CSAT Score</span>
      </div>

    </section>
  );
}