import Link from "next/link";
import { Button } from "@/components/ui/button";

export function WhatsAppButton({ href }: { href: string }) {
  return (
    <Link href={href} target="_blank">
      <Button size="sm" variant="secondary">
        Enviar WhatsApp
      </Button>
    </Link>
  );
}
