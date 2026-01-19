import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
}

interface SocialItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

const socialItems: SocialItem[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <header className="flex items-center justify-end p-6 md:p-8">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="pointer-events-auto flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-black rounded-full border border-white/20 hover:border-white/40 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full sm:max-w-md bg-white border-l border-black/10 p-8 pt-20"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-4xl md:text-5xl font-semibold text-black uppercase tracking-tight hover:opacity-60 transition-opacity py-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-12">
              <h3 className="text-sm font-medium text-black/60 uppercase tracking-wider mb-4">
                Socials
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-black hover:opacity-60 transition-opacity"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

export default Navigation;
