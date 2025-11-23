#!/bin/bash

###############################################################################
# ZIP Import Script for Replit
# Use this AFTER uploading the GitHub ZIP (letters-app-main.zip) into Replit.
# It extracts the zip, moves files to root, cleans up, and runs DO_EVERYTHING.sh.
###############################################################################

set -euo pipefail

ZIP_FILE=${1:-letters-app-main.zip}
EXTRACT_DIR="${ZIP_FILE%.zip}"

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success(){ echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

clear
cat <<'BANNER'
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║          ZIP IMPORT - LETTERS APP                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
BANNER

echo ""
info "ZIP file: ${ZIP_FILE}"

if [ ! -f "$ZIP_FILE" ]; then
  error "ZIP file '$ZIP_FILE' not found. Upload it via Replit file explorer first."
  exit 1
fi

if [ -d "$EXTRACT_DIR" ]; then
  warn "Directory '$EXTRACT_DIR' already exists. Removing it to ensure a clean import."
  rm -rf "$EXTRACT_DIR"
fi

info "Extracting ZIP..."
unzip -q "$ZIP_FILE" -d .
success "ZIP extracted"

if [ ! -d "$EXTRACT_DIR" ]; then
  error "Expected directory '$EXTRACT_DIR' not found after extraction."
  exit 1
fi

info "Moving files into project root..."
shopt -s dotglob
mv "$EXTRACT_DIR"/* .
shopt -u dotglob
rm -rf "$EXTRACT_DIR"
success "Files moved"

info "Cleaning up ZIP..."
rm -f "$ZIP_FILE"
success "ZIP removed"

if [ ! -f "package.json" ]; then
  error "package.json not found after extraction. Something went wrong."
  exit 1
fi

info "Running DO_EVERYTHING.sh"
if [ ! -x "DO_EVERYTHING.sh" ]; then
  warn "DO_EVERYTHING.sh not executable. Fixing permissions."
  chmod +x DO_EVERYTHING.sh
fi

bash DO_EVERYTHING.sh

success "Import complete! Add secrets in Replit and click Run."
