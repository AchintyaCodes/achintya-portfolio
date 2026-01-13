const Footer = () => {
  return (
    <footer className="py-12 px-8 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © 2024 Alex Rivera. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="editorial-link text-xs"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="editorial-link text-xs"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="editorial-link text-xs"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
