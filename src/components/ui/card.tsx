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
        "rounded-sm border border-brand-cream bg-white p-6 shadow-sm",
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
    <h3 className={cn("font-serif text-lg font-medium text-brand-brown", className)}>
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
        <span className="text-sm text-brand-taupe-dark">{label}</span>
        {icon && <span className="text-brand-camel">{icon}</span>}
      </div>
      <p className="font-serif text-2xl font-semibold text-brand-brown">{value}</p>
      {trend && <p className="text-xs text-brand-taupe">{trend}</p>}
    </Card>
  );
}
