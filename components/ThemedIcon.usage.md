# ThemedIcon Component - Usage Guide

A reusable wrapper component for Ionicons that automatically applies HeroUI Native theme colors.

## Why Use ThemedIcon?

✅ **Simplifies icon usage** - No need to manually call `useThemeColor` in every component  
✅ **Automatic theme support** - Icons adapt to light/dark mode automatically  
✅ **Type-safe** - Full TypeScript support with autocomplete  
✅ **Consistent API** - Same interface across all components  
✅ **Less boilerplate** - Reduces code repetition  

## Basic Usage

### Import

```tsx
import { ThemedIcon } from '@/components';
// or
import { ThemedIcon } from '@/components/ThemedIcon';
```

### Simple Icon with Default Color

```tsx
<ThemedIcon name="send" size={20} />
// Uses 'foreground' color by default
```

### Icon with Specific Theme Color

```tsx
<ThemedIcon name="add" size={20} themeColor="accent-foreground" />
```

## Common Use Cases

### Primary Button Icons

```tsx
<Button variant="primary">
  <ThemedIcon name="send" size={20} themeColor="accent-foreground" />
  <Button.Label>Send</Button.Label>
</Button>
```

### Secondary Button Icons

```tsx
<Button variant="secondary">
  <ThemedIcon name="document-outline" size={20} themeColor="accent-soft-foreground" />
  <Button.Label>Choose File</Button.Label>
</Button>
```

### Ghost/Muted Button Icons

```tsx
<Button variant="ghost">
  <ThemedIcon name="close-circle" size={20} themeColor="muted" />
</Button>
```

### Icon-Only Buttons

```tsx
<Button variant="primary" isIconOnly>
  <ThemedIcon name="heart" size={20} themeColor="accent-foreground" />
</Button>
```

## Theme Color Tokens

| Token | Usage | Button Variant |
|-------|-------|----------------|
| `accent-foreground` | Primary actions | `variant="primary"` |
| `accent-soft-foreground` | Secondary actions | `variant="secondary"` |
| `muted` | Muted/subtle actions | `variant="ghost"` |
| `danger-foreground` | Destructive actions | `variant="danger"` |
| `foreground` | Default text color | - |

## Pre-configured Variants

For even simpler usage, use the pre-configured variants:

```tsx
import { ThemedIconVariants } from '@/components';

// Primary (accent-foreground)
<ThemedIconVariants.Primary name="add" size={20} />

// Secondary (accent-soft-foreground)
<ThemedIconVariants.Secondary name="bookmark" size={20} />

// Muted (muted)
<ThemedIconVariants.Muted name="close" size={20} />

// Danger (danger-foreground)
<ThemedIconVariants.Danger name="trash" size={20} />
```

## Override Color (Advanced)

For special cases where you need a specific color (use sparingly):

```tsx
<ThemedIcon name="star" size={20} color="#FFD700" />
```

⚠️ **Note**: Using `color` prop bypasses theme colors. Prefer `themeColor` for theme consistency.

## Complete Examples

### Chat Input with Send Button

```tsx
export function ChatInput({ onSend }: ChatInputProps) {
  return (
    <View className="flex-row gap-2 items-end">
      <View className="flex-1">
        <TextField>
          <TextField.Input placeholder="Type a message..." />
        </TextField>
      </View>
      <Button variant="primary" isIconOnly onPress={handleSend}>
        <ThemedIcon name="send" size={20} themeColor="accent-foreground" />
      </Button>
    </View>
  );
}
```

### File Upload Button

```tsx
export function FileUploadButton({ onPress }: Props) {
  return (
    <Button variant="secondary" onPress={onPress}>
      <ThemedIcon name="document-outline" size={20} themeColor="accent-soft-foreground" />
      <Button.Label>Choose File</Button.Label>
    </Button>
  );
}
```

### Delete Button

```tsx
<Button variant="ghost" onPress={handleDelete}>
  <ThemedIcon name="trash" size={18} themeColor="danger-foreground" />
</Button>
```

## Migration from Old Pattern

### Before (Manual useThemeColor)

```tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from 'heroui-native';

export function MyComponent() {
  const [accentForeground] = useThemeColor(['accent-foreground']);
  
  return (
    <Button variant="primary">
      <Ionicons name="send" size={20} color={accentForeground} />
      <Button.Label>Send</Button.Label>
    </Button>
  );
}
```

### After (ThemedIcon)

```tsx
import { ThemedIcon } from '@/components';

export function MyComponent() {
  return (
    <Button variant="primary">
      <ThemedIcon name="send" size={20} themeColor="accent-foreground" />
      <Button.Label>Send</Button.Label>
    </Button>
  );
}
```

## Props Reference

```tsx
interface ThemedIconProps {
  /** Ionicons name (e.g., 'send', 'document-outline') */
  name: string;
  
  /** Icon size in pixels (default: 24) */
  size?: number;
  
  /** Theme color token (default: 'foreground') */
  themeColor?: 
    | 'foreground'
    | 'accent-foreground'
    | 'accent-soft-foreground'
    | 'muted'
    | 'danger-foreground'
    | ... (and more);
  
  /** Optional override color (bypasses theme) */
  color?: string;
  
  /** All other Ionicons props */
  ...restProps
}
```

## Best Practices

✅ **DO** use `themeColor` prop for theme consistency  
✅ **DO** use pre-configured variants for common cases  
✅ **DO** match icon color to button variant  
✅ **DO** use consistent sizes (16, 18, 20, 24 are common)  

❌ **DON'T** use `color` prop unless absolutely necessary  
❌ **DON'T** mix theme colors and hard-coded colors in same component  
❌ **DON'T** use className for icon colors (use themeColor instead)  

## Tips

- **Icon size guide**: 
  - Small buttons/chips: `size={16}`
  - Medium buttons: `size={20}`
  - Large buttons: `size={24}`
  - Headers/emphasis: `size={28-32}`

- **Always pair with Button variants**:
  ```tsx
  variant="primary"    → themeColor="accent-foreground"
  variant="secondary"  → themeColor="accent-soft-foreground"
  variant="ghost"      → themeColor="muted"
  variant="danger"     → themeColor="danger-foreground"
  ```
