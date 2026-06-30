import React from "react";
import { MdPerson } from "react-icons/md";

export default function TopAgents({ agents = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex flex-col h-full animate-pulse">
        <div className="h-6 w-32 bg-surface-container-high rounded mb-md"></div>
        <div className="flex flex-col gap-sm">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-surface-container-high rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const displayAgents = agents.length > 0 ? agents.slice(0, 4).map(a => {
    let imgUrl = null;
    if (a.avatar?.url) {
      const isProd = import.meta.env.PROD;
      const strapiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:1337';
      imgUrl = isProd ? a.avatar.url : `${strapiBase}${a.avatar.url}`;
    }
    return {
      name: a.username,
      role: a.role?.name || "Agent",
      img: imgUrl,
      count: a.ticketsResolved || 0,
    };
  }) :[];

  return (
    <div className="bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
      <div className="mb-xl">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Top Performing Agents
        </h2>
        <p className="font-body-md text-body-md text-outline">
          Highest resolution rates this period
        </p>
      </div>

      <div className="flex flex-col gap-lg">
        {displayAgents.map((agent, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-md bg-surface-container-low rounded-xl transition-all hover:bg-surface-container-high border border-transparent hover:border-outline-variant"
          >
            <div className="flex items-center gap-md">
              {agent.img ? (
                <img
                  alt={agent.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container-highest"
                  src={agent.img}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center ring-2 ring-surface-container-highest">
                  <MdPerson className="text-xl text-on-surface-variant" />
                </div>
              )}
              <div>
                <p className="font-button-text text-on-surface">{agent.name}</p>
                <p className="text-label-md text-outline">{agent.role}</p>
              </div>
            </div>
            <span className="px-md py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md">
              {agent.count} Resolved
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-xl py-sm border-2 border-dashed border-outline-variant rounded-xl text-label-md font-label-md text-outline hover:text-primary hover:border-primary transition-all">
        View All Agents
      </button>
    </div>
  );
}
