// Fix race conditions in the Asteroid data fetching hook (#387): registerAsteroidData guards against empty-array overwrites from React Strict Mode double-invoking — see store.tsx
