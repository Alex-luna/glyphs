# Design System Document: The Monolithic Editor

## 1. Overview & Creative North Star
**Creative North Star: "The Brutalist Sanctuary"**

This design system rejects the "noisy" clutter of traditional text editors in favor of a monolithic, high-end editorial experience. We are not building a tool; we are building a digital environment for focused thought. By leveraging a strict 0px radius (Hard-Edge) and a typewriter-inspired monospace aesthetic, we create a "Lego-like" structural logic where every block of text feels like a physical object placed on a dark, infinite plane. 

The system breaks the "template" look through **Tonal Layering** and **Intentional Asymmetry**. Instead of standard grids, we use the contrast between `surface-container-lowest` and `surface-container-high` to create depth, making the interface feel like a series of interlocking stone slabs.

---

## 2. Colors & Surface Logic

### The Palette
The core of this system is a sophisticated charcoal spectrum. 
- **Background (`#0e0e0e`)**: The "void." Used for the primary workspace to reduce eye strain.
- **Primary (`#c6c6c6`)**: Reserved for high-priority actions and the primary "active" block indicator.
- **Secondary/Tertiary (`#9f9d9d` / `#fbf9f8`)**: Used for metadata and subtle UI accents to ensure the content remains the hero.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or containers. Structural boundaries must be defined solely through background color shifts.
*   **Correct:** A `surface-container-low` code block sitting inside a `surface` editor.
*   **Incorrect:** A `#484848` 1px border around a code block.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following tiers to define importance:
1.  **Level 0 (Base):** `surface` (`#0e0e0e`) – The main editor canvas.
2.  **Level 1 (Nesting):** `surface-container-low` (`#131313`) – Used for the sidebar or inactive blocks.
3.  **Level 2 (Elevation):** `surface-container-high` (`#1f2020`) – Used for active blocks or hover states.
4.  **Level 3 (Overlay):** `surface-bright` (`#2b2c2c`) – Floating menus or tooltips.

### The "Glass & Texture" Rule
For floating elements (like a slash-command menu), use **Glassmorphism**. Apply `surface-container-highest` at 70% opacity with a `20px` backdrop-blur. This allows the text beneath to bleed through subtly, preventing the UI from feeling "pasted on."

---

## 3. Typography: The Monospace Editorial
The typography system uses a high-contrast scale to create an authoritative, "Typewriter" feel.

- **Display & Headlines:** Use `spaceGrotesk`. While the user requested monospace, we use this high-character sans-serif for headers to provide a "magazine" feel. At `display-lg` (3.5rem), the tight tracking and sharp terminals command attention.
- **Body & Markdown:** The "Soul" of the system. All editable content uses the monospace ethos. It conveys precision.
- **Labels:** Use `inter` at `label-sm` (0.6875rem) for technical metadata, providing a clean, functional contrast to the expressive headers.

**Hierarchy Strategy:** 
- Use `on_surface` (`#e7e5e5`) for active content.
- Use `on_surface_variant` (`#acabaa`) for inactive or secondary blocks to create a "faded ink" effect.

---

## 4. Elevation & Depth: Tonal Layering

### The Layering Principle
Forget shadows. Depth is achieved by "stacking." 
*   **Active Blocks:** When a user selects a markdown block, shift its background from `transparent` to `surface-container-low` (`#131313`).
*   **Context Menus:** Place on `surface-bright` (`#2b2c2c`).

### Ambient Shadows
If a "floating" effect is required (e.g., a modal), use an ultra-diffused shadow:
- **Color:** `on_surface` at 5% opacity.
- **Blur:** `40px` to `60px`.
- **Spread:** `-10px`.
This mimics a soft, ambient glow rather than a traditional drop shadow.

### The "Ghost Border" Fallback
If contrast testing requires a boundary, use a **Ghost Border**:
- **Token:** `outline_variant` (`#484848`) at **15% opacity**.
- **Width:** `1px`.
This ensures the "Lego-like" structure is felt but not seen as a harsh line.

---

## 5. Components

### The "Block" (Primary Component)
- **Structure:** 0px radius. Margin-bottom: `spacing-4` (1.4rem).
- **State (Default):** Transparent background.
- **State (Focused):** Background: `surface-container-low`. Left-accent: 2px solid `primary`.

### Buttons
- **Primary:** Background: `primary` (`#c6c6c6`), Text: `on_primary` (`#3f4041`). No radius.
- **Tertiary (Ghost):** No background. Text: `primary`. On hover: Background `primary_container` at 20% opacity.

### Input Fields
- **Styling:** Underline-only approach using `outline_variant`.
- **Focus:** The underline transitions to `primary`. Background remains `surface_container_lowest`.

### Chips (Markdown Tags)
- **Visuals:** `surface-container-highest` background. Text: `label-md`. 
- **Shape:** 0px radius (maintain the "Lego" aesthetic).

### Specific App Components:
- **Draggable Handle:** Use a subtle `4-dot` pattern in `on_surface_variant` (20% opacity) that appears only on block hover.
- **Markdown Gutter:** A vertical column in `surface-container-lowest` that houses line numbers or block type icons.

---

## 6. Do’s and Don’ts

### Do:
- **Use Vertical Space:** Use `spacing-8` (2.75rem) between major sections to let the typography breathe.
- **Embrace Hard Edges:** Keep all corners at `0px`. This is non-negotiable for the "Brutalist Sanctuary" look.
- **Color-Coded Logic:** Use `error_dim` (`#bb5551`) for syntax errors in markdown, but keep it subtle so it doesn't break the dark-mode immersion.

### Don't:
- **Don't use Rounded Corners:** No exceptions.
- **Don't use Dividers:** Avoid horizontal `<hr>` lines. Use `spacing-6` or a tonal shift to `surface-container-low` to separate content.
- **Don't use Pure Black:** Except for `surface-container-lowest`. Pure black icons or text on charcoal creates "smearing" on many displays. Use `on_background` (`#e7e5e5`) instead.