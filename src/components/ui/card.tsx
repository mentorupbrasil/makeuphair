import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
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
    <h3 className={cn("text-lg font-semibold text-stone-900", className)}>
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
        <span className="text-sm text-stone-500">{label}</span>
        {icon && <span className="text-rose-400">{icon}</span>}
      </div>
      <p className="text-2xl font-bold text-stone-900">{value}</p>
      {trend && <p className="text-xs text-stone-400">{trend}</p>}
    </Card>
  );
}
