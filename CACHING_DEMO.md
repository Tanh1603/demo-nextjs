# Next.js Caching Demo

This demo showcases all four layers of caching in Next.js 15+ with practical examples.

## 🚀 Features Added

### Main Caching Demo Page (`/caching`)

A comprehensive overview of all four caching layers with interactive examples.

### 1. Data Cache (`/api/caching/data-cache`)

- **Location**: `app/api/caching/data-cache/route.ts`
- **Demo**: Interactive buttons to fetch cached vs fresh data
- **Shows**: How `fetch()` requests are cached across server requests
- **Controls**: Cache-Control headers, no-store option

### 2. Full Route Cache

Examples include:

- **Static Route** (`/caching/static`): Cached at build time
- **ISR Route** (`/caching/isr`): **REAL ISR DEMO** - Quotes automatically change every 30 seconds!
- **Revalidation** (`/caching/revalidate`): 10-second revalidation concepts

### 3. Router Cache (Client-side)

- **Demo Pages**:
  - `/caching/prefetch-demo`: Demonstrates prefetching
  - `/caching/router-cache-demo`: Shows client-side caching behavior
- **Features**: Manual prefetching, navigation tracking, session persistence

### 4. Request Memoization

- **Component**: `_components/request-memoization.tsx`
- **Shows**: How identical requests within a render are deduplicated
- **Example**: Three identical API calls that result in only one network request

### Additional Examples

- **No Cache** (`/caching/no-cache`): Dynamic content with caching disabled
- **Cache Controls**: Various revalidation strategies

## 🔧 Technical Implementation

### Cache Configurations Used:

```typescript
// Static Generation
export default function StaticPage() { ... }

// ISR with revalidation
export const revalidate = 30;

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Fetch with cache control
fetch(url, { next: { revalidate: 60 } })
fetch(url, { cache: 'no-store' })
```

### API Routes with Cache Headers:

```typescript
// Cached response
return NextResponse.json(data, {
  headers: { "Cache-Control": "public, max-age=30" },
});

// No cache response
return NextResponse.json(data, {
  headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
});
```

## 🎯 How to Test

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Visit the demo**: Navigate to `/caching` from the home page

3. **Test each caching layer**:

   - Click the interactive buttons to see data caching
   - Navigate between pages to experience router cache
   - Check Network tab to see request deduplication
   - Wait for revalidation periods to see content updates

4. **Production Testing**:
   ```bash
   npm run build
   npm start
   ```

## 📚 Learning Outcomes

After exploring this demo, you'll understand:

- How Next.js automatically caches different types of content
- When and how to control caching behavior
- The performance benefits of each caching layer
- How to implement ISR (Incremental Static Regeneration)
- Client-side routing optimizations
- Request deduplication patterns

## 🛠️ Files Added/Modified

### New Files:

- `app/caching/page.tsx` - Main demo page
- `app/caching/_components/` - Individual cache demos
- `app/caching/*/page.tsx` - Various cache examples
- `app/api/caching/*/route.ts` - API endpoints for testing

### Modified Files:

- `app/page.tsx` - Added caching demo link

This comprehensive caching demo provides hands-on experience with Next.js caching mechanisms, making it perfect for learning and demonstrating modern web performance optimization techniques.
