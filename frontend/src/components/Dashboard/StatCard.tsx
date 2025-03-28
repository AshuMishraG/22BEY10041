"use client";

interface StatCardProps {
   title: string;
   value: number | string;
   icon: string; // Bootstrap icon class
   color: "primary" | "success" | "warning" | "danger" | "info";
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
   return (
      <div className="card mb-4">
         <div className={`card-body bg-${color} bg-opacity-10`}>
            <div className="d-flex justify-content-between align-items-center">
               <div>
                  <h6 className="card-title text-muted mb-0">{title}</h6>
                  <h2 className={`mt-2 mb-0 text-${color}`}>{value}</h2>
               </div>
               <div className={`rounded-circle bg-${color} bg-opacity-25 p-3`}>
                  <i className={`bi ${icon} fs-1 text-${color}`}></i>
               </div>
            </div>
         </div>
      </div>
   );
}
