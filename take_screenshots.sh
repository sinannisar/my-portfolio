#!/bin/bash
# Script to capture portfolio screenshots using screencapture
# Open the file in default browser, then use macOS screencapture

OUTDIR="/Users/sinan/Documents/sinannisar_website/linkedin_screenshots"
mkdir -p "$OUTDIR"

echo "Screenshots will be saved to: $OUTDIR"
echo ""
echo "INSTRUCTIONS:"
echo "1. Open index.html in your browser (Chrome recommended)"
echo "2. Wait for the intro animation to finish"
echo "3. For each section, scroll to it and run:"
echo ""
echo "   screencapture -x $OUTDIR/01_hero.png"
echo "   screencapture -x $OUTDIR/02_about.png"
echo "   screencapture -x $OUTDIR/03_skills.png"
echo "   screencapture -x $OUTDIR/04_projects.png"
echo "   screencapture -x $OUTDIR/05_certs.png"
echo "   screencapture -x $OUTDIR/06_career.png"
echo "   screencapture -x $OUTDIR/07_contact.png"
echo ""
echo "OR: Press Cmd+Shift+3 for full screen, Cmd+Shift+4 for selection"
echo "    and save manually to: $OUTDIR"
