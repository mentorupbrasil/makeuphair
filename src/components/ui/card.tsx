import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("admin-card p-6", className)}>{children}</div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={cn("font-display text-lg font-light text-ink", className)}>
      {children}
    </h3>
  );
}

export function StatCard({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: string;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone">{label}</span>
        {icon && <span className="text-gold">{icon}</span>}
      </div>
      <p className="font-display text-2xl font-light text-ink">{value}</p>
      {trend && <p className="text-xs text-stone">{trend}</p>}
    </Card>
  );
}
