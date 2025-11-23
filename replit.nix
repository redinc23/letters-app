{ pkgs }: {
  deps = [
    # Node.js runtime (LTS version)
    pkgs.nodejs-18_x
    
    # Package managers
    pkgs.nodePackages.npm
    
    # TypeScript support
    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
    
    # Prisma CLI for database management
    pkgs.nodePackages.prisma
    
    # OpenSSL for generating secrets
    pkgs.openssl
    
    # Git for version control
    pkgs.git
    
    # Useful utilities
    pkgs.bash
    pkgs.coreutils
  ];
  
  # Environment variables available to all shells
  env = {
    NODE_ENV = "production";
  };
}
