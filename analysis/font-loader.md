# Font Loader Analysis

The application currently uses `next/font/google` to optimize and load fonts (`Geist` and `JetBrains_Mono`) at build time.

## Recommendations:
1. Ensure that the fonts are properly preloaded on the critical rendering path.
2. Consider swapping `display: 'swap'` to avoid invisible text during loading if we rely on custom fonts for critical HUD data.
3. Verify that subsetting is correctly configured (currently using `"latin"` which is sufficient).
