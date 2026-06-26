import React from "react";

export default function ProfileHero() {
  return (
    <section className="flex flex-col items-center text-center bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative overflow-hidden">
      
      {/* Background Banner Gradient */}
      <div className="absolute inset-0 h-32 bg-linear-to-r from-primary/10 to-secondary-fixed/20"></div>
      
      <div className="relative z-10 flex flex-col items-center mt-12">
        {/* User Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-md mb-md bg-surface-container-high">
          <img 
            alt="User Profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeC_WsowZLVU8qxk5jYQdgytq1vXXLn8e_MILs7AFZvdGQX_DPyod1Nhls97BC2kF6rtKWCvn-w-V4I8yQN3SqC7ERntAHPXw-EjMOQPdOp6bSXY3XmuWCuo6iP6uhuXC7N5fylPM-7WGbZT6NqpIo8ixxH3N3B-fl2LzdBIBhIQX80kIWIz0wXQjgWiMvGJb_rpUih0rGydF47KYXiEdG7geBWeMw202LI1SKeFajD47Rh7_SmPmQxXnWbxRxts5xm2c82c6822A" 
          />
        </div>
        
        {/* User Info */}
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
          Sarah Jenkins
        </h1>
        
        {/* Role Badge (Can be dynamic based on auth store) */}
        <div className="bg-secondary-container text-on-secondary-container font-label-md text-label-md px-3 py-1 rounded-full inline-block">
          Senior Technical Lead
        </div>
        
        {/* Bio / Description */}
        <p className="mt-md font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Dedicated to resolving complex infrastructure issues and streamlining support workflows.
        </p>
      </div>

    </section>
  );
}