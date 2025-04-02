# Theme Provider

A React-based theme management system that provides dark mode support using Radix Colors. The system respects user preferences, persists theme choices, and integrates seamlessly with your React application.

## Features

- 🌓 Light and dark mode support
- 🎨 Seamless integration with Radix Colors
- 🔄 System theme detection and sync
- 💾 Theme persistence across sessions
- ⌨️ Fully accessible
- 📱 Real-time system theme updates
- 🔧 TypeScript support

## Installation

The Theme Provider is already set up in your application. It uses the following dependencies:

- Radix Colors (for theme variables)
- React (for context and hooks)
- TypeScript (for type safety)

## Usage

### Basic Setup

The ThemeProvider should wrap your application:

```tsx
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

### Using the Theme Hook

Access and modify the theme from any component using the `useTheme` hook:

```tsx
import { useTheme } from "./components/ThemeProvider/ThemeProvider";

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      Current theme: {theme}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </div>
  );
}
```

### Theme Toggle Component

A pre-built theme toggle component is available:

```tsx
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";

function Header() {
  return (
    <nav>
      {/* Other nav items */}
      <ThemeToggle />
    </nav>
  );
}
```

## How It Works

### Theme Priority

The system determines the theme in the following order:

1. User's saved preference (localStorage)
2. System color scheme preference
3. Light theme (default fallback)

### CSS Integration

The theme system works by:

1. Adding/removing a `dark` class on the HTML element
2. Using Radix Color CSS variables
3. Applying theme-aware CSS custom properties

### System Theme Detection

The provider automatically:

- Detects the system's color scheme preference
- Updates when the system preference changes
- Only follows system changes if no user preference is set

## Best Practices

1. **Always use CSS variables** instead of hard-coded colors:

```css
/* ✅ Good */
color: var(--foreground);
background: var(--background);

/* ❌ Bad */
color: black;
background: white;
```

2. **Use the useTheme hook** for theme-dependent logic:

```tsx
const { theme } = useTheme();
const isDark = theme === "dark";
```

3. **Wrap theme-dependent components** with ThemeProvider:

```tsx
// ✅ Good
<ThemeProvider>
  <App />
</ThemeProvider>

// ❌ Bad
<App />
```

## Troubleshooting

### Theme Not Applying

1. Ensure the component is within a ThemeProvider
2. Check if the dark class is present on the HTML element
3. Verify CSS variables are being used

### System Theme Not Detected

1. Verify system color scheme settings
2. Check if localStorage has a saved preference (this takes precedence)
3. Ensure the media query listener is working

## TypeScript Support

The theme system includes full TypeScript support:

```tsx
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
```

## Contributing

When modifying the theme system:

1. Maintain TypeScript types
2. Update CSS variables in index.css
3. Test both light and dark modes
4. Verify system theme detection
5. Check persistence behavior
