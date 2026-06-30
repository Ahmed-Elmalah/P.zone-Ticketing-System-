import React, { useEffect, useState } from "react";
import { MdTaskAlt, MdTimer, MdStar, MdAssignment } from "react-icons/md";
import { helpDeskRepo } from "../../api/helpDeskRepo";
import { useAuthStore } from "../../auth/authStore";

export default function ProfileStats() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ resolved: 0, active: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const userId = user.documentId || user.id;
        // Fetch counts using pageSize=1 to save bandwidth
        const [resolvedRes, activeRes] = await Promise.all([
          helpDeskRepo.fetchQueue('resolved_mine', userId, 1, 1),
          helpDeskRepo.fetchQueue('mine', userId, 1, 1)
        ]);
        
        setStats({
          resolved: resolvedRes.meta?.pagination?.total || 0,
          active: activeRes.meta?.pagination?.total || 0
        });
      } catch (err) {
        console.error("Failed to fetch profile stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-xl">
        <div className="animate-pulse h-6 w-32 bg-surface-container-high rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
      
      {/* Stat Card 1 */}
      <div className="bg-surface-container-low rounded-xl p-lg flex flex-col items-center text-center shadow-sm">
        <MdTaskAlt className="text-primary mb-sm text-3xl" />
        <span className="font-headline-lg text-headline-lg text-on-surface">{stats.resolved}</span>
        <span className="font-label-md text-label-md text-on-surface-variant">Resolved Tickets</span>
      </div>
      
      {/* Stat Card 2 */}
      <div className="bg-surface-container-low rounded-xl p-lg flex flex-col items-center text-center shadow-sm">
        <MdAssignment className="text-secondary mb-sm text-3xl" />
        <span className="font-headline-lg text-headline-lg text-on-surface">{stats.active}</span>
        <span className="font-label-md text-label-md text-on-surface-variant">Active Tickets</span>
      </div>
      
      {/* Stat Card 3 */}
      <div className="bg-surface-container-low rounded-xl p-lg flex flex-col items-center text-center shadow-sm relative group cursor-help">
        <MdStar className="text-tertiary mb-sm text-3xl" />
        <span className="font-headline-lg text-headline-lg text-on-surface">N/A</span>
        <span className="font-label-md text-label-md text-on-surface-variant">CSAT Score</span>
        
        {/* Tooltip */}
        <div className="absolute top-full mt-2 w-48 p-2 bg-inverse-surface text-inverse-on-surface text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-lg">
          Needs a "rating" field in Strapi to calculate customer satisfaction.
        </div>
      </div>

    </section>
  );
}