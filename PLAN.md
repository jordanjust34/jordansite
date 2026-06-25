# Technology Section Implementation Plan

## Goals
Create an interactive tech showcase with:
- Left side: Small bubbles (tech icons) that are clickable
- Right side: Larger bubble displaying the selected tech's image
- Images scale to fit inside bubbles (object-fit behavior)
- Transparent PNG backgrounds for tech logos

---

## Bug Fixes Required

### 🔴 CRITICAL HIGH PRIORITY
**Image Component Fix (Lines 98-102)**
CURRENT: `<a href={technologies[activeTech].icon}` - does nothing, no image displayed
SHOULD BE: Proper Next.js Image component with fill prop

```tsx
<Image 
  src={technologies[activeTech].icon}
  alt={`${technologies[activeTech].name}`}
  fill
/>
```

### 🟡 MEDIUM PRIORITY  
**NaN State Values (Lines 77, 91)**
CURRENT: `setActiveTech(NaN)` - breaks state management
SHOULD BE: `setActiveTech(null)` or `setActiveTech(-1)`

---

## Desired Behavior

| Element | Size | Fit Method | Ring/Border |
|---------|------|------------|-------------|
| Left icon bubbles | h-48 (144px) | object-cover (fits exactly, crops if needed) | ring-2 ring-gray-300 |
| Right display bubble | h-48 (144px) | object-fit (preserves aspect ratio) | ring-2 ring-gray-300 |

---

## Implementation Steps

1. Replace <a> tag with Image component using Next.js Image syntax
2. Change container height from h-96 to h-48 for smaller bubbles  
3. Add fill className for proper scaling to fit bubble
4. Replace NaN values with null/-1 for close buttons
5. Test that images appear and are properly sized

---

## Questions Clarified

✅ Image sizing: h-48 (compact size)
✅ Image fit: Scale down to fit inside bubble exactly
✅ PNG paths: Correct - `/react.png` exists
✅ Close button: Go back to first tech (setActiveTech(0))
✅ Border style: Minimal gray ring for transparency visibility

---

## Expected Result

- Small circular bubbles on left side (~48px height) with transparent PNG icons
- Larger display bubble on right (~48 height, but scaled image to fit)
- Smooth transitions between tech selections
- No full-screen images, properly contained in bubbles
