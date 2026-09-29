// components/layout/Footer.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gx-border bg-gx-surface py-12 text-sm text-gx-ink/70">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link 
              href="https://genxcode.cosmolix.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-lg font-bold text-gx-ink hover:text-gx-purple transition-colors"
            >
              GenXCode
            </Link>
            <p>© {year} GenXCode. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/recruitment/privacy" className="hover:text-gx-purple transition-colors">
              Privacy Policy
            </Link>
            <Link href="/recruitment/terms" className="hover:text-gx-purple transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}