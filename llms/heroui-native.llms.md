<page url="/docs/native/components">
# All Components

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/index.mdx
> Explore the full list of components available in HeroUI Native. More are on the way.


## Buttons



## Forms



## Navigation



## Overlays



## Feedback



## Layout



## Media



## Data Display



## Utilities



</page>

<page url="/docs/native/getting-started">
# Introduction

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/index.mdx
> An open-source UI component library for building beautiful and accessible user interfaces.


HeroUI Native is a component library built on [Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4) via [Uniwind](https://uniwind.dev/) and modern mobile development technologies. Every component comes with smooth animations, polished details, and built-in accessibility—ready to use, fully customizable.



## Why HeroUI Native?

**Beautiful by default** — Professional look out of the box, no extra styling needed.

**Accessible** — Accessibility is managed following mobile development best practices, with proper focus management, touch accessibility, and screen reader support built into every component.

**Flexible** — Each component is made of customizable parts. Change what you need, leave the rest.

**Developer-friendly** — Fully typed APIs, predictable patterns, and excellent autocompletion.

**Maintained** — We handle updates, bug fixes, and new features. Just update the package.

**Lightweight** — Tree-shaken. Only what you use goes into your app.

**Future-proof** — Compatible with the latest [Expo](https://expo.dev/) and on [Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4) via [Uniwind](https://uniwind.dev/), designed for AI-assisted development.

## A Living Library, Not Copy-Paste

Copy-paste code works until it breaks. You're left maintaining outdated dependencies that stop evolving.

HeroUI Native is different. It's a living library that grows with you:

* Automatic updates and fixes
* New features without extra work
* Components stay current with React Native, Tailwind, and mobile platforms
* Deep customization, not shallow theme tweaks
* AI-friendly APIs for code generation

HeroUI Native is not a snapshot—it's a garden that keeps growing. 🌱

## HeroUI Ecosystem

* **🌐 HeroUI v3** (web) — React components with Tailwind CSS v4
* **📱 HeroUI Native (mobile)** — Beautiful components for React Native
* **🤖 [HeroUI Chat](https://heroui.chat?ref=heroui-v3)** (text-to-app) — Create apps with natural language
* **🧠 UI for LLMs** — New platform & MCPs coming soon

## FAQ

**Is HeroUI Native free?**
Yes, completely free and open source under the MIT license.

**Is it production-ready?**
Currently in **beta**. We're actively working towards a stable release with community feedback.

**Can I customize the components?**
Yes! Update default styles, animations or compose component parts differently. Every slot is customizable.

**Does it work with TypeScript?**
Fully typed with excellent IDE support and autocompletion.

**What about accessibility?**
Accessibility follows mobile development best practices with proper focus management, touch accessibility, and screen reader support built into every component.

**Is there a Figma file?**
Yes! Access our design system at [HeroUI Figma Kit V3](https://www.figma.com/community/file/1546526812159103429).

## Get Involved

Join the community, share feedback, or contribute:

* [GitHub Discussions](https://github.com/heroui-inc/heroui-native/discussions)
* [Discord](https://discord.gg/9b6yyZKmH4)
* [X/Twitter](https://x.com/hero_ui)
* [Contributing Guidelines](https://github.com/heroui-inc/heroui-native/blob/main/CONTRIBUTING.md)

HeroUI Native is released under the [MIT License](https://github.com/heroui-inc/heroui-native/blob/main/LICENSE).

</page>

<page url="/docs/native/releases/beta-10">
# Beta 10

**Category**: native
**URL**: https://v3.heroui.com/docs/native/releases/beta-10
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/releases/beta-10.mdx
> Bottom Sheet component, PressableFeedback refactor, Animation API State Prop extension, use-theme-color multiple colors selection, and bug fixes.


<div className="flex items-center gap-3 mb-6">
  <span className="text-sm text-muted">December 30, 2025</span>
</div>

This release introduces the new [Bottom Sheet](/docs/native/components/bottom-sheet) component, refactors [PressableFeedback](/docs/native/components/pressable-feedback) with improved API, extends the Animation API with State Prop support, enhances the `use-theme-color` hook to handle multiple colors selection, and includes various bug fixes and documentation improvements.

## Installation

Update to the latest version:

<Tabs items={["npm", "pnpm", "yarn", "bun"]}>
  <Tab value="npm">
    ```bash
    npm i heroui-native@beta
    ```
  </Tab>

  <Tab value="pnpm">
    ```bash
    pnpm add heroui-native@beta
    ```
  </Tab>

  <Tab value="yarn">
    ```bash
    yarn add heroui-native@beta
    ```
  </Tab>

  <Tab value="bun">
    ```bash
    bun add heroui-native@beta
    ```
  </Tab>
</Tabs>

<Callout type="info">
  **Using AI assistants?** Simply prompt "Hey Cursor, update HeroUI Native to the latest version" and your AI assistant will automatically compare versions and apply the necessary changes. Learn more about the [HeroUI Native MCP Server](/docs/native/getting-started/mcp-server).
</Callout>

## What's New

### New Components

#### Bottom Sheet

This release introduces the **Bottom Sheet** component, a versatile overlay component that slides up from the bottom of the screen with animated transitions and swipe-to-dismiss gestures.



**Features:**

* Smooth animated transitions with gesture support
* Multiple snap points for flexible sizing
* Detached mode for custom positioning
* Customizable overlay with blur effects
* Full accessibility support
* Built on [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet)

**Usage:**

```tsx
import { BottomSheet, Button } from 'heroui-native';

<BottomSheet>
  <BottomSheet.Trigger asChild>
    <Button>Open Bottom Sheet</Button>
  </BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay />
    <BottomSheet.Content>
      <BottomSheet.Close />
      <BottomSheet.Title>Title</BottomSheet.Title>
      <BottomSheet.Description>Description</BottomSheet.Description>
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>

```

For complete documentation and examples, see the [Bottom Sheet component page](/docs/native/components/bottom-sheet).

**Related PR:** [#174](https://github.com/heroui-inc/heroui-native/pull/174)

## Component Improvements

### PressableFeedback Refactor

The [PressableFeedback](/docs/native/components/pressable-feedback) component has been refactored with an improved API and better animation control.

**Improvements:**

* Enhanced animation configuration API
* Better support for custom animation states
* Improved performance and smoother animations
* More flexible feedback positioning options

The component maintains backward compatibility while providing more control over press feedback animations.

**Related PR:** [#182](https://github.com/heroui-inc/heroui-native/pull/182)

## API Enhancements

### Animation API State Prop Extension

The Animation API has been extended with a new `state` prop that allows you to disable animations while customizing properties. This provides more granular control over animation behavior.

**New Capability:**

```tsx
<Component
  animation={{
    state: 'disabled', // or 'disable-all' or boolean
    // ... other animation properties
  }}
/>

```

The `state` prop can be:

* `'disabled'`: Disable animations while still allowing property customization
* `'disable-all'`: Disable all animations including children
* `boolean`: Simple enable/disable control

This enhancement makes it easier to customize animation properties without enabling animations, useful for fine-tuning component behavior.

**Related PR:** [#176](https://github.com/heroui-inc/heroui-native/pull/176)

### use-theme-color Multiple Colors Selection

The `use-theme-color` hook has been refactored to handle multiple colors selection, making it more flexible and powerful for theme customization.

**Enhancement:**

* Support for selecting multiple colors at once
* Improved color selection logic
* Better performance when working with multiple color values

This improvement makes it easier to work with complex theming scenarios where multiple colors need to be selected and applied together.

**Related PR:** [#170](https://github.com/heroui-inc/heroui-native/pull/170)

## Documentation

### Animated Styles Guide Comments

Added comprehensive comments and documentation to the Animated Styles Guide, making it easier for developers to understand and use animation features effectively.

**Improvements:**

* Enhanced code examples with detailed comments
* Better explanation of animation patterns
* Clearer guidance on when to use different animation approaches

**Related PR:** [#179](https://github.com/heroui-inc/heroui-native/pull/179)

## Bug Fixes

This release includes fixes for the following issues:

* **[Issue #173](https://github.com/heroui-inc/heroui-native/issues/173)**: Fixed issue where `classNames={{container:"bg-x"}}` was not working for styling the backgroundColor of TextField.Input container
* **[Issue #177](https://github.com/heroui-inc/heroui-native/issues/177)**: Fixed button scale animation issue where the scale would sometimes stay at 0.9x and not bounce back after being pressed
* **[Issue #178](https://github.com/heroui-inc/heroui-native/issues/178)**: Fixed bug affecting component functionality

## Updated Documentation

The following documentation pages have been updated to reflect the changes in this release:

* [Animation Guide](/docs/native/getting-started/animation) - Updated with Animation API State Prop documentation
* [Colors Guide](/docs/native/getting-started/colors) - Updated with use-theme-color multiple colors selection information
* [PressableFeedback Component](/docs/native/components/pressable-feedback) - Updated with refactored API documentation

## Links

* [Component Documentation](https://herouinative.com/docs/components)
* [GitHub Repository](https://github.com/heroui-inc/heroui-native)
* [GitHub PR #6068](https://github.com/heroui-inc/heroui/pull/6068)

## Contributors

Thanks to everyone who contributed to this release!

</page>

<page url="/docs/native/releases">
# All Releases

**Category**: native
**URL**: https://v3.heroui.com/docs/native/releases
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/releases/index.mdx
> All updates and changes to HeroUI Native, including new features, fixes, and breaking changes.


<Callout type="info">
  **Using AI assistants?** Simply prompt "Hey Cursor, update HeroUI Native to the latest version" and your AI assistant will automatically compare versions and apply the necessary changes. Learn more about the [HeroUI Native MCP Server](/docs/native/getting-started/mcp-server).
</Callout>

## Latest Release

### Beta 10

**January 2025**

This release introduces the new [Bottom Sheet](/docs/native/components/bottom-sheet) component, refactors [PressableFeedback](/docs/native/components/pressable-feedback) with improved API, extends the Animation API with State Prop support, enhances the `use-theme-color` hook to handle multiple colors selection, and includes various bug fixes and documentation improvements.

[Read full release notes →](/docs/native/releases/beta-10)

## Release Schedule

HeroUI Native follows a regular release cycle:

* **Beta releases**: Monthly stabilization releases - In progress
* **Stable releases**: Quarterly major versions (Q1 2026 target)

## Contributing

Found an issue or want to contribute? Check out our [GitHub repository](https://github.com/heroui-inc/heroui-native).

</page>

<page url="/docs/native/components/button">
# Button

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/button
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(buttons)/button.mdx
> Interactive component that triggers an action when pressed.




## Import

```tsx
import { Button } from 'heroui-native';

```

## Anatomy

```tsx
<Button>
  <Button.Label>...</Button.Label>
</Button>

```

* **Button**: Main container that handles press interactions, animations, and variants. Renders string children as label or accepts compound components for custom layouts.
* **Button.Label**: Text content of the button. Inherits size and variant styling from parent Button context.

## Usage

### Basic Usage

The Button component accepts string children that automatically render as label.

```tsx
<Button>Basic Button</Button>

```

### With Compound Parts

Use Button.Label for explicit control over the label component.

```tsx
<Button>
  <Button.Label>Click me</Button.Label>
</Button>

```

### With Icons

Combine icons with labels for enhanced visual communication.

```tsx
<Button>
  <Icon name="add" size={20} />
  <Button.Label>Add Item</Button.Label>
</Button>

<Button>
  <Button.Label>Download</Button.Label>
  <Icon name="download" size={18} />
</Button>

```

### Icon Only

Create square icon-only buttons using the isIconOnly prop.

```tsx
<Button isIconOnly>
  <Icon name="heart" size={18} />
</Button>

```

### Sizes

Control button dimensions with three size options.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

```

### Variants

Choose from six visual variants for different emphasis levels.

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger-soft">Danger Soft</Button>

```

### Feedback Variants

Choose between highlight, ripple, or no feedback effects for press interactions.

```tsx
{
  /* Highlight feedback (default) */
}
<Button pressableFeedbackVariant="highlight">Highlight Effect</Button>;

{
  /* Ripple feedback */
}
<Button pressableFeedbackVariant="ripple">Ripple Effect</Button>;

{
  /* No feedback overlay (only scale animation) */
}
<Button pressableFeedbackVariant="none">No Overlay</Button>;

{
  /* Customize highlight animation */
}
<Button
  pressableFeedbackVariant="highlight"
  pressableFeedbackHighlightProps={{
    animation: {
      backgroundColor: { value: '#3b82f6' },
      opacity: { value: [0, 0.2] },
    },
  }}
>
  Custom Highlight
</Button>;

{
  /* Customize ripple animation */
}
<Button
  pressableFeedbackVariant="ripple"
  pressableFeedbackRippleProps={{
    animation: {
      backgroundColor: { value: '#3b82f6' },
      opacity: { value: [0, 0.3, 0] },
    },
  }}
>
  Custom Ripple
</Button>;

```

### Loading State with Spinner

Transform button to loading state with spinner animation.

```tsx
const themeColorAccentForeground = useThemeColor('accent-foreground');

<Button
  layout={LinearTransition.springify()}
  variant="primary"
  onPress={() => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  }}
  isIconOnly={isDownloading}
  className="self-center"
>
  {isDownloading ? (
    <Spinner entering={FadeIn.delay(50)} color={themeColorAccentForeground} />
  ) : (
    'Download now'
  )}
</Button>;

```

### Custom Background with LinearGradient

Add gradient backgrounds using absolute positioned elements. Use `pressableFeedbackVariant="none"` to disable the default highlight overlay, or add a custom ripple effect.

```tsx
import { Button, PressableFeedback } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

{
  /* Gradient with no feedback overlay */
}
<Button pressableFeedbackVariant="none">
  <LinearGradient
    colors={['#9333ea', '#ec4899']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={StyleSheet.absoluteFill}
  />
  <Button.Label className="text-white font-bold">Gradient</Button.Label>
</Button>;

{
  /* Gradient with custom ripple effect */
}
<Button pressableFeedbackVariant="none">
  <LinearGradient
    colors={['#0d9488', '#ec4899']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={StyleSheet.absoluteFill}
  />
  <PressableFeedback.Ripple
    animation={{
      backgroundColor: { value: 'white' },
      opacity: { value: [0, 0.5, 0] },
    }}
  />
  <Button.Label className="text-white font-bold" pointerEvents="none">
    Gradient with Ripple
  </Button.Label>
</Button>;

```

## Example

```tsx
import { Button, useThemeColor } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function ButtonExample() {
  const [
    themeColorAccentForeground,
    themeColorAccentSoftForeground,
    themeColorDangerForeground,
    themeColorDefaultForeground,
  ] = useThemeColor([
    'accent-foreground',
    'accent-soft-foreground',
    'danger-foreground',
    'default-foreground',
  ]);

  return (
    <View className="gap-4 p-4">
      <Button variant="primary">
        <Ionicons name="add" size={20} color={themeColorAccentForeground} />
        <Button.Label>Add Item</Button.Label>
      </Button>

      <View className="flex-row gap-4">
        <Button size="sm" isIconOnly>
          <Ionicons name="heart" size={16} color={themeColorAccentForeground} />
        </Button>
        <Button size="sm" variant="secondary" isIconOnly>
          <Ionicons
            name="bookmark"
            size={16}
            color={themeColorAccentSoftForeground}
          />
        </Button>
        <Button size="sm" variant="danger" isIconOnly>
          <Ionicons name="trash" size={16} color={themeColorDangerForeground} />
        </Button>
      </View>

      <Button variant="tertiary">
        <Button.Label>Learn More</Button.Label>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={themeColorDefaultForeground}
        />
      </Button>
    </View>
  );
}

```

## API Reference

### Button

Button extends all props from [PressableFeedback](./pressable-feedback) component with additional button-specific props.

| prop                              | type                                                                             | default       | description                                                    |
| --------------------------------- | -------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------- |
| `variant`                         | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'danger' \| 'danger-soft'` | `'primary'`   | Visual variant of the button                                   |
| `size`                            | `'sm' \| 'md' \| 'lg'`                                                           | `'md'`        | Size of the button                                             |
| `isIconOnly`                      | `boolean`                                                                        | `false`       | Whether the button displays an icon only (square aspect ratio) |
| `pressableFeedbackVariant`        | `'highlight' \| 'ripple' \| 'none'`                                              | `'highlight'` | Variant of pressable feedback effect                           |
| `pressableFeedbackHighlightProps` | `PressableFeedbackHighlightProps`                                                | -             | Props for PressableFeedback.Highlight component                |
| `pressableFeedbackRippleProps`    | `PressableFeedbackRippleProps`                                                   | -             | Props for PressableFeedback.Ripple component                   |

For inherited props including `animation` (for root scale animation), `isDisabled`, `className`, `children`, and all Pressable props, see [PressableFeedback API Reference](./pressable-feedback#api-reference).

### Button.Label

| prop           | type              | default | description                           |
| -------------- | ----------------- | ------- | ------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to be rendered as label       |
| `className`    | `string`          | -       | Additional CSS classes                |
| `...TextProps` | `TextProps`       | -       | All standard Text props are supported |

## Hooks

### useButton

Hook to access the Button context values. Returns the button's size, variant, and disabled state.

```tsx
import { useButton } from 'heroui-native';

const { size, variant, isDisabled } = useButton();

```

#### Return Value

| property     | type                                                                             | description                    |
| ------------ | -------------------------------------------------------------------------------- | ------------------------------ |
| `size`       | `'sm' \| 'md' \| 'lg'`                                                           | Size of the button             |
| `variant`    | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'danger' \| 'danger-soft'` | Visual variant of the button   |
| `isDisabled` | `boolean`                                                                        | Whether the button is disabled |

**Note:** This hook must be used within a `Button` component. It will throw an error if called outside of the button context.

</page>

<page url="/docs/native/components/chip">
# Chip

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/chip
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(data-display)/chip.mdx
> Displays a compact element in a capsule shape.




## Import

```tsx
import { Chip } from 'heroui-native';

```

## Anatomy

```tsx
<Chip>
  <Chip.Label>...</Chip.Label>
</Chip>

```

* **Chip**: Main container that displays a compact element
* **Chip.Label**: Text content of the chip

## Usage

### Basic Usage

The Chip component displays text or custom content in a capsule shape.

```tsx
<Chip>Basic Chip</Chip>

```

### Sizes

Control the chip size with the `size` prop.

```tsx
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>

```

### Variants

Choose between different visual styles with the `variant` prop.

```tsx
<Chip variant="primary">Primary</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="tertiary">Tertiary</Chip>
<Chip variant="soft">Soft</Chip>

```

### Colors

Apply different color themes with the `color` prop.

```tsx
<Chip color="accent">Accent</Chip>
<Chip color="default">Default</Chip>
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="danger">Danger</Chip>

```

### With Icons

Add icons or custom content alongside text using compound components.

```tsx
<Chip>
  <Icon name="star" size={12} />
  <Chip.Label>Featured</Chip.Label>
</Chip>

<Chip>
  <Chip.Label>Close</Chip.Label>
  <Icon name="close" size={12} />
</Chip>

```

### Custom Styling

Apply custom styles using className or style props.

```tsx
<Chip className="bg-purple-600 px-6">
  <Chip.Label className="text-white">Custom</Chip.Label>
</Chip>

```

### Disable All Animations

Disable all animations including children by using the `"disable-all"` value for the `animation` prop.

```tsx
{
  /* Disable all animations including children */
}
<Chip animation="disable-all">No Animations</Chip>;

```

## Example

```tsx
import { Chip } from 'heroui-native';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChipExample() {
  return (
    <View className="gap-4 p-4">
      <View className="flex-row flex-wrap gap-2">
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
        <Chip size="lg">Large</Chip>
      </View>

      <View className="flex-row flex-wrap gap-2">
        <Chip variant="primary" color="accent">
          Primary
        </Chip>
        <Chip variant="secondary" color="success">
          <View className="size-1.5 rounded-full bg-success" />
          <Chip.Label>Success</Chip.Label>
        </Chip>
        <Chip variant="tertiary" color="warning">
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Chip.Label>Premium</Chip.Label>
        </Chip>
      </View>

      <View className="flex-row gap-2">
        <Chip variant="secondary">
          <Chip.Label>Remove</Chip.Label>
          <Ionicons name="close" size={14} color="#6B7280" />
        </Chip>
        <Chip className="bg-purple-600">
          <Chip.Label className="text-white font-semibold">Custom</Chip.Label>
        </Chip>
      </View>
    </View>
  );
}

```

## API Reference

### Chip

| prop                | type                                                          | default     | description                                                                               |
| ------------------- | ------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `children`          | `React.ReactNode`                                             | -           | Content to render inside the chip                                                         |
| `size`              | `'sm' \| 'md' \| 'lg'`                                        | `'md'`      | Size of the chip                                                                          |
| `variant`           | `'primary' \| 'secondary' \| 'tertiary' \| 'soft'`            | `'primary'` | Visual variant of the chip                                                                |
| `color`             | `'accent' \| 'default' \| 'success' \| 'warning' \| 'danger'` | `'accent'`  | Color theme of the chip                                                                   |
| `className`         | `string`                                                      | -           | Additional CSS classes to apply                                                           |
| `animation`         | `"disable-all" \| undefined`                                  | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `...PressableProps` | `PressableProps`                                              | -           | All Pressable props are supported                                                         |

### Chip.Label

| prop           | type              | default | description                            |
| -------------- | ----------------- | ------- | -------------------------------------- |
| `children`     | `React.ReactNode` | -       | Text or content to render as the label |
| `className`    | `string`          | -       | Additional CSS classes to apply        |
| `...TextProps` | `TextProps`       | -       | All standard Text props are supported  |

## Hooks

### useChip

Hook to access the Chip context values. Returns the chip's size, variant, and color.

```tsx
import { useChip } from 'heroui-native';

const { size, variant, color } = useChip();

```

#### Return Value

| property  | type                                                          | description                |
| --------- | ------------------------------------------------------------- | -------------------------- |
| `size`    | `'sm' \| 'md' \| 'lg'`                                        | Size of the chip           |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'soft'`            | Visual variant of the chip |
| `color`   | `'accent' \| 'default' \| 'success' \| 'warning' \| 'danger'` | Color theme of the chip    |

**Note:** This hook must be used within a `Chip` component. It will throw an error if called outside of the chip context.

</page>

<page url="/docs/native/components/error-view">
# ErrorView

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/error-view
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(feedback)/error-view.mdx
> Displays validation error message content with smooth animations.




## Import

```tsx
import { ErrorView } from 'heroui-native';

```

## Anatomy

```tsx
<ErrorView>
  Error message content
</ErrorView>

```

* **ErrorView**: Main container that displays error messages with smooth animations. Accepts string children which are automatically wrapped with Text component, or custom React components for more complex layouts. Controls visibility through the `isInvalid` prop and supports custom entering/exiting animations.

## Usage

### Basic Usage

The ErrorView component displays error messages when validation fails.

```tsx
<ErrorView isInvalid={true}>This field is required</ErrorView>

```

### Controlled Visibility

Control when the error appears using the `isInvalid` prop.

```tsx
const [isInvalid, setIsInvalid] = useState(false);

<ErrorView isInvalid={isInvalid}>Please enter a valid email address</ErrorView>;

```

### Custom Content

Pass custom React components as children instead of strings.

```tsx
<ErrorView isInvalid={true}>
  <View className="flex-row items-center">
    <Icon name="alert-circle" />
    <Text className="ml-2 text-danger">Invalid input</Text>
  </View>
</ErrorView>

```

### Custom Animations

Override default entering and exiting animations using the `animation` prop.

```tsx
import { SlideInDown, SlideOutUp } from 'react-native-reanimated';

<ErrorView
  isInvalid={true}
  animation={{
    entering: { value: SlideInDown.duration(200) },
    exiting: { value: SlideOutUp.duration(150) },
  }}
>
  Field validation failed
</ErrorView>;

```

Disable animations entirely:

```tsx
<ErrorView isInvalid={true} animation={false}>
  Field validation failed
</ErrorView>

```

### Custom Styling

Apply custom styles to the container and text elements.

```tsx
<ErrorView
  isInvalid={true}
  className="mt-2"
  classNames={{
    container: 'bg-danger/10 p-2 rounded',
    text: 'text-xs font-medium',
  }}
>
  Password must be at least 8 characters
</ErrorView>

```

### Custom Text Props

Pass additional props to the Text component when children is a string.

```tsx
<ErrorView
  isInvalid={true}
  textProps={{
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    style: { letterSpacing: 0.5 },
  }}
>
  This is a very long error message that might need to be truncated
</ErrorView>

```

## Example

```tsx
import { ErrorView, TextField } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function ErrorViewExample() {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBlur = () => {
    setShowError(email !== '' && !isValidEmail);
  };

  return (
    <View className="p-4">
      <TextField>
        <TextField.Label>Email Address</TextField.Label>
        <TextField.Input
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          onBlur={handleBlur}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField.Description>
          We'll use this to contact you
        </TextField.Description>
      </TextField>

      <ErrorView isInvalid={showError} className="ml-1">
        Please enter a valid email address
      </ErrorView>
    </View>
  );
}

```

## API Reference

### ErrorView

| prop                   | type                           | default     | description                                                              |
| ---------------------- | ------------------------------ | ----------- | ------------------------------------------------------------------------ |
| `children`             | `React.ReactNode`              | `undefined` | The content of the error field. String children are wrapped with Text    |
| `isInvalid`            | `boolean`                      | `false`     | Controls the visibility of the error field                               |
| `animation`            | `ErrorViewRootAnimation`       | -           | Animation configuration                                                  |
| `className`            | `string`                       | `undefined` | Additional CSS classes for the container                                 |
| `classNames`           | `ElementSlots<ErrorViewSlots>` | `undefined` | Additional CSS classes for different parts of the component              |
| `textProps`            | `TextProps`                    | `undefined` | Additional props to pass to the Text component when children is a string |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`     | -           | All Reanimated Animated.View props are supported                         |

**classNames prop:** `ElementSlots<ErrorViewSlots>` provides type-safe CSS classes for different parts of the error view component. Available slots: `container`, `text`.

#### ErrorViewRootAnimation

Animation configuration for error view root component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                                     | default                                                                 | description                                     |
| ---------------- | ---------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| 'disable-all' \| boolean` | -                                                                       | Disable animations while customizing properties |
| `entering.value` | `EntryOrExitLayoutType`                  | `FadeIn`<br />`.duration(150)`<br />`.easing(Easing.out(Easing.ease))`  | Custom entering animation for error view        |
| `exiting.value`  | `EntryOrExitLayoutType`                  | `FadeOut`<br />`.duration(100)`<br />`.easing(Easing.out(Easing.ease))` | Custom exiting animation for error view         |

</page>

<page url="/docs/native/components/skeleton-group">
# SkeletonGroup

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/skeleton-group
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(feedback)/skeleton-group.mdx
> Coordinates multiple skeleton loading placeholders with centralized animation control.




## Import

```tsx
import { SkeletonGroup } from 'heroui-native';

```

## Anatomy

```tsx
<SkeletonGroup>
  <SkeletonGroup.Item />
</SkeletonGroup>

```

* **SkeletonGroup**: Root container that provides centralized control for all skeleton items
* **SkeletonGroup.Item**: Individual skeleton item that inherits props from the parent group

## Usage

### Basic Usage

The SkeletonGroup component manages multiple skeleton items with shared loading state and animation.

```tsx
<SkeletonGroup isLoading={isLoading}>
  <SkeletonGroup.Item className="h-4 w-full rounded-md" />
  <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
  <SkeletonGroup.Item className="h-4 w-1/2 rounded-md" />
</SkeletonGroup>

```

### With Container Layout

Use className on the group to control layout of skeleton items.

```tsx
<SkeletonGroup isLoading={isLoading} className="flex-row items-center gap-3">
  <SkeletonGroup.Item className="h-12 w-12 rounded-lg" />
  <View className="flex-1 gap-1.5">
    <SkeletonGroup.Item className="h-4 w-full rounded-md" />
    <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
  </View>
</SkeletonGroup>

```

### With isSkeletonOnly for Pure Skeleton Layouts

Use `isSkeletonOnly` when the group contains only skeleton placeholders with layout wrappers (like View) that have no content to render in the loaded state. This prop hides the entire group when `isLoading` is false, preventing empty containers from affecting your layout.

```tsx
<SkeletonGroup
  isLoading={isLoading}
  isSkeletonOnly // Hides entire group when isLoading is false
  className="flex-row items-center gap-3"
>
  <SkeletonGroup.Item className="h-12 w-12 rounded-lg" />
  {/* This View is only for layout, no content */}
  <View className="flex-1 gap-1.5">
    <SkeletonGroup.Item className="h-4 w-full rounded-md" />
    <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
  </View>
</SkeletonGroup>

```

### With Animation Variants

Control animation style for all items in the group.

```tsx
<SkeletonGroup isLoading={isLoading} variant="pulse">
  <SkeletonGroup.Item className="h-10 w-10 rounded-full" />
  <SkeletonGroup.Item className="h-4 w-32 rounded-md" />
  <SkeletonGroup.Item className="h-3 w-24 rounded-md" />
</SkeletonGroup>

```

### With Custom Animation Configuration

Configure shimmer or pulse animations for the entire group.

```tsx
<SkeletonGroup
  isLoading={isLoading}
  variant="shimmer"
  animation={{
    shimmer: {
      duration: 2000,
      highlightColor: 'rgba(59, 130, 246, 0.3)',
    },
  }}
>
  <SkeletonGroup.Item className="h-16 w-full rounded-lg" />
  <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
</SkeletonGroup>

```

### With Enter/Exit Animations

Apply Reanimated transitions when the group appears or disappears.

```tsx
<SkeletonGroup
  entering={FadeInLeft}
  exiting={FadeOutRight}
  isLoading={isLoading}
  className="w-full gap-2"
>
  <SkeletonGroup.Item className="h-4 w-full rounded-md" />
  <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
</SkeletonGroup>

```

## Example

```tsx
import { Card, SkeletonGroup, Avatar } from 'heroui-native';
import { useState } from 'react';
import { Text, View, Image } from 'react-native';

export default function SkeletonGroupExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SkeletonGroup isLoading={isLoading}>
      <Card className="p-4">
        <Card.Header>
          <View className="flex-row items-center gap-3 mb-4">
            <SkeletonGroup.Item className="h-10 w-10 rounded-full">
              <Avatar size="sm" alt="Avatar">
                <Avatar.Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                />
                <Avatar.Fallback />
              </Avatar>
            </SkeletonGroup.Item>

            <View className="flex-1 gap-1">
              <SkeletonGroup.Item className="h-3 w-32 rounded-md">
                <Text className="font-semibold text-foreground">John Doe</Text>
              </SkeletonGroup.Item>
              <SkeletonGroup.Item className="h-3 w-24 rounded-md">
                <Text className="text-sm text-muted">@johndoe</Text>
              </SkeletonGroup.Item>
            </View>
          </View>

          <View className="mb-4 gap-1.5">
            <SkeletonGroup.Item className="h-4 w-full rounded-md">
              <Text className="text-base text-foreground">
                This is the first line of the post content.
              </Text>
            </SkeletonGroup.Item>
            <SkeletonGroup.Item className="h-4 w-full rounded-md">
              <Text className="text-base text-foreground">
                Second line with more interesting content to read.
              </Text>
            </SkeletonGroup.Item>
            <SkeletonGroup.Item className="h-4 w-2/3 rounded-md">
              <Text className="text-base text-foreground">
                Last line is shorter.
              </Text>
            </SkeletonGroup.Item>
          </View>
        </Card.Header>

        <SkeletonGroup.Item className="h-48 w-full rounded-lg">
          <View className="h-48 bg-surface-tertiary rounded-lg overflow-hidden">
            <Image
              source={{
                uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/car1.jpg',
              }}
              className="h-full w-full"
            />
          </View>
        </SkeletonGroup.Item>
      </Card>
    </SkeletonGroup>
  );
}

```

## API Reference

### SkeletonGroup

| prop                    | type                             | default     | description                                                            |
| ----------------------- | -------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `children`              | `React.ReactNode`                | -           | SkeletonGroup.Item components and layout elements                      |
| `isLoading`             | `boolean`                        | `true`      | Whether the skeleton items are currently loading                       |
| `isSkeletonOnly`        | `boolean`                        | `false`     | Hides entire group when isLoading is false (for skeleton-only layouts) |
| `variant`               | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation variant for all items in the group                           |
| `animation`             | `SkeletonRootAnimation`          | -           | Animation configuration                                                |
| `className`             | `string`                         | -           | Additional CSS classes for the group container                         |
| `style`                 | `StyleProp<ViewStyle>`           | -           | Custom styles for the group container                                  |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`       | -           | All Reanimated Animated.View props are supported                       |

#### SkeletonRootAnimation

Animation configuration for SkeletonGroup component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                     | type                                     | default                     | description                                     |
| ------------------------ | ---------------------------------------- | --------------------------- | ----------------------------------------------- |
| `state`                  | `'disabled' \| 'disable-all' \| boolean` | -                           | Disable animations while customizing properties |
| `entering.value`         | `EntryOrExitLayoutType`                  | `FadeIn`                    | Custom entering animation                       |
| `exiting.value`          | `EntryOrExitLayoutType`                  | `FadeOut`                   | Custom exiting animation                        |
| `shimmer.duration`       | `number`                                 | `1500`                      | Animation duration in milliseconds              |
| `shimmer.speed`          | `number`                                 | `1`                         | Speed multiplier for the animation              |
| `shimmer.highlightColor` | `string`                                 | -                           | Highlight color for the shimmer effect          |
| `shimmer.easing`         | `EasingFunction`                         | `Easing.linear`             | Easing function for the animation               |
| `pulse.duration`         | `number`                                 | `1000`                      | Animation duration in milliseconds              |
| `pulse.minOpacity`       | `number`                                 | `0.5`                       | Minimum opacity value                           |
| `pulse.maxOpacity`       | `number`                                 | `1`                         | Maximum opacity value                           |
| `pulse.easing`           | `EasingFunction`                         | `Easing.inOut(Easing.ease)` | Easing function for the animation               |

### SkeletonGroup.Item

| prop                    | type                             | default   | description                                                         |
| ----------------------- | -------------------------------- | --------- | ------------------------------------------------------------------- |
| `children`              | `React.ReactNode`                | -         | Content to show when not loading                                    |
| `isLoading`             | `boolean`                        | inherited | Whether the skeleton is currently loading (overrides group setting) |
| `variant`               | `'shimmer' \| 'pulse' \| 'none'` | inherited | Animation variant (overrides group setting)                         |
| `animation`             | `SkeletonRootAnimation`          | inherited | Animation configuration (overrides group setting)                   |
| `className`             | `string`                         | -         | Additional CSS classes for styling the item                         |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`       | -         | All Reanimated Animated.View props are supported                    |

## Special Notes

### Props Inheritance

SkeletonGroup.Item components inherit all animation-related props from their parent SkeletonGroup:

* `isLoading`
* `variant`
* `animation`

Individual items can override any inherited prop by providing their own value.

</page>

<page url="/docs/native/components/skeleton">
# Skeleton

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/skeleton
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(feedback)/skeleton.mdx
> Displays a loading placeholder with shimmer or pulse animation effects.




## Import

```tsx
import { Skeleton } from 'heroui-native';

```

## Anatomy

The Skeleton component is a simple wrapper that renders a placeholder for content that is loading. It does not have any child components.

```tsx
<Skeleton />

```

## Usage

### Basic Usage

The Skeleton component creates an animated placeholder while content is loading.

```tsx
<Skeleton className="h-20 w-full rounded-lg" />

```

### With Content

Show skeleton while loading, then display content when ready.

```tsx
<Skeleton isLoading={isLoading} className="h-20 rounded-lg">
  <View className="h-20 bg-primary rounded-lg">
    <Text>Loaded Content</Text>
  </View>
</Skeleton>

```

### Animation Variants

Control the animation style with the `variant` prop.

```tsx
<Skeleton variant="shimmer" className="h-20 w-full rounded-lg" />
<Skeleton variant="pulse" className="h-20 w-full rounded-lg" />
<Skeleton variant="none" className="h-20 w-full rounded-lg" />

```

### Custom Shimmer Configuration

Customize the shimmer effect with duration, speed, and highlight color.

```tsx
<Skeleton
  className="h-16 w-full rounded-lg"
  variant="shimmer"
  animation={{
    shimmer: {
      duration: 2000,
      speed: 2,
      highlightColor: 'rgba(59, 130, 246, 0.3)',
    },
  }}
>
  ...
</Skeleton>

```

### Custom Pulse Configuration

Configure pulse animation with duration and opacity range.

```tsx
<Skeleton
  className="h-16 w-full rounded-lg"
  variant="pulse"
  animation={{
    pulse: {
      duration: 500,
      minOpacity: 0.1,
      maxOpacity: 0.8,
    },
  }}
>
  ...
</Skeleton>

```

### Shape Variations

Create different skeleton shapes using className for styling.

```tsx
<Skeleton className="h-4 w-full rounded-md" />
<Skeleton className="h-4 w-3/4 rounded-md" />
<Skeleton className="h-4 w-1/2 rounded-md" />
<Skeleton className="size-12 rounded-full" />

```

### Custom Enter/Exit Animations

Apply custom Reanimated transitions when skeleton appears or disappears.

```tsx
<Skeleton
  entering={FadeIn.duration(300)}
  exiting={FadeOut.duration(300)}
  isLoading={isLoading}
  className="h-20 w-full rounded-lg"
>
  ...
</Skeleton>

```

## Example

```tsx
import { Avatar, Card, Skeleton } from 'heroui-native';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function SkeletonExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="p-4">
      <View className="flex-row items-center gap-3 mb-4">
        <Skeleton isLoading={isLoading} className="h-10 w-10 rounded-full">
          <Avatar size="sm" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=4' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>

        <View className="flex-1 gap-1">
          <Skeleton isLoading={isLoading} className="h-3 w-32 rounded-md">
            <Text className="font-semibold text-foreground">John Doe</Text>
          </Skeleton>
          <Skeleton isLoading={isLoading} className="h-3 w-24 rounded-md">
            <Text className="text-sm text-muted">@johndoe</Text>
          </Skeleton>
        </View>
      </View>

      <Skeleton
        isLoading={isLoading}
        className="h-48 w-full rounded-lg"
        animation={{
          shimmer: {
            duration: 1500,
            speed: 1,
          },
        }}
      >
        <View className="h-48 bg-surface-tertiary rounded-lg overflow-hidden">
          <Image
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/car1.jpg',
            }}
            className="h-full w-full"
          />
        </View>
      </Skeleton>
    </Card>
  );
}

```

## API Reference

### Skeleton

| prop                    | type                             | default     | description                                                  |
| ----------------------- | -------------------------------- | ----------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode`                | -           | Content to show when not loading                             |
| `isLoading`             | `boolean`                        | `true`      | Whether the skeleton is currently loading                    |
| `variant`               | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation variant                                            |
| `animation`             | `SkeletonRootAnimation`          | -           | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                        | `true`      | Whether animated styles (react-native-reanimated) are active |
| `className`             | `string`                         | -           | Additional CSS classes for styling                           |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`       | -           | All Reanimated Animated.View props are supported             |

#### SkeletonRootAnimation

Animation configuration for Skeleton component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                     | type                                     | default                     | description                                     |
| ------------------------ | ---------------------------------------- | --------------------------- | ----------------------------------------------- |
| `state`                  | `'disabled' \| 'disable-all' \| boolean` | -                           | Disable animations while customizing properties |
| `entering.value`         | `EntryOrExitLayoutType`                  | `FadeIn`                    | Custom entering animation                       |
| `exiting.value`          | `EntryOrExitLayoutType`                  | `FadeOut`                   | Custom exiting animation                        |
| `shimmer.duration`       | `number`                                 | `1500`                      | Animation duration in milliseconds              |
| `shimmer.speed`          | `number`                                 | `1`                         | Speed multiplier for the animation              |
| `shimmer.highlightColor` | `string`                                 | -                           | Highlight color for the shimmer effect          |
| `shimmer.easing`         | `EasingFunction`                         | `Easing.linear`             | Easing function for the animation               |
| `pulse.duration`         | `number`                                 | `1000`                      | Animation duration in milliseconds              |
| `pulse.minOpacity`       | `number`                                 | `0.5`                       | Minimum opacity value                           |
| `pulse.maxOpacity`       | `number`                                 | `1`                         | Maximum opacity value                           |
| `pulse.easing`           | `EasingFunction`                         | `Easing.inOut(Easing.ease)` | Easing function for the animation               |

</page>

<page url="/docs/native/components/spinner">
# Spinner

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/spinner
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(feedback)/spinner.mdx
> Displays an animated loading indicator.




## Import

```tsx
import { Spinner } from 'heroui-native';

```

## Anatomy

```tsx
<Spinner>
  <Spinner.Indicator>...</Spinner.Indicator>
</Spinner>

```

* **Spinner**: Main container that controls loading state, size, and color. Renders a default animated indicator if no children provided.
* **Spinner.Indicator**: Optional sub-component for customizing animation configuration and icon appearance. Accepts custom children to replace the default icon.

## Usage

### Basic Usage

The Spinner component displays a rotating loading indicator.

```tsx
<Spinner />

```

### Sizes

Control the spinner size with the `size` prop.

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

```

### Colors

Use predefined color variants or custom colors.

```tsx
<Spinner color="default" />
<Spinner color="success" />
<Spinner color="warning" />
<Spinner color="danger" />
<Spinner color="#8B5CF6" />

```

### Loading State

Control the visibility of the spinner with the `isLoading` prop.

```tsx
<Spinner isLoading={true} />
<Spinner isLoading={false} />

```

### Animation Speed

Customize the rotation speed using the `animation` prop on the Indicator component.

```tsx
<Spinner>
  <Spinner.Indicator animation={{ rotation: { speed: 0.5 } }} />
</Spinner>

<Spinner>
  <Spinner.Indicator animation={{ rotation: { speed: 2 } }} />
</Spinner>

```

### Custom Icon

Replace the default spinner icon with custom content.

```tsx
const themeColorForeground = useThemeColor('foreground')

<Spinner>
  <Spinner.Indicator>
    <Ionicons name="refresh" size={24} color={themeColorForeground} />
  </Spinner.Indicator>
</Spinner>

<Spinner>
  <Spinner.Indicator>
    <Text>⏳</Text>
  </Spinner.Indicator>
</Spinner>

```

## Example

```tsx
import { Spinner } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function SpinnerExample() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View className="gap-4 p-4 bg-background">
      <View className="flex-row items-center gap-2 p-4 rounded-lg bg-stone-200">
        <Spinner size="sm" color="default" />
        <Text className="text-stone-500">Loading content...</Text>
      </View>

      <View className="items-center p-8 rounded-2xl bg-stone-200">
        <Spinner size="lg" color="success" isLoading={isLoading} />
        <Text className="text-stone-500 mt-4">Processing...</Text>
        <TouchableOpacity onPress={() => setIsLoading(!isLoading)}>
          <Text className="text-primary mt-2 text-sm">
            {isLoading ? 'Tap to stop' : 'Tap to start'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4 items-center justify-center">
        <Spinner size="md" color="#EC4899">
          <Spinner.Indicator animation={{ rotation: { speed: 0.7 } }}>
            <Ionicons name="refresh" size={24} color="#EC4899" />
          </Spinner.Indicator>
        </Spinner>
      </View>
    </View>
  );
}

```

## API Reference

### Spinner

| prop           | type                                                        | default     | description                                        |
| -------------- | ----------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode`                                           | `undefined` | Content to render inside the spinner               |
| `size`         | `'sm' \| 'md' \| 'lg'`                                      | `'md'`      | Size of the spinner                                |
| `color`        | `'default' \| 'success' \| 'warning' \| 'danger' \| string` | `'default'` | Color theme of the spinner                         |
| `isLoading`    | `boolean`                                                   | `true`      | Whether the spinner is loading                     |
| `className`    | `string`                                                    | `undefined` | Custom class name for the spinner                  |
| `animation`    | `SpinnerRootAnimation`                                      | -           | Animation configuration                            |
| `...ViewProps` | `ViewProps`                                                 | -           | All standard React Native View props are supported |

#### SpinnerRootAnimation

Animation configuration for Spinner component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                                     | default                                                                | description                                     |
| ---------------- | ---------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| 'disable-all' \| boolean` | -                                                                      | Disable animations while customizing properties |
| `entering.value` | `EntryOrExitLayoutType`                  | `FadeIn`<br />`.duration(200)`<br />`.easing(Easing.out(Easing.ease))` | Custom entering animation                       |
| `exiting.value`  | `EntryOrExitLayoutType`                  | `FadeOut`<br />`.duration(100)`                                        | Custom exiting animation                        |

### Spinner.Indicator

| prop                    | type                        | default     | description                                                  |
| ----------------------- | --------------------------- | ----------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode`           | `undefined` | Content to render inside the indicator                       |
| `iconProps`             | `SpinnerIconProps`          | `undefined` | Props for the default icon                                   |
| `className`             | `string`                    | `undefined` | Custom class name for the indicator element                  |
| `animation`             | `SpinnerIndicatorAnimation` | -           | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                   | `true`      | Whether animated styles (react-native-reanimated) are active |
| `...Animated.ViewProps` | `Animated.ViewProps`        | -           | All Reanimated Animated.View props are supported             |

#### SpinnerIndicatorAnimation

Animation configuration for Spinner.Indicator component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop              | type                         | default         | description                                     |
| ----------------- | ---------------------------- | --------------- | ----------------------------------------------- |
| `state`           | `'disabled' \| boolean`      | -               | Disable animations while customizing properties |
| `rotation.speed`  | `number`                     | `1.1`           | Rotation speed multiplier                       |
| `rotation.easing` | `WithTimingConfig['easing']` | `Easing.linear` | Animation easing configuration                  |

### SpinnerIconProps

| prop     | type               | default          | description        |
| -------- | ------------------ | ---------------- | ------------------ |
| `width`  | `number \| string` | `24`             | Width of the icon  |
| `height` | `number \| string` | `24`             | Height of the icon |
| `color`  | `string`           | `'currentColor'` | Color of the icon  |

</page>

<page url="/docs/native/components/checkbox">
# Checkbox

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/checkbox
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(forms)/checkbox.mdx
> A selectable control that allows users to toggle between checked and unchecked states.




## Import

```tsx
import { Checkbox } from 'heroui-native';

```

## Anatomy

```tsx
<Checkbox>
  <Checkbox.Indicator>...</Checkbox.Indicator>
</Checkbox>

```

* **Checkbox**: Main container that handles selection state and user interaction. Renders default indicator with animated checkmark if no children provided. Automatically detects surface context for proper styling. Features press scale animation that can be customized or disabled. Supports render function children to access state (`isSelected`, `isInvalid`, `isDisabled`).
* **Checkbox.Indicator**: Optional checkmark container with default slide, scale, opacity, and border radius animations when selected. Renders animated check icon with SVG path drawing animation if no children provided. All animations can be individually customized or disabled. Supports render function children to access state.

## Usage

### Basic Usage

The Checkbox component renders with a default animated indicator if no children are provided. It automatically detects whether it's on a surface background for proper styling.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected} />

```

### With Custom Indicator

Use a render function in the Indicator to show/hide custom icons based on state.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Checkbox.Indicator>
    {({ isSelected }) => (isSelected ? <CheckIcon /> : null)}
  </Checkbox.Indicator>
</Checkbox>

```

### Invalid State

Show validation errors with the `isInvalid` prop, which applies danger color styling.

```tsx
<Checkbox
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
  isInvalid={hasError}
/>

```

### Custom Animations

Customize or disable animations for both the root checkbox and indicator.

```tsx
{
  /* Disable all animations (root and indicator) */
}
<Checkbox
  animation="disable-all"
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
>
  <Checkbox.Indicator />
</Checkbox>;

{
  /* Disable only root animation */
}
<Checkbox
  animation="disabled"
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
>
  <Checkbox.Indicator />
</Checkbox>;

{
  /* Disable only indicator animation */
}
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Checkbox.Indicator animation="disabled" />
</Checkbox>;

{
  /* Custom animation configuration */
}
<Checkbox
  animation={{ scale: { value: [1, 0.9], timingConfig: { duration: 200 } } }}
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
>
  <Checkbox.Indicator
    animation={{
      scale: { value: [0.5, 1] },
      opacity: { value: [0, 1] },
      translateX: { value: [-8, 0] },
      borderRadius: { value: [12, 0] },
    }}
  />
</Checkbox>;

```

## Example

```tsx
import { Checkbox, Divider, FormField, Surface } from 'heroui-native';
import React from 'react';
import { View, Text } from 'react-native';

interface CheckboxFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => {
  return (
    <FormField isSelected={isSelected} onSelectedChange={onSelectedChange}>
      <FormField.Indicator>
        <Checkbox className="mt-0.5" />
      </FormField.Indicator>
      <View className="flex-1">
        <FormField.Label className="text-lg">{title}</FormField.Label>
        <FormField.Description className="text-base">
          {description}
        </FormField.Description>
      </View>
    </FormField>
  );
};

export default function BasicUsage() {
  const [fields, setFields] = React.useState({
    newsletter: true,
    marketing: false,
    terms: false,
  });

  const fieldConfigs: Record<
    keyof typeof fields,
    { title: string; description: string }
  > = {
    newsletter: {
      title: 'Subscribe to newsletter',
      description: 'Get weekly updates about new features and tips',
    },
    marketing: {
      title: 'Marketing communications',
      description: 'Receive promotional emails and special offers',
    },
    terms: {
      title: 'Accept terms and conditions',
      description: 'Agree to our Terms of Service and Privacy Policy',
    },
  };

  const handleFieldChange = (key: keyof typeof fields) => (value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const fieldKeys = Object.keys(fields) as Array<keyof typeof fields>;

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface className="py-5 w-full">
        {fieldKeys.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <Divider className="my-4" />}
            <CheckboxField
              isSelected={fields[key]}
              onSelectedChange={handleFieldChange(key)}
              title={fieldConfigs[key].title}
              description={fieldConfigs[key].description}
            />
          </React.Fragment>
        ))}
      </Surface>
    </View>
  );
}

```

## API Reference

### Checkbox

| prop                    | type                                                                   | default     | description                                                               |
| ----------------------- | ---------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`              | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Child elements or render function to customize the checkbox               |
| `isSelected`            | `boolean`                                                              | `undefined` | Whether the checkbox is currently selected                                |
| `onSelectedChange`      | `(isSelected: boolean) => void`                                        | `undefined` | Callback fired when the checkbox selection state changes                  |
| `isDisabled`            | `boolean`                                                              | `false`     | Whether the checkbox is disabled and cannot be interacted with            |
| `isInvalid`             | `boolean`                                                              | `false`     | Whether the checkbox is invalid (shows danger color)                      |
| `isOnSurface`           | `boolean`                                                              | `undefined` | Whether checkbox is on a surface background (auto-detected if not set)    |
| `hitSlop`               | `number`                                                               | `6`         | Hit slop for the pressable area                                           |
| `animation`             | `CheckboxRootAnimation`                                                | -           | Animation configuration                                                   |
| `isAnimatedStyleActive` | `boolean`                                                              | `true`      | Whether animated styles (react-native-reanimated) are active              |
| `className`             | `string`                                                               | `undefined` | Additional CSS classes to apply                                           |
| `...PressableProps`     | `PressableProps`                                                       | -           | All standard React Native Pressable props are supported (except disabled) |

#### CheckboxRenderProps

| prop         | type      | description                      |
| ------------ | --------- | -------------------------------- |
| `isSelected` | `boolean` | Whether the checkbox is selected |
| `isInvalid`  | `boolean` | Whether the checkbox is invalid  |
| `isDisabled` | `boolean` | Whether the checkbox is disabled |

#### CheckboxRootAnimation

Animation configuration for checkbox root component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                 | type                                     | default             | description                                     |
| -------------------- | ---------------------------------------- | ------------------- | ----------------------------------------------- |
| `state`              | `'disabled' \| 'disable-all' \| boolean` | -                   | Disable animations while customizing properties |
| `scale.value`        | `[number, number]`                       | `[1, 0.96]`         | Scale values \[unpressed, pressed]              |
| `scale.timingConfig` | `WithTimingConfig`                       | `{ duration: 150 }` | Animation timing configuration                  |

### Checkbox.Indicator

| prop                    | type                                                                   | default     | description                                                  |
| ----------------------- | ---------------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Content or render function for the checkbox indicator        |
| `className`             | `string`                                                               | `undefined` | Additional CSS classes for the indicator                     |
| `iconProps`             | `CheckboxIndicatorIconProps`                                           | `undefined` | Custom props for the default animated check icon             |
| `animation`             | `CheckboxIndicatorAnimation`                                           | -           | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                                                              | `true`      | Whether animated styles (react-native-reanimated) are active |
| `...AnimatedViewProps`  | `AnimatedProps<ViewProps>`                                             | -           | All standard React Native Animated View props are supported  |

#### CheckboxIndicatorIconProps

Props for customizing the default animated check icon.

| prop            | type     | description                                      |
| --------------- | -------- | ------------------------------------------------ |
| `size`          | `number` | Icon size                                        |
| `strokeWidth`   | `number` | Icon stroke width                                |
| `color`         | `string` | Icon color (defaults to theme accent-foreground) |
| `enterDuration` | `number` | Duration of enter animation (check appearing)    |
| `exitDuration`  | `number` | Duration of exit animation (check disappearing)  |

#### CheckboxIndicatorAnimation

Animation configuration for checkbox indicator component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                        | type                    | default             | description                                     |
| --------------------------- | ----------------------- | ------------------- | ----------------------------------------------- |
| `state`                     | `'disabled' \| boolean` | -                   | Disable animations while customizing properties |
| `opacity.value`             | `[number, number]`      | `[0, 1]`            | Opacity values \[unselected, selected]          |
| `opacity.timingConfig`      | `WithTimingConfig`      | `{ duration: 100 }` | Animation timing configuration                  |
| `borderRadius.value`        | `[number, number]`      | `[8, 0]`            | Border radius values \[unselected, selected]    |
| `borderRadius.timingConfig` | `WithTimingConfig`      | `{ duration: 50 }`  | Animation timing configuration                  |
| `translateX.value`          | `[number, number]`      | `[-4, 0]`           | TranslateX values \[unselected, selected]       |
| `translateX.timingConfig`   | `WithTimingConfig`      | `{ duration: 100 }` | Animation timing configuration                  |
| `scale.value`               | `[number, number]`      | `[0.8, 1]`          | Scale values \[unselected, selected]            |
| `scale.timingConfig`        | `WithTimingConfig`      | `{ duration: 100 }` | Animation timing configuration                  |

## Hooks

### useCheckbox

Hook to access checkbox context values within custom components or compound components.

```tsx
import { useCheckbox } from 'heroui-native';

const CustomIndicator = () => {
  const { isSelected, isInvalid, isDisabled } = useCheckbox();
  // ... your implementation
};

```

**Returns:** `UseCheckboxReturn`

| property           | type                                           | description                                                    |
| ------------------ | ---------------------------------------------- | -------------------------------------------------------------- |
| `isSelected`       | `boolean \| undefined`                         | Whether the checkbox is currently selected                     |
| `onSelectedChange` | `((isSelected: boolean) => void) \| undefined` | Callback function to change the checkbox selection state       |
| `isDisabled`       | `boolean`                                      | Whether the checkbox is disabled and cannot be interacted with |
| `isInvalid`        | `boolean`                                      | Whether the checkbox is invalid (shows danger color)           |
| `isOnSurface`      | `boolean \| undefined`                         | Whether checkbox is on a surface background                    |
| `nativeID`         | `string \| undefined`                          | Native ID for the checkbox element                             |

**Note:** This hook must be used within a `Checkbox` component. It will throw an error if called outside of the checkbox context.

</page>

<page url="/docs/native/components/form-field">
# FormField

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/form-field
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(forms)/form-field.mdx
> Provides consistent layout and interaction for form controls with label, description, and error handling. Perfect for Switch and Checkbox components when you want the entire field to be pressable.




## Import

```tsx
import { FormField } from 'heroui-native';

```

## Anatomy

```tsx
<FormField>
  <FormField.Label>...</FormField.Label>
  <FormField.Description>...</FormField.Description>
  <FormField.Indicator>...</FormField.Indicator>
  <FormField.ErrorMessage>...</FormField.ErrorMessage>
</FormField>

```

* **FormField**: Root container that manages layout and state propagation
* **FormField.Label**: Primary text label for the control
* **FormField.Description**: Secondary descriptive helper text
* **FormField.Indicator**: Container for the form control component (Switch, Checkbox)
* **FormField.ErrorMessage**: Validation error message display

## Usage

### Basic Usage

FormField wraps form controls to provide consistent layout and state management.

```tsx
<FormField isSelected={value} onSelectedChange={setValue}>
  <View className="flex-1">
    <FormField.Label>Label text</FormField.Label>
  </View>
  <FormField.Indicator />
</FormField>

```

### With Description

Add helper text below the label using the Description component.

```tsx
<FormField isSelected={value} onSelectedChange={setValue}>
  <View className="flex-1">
    <FormField.Label>Enable notifications</FormField.Label>
    <FormField.Description>
      Receive push notifications about your account activity
    </FormField.Description>
  </View>
  <FormField.Indicator />
</FormField>

```

### With Error Message

Display validation errors using the ErrorMessage component.

```tsx
<FormField
  isSelected={value}
  onSelectedChange={setValue}
  isInvalid={!value}
  className="flex-col items-start gap-1"
>
  <View className="flex-row items-center gap-2">
    <View className="flex-1">
      <FormField.Label>I agree to the terms</FormField.Label>
      <FormField.Description>
        By checking this box, you agree to our Terms of Service
      </FormField.Description>
    </View>
    <FormField.Indicator variant="checkbox" />
  </View>
  <FormField.ErrorMessage>This field is required</FormField.ErrorMessage>
</FormField>

```

### Disabled State

Control interactivity with the disabled prop.

```tsx
<FormField isSelected={value} onSelectedChange={setValue} isDisabled>
  <View className="flex-1">
    <FormField.Label>Disabled field</FormField.Label>
    <FormField.Description>This field is disabled</FormField.Description>
  </View>
  <FormField.Indicator />
</FormField>

```

### Disabling All Animations

Disable all animations including children by using `"disable-all"`. This cascades down to all child components.

```tsx
<FormField
  isSelected={value}
  onSelectedChange={setValue}
  animation="disable-all"
>
  <View className="flex-1">
    <FormField.Label>Label text</FormField.Label>
    <FormField.Description>Description text</FormField.Description>
  </View>
  <FormField.Indicator />
</FormField>

```

## Example

```tsx
import { Checkbox, FormField, Switch } from 'heroui-native';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function FormFieldExample() {
  const [notifications, setNotifications] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);

  return (
    <ScrollView className="bg-background p-4">
      <View className="gap-4">
        <FormField
          isSelected={notifications}
          onSelectedChange={setNotifications}
        >
          <View className="flex-1">
            <FormField.Label>Enable notifications</FormField.Label>
            <FormField.Description>
              Receive push notifications about your account activity
            </FormField.Description>
          </View>
          <FormField.Indicator />
        </FormField>

        <FormField
          isSelected={terms}
          onSelectedChange={setTerms}
          isInvalid={!terms}
          className="flex-col items-start gap-1"
        >
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <FormField.Label>
                I agree to the terms and conditions
              </FormField.Label>
              <FormField.Description>
                By checking this box, you agree to our Terms of Service
              </FormField.Description>
            </View>
            <FormField.Indicator className="mt-0.5">
              <Checkbox />
            </FormField.Indicator>
          </View>
          <FormField.ErrorMessage>
            This field is required
          </FormField.ErrorMessage>
        </FormField>

        <FormField isSelected={newsletter} onSelectedChange={setNewsletter}>
          <View className="flex-1">
            <FormField.Label>Subscribe to newsletter</FormField.Label>
          </View>
          <FormField.Indicator>
            <Checkbox color="warning" />
          </FormField.Indicator>
        </FormField>
      </View>
    </ScrollView>
  );
}

```

## API Reference

### FormField

| prop              | type                                                                    | default     | description                                                                               |
| ----------------- | ----------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| children          | `React.ReactNode \| ((props: FormFieldRenderProps) => React.ReactNode)` | -           | Content to render inside the form control, or a render function                           |
| isSelected        | `boolean`                                                               | `undefined` | Whether the control is selected/checked                                                   |
| isDisabled        | `boolean`                                                               | `false`     | Whether the form control is disabled                                                      |
| isInvalid         | `boolean`                                                               | `false`     | Whether the form control is invalid                                                       |
| className         | `string`                                                                | -           | Custom class name for the root element                                                    |
| onSelectedChange  | `(isSelected: boolean) => void`                                         | -           | Callback when selection state changes                                                     |
| animation         | `"disable-all" \| undefined`                                            | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| ...PressableProps | `PressableProps`                                                        | -           | All React Native Pressable props are supported                                            |

### FormField.Label

| prop         | type              | default | description                               |
| ------------ | ----------------- | ------- | ----------------------------------------- |
| children     | `React.ReactNode` | -       | Label text content                        |
| className    | `string`          | -       | Custom class name for the label element   |
| ...TextProps | `TextProps`       | -       | All React Native Text props are supported |

### FormField.Description

| prop         | type              | default | description                                   |
| ------------ | ----------------- | ------- | --------------------------------------------- |
| children     | `React.ReactNode` | -       | Description text content                      |
| className    | `string`          | -       | Custom class name for the description element |
| ...TextProps | `TextProps`       | -       | All React Native Text props are supported     |

### FormField.Indicator

| prop         | type                     | default    | description                                                |
| ------------ | ------------------------ | ---------- | ---------------------------------------------------------- |
| children     | `React.ReactNode`        | -          | Control component to render (Switch, Checkbox)             |
| variant      | `'checkbox' \| 'switch'` | `'switch'` | Variant of the control to render when no children provided |
| className    | `string`                 | -          | Custom class name for the indicator element                |
| ...ViewProps | `ViewProps`              | -          | All React Native View props are supported                  |

**Note**: When children are provided, the component automatically passes down `isSelected`, `onSelectedChange`, `isDisabled`, and `isInvalid` props from the FormField context if they are not already present on the child component.

### FormField.ErrorMessage

FormField.ErrorMessage extends all props from [ErrorView](./error-view) component.

**Note**: The `isInvalid` prop is automatically passed from the FormField context. The error message visibility is controlled by the `isInvalid` state of the parent FormField.

## Hooks

### useFormField

**Returns:**

| property           | type                                           | description                                    |
| ------------------ | ---------------------------------------------- | ---------------------------------------------- |
| `isSelected`       | `boolean \| undefined`                         | Whether the control is selected/checked        |
| `onSelectedChange` | `((isSelected: boolean) => void) \| undefined` | Callback when selection state changes          |
| `isDisabled`       | `boolean`                                      | Whether the form control is disabled           |
| `isInvalid`        | `boolean`                                      | Whether the form control is invalid            |
| `isPressed`        | `SharedValue<boolean>`                         | Reanimated shared value indicating press state |

</page>

<page url="/docs/native/components/radio-group">
# RadioGroup

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/radio-group
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(forms)/radio-group.mdx
> A set of radio buttons where only one option can be selected at a time.




## Import

```tsx
import { RadioGroup } from 'heroui-native';

```

## Anatomy

```tsx
<RadioGroup>
  <RadioGroup.Item>
    <RadioGroup.Label>...</RadioGroup.Label>
    <RadioGroup.Description>...</RadioGroup.Description>
    <RadioGroup.Indicator>
      <RadioGroup.IndicatorThumb />
    </RadioGroup.Indicator>
  </RadioGroup.Item>
  <RadioGroup.ErrorMessage>...</RadioGroup.ErrorMessage>
</RadioGroup>

```

* **RadioGroup**: Container that manages the selection state of radio items. Supports both horizontal and vertical orientations.
* **RadioGroup.Item**: Individual radio option within a RadioGroup. Must be used inside RadioGroup. Handles selection state and renders default indicator if no children provided. Supports render function children to access state (`isSelected`, `isInvalid`, `isDisabled`).
* **RadioGroup.Label**: Optional clickable text label for the radio option. Linked to the radio for accessibility.
* **RadioGroup.Description**: Optional secondary text below the label. Provides additional context about the radio option.
* **RadioGroup.Indicator**: Optional container for the radio circle. Renders default thumb if no children provided. Manages the visual selection state.
* **RadioGroup.IndicatorThumb**: Optional inner circle that appears when selected. Animates scale based on selection. Can be replaced with custom content.
* **RadioGroup.ErrorMessage**: Error message displayed when radio group is invalid. Shown with animation below the radio group content.

## Usage

### Basic Usage

RadioGroup with simple string children automatically renders title and indicator.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
  <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
  <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
</RadioGroup>

```

### With Descriptions

Add descriptive text below each radio option for additional context.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="standard">
    <View>
      <RadioGroup.Label>Standard Shipping</RadioGroup.Label>
      <RadioGroup.Description>
        Delivered in 5-7 business days
      </RadioGroup.Description>
    </View>
    <RadioGroup.Indicator />
  </RadioGroup.Item>
  <RadioGroup.Item value="express">
    <View>
      <RadioGroup.Label>Express Shipping</RadioGroup.Label>
      <RadioGroup.Description>
        Delivered in 2-3 business days
      </RadioGroup.Description>
    </View>
    <RadioGroup.Indicator />
  </RadioGroup.Item>
</RadioGroup>

```

### Custom Indicator

Replace the default indicator thumb with custom content.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="custom">
    <RadioGroup.Label>Custom Option</RadioGroup.Label>
    <RadioGroup.Indicator>
      {value === 'custom' && (
        <Animated.View entering={FadeIn}>
          <Icon name="check" size={12} />
        </Animated.View>
      )}
    </RadioGroup.Indicator>
  </RadioGroup.Item>
</RadioGroup>

```

### With Render Function

Use a render function on RadioGroup.Item to access state and customize the entire content.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="option1">
    {({ isSelected, isInvalid, isDisabled }) => (
      <>
        <RadioGroup.Label>Option 1</RadioGroup.Label>
        <RadioGroup.Indicator>
          {isSelected && <CustomIcon />}
        </RadioGroup.Indicator>
      </>
    )}
  </RadioGroup.Item>
</RadioGroup>

```

### With Error Message

Display validation errors below the radio group.

```tsx
<RadioGroup value={value} onValueChange={setValue} isInvalid={!value}>
  <RadioGroup.Item value="agree">I agree to the terms</RadioGroup.Item>
  <RadioGroup.Item value="disagree">I do not agree</RadioGroup.Item>
  <RadioGroup.ErrorMessage>
    Please select an option to continue
  </RadioGroup.ErrorMessage>
</RadioGroup>

```

## Example

```tsx
import { RadioGroup, useThemeColor } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export default function PaymentMethodExample() {
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const themeColorForeground = useThemeColor('foreground');

  return (
    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
      <RadioGroup.Item value="card">
        <View>
          <View className="flex-row items-center gap-1.5">
            <Ionicons
              name="card-outline"
              size={16}
              color={themeColorForeground}
            />
            <RadioGroup.Label>Credit/Debit Card</RadioGroup.Label>
          </View>
          <RadioGroup.Description>
            Pay securely with your credit or debit card
          </RadioGroup.Description>
        </View>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <RadioGroup.Item value="paypal">
        <View>
          <RadioGroup.Label>PayPal</RadioGroup.Label>
          <RadioGroup.Description>
            Fast and secure payment with PayPal
          </RadioGroup.Description>
        </View>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <RadioGroup.Item value="bank">
        <View>
          <RadioGroup.Label>Bank Transfer</RadioGroup.Label>
          <RadioGroup.Description>
            Direct transfer from your bank account
          </RadioGroup.Description>
        </View>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
    </RadioGroup>
  );
}

```

## API Reference

### RadioGroup

| prop            | type                         | default     | description                                                                               |
| --------------- | ---------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `children`      | `React.ReactNode`            | `undefined` | Radio group content                                                                       |
| `value`         | `string \| undefined`        | `undefined` | The currently selected value of the radio group                                           |
| `onValueChange` | `(val: string) => void`      | `undefined` | Callback fired when the selected value changes                                            |
| `isDisabled`    | `boolean`                    | `false`     | Whether the entire radio group is disabled                                                |
| `isInvalid`     | `boolean`                    | `false`     | Whether the radio group is invalid                                                        |
| `isOnSurface`   | `boolean`                    | `undefined` | Whether the radio group is on surface                                                     |
| `animation`     | `"disable-all" \| undefined` | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `className`     | `string`                     | `undefined` | Custom class name                                                                         |
| `...ViewProps`  | `ViewProps`                  | -           | All standard React Native View props are supported                                        |

### RadioGroup.Item

| prop                | type                                                                         | default     | description                                                               |
| ------------------- | ---------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode \| ((props: RadioGroupItemRenderProps) => React.ReactNode)` | `undefined` | Radio item content or render function to customize the radio item         |
| `value`             | `string`                                                                     | `undefined` | The value associated with this radio item                                 |
| `isDisabled`        | `boolean`                                                                    | `false`     | Whether this specific radio item is disabled                              |
| `isInvalid`         | `boolean`                                                                    | `false`     | Whether the radio item is invalid                                         |
| `isOnSurface`       | `boolean`                                                                    | `undefined` | Whether the radio item is on surface (auto-detected if not set)           |
| `hitSlop`           | `number`                                                                     | `6`         | Hit slop for the pressable area                                           |
| `className`         | `string`                                                                     | `undefined` | Custom class name                                                         |
| `...PressableProps` | `PressableProps`                                                             | -           | All standard React Native Pressable props are supported (except disabled) |

#### RadioGroupItemRenderProps

| prop         | type      | description                        |
| ------------ | --------- | ---------------------------------- |
| `isSelected` | `boolean` | Whether the radio item is selected |
| `isInvalid`  | `boolean` | Whether the radio item is invalid  |
| `isDisabled` | `boolean` | Whether the radio item is disabled |

### RadioGroup.Indicator

| prop                    | type                       | default     | description                                      |
| ----------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`          | `undefined` | Indicator content                                |
| `className`             | `string`                   | `undefined` | Custom class name                                |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>` | -           | All Reanimated Animated.View props are supported |

**Note:** The `isOnSurface` state is automatically provided via context from the parent RadioGroup.Item component.

### RadioGroup.IndicatorThumb

| prop                    | type                                | default     | description                                                  |
| ----------------------- | ----------------------------------- | ----------- | ------------------------------------------------------------ |
| `className`             | `string`                            | `undefined` | Custom class name                                            |
| `animation`             | `RadioGroupIndicatorThumbAnimation` | -           | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                           | `true`      | Whether animated styles (react-native-reanimated) are active |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`          | -           | All Reanimated Animated.View props are supported             |

#### RadioGroupIndicatorThumbAnimation

Animation configuration for RadioGroupIndicatorThumb component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                 | type                    | default                                              | description                                     |
| -------------------- | ----------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| `state`              | `'disabled' \| boolean` | -                                                    | Disable animations while customizing properties |
| `scale.value`        | `[number, number]`      | `[1.5, 1]`                                           | Scale values \[unselected, selected]            |
| `scale.timingConfig` | `WithTimingConfig`      | `{ duration: 300, easing: Easing.out(Easing.ease) }` | Animation timing configuration                  |

### RadioGroup.Label

| prop                    | type                       | default     | description                                      |
| ----------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`          | `undefined` | Label text content                               |
| `className`             | `string`                   | `undefined` | Custom class name for the label element          |
| `...Animated.TextProps` | `AnimatedProps<TextProps>` | -           | All Reanimated Animated.Text props are supported |

### RadioGroup.Description

| prop                    | type                       | default     | description                                      |
| ----------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`          | `undefined` | Description text content                         |
| `className`             | `string`                   | `undefined` | Custom class name for the description element    |
| `...Animated.TextProps` | `AnimatedProps<TextProps>` | -           | All Reanimated Animated.Text props are supported |

### RadioGroup.ErrorMessage

| prop                    | type                           | default     | description                                      |
| ----------------------- | ------------------------------ | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`              | `undefined` | The content of the error field                   |
| `isInvalid`             | `boolean`                      | `false`     | Controls the visibility of the error field       |
| `className`             | `string`                       | `undefined` | Additional CSS class for styling                 |
| `classNames`            | `ElementSlots<ErrorViewSlots>` | `undefined` | Additional CSS classes for different parts       |
| `textProps`             | `TextProps`                    | `undefined` | Additional props to pass to the Text component   |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`     | -           | All Reanimated Animated.View props are supported |

## Hooks

### useRadioGroup

**Returns:**

| Property        | Type                      | Description                                    |
| --------------- | ------------------------- | ---------------------------------------------- |
| `value`         | `string \| undefined`     | Currently selected value                       |
| `isDisabled`    | `boolean`                 | Whether the radio group is disabled            |
| `isInvalid`     | `boolean`                 | Whether the radio group is in an invalid state |
| `onValueChange` | `(value: string) => void` | Function to change the selected value          |

### useRadioGroupItem

**Returns:**

| Property      | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `isSelected`  | `boolean` | Whether the radio item is selected   |
| `isDisabled`  | `boolean` | Whether the radio item is disabled   |
| `isInvalid`   | `boolean` | Whether the radio item is invalid    |
| `isOnSurface` | `boolean` | Whether the radio item is on surface |

</page>

<page url="/docs/native/components/select">
# Select

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/select
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(forms)/select.mdx
> Displays a list of options for the user to pick from — triggered by a button.




## Import

```tsx
import { Select } from 'heroui-native';

```

## Anatomy

```tsx
<Select>
  <Select.Trigger>
    <Select.Value />
  </Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content>
      <Select.Close />
      <Select.ListLabel>...</Select.ListLabel>
      <Select.Item>
        <Select.ItemLabel />
        <Select.ItemDescription>...</Select.ItemDescription>
        <Select.ItemIndicator />
      </Select.Item>
    </Select.Content>
  </Select.Portal>
</Select>

```

* **Select**: Main container that manages open/close state, value selection and provides context to child components.
* **Select.Trigger**: Clickable element that toggles the select visibility. Wraps any child element with press handlers.
* **Select.Value**: Displays the selected value or placeholder text. Automatically updates when selection changes.
* **Select.Portal**: Renders select content in a portal layer above other content. Ensures proper stacking and positioning.
* **Select.Overlay**: Optional background overlay. Can be transparent or semi-transparent to capture outside clicks.
* **Select.Content**: Container for select content with three presentation modes: popover (floating with positioning), bottom sheet modal, or dialog modal.
* **Select.Close**: Close button that dismisses the select when pressed. Renders a default X icon if no children provided.
* **Select.ListLabel**: Label for the list of items with pre-styled typography.
* **Select.Item**: Selectable option item. Handles selection state and press events.
* **Select.ItemLabel**: Displays the label text for an item.
* **Select.ItemDescription**: Optional description text for items with muted styling.
* **Select.ItemIndicator**: Optional indicator shown for selected items. Renders a check icon by default.

## Usage

### Basic Usage

The Select component uses compound parts to create dropdown selection interfaces.

```tsx
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content>
      <Select.Item value="1" label="Option 1" />
      <Select.Item value="2" label="Option 2" />
    </Select.Content>
  </Select.Portal>
</Select>

```

### With Value Display

Display the selected value in the trigger using the Value component.

```tsx
<Select>
  <Select.Trigger>
    <Select.Value placeholder="Choose an option" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content>
      <Select.Item value="apple" label="Apple" />
      <Select.Item value="orange" label="Orange" />
      <Select.Item value="banana" label="Banana" />
    </Select.Content>
  </Select.Portal>
</Select>

```

### Popover Presentation

Use popover presentation for floating content with automatic positioning.

```tsx
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content presentation="popover" placement="bottom" align="center">
      <Select.Item value="1" label="Item 1" />
      <Select.Item value="2" label="Item 2" />
    </Select.Content>
  </Select.Portal>
</Select>

```

### Width Control

Control the width of the select content using the `width` prop. This only works with popover presentation.

```tsx
{
  /* Fixed width in pixels */
}
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content width={280} presentation="popover">
      <Select.Item value="1" label="Item 1" />
    </Select.Content>
  </Select.Portal>
</Select>;

{
  /* Match trigger width */
}
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content width="trigger" presentation="popover">
      <Select.Item value="1" label="Item 1" />
    </Select.Content>
  </Select.Portal>
</Select>;

{
  /* Full width (100%) */
}
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content width="full" presentation="popover">
      <Select.Item value="1" label="Item 1" />
    </Select.Content>
  </Select.Portal>
</Select>;

{
  /* Auto-size to content (default) */
}
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content width="content-fit" presentation="popover">
      <Select.Item value="1" label="Item 1" />
    </Select.Content>
  </Select.Portal>
</Select>;

```

### Bottom Sheet Presentation

Use bottom sheet for mobile-optimized selection experience.

```tsx
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content presentation="bottom-sheet" snapPoints={['35%']}>
      <Select.Item value="1" label="Item 1" />
      <Select.Item value="2" label="Item 2" />
    </Select.Content>
  </Select.Portal>
</Select>

```

### Dialog Presentation

Use dialog presentation for centered modal-style selection.

```tsx
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content presentation="dialog">
      <Select.Close />
      <Select.ListLabel>Choose an option</Select.ListLabel>
      <Select.Item value="1" label="Item 1" />
      <Select.Item value="2" label="Item 2" />
    </Select.Content>
  </Select.Portal>
</Select>

```

### Custom Item Content

Customize item appearance with custom content and indicators.

```tsx
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content>
      <Select.Item value="us" label="United States">
        <View className="flex-row items-center gap-3 flex-1">
          <Text>🇺🇸</Text>
          <Select.ItemLabel />
        </View>
        <Select.ItemIndicator />
      </Select.Item>
      <Select.Item value="uk" label="United Kingdom">
        <View className="flex-row items-center gap-3 flex-1">
          <Text>🇬🇧</Text>
          <Select.ItemLabel />
        </View>
        <Select.ItemIndicator />
      </Select.Item>
    </Select.Content>
  </Select.Portal>
</Select>

```

### With Render Function

Use a render function on `Select.Item` to access state and customize content based on selection.

```tsx
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content>
      <Select.Item value="us" label="United States">
        {({ isSelected, value, isDisabled }) => (
          <>
            <View className="flex-row items-center gap-3 flex-1">
              <Text>🇺🇸</Text>
              <Select.ItemLabel
                className={
                  isSelected ? 'text-accent font-medium' : 'text-foreground'
                }
              />
            </View>
            <Select.ItemIndicator />
          </>
        )}
      </Select.Item>
      <Select.Item value="uk" label="United Kingdom">
        {({ isSelected }) => (
          <>
            <View className="flex-row items-center gap-3 flex-1">
              <Text>🇬🇧</Text>
              <Select.ItemLabel
                className={
                  isSelected ? 'text-accent font-medium' : 'text-foreground'
                }
              />
            </View>
            <Select.ItemIndicator />
          </>
        )}
      </Select.Item>
    </Select.Content>
  </Select.Portal>
</Select>

```

### With Item Description

Add descriptions to items for additional context.

```tsx
<Select>
  <Select.Trigger>...</Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content>
      <Select.Item value="basic" label="Basic">
        <View className="flex-1">
          <Select.ItemLabel />
          <Select.ItemDescription>
            Essential features for personal use
          </Select.ItemDescription>
        </View>
        <Select.ItemIndicator />
      </Select.Item>
    </Select.Content>
  </Select.Portal>
</Select>

```

### Controlled Mode

Control the select state programmatically.

```tsx
const [value, setValue] = useState();
const [isOpen, setIsOpen] = useState(false);

<Select
  value={value}
  onValueChange={setValue}
  isOpen={isOpen}
  onOpenChange={setIsOpen}
>
  <Select.Trigger>
    <Select.Value placeholder="Select..." />
  </Select.Trigger>
  <Select.Portal>
    <Select.Overlay />
    <Select.Content>
      <Select.Item value="1" label="Option 1" />
      <Select.Item value="2" label="Option 2" />
    </Select.Content>
  </Select.Portal>
</Select>;

```

## Example

```tsx
import { Button, Select } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

type CountryOption = {
  value: string;
  label: string;
  flag: string;
  code: string;
};

const COUNTRIES: CountryOption[] = [
  { value: 'US', label: 'United States', flag: '🇺🇸', code: '+1' },
  { value: 'GB', label: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { value: 'CA', label: 'Canada', flag: '🇨🇦', code: '+1' },
  { value: 'AU', label: 'Australia', flag: '🇦🇺', code: '+61' },
];

export default function SelectExample() {
  const [country, setCountry] = useState<CountryOption>();

  return (
    <Select
      value={country}
      onValueChange={(value) => {
        const selected = COUNTRIES.find((c) => c.value === value?.value);
        setCountry(selected);
      }}
    >
      <Select.Trigger asChild>
        <Button variant="tertiary" size="sm">
          {country ? (
            <View className="flex-row items-center gap-2">
              <Text className="text-base">{country.flag}</Text>
              <Text className="text-sm text-foreground">{country.code}</Text>
            </View>
          ) : (
            <Text className="text-foreground">Select Country</Text>
          )}
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content width={280} className="rounded-2xl" placement="bottom">
          <ScrollView>
            {COUNTRIES.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                label={item.label}
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <Text className="text-2xl">{item.flag}</Text>
                  <Text className="text-sm text-muted w-10">{item.code}</Text>
                  <Text className="text-base text-foreground flex-1">
                    {item.label}
                  </Text>
                </View>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </ScrollView>
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}

```

## API Reference

### Select

| prop                       | type                            | default | description                                                            |
| -------------------------- | ------------------------------- | ------- | ---------------------------------------------------------------------- |
| `children`                 | `ReactNode`                     | -       | The content of the select                                              |
| `value`                    | `SelectOption`                  | -       | The selected value (controlled mode)                                   |
| `onValueChange`            | `(value: SelectOption) => void` | -       | Callback when the value changes                                        |
| `defaultValue`             | `SelectOption`                  | -       | The default selected value (uncontrolled mode)                         |
| `isOpen`                   | `boolean`                       | -       | Whether the select is open (controlled mode)                           |
| `isDefaultOpen`            | `boolean`                       | -       | Whether the select is open when initially rendered (uncontrolled mode) |
| `onOpenChange`             | `(isOpen: boolean) => void`     | -       | Callback when the select open state changes                            |
| `closeDelay`               | `number`                        | `400`   | Delay in milliseconds before closing the select                        |
| `isDisabled`               | `boolean`                       | `false` | Whether the select is disabled                                         |
| `isDismissKeyboardOnClose` | `boolean`                       | `true`  | Whether to dismiss keyboard when select closes                         |
| `animation`                | `SelectRootAnimation`           | -       | Animation configuration                                                |
| `asChild`                  | `boolean`                       | `false` | Whether to render as a child element                                   |
| `...ViewProps`             | `ViewProps`                     | -       | All standard React Native View props are supported                     |

#### SelectRootAnimation

Animation configuration for Select component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                                             | default | description                                     |
| ---------------- | ------------------------------------------------ | ------- | ----------------------------------------------- |
| `state`          | `'disabled' \| 'disable-all' \| boolean`         | -       | Disable animations while customizing properties |
| `entering.value` | `SpringAnimationConfig \| TimingAnimationConfig` | -       | Animation configuration for when select opens   |
| `exiting.value`  | `SpringAnimationConfig \| TimingAnimationConfig` | -       | Animation configuration for when select closes  |

#### SpringAnimationConfig

| prop     | type               | default | description                               |
| -------- | ------------------ | ------- | ----------------------------------------- |
| `type`   | `'spring'`         | -       | Animation type (must be `'spring'`)       |
| `config` | `WithSpringConfig` | -       | Reanimated spring animation configuration |

#### TimingAnimationConfig

| prop     | type               | default | description                               |
| -------- | ------------------ | ------- | ----------------------------------------- |
| `type`   | `'timing'`         | -       | Animation type (must be `'timing'`)       |
| `config` | `WithTimingConfig` | -       | Reanimated timing animation configuration |

### Select.Trigger

| prop                | type             | default | description                                             |
| ------------------- | ---------------- | ------- | ------------------------------------------------------- |
| `children`          | `ReactNode`      | -       | The trigger element content                             |
| `className`         | `string`         | -       | Additional CSS classes for the trigger                  |
| `asChild`           | `boolean`        | `true`  | Whether to render as a child element                    |
| `...PressableProps` | `PressableProps` | -       | All standard React Native Pressable props are supported |

### Select.Value

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `placeholder`  | `string`    | -       | Placeholder text when no value is selected         |
| `className`    | `string`    | -       | Additional CSS classes for the value               |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

### Select.Portal

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The portal content (required)                      |
| `className`    | `string`    | -       | Additional CSS classes for the portal container    |
| `hostName`     | `string`    | -       | Optional name of the host element for the portal   |
| `forceMount`   | `boolean`   | -       | Whether to force mount the component in the DOM    |
| `...ViewProps` | `ViewProps` | -       | All standard React Native View props are supported |

### Select.Overlay

| prop                    | type                     | default | description                                                  |
| ----------------------- | ------------------------ | ------- | ------------------------------------------------------------ |
| `className`             | `string`                 | -       | Additional CSS classes for the overlay                       |
| `animation`             | `SelectOverlayAnimation` | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                | `true`  | Whether animated styles (react-native-reanimated) are active |
| `closeOnPress`          | `boolean`                | `true`  | Whether to close the select when overlay is pressed          |
| `forceMount`            | `boolean`                | -       | Whether to force mount the component in the DOM              |
| `asChild`               | `boolean`                | `false` | Whether to render as a child element                         |
| `...Animated.ViewProps` | `Animated.ViewProps`     | -       | All Reanimated Animated.View props are supported             |

#### SelectOverlayAnimation

Animation configuration for Select.Overlay component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                       | default     | description                                     |
| --------------- | -------------------------- | ----------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`    | -           | Disable animations while customizing properties |
| `opacity.value` | `[number, number, number]` | `[0, 1, 0]` | Opacity values \[idle, open, close]             |

### Select.Content (Popover Presentation)

| prop                    | type                                             | default         | description                                                  |
| ----------------------- | ------------------------------------------------ | --------------- | ------------------------------------------------------------ |
| `children`              | `ReactNode`                                      | -               | The select content                                           |
| `width`                 | `number \| 'trigger' \| 'content-fit' \| 'full'` | `'content-fit'` | Width sizing strategy for the content                        |
| `presentation`          | `'popover'`                                      | `'popover'`     | Presentation mode for the select                             |
| `placement`             | `'top' \| 'bottom' \| 'left' \| 'right'`         | `'bottom'`      | Placement of the content relative to trigger                 |
| `align`                 | `'start' \| 'center' \| 'end'`                   | `'center'`      | Alignment along the placement axis                           |
| `avoidCollisions`       | `boolean`                                        | `true`          | Whether to flip placement when close to viewport edges       |
| `offset`                | `number`                                         | `8`             | Distance from trigger element in pixels                      |
| `alignOffset`           | `number`                                         | `0`             | Offset along the alignment axis in pixels                    |
| `className`             | `string`                                         | -               | Additional CSS classes for the content container             |
| `animation`             | `SelectContentPopoverAnimation`                  | -               | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                                        | `true`          | Whether animated styles (react-native-reanimated) are active |
| `forceMount`            | `boolean`                                        | -               | Whether to force mount the component in the DOM              |
| `insets`                | `Insets`                                         | -               | Screen edge insets to respect when positioning               |
| `asChild`               | `boolean`                                        | `false`         | Whether to render as a child element                         |
| `...Animated.ViewProps` | `Animated.ViewProps`                             | -               | All Reanimated Animated.View props are supported             |

#### SelectContentPopoverAnimation

Animation configuration for Select.Content component (popover presentation). Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                    | type                       | default            | description                                     |
| ----------------------- | -------------------------- | ------------------ | ----------------------------------------------- |
| `state`                 | `'disabled' \| boolean`    | -                  | Disable animations while customizing properties |
| `opacity.value`         | `[number, number, number]` | `[0, 1, 0]`        | Opacity values \[idle, open, close]             |
| `scale.value`           | `[number, number, number]` | `[0.95, 1, 0.95]`  | Scale values \[idle, open, close]               |
| `translateX.value`      | `[number, number, number]` | Based on placement | TranslateX values \[idle, open, close]          |
| `translateY.value`      | `[number, number, number]` | Based on placement | TranslateY values \[idle, open, close]          |
| `transformOrigin.value` | `string`                   | Based on placement | Transform origin value                          |

### Select.Content (Bottom Sheet Presentation)

| prop                        | type               | default | description                                      |
| --------------------------- | ------------------ | ------- | ------------------------------------------------ |
| `children`                  | `ReactNode`        | -       | The bottom sheet content                         |
| `presentation`              | `'bottom-sheet'`   | -       | Presentation mode for the select                 |
| `contentContainerClassName` | `string`           | -       | Additional CSS classes for the content container |
| `...BottomSheetProps`       | `BottomSheetProps` | -       | All @gorhom/bottom-sheet props are supported     |

### Select.Content (Dialog Presentation)

| prop                    | type                                     | default | description                                                  |
| ----------------------- | ---------------------------------------- | ------- | ------------------------------------------------------------ |
| `children`              | `ReactNode`                              | -       | The dialog content                                           |
| `presentation`          | `'dialog'`                               | -       | Presentation mode for the select                             |
| `classNames`            | `{ wrapper?: string; content?: string }` | -       | Additional CSS classes for wrapper and content               |
| `animation`             | `SelectContentAnimation`                 | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                                | `true`  | Whether animated styles (react-native-reanimated) are active |
| `isSwipeable`           | `boolean`                                | `true`  | Whether the dialog content can be swiped to dismiss          |
| `forceMount`            | `boolean`                                | -       | Whether to force mount the component in the DOM              |
| `asChild`               | `boolean`                                | `false` | Whether to render as a child element                         |
| `...Animated.ViewProps` | `Animated.ViewProps`                     | -       | All Reanimated Animated.View props are supported             |

#### SelectContentAnimation

Animation configuration for Select.Content component (dialog presentation). Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                       | default           | description                                     |
| --------------- | -------------------------- | ----------------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`    | -                 | Disable animations while customizing properties |
| `opacity.value` | `[number, number, number]` | `[0, 1, 0]`       | Opacity values \[idle, open, close]             |
| `scale.value`   | `[number, number, number]` | `[0.97, 1, 0.97]` | Scale values \[idle, open, close]               |

### Select.Close

| prop                | type                   | default | description                                             |
| ------------------- | ---------------------- | ------- | ------------------------------------------------------- |
| `children`          | `ReactNode`            | -       | The close button content                                |
| `className`         | `string`               | -       | Additional CSS classes for the close button             |
| `iconProps`         | `SelectCloseIconProps` | -       | Close icon configuration                                |
| `asChild`           | `boolean`              | -       | Whether to render as a child element                    |
| `...PressableProps` | `PressableProps`       | -       | All standard React Native Pressable props are supported |

#### SelectCloseIconProps

| prop    | type     | default          | description       |
| ------- | -------- | ---------------- | ----------------- |
| `size`  | `number` | `18`             | Size of the icon  |
| `color` | `string` | `--colors-muted` | Color of the icon |

### Select.ListLabel

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The label text content                             |
| `className`    | `string`    | -       | Additional CSS classes for the list label          |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

### Select.Item

| prop                | type                                                         | default | description                                                                |
| ------------------- | ------------------------------------------------------------ | ------- | -------------------------------------------------------------------------- |
| `children`          | `ReactNode \| ((props: SelectItemRenderProps) => ReactNode)` | -       | Custom item content. Defaults to label and indicator, or a render function |
| `value`             | `any`                                                        | -       | The value associated with this item (required)                             |
| `label`             | `string`                                                     | -       | The label text for this item (required)                                    |
| `isDisabled`        | `boolean`                                                    | `false` | Whether this item is disabled                                              |
| `className`         | `string`                                                     | -       | Additional CSS classes for the item                                        |
| `...PressableProps` | `PressableProps`                                             | -       | All standard React Native Pressable props are supported                    |

#### SelectItemRenderProps

When using a render function for `children`, the following props are provided:

| property     | type      | description                             |
| ------------ | --------- | --------------------------------------- |
| `isSelected` | `boolean` | Whether this item is currently selected |
| `value`      | `string`  | The value of the item                   |
| `isDisabled` | `boolean` | Whether the item is disabled            |

### Select.ItemLabel

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `className`    | `string`    | -       | Additional CSS classes for the item label          |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

### Select.ItemDescription

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The description text content                       |
| `className`    | `string`    | -       | Additional CSS classes for the item description    |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

### Select.ItemIndicator

| prop           | type                           | default | description                                        |
| -------------- | ------------------------------ | ------- | -------------------------------------------------- |
| `children`     | `ReactNode`                    | -       | Custom indicator content. Defaults to check icon   |
| `className`    | `string`                       | -       | Additional CSS classes for the item indicator      |
| `iconProps`    | `SelectItemIndicatorIconProps` | -       | Check icon configuration                           |
| `...ViewProps` | `ViewProps`                    | -       | All standard React Native View props are supported |

#### SelectItemIndicatorIconProps

| prop    | type     | default          | description       |
| ------- | -------- | ---------------- | ----------------- |
| `size`  | `number` | `16`             | Size of the icon  |
| `color` | `string` | `--colors-muted` | Color of the icon |

## Hooks

### useSelect

Hook to access the Select root context. Returns the select state and control functions.

```tsx
import { useSelect } from 'heroui-native';

const {
  isOpen,
  onOpenChange,
  isDefaultOpen,
  isDisabled,
  triggerPosition,
  setTriggerPosition,
  contentLayout,
  setContentLayout,
  nativeID,
  closeDelay,
  value,
  onValueChange,
} = useSelect();

```

#### Return Value

| property             | type                                         | description                                               |
| -------------------- | -------------------------------------------- | --------------------------------------------------------- |
| `isOpen`             | `boolean`                                    | Whether the select is currently open                      |
| `onOpenChange`       | `(open: boolean) => void`                    | Callback to change the open state                         |
| `isDefaultOpen`      | `boolean \| undefined`                       | Whether the select is open by default (uncontrolled mode) |
| `isDisabled`         | `boolean \| undefined`                       | Whether the select is disabled                            |
| `triggerPosition`    | `LayoutPosition \| null`                     | Position of the trigger element relative to viewport      |
| `setTriggerPosition` | `(position: LayoutPosition \| null) => void` | Updates the trigger element's position                    |
| `contentLayout`      | `LayoutRectangle \| null`                    | Layout measurements of the select content                 |
| `setContentLayout`   | `(layout: LayoutRectangle \| null) => void`  | Updates the content layout measurements                   |
| `nativeID`           | `string`                                     | Unique identifier for the select instance                 |
| `closeDelay`         | `number \| undefined`                        | Delay in milliseconds before the select closes            |
| `value`              | `SelectOption`                               | Currently selected option                                 |
| `onValueChange`      | `(option: SelectOption) => void`             | Callback fired when the selected value changes            |

**Note:** This hook must be used within a `Select` component. It will throw an error if called outside of the select context.

### useSelectAnimation

Hook to access the Select animation state values within custom components or compound components.

```tsx
import { useSelectAnimation } from 'heroui-native';

const { selectState, progress, isDragging, isGestureReleaseAnimationRunning } =
  useSelectAnimation();

```

#### Return Value

| property                           | type                          | description                                                |
| ---------------------------------- | ----------------------------- | ---------------------------------------------------------- |
| `selectState`                      | `'idle' \| 'open' \| 'close'` | Extended internal state for coordinating animations        |
| `progress`                         | `SharedValue<number>`         | Progress value for animations (0=idle, 1=open, 2=close)    |
| `isDragging`                       | `SharedValue<boolean>`        | Whether the select content is currently being dragged      |
| `isGestureReleaseAnimationRunning` | `SharedValue<boolean>`        | Whether the gesture release animation is currently running |

**Note:** This hook must be used within a `Select` component. It will throw an error if called outside of the select animation context.

#### SelectOption

| property | type     | description                  |
| -------- | -------- | ---------------------------- |
| `value`  | `string` | The value of the option      |
| `label`  | `string` | The label text of the option |

### useSelectItem

Hook to access the Select Item context. Returns the item's value and label.

```tsx
import { useSelectItem } from 'heroui-native';

const { itemValue, label } = useSelectItem();

```

#### Return Value

| property    | type     | description                        |
| ----------- | -------- | ---------------------------------- |
| `itemValue` | `string` | The value of the current item      |
| `label`     | `string` | The label text of the current item |

</page>

<page url="/docs/native/components/switch">
# Switch

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/switch
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(forms)/switch.mdx
> A toggle control that allows users to switch between on and off states.




## Import

```tsx
import { Switch } from 'heroui-native';

```

## Anatomy

```tsx
<Switch>
  <Switch.Thumb>...</Switch.Thumb>
  <Switch.StartContent>...</Switch.StartContent>
  <Switch.EndContent>...</Switch.EndContent>
</Switch>

```

* **Switch**: Main container that handles toggle state and user interaction. Renders default thumb if no children provided. Animates scale (on press) and background color based on selection state. Acts as a pressable area for toggling.
* **Switch.Thumb**: Optional sliding thumb element that moves between positions. Uses spring animation for smooth transitions. Can contain custom content like icons or be customized with different styles and animations.
* **Switch.StartContent**: Optional content displayed on the left side of the switch. Typically used for icons or text that appear when switch is off. Positioned absolutely within the switch container.
* **Switch.EndContent**: Optional content displayed on the right side of the switch. Typically used for icons or text that appear when switch is on. Positioned absolutely within the switch container.

## Usage

### Basic Usage

The Switch component renders with default thumb if no children provided.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected} />

```

### With Custom Thumb

Replace the default thumb with custom content using the Thumb component.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Switch.Thumb>...</Switch.Thumb>
</Switch>

```

### With Start and End Content

Add icons or text that appear on each side of the switch.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Switch.Thumb />
  <Switch.StartContent>...</Switch.StartContent>
  <Switch.EndContent>...</Switch.EndContent>
</Switch>

```

### With Render Function

Use render functions for dynamic content based on switch state.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  {({ isSelected, isDisabled }) => (
    <>
      <Switch.Thumb>
        {({ isSelected }) => (isSelected ? <CheckIcon /> : <XIcon />)}
      </Switch.Thumb>
    </>
  )}
</Switch>

```

### With Custom Animations

Customize animations for the switch root and thumb components.

```tsx
<Switch
  animation={{
    scale: {
      value: [1, 0.9],
      timingConfig: { duration: 200 },
    },
    backgroundColor: {
      value: ['#172554', '#eab308'],
    },
  }}
>
  <Switch.Thumb
    animation={{
      left: {
        value: 4,
        springConfig: {
          damping: 30,
          stiffness: 300,
          mass: 1,
        },
      },
      backgroundColor: {
        value: ['#dbeafe', '#854d0e'],
      },
    }}
  />
</Switch>

```

### Disable Animations

Disable animations entirely or only for specific components.

```tsx
{
  /* Disable all animations including children */
}
<Switch animation="disable-all">
  <Switch.Thumb />
</Switch>;

{
  /* Disable only root animations, thumb can still animate */
}
<Switch>
  <Switch.Thumb animation={false} />
</Switch>;

```

## Example

```tsx
import { Switch } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

export default function SwitchExample() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View className="flex-row gap-4">
      <Switch
        isSelected={darkMode}
        onSelectedChange={setDarkMode}
        className="w-[56px] h-[32px]"
        animation={{
          backgroundColor: {
            value: ['#172554', '#eab308'],
          },
        }}
      >
        <Switch.Thumb
          className="size-[22px]"
          animation={{
            left: {
              value: 4,
              springConfig: {
                damping: 30,
                stiffness: 300,
                mass: 1,
              },
            },
          }}
        />
        <Switch.StartContent className="left-2">
          {darkMode && (
            <Animated.View key="sun" entering={ZoomIn.springify()}>
              <Ionicons name="sunny" size={16} color="#854d0e" />
            </Animated.View>
          )}
        </Switch.StartContent>
        <Switch.EndContent className="right-2">
          {!darkMode && (
            <Animated.View key="moon" entering={ZoomIn.springify()}>
              <Ionicons name="moon" size={16} color="#dbeafe" />
            </Animated.View>
          )}
        </Switch.EndContent>
      </Switch>
    </View>
  );
}

```

## API Reference

### Switch

| prop                        | type                                                                 | default     | description                                                  |
| --------------------------- | -------------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `children`                  | `React.ReactNode \| ((props: SwitchRenderProps) => React.ReactNode)` | `undefined` | Content to render inside the switch, or a render function    |
| `isSelected`                | `boolean`                                                            | `undefined` | Whether the switch is currently selected                     |
| `isDisabled`                | `boolean`                                                            | `false`     | Whether the switch is disabled and cannot be interacted with |
| `className`                 | `string`                                                             | `undefined` | Custom class name for the switch                             |
| `animation`                 | `SwitchRootAnimation`                                                | -           | Animation configuration                                      |
| `isAnimatedStyleActive`     | `boolean`                                                            | `true`      | Whether animated styles (react-native-reanimated) are active |
| `onSelectedChange`          | `(isSelected: boolean) => void`                                      | -           | Callback fired when the switch selection state changes       |
| `...AnimatedPressableProps` | `AnimatedProps<PressableProps>`                                      | -           | All React Native Reanimated Pressable props are supported    |

#### SwitchRenderProps

| prop         | type      | description                    |
| ------------ | --------- | ------------------------------ |
| `isSelected` | `boolean` | Whether the switch is selected |
| `isDisabled` | `boolean` | Whether the switch is disabled |

#### SwitchRootAnimation

Animation configuration for Switch component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                           | type                                     | default                                                        | description                                     |
| ------------------------------ | ---------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| `state`                        | `'disabled' \| 'disable-all' \| boolean` | -                                                              | Disable animations while customizing properties |
| `scale.value`                  | `[number, number]`                       | `[1, 0.96]`                                                    | Scale values \[unpressed, pressed]              |
| `scale.timingConfig`           | `WithTimingConfig`                       | `{ duration: 150 }`                                            | Animation timing configuration                  |
| `backgroundColor.value`        | `[string, string]`                       | Uses theme colors                                              | Background color values \[unselected, selected] |
| `backgroundColor.timingConfig` | `WithTimingConfig`                       | `{ duration: 175, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }` | Animation timing configuration                  |

### Switch.Thumb

| prop                    | type                                                                 | default     | description                                                  |
| ----------------------- | -------------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode \| ((props: SwitchRenderProps) => React.ReactNode)` | `undefined` | Content to render inside the thumb, or a render function     |
| `className`             | `string`                                                             | `undefined` | Custom class name for the thumb element                      |
| `animation`             | `SwitchThumbAnimation`                                               | -           | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                                                            | `true`      | Whether animated styles (react-native-reanimated) are active |
| `...ViewProps`          | `ViewProps`                                                          | -           | All standard React Native View props are supported           |

#### SwitchThumbAnimation

Animation configuration for Switch.Thumb component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                           | type                    | default                                                        | description                                                             |
| ------------------------------ | ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `state`                        | `'disabled' \| boolean` | -                                                              | Disable animations while customizing properties                         |
| `left.value`                   | `number`                | `2`                                                            | Offset value from the edges (left when unselected, right when selected) |
| `left.springConfig`            | `WithSpringConfig`      | `{ damping: 120, stiffness: 1600, mass: 2 }`                   | Spring animation configuration for thumb position                       |
| `backgroundColor.value`        | `[string, string]`      | `['white', theme accent-foreground color]`                     | Background color values \[unselected, selected]                         |
| `backgroundColor.timingConfig` | `WithTimingConfig`      | `{ duration: 175, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }` | Animation timing configuration                                          |

### Switch.StartContent

| prop           | type              | default     | description                                        |
| -------------- | ----------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | `undefined` | Content to render inside the switch content        |
| `className`    | `string`          | `undefined` | Custom class name for the content element          |
| `...ViewProps` | `ViewProps`       | -           | All standard React Native View props are supported |

### Switch.EndContent

| prop           | type              | default     | description                                        |
| -------------- | ----------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | `undefined` | Content to render inside the switch content        |
| `className`    | `string`          | `undefined` | Custom class name for the content element          |
| `...ViewProps` | `ViewProps`       | -           | All standard React Native View props are supported |

## Hooks

### useSwitch

A hook that provides access to the Switch context. This is useful when building custom switch components or when you need to access switch state in child components.

**Returns:**

| Property     | Type      | Description                    |
| ------------ | --------- | ------------------------------ |
| `isSelected` | `boolean` | Whether the switch is selected |
| `isDisabled` | `boolean` | Whether the switch is disabled |

**Example:**

```tsx
import { useSwitch } from 'heroui-native';

function CustomSwitchContent() {
  const { isSelected, isDisabled } = useSwitch();

  return (
    <View>
      <Text>Status: {isSelected ? 'On' : 'Off'}</Text>
      {isDisabled && <Text>Disabled</Text>}
    </View>
  );
}

// Usage
<Switch>
  <CustomSwitchContent />
  <Switch.Thumb />
</Switch>;

```

## Special Notes

### Border Styling

If you need to apply a border to the switch root, use the `outline` style properties instead of `border`. This ensures the border doesn't affect the internal layout calculations for the thumb position:

```tsx
<Switch className="outline outline-accent">
  <Switch.Thumb />
</Switch>

```

Using `outline` keeps the border visual without impacting the switch's internal width calculations, ensuring the thumb animates correctly.

### Integration with FormField

The Switch component integrates seamlessly with FormField for press state sharing:

```tsx
<FormField isSelected={isSelected} onSelectedChange={setIsSelected}>
  <View className="flex-1">
    <FormField.Label>Enable notifications</FormField.Label>
    <FormField.Description>Receive push notifications</FormField.Description>
  </View>
  <FormField.Indicator />
</FormField>

```

When wrapped in FormField, the Switch will automatically respond to press events on the entire FormField container, creating a larger touch target and better user experience.

</page>

<page url="/docs/native/components/text-field">
# TextField

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/text-field
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(forms)/text-field.mdx
> A text input component with label, description, and error handling for collecting user input.




## Import

```tsx
import { TextField } from 'heroui-native';

```

## Anatomy

```tsx
<TextField>
  <TextField.Label>...</TextField.Label>
  <TextField.Input>
    <TextField.InputStartContent>...</TextField.InputStartContent>
    <TextField.InputEndContent>...</TextField.InputEndContent>
  </TextField.Input>
  <TextField.Description>...</TextField.Description>
  <TextField.ErrorMessage>...</TextField.ErrorMessage>
</TextField>

```

* **TextField**: Root container that provides spacing and state management
* **TextField.Label**: Label with optional asterisk for required fields
* **TextField.Input**: Input container with animated border and background
* **TextField.InputStartContent**: Optional content at the start of the input
* **TextField.InputEndContent**: Optional content at the end of the input
* **TextField.Description**: Helper text displayed below the input
* **TextField.ErrorMessage**: Error message shown when field is invalid

## Usage

### Basic Usage

TextField provides a complete form input structure with label and description.

```tsx
<TextField>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input placeholder="Enter your email" />
  <TextField.Description>We'll never share your email</TextField.Description>
</TextField>

```

### With Required Field

Mark fields as required to show an asterisk in the label.

```tsx
<TextField isRequired>
  <TextField.Label>Username</TextField.Label>
  <TextField.Input placeholder="Choose a username" />
</TextField>

```

### With Start and End Content

Add icons or other content at the beginning or end of the input.

```tsx
<TextField>
  <TextField.Label>Password</TextField.Label>
  <TextField.Input placeholder="Enter password" secureTextEntry>
    <TextField.InputStartContent>...</TextField.InputStartContent>
    <TextField.InputEndContent>...</TextField.InputEndContent>
  </TextField.Input>
</TextField>

```

### With Validation

Display error messages when the field is invalid.

```tsx
<TextField isRequired isInvalid={true}>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input placeholder="Enter your email" />
  <TextField.ErrorMessage>Please enter a valid email</TextField.ErrorMessage>
</TextField>

```

### With Local Invalid State Override

Override the context's invalid state for individual components.

```tsx
<TextField isInvalid={true}>
  <TextField.Label isInvalid={false}>Email</TextField.Label>
  <TextField.Input placeholder="Enter your email" isInvalid={false} />
  <TextField.Description>
    This shows despite input being invalid
  </TextField.Description>
  <TextField.ErrorMessage>Email format is incorrect</TextField.ErrorMessage>
</TextField>

```

### Multiline Input

Create text areas for longer content.

```tsx
<TextField>
  <TextField.Label>Message</TextField.Label>
  <TextField.Input
    placeholder="Type your message..."
    multiline
    numberOfLines={4}
  />
  <TextField.Description>Maximum 500 characters</TextField.Description>
</TextField>

```

### Disabled State

Disable the entire field to prevent interaction.

```tsx
<TextField isDisabled>
  <TextField.Label>Disabled Field</TextField.Label>
  <TextField.Input placeholder="Cannot edit" value="Read only value" />
</TextField>

```

### Custom Colors

Customize the input colors for different states using the animation prop.

```tsx
<TextField>
  <TextField.Label>Custom Styled</TextField.Label>
  <TextField.Input
    placeholder="Custom colors"
    animation={{
      backgroundColor: {
        value: {
          blur: '#eff6ff',
          focus: '#dbeafe',
          error: '#eff6ff',
        },
      },
      borderColor: {
        value: {
          blur: '#2563eb',
          focus: '#1d4ed8',
          error: '#dc2626',
        },
      },
    }}
  />
</TextField>

```

## Example

```tsx
import { Ionicons } from '@expo/vector-icons';
import { TextField, useThemeColor } from 'heroui-native';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function TextFieldExample() {
  const themeColorMuted = useThemeColor('muted');
  const [email, setEmail] = React.useState('');
  const isInvalidEmail =
    email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <ScrollView className="bg-background p-6">
      <View className="gap-6">
        <TextField isRequired isInvalid={isInvalidEmail}>
          <TextField.Label>Email Address</TextField.Label>
          <TextField.Input
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          >
            <TextField.InputStartContent>
              <Ionicons name="mail-outline" size={16} color={themeColorMuted} />
            </TextField.InputStartContent>
          </TextField.Input>
          <TextField.Description>
            We'll send a confirmation to this email
          </TextField.Description>
          <TextField.ErrorMessage>
            Please enter a valid email address
          </TextField.ErrorMessage>
        </TextField>

        <TextField isRequired>
          <TextField.Label>Password</TextField.Label>
          <TextField.Input placeholder="Enter password" secureTextEntry>
            <TextField.InputStartContent>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={themeColorMuted}
              />
            </TextField.InputStartContent>
            <TextField.InputEndContent>
              <Ionicons name="eye-outline" size={16} color={themeColorMuted} />
            </TextField.InputEndContent>
          </TextField.Input>
        </TextField>

        <TextField>
          <TextField.Label>Bio</TextField.Label>
          <TextField.Input
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
          />
          <TextField.Description>
            Brief description for your profile
          </TextField.Description>
        </TextField>
      </View>
    </ScrollView>
  );
}

```

## API Reference

### TextField

| prop         | type                         | default     | description                                                                               |
| ------------ | ---------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| children     | `React.ReactNode`            | -           | Content to render inside the text field                                                   |
| isDisabled   | `boolean`                    | `false`     | Whether the entire text field is disabled                                                 |
| isInvalid    | `boolean`                    | `false`     | Whether the text field is in an invalid state                                             |
| isRequired   | `boolean`                    | `false`     | Whether the text field is required (shows asterisk)                                       |
| className    | `string`                     | -           | Custom class name for the root element                                                    |
| animation    | `"disable-all" \| undefined` | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| ...ViewProps | `ViewProps`                  | -           | All standard React Native View props are supported                                        |

### TextField.Label

| prop                  | type                       | default     | description                                                  |
| --------------------- | -------------------------- | ----------- | ------------------------------------------------------------ |
| children              | `React.ReactNode`          | -           | Label text content                                           |
| isInvalid             | `boolean`                  | `undefined` | Whether the label is in an invalid state (overrides context) |
| className             | `string`                   | -           | Custom class name for the label element                      |
| classNames            | `ElementSlots<LabelSlots>` | -           | Custom class names for different parts of the label          |
| animation             | `TextFieldLabelAnimation`  | -           | Animation configuration                                      |
| ...Animated.TextProps | `AnimatedProps<TextProps>` | -           | All Reanimated Animated.Text props are supported             |

#### `ElementSlots<LabelSlots>`

| prop     | type     | description                          |
| -------- | -------- | ------------------------------------ |
| text     | `string` | Custom class name for the label text |
| asterisk | `string` | Custom class name for the asterisk   |

#### TextFieldLabelAnimation

Animation configuration for TextField.Label component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                    | default                                                                 | description                                     |
| ---------------- | ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| boolean` | -                                                                       | Disable animations while customizing properties |
| `entering.value` | `EntryOrExitLayoutType` | `FadeIn`<br />`.duration(150)`<br />`.easing(Easing.out(Easing.ease))`  | Custom entering animation                       |
| `exiting.value`  | `EntryOrExitLayoutType` | `FadeOut`<br />`.duration(150)`<br />`.easing(Easing.out(Easing.ease))` | Custom exiting animation                        |

### TextField.Input

| prop                  | type                       | default     | description                                                  |
| --------------------- | -------------------------- | ----------- | ------------------------------------------------------------ |
| children              | `React.ReactNode`          | -           | Content to render inside the input container                 |
| isInvalid             | `boolean`                  | `undefined` | Whether the input is in an invalid state (overrides context) |
| className             | `string`                   | -           | Custom class name for the input container                    |
| classNames            | `ElementSlots<InputSlots>` | -           | Custom class names for different parts of the input          |
| animation             | `TextFieldInputAnimation`  | -           | Animation configuration                                      |
| isAnimatedStyleActive | `boolean`                  | `true`      | Whether animated styles (react-native-reanimated) are active |
| ...TextInputProps     | `TextInputProps`           | -           | All standard React Native TextInput props are supported      |

#### `ElementSlots<InputSlots>`

| prop      | type     | description                                  |
| --------- | -------- | -------------------------------------------- |
| container | `string` | Custom class name for the input container    |
| input     | `string` | Custom class name for the text input element |

#### TextFieldInputAnimation

Animation configuration for TextField.Input component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                           | type                    | default                                              | description                                                     |
| ------------------------------ | ----------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `state`                        | `'disabled' \| boolean` | -                                                    | Disable animations while customizing properties                 |
| `backgroundColor.value.blur`   | `string`                | Uses theme color                                     | Background color when input is blurred                          |
| `backgroundColor.value.focus`  | `string`                | Uses theme color                                     | Background color when input is focused                          |
| `backgroundColor.value.error`  | `string`                | Uses theme color                                     | Background color when input is invalid                          |
| `backgroundColor.timingConfig` | `WithTimingConfig`      | `{ duration: 150, easing: Easing.out(Easing.ease) }` | Animation timing configuration for background color transitions |
| `borderColor.value.blur`       | `string`                | Uses theme color                                     | Border color when input is blurred                              |
| `borderColor.value.focus`      | `string`                | Uses theme color                                     | Border color when input is focused                              |
| `borderColor.value.error`      | `string`                | Uses theme color                                     | Border color when input is invalid                              |
| `borderColor.timingConfig`     | `WithTimingConfig`      | `{ duration: 150, easing: Easing.out(Easing.ease) }` | Animation timing configuration for border color transitions     |

### TextField.InputStartContent

| prop         | type              | default | description                                        |
| ------------ | ----------------- | ------- | -------------------------------------------------- |
| children     | `React.ReactNode` | -       | Content to render at the start of the input        |
| className    | `string`          | -       | Custom class name for the start content element    |
| ...ViewProps | `ViewProps`       | -       | All standard React Native View props are supported |

### TextField.InputEndContent

| prop         | type              | default | description                                        |
| ------------ | ----------------- | ------- | -------------------------------------------------- |
| children     | `React.ReactNode` | -       | Content to render at the end of the input          |
| className    | `string`          | -       | Custom class name for the end content element      |
| ...ViewProps | `ViewProps`       | -       | All standard React Native View props are supported |

### TextField.Description

| prop                  | type                            | default     | description                                                        |
| --------------------- | ------------------------------- | ----------- | ------------------------------------------------------------------ |
| children              | `React.ReactNode`               | -           | Description text content                                           |
| isInvalid             | `boolean`                       | `undefined` | Whether the description is in an invalid state (overrides context) |
| className             | `string`                        | -           | Custom class name for the description element                      |
| animation             | `TextFieldDescriptionAnimation` | -           | Animation configuration                                            |
| ...Animated.TextProps | `AnimatedProps<TextProps>`      | -           | All Reanimated Animated.Text props are supported                   |

#### TextFieldDescriptionAnimation

Animation configuration for TextField.Description component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                    | default                                                                 | description                                     |
| ---------------- | ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| boolean` | -                                                                       | Disable animations while customizing properties |
| `entering.value` | `EntryOrExitLayoutType` | `FadeIn`<br />`.duration(150)`<br />`.easing(Easing.out(Easing.ease))`  | Custom entering animation                       |
| `exiting.value`  | `EntryOrExitLayoutType` | `FadeOut`<br />`.duration(150)`<br />`.easing(Easing.out(Easing.ease))` | Custom exiting animation                        |

### TextField.ErrorMessage

> **Note**: `TextField.ErrorMessage` extends `ErrorView` component. For complete API reference, see [ErrorView documentation](../error-view/error-view.md).

## Hooks

### useTextField

Hook to access the TextField context values. Must be used within a `TextField` component.

```tsx
import { TextField, useTextField } from 'heroui-native';

function CustomComponent() {
  const { isDisabled, isInvalid, isRequired } = useTextField();

  // Use the context values...
}

```

#### Returns

| property   | type      | description                                   |
| ---------- | --------- | --------------------------------------------- |
| isDisabled | `boolean` | Whether the entire text field is disabled     |
| isInvalid  | `boolean` | Whether the text field is in an invalid state |
| isRequired | `boolean` | Whether the text field is required            |

</page>

<page url="/docs/native/components/card">
# Card

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/card
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(layout)/card.mdx
> Displays a card container with flexible layout sections for structured content.




## Import

```tsx
import { Card } from 'heroui-native';

```

## Anatomy

```tsx
<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>
    <Card.Title>...</Card.Title>
    <Card.Description>...</Card.Description>
  </Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>

```

* **Card**: Main container that extends Surface component. Provides base card structure with configurable surface variants and handles overall layout.
* **Card.Header**: Header section for top-aligned content like icons or badges.
* **Card.Body**: Main content area with flex-1 that expands to fill all available space between Card.Header and Card.Footer.
* **Card.Title**: Title text with foreground color and medium font weight.
* **Card.Description**: Description text with muted color and smaller font size.
* **Card.Footer**: Footer section for bottom-aligned actions like buttons.

## Usage

### Basic Usage

The Card component creates a container with built-in sections for organized content.

```tsx
<Card>
  <Card.Body>...</Card.Body>
</Card>

```

### With Title and Description

Combine title and description components for structured text content.

```tsx
<Card>
  <Card.Body>
    <Card.Title>...</Card.Title>
    <Card.Description>...</Card.Description>
  </Card.Body>
</Card>

```

### With Header and Footer

Add header and footer sections for icons, badges, or actions.

```tsx
<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>

```

### Variants

Control the card's background appearance using different variants.

```tsx
<Card variant="default">...</Card>
<Card variant="secondary">...</Card>
<Card variant="tertiary">...</Card>
<Card variant="quaternary">...</Card>
<Card variant="transparent">...</Card>

```

### Horizontal Layout

Create horizontal cards by using flex-row styling.

```tsx
<Card className="flex-row gap-4">
  <Image source={...} className="size-24 rounded-lg" />
</Card>

```

### Background Image

Use an image as an absolute positioned background.

```tsx
<Card>
  <Image source={...} className="absolute inset-0" />
  <View className="gap-4">...</View>
</Card>

```

## Example

```tsx
import { Button, Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function CardExample() {
  return (
    <Card>
      <View className="gap-4">
        <Card.Body className="mb-4">
          <View className="gap-1 mb-2">
            <Card.Title className="text-pink-500">$450</Card.Title>
            <Card.Title>Living room Sofa • Collection 2025</Card.Title>
          </View>
          <Card.Description>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Card.Description>
        </Card.Body>
        <Card.Footer className="gap-3">
          <Button variant="primary">Buy now</Button>
          <Button variant="ghost">
            <Button.Label>Add to cart</Button.Label>
            <Ionicons name="bag-outline" size={16} />
          </Button>
        </Card.Footer>
      </View>
    </Card>
  );
}

```

## API Reference

### Card

| prop           | type                                                                      | default     | description                                                                               |
| -------------- | ------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`                                                         | -           | Content to be rendered inside the card                                                    |
| `variant`      | `'default' \| 'secondary' \| 'tertiary' \| 'quaternary' \| 'transparent'` | `'default'` | Visual variant of the card surface                                                        |
| `className`    | `string`                                                                  | -           | Additional CSS classes to apply                                                           |
| `animation`    | `"disable-all" \| undefined`                                              | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `...ViewProps` | `ViewProps`                                                               | -           | All standard React Native View props are supported                                        |

### Card.Header

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the header |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Card.Body

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the body   |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Card.Footer

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the footer |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Card.Title

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered as the title text |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Card.Description

| prop           | type              | default | description                                              |
| -------------- | ----------------- | ------- | -------------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered as the description text |
| `className`    | `string`          | -       | Additional CSS classes                                   |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported       |

</page>

<page url="/docs/native/components/divider">
# Divider

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/divider
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(layout)/divider.mdx
> A simple line to separate content visually.




## Import

```tsx
import { Divider } from 'heroui-native';

```

## Anatomy

```tsx
<Divider />

```

* **Divider**: A simple line component that separates content visually. Can be oriented horizontally or vertically, with customizable thickness and variant styles.

## Usage

### Basic Usage

The Divider component creates a visual separation between content sections.

```tsx
<Divider />

```

### Orientation

Control the direction of the divider with the `orientation` prop.

```tsx
<View>
  <Text>Horizontal divider</Text>
  <Divider orientation="horizontal" />
  <Text>Content below</Text>
</View>

<View className="h-24 flex-row">
  <Text>Left</Text>
  <Divider orientation="vertical" />
  <Text>Right</Text>
</View>

```

### Variants

Choose between thin and thick variants for different visual emphasis.

```tsx
<Divider variant="thin" />
<Divider variant="thick" />

```

### Custom Thickness

Set a specific thickness value for precise control.

```tsx
<Divider thickness={1} />
<Divider thickness={5} />
<Divider thickness={10} />

```

## Example

```tsx
import { Divider, Surface } from 'heroui-native';
import { Text, View } from 'react-native';

export default function DividerExample() {
  return (
    <Surface variant="secondary" className="px-6 py-7">
      <Text className="text-base font-medium text-foreground">
        HeroUI Native
      </Text>
      <Text className="text-sm text-muted">
        A modern React Native component library.
      </Text>
      <Divider className="my-4" />
      <View className="flex-row items-center h-5">
        <Text className="text-sm text-foreground">Components</Text>
        <Divider orientation="vertical" className="mx-3" />
        <Text className="text-sm text-foreground">Themes</Text>
        <Divider orientation="vertical" className="mx-3" />
        <Text className="text-sm text-foreground">Examples</Text>
      </View>
    </Surface>
  );
}

```

## API Reference

### Divider

| prop           | type                         | default        | description                                                                                  |
| -------------- | ---------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `variant`      | `'thin' \| 'thick'`          | `'thin'`       | Variant style of the divider                                                                 |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the divider                                                                   |
| `thickness`    | `number`                     | `undefined`    | Custom thickness in pixels. Controls height for horizontal or width for vertical orientation |
| `className`    | `string`                     | `undefined`    | Additional CSS classes to apply                                                              |
| `...ViewProps` | `ViewProps`                  | -              | All standard React Native View props are supported                                           |

</page>

<page url="/docs/native/components/surface">
# Surface

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/surface
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(layout)/surface.mdx
> Container component that provides elevation and background styling.




## Import

```tsx
import { Surface } from 'heroui-native';

```

## Anatomy

The Surface component is a container that provides elevation and background styling. It accepts children and can be customized with variants and styling props.

```tsx
<Surface>...</Surface>

```

* **Surface**: Main container component that provides consistent padding, background styling, and elevation through variants.

## Usage

### Basic Usage

The Surface component creates a container with consistent padding and styling.

```tsx
<Surface>...</Surface>

```

### Variants

Control the visual appearance with different surface levels.

```tsx
<Surface variant="default">
  ...
</Surface>

<Surface variant="secondary">
  ...
</Surface>

<Surface variant="tertiary">
  ...
</Surface>

<Surface variant="quaternary">
  ...
</Surface>

```

### Nested Surfaces

Create visual hierarchy by nesting surfaces with different variants.

```tsx
<Surface variant="default">
  ...
  <Surface variant="secondary">
    ...
    <Surface variant="tertiary">
      ...
      <Surface variant="quaternary">...</Surface>
    </Surface>
  </Surface>
</Surface>

```

### Custom Styling

Apply custom styles using className or style props.

```tsx
<Surface className="bg-accent-soft">
  ...
</Surface>

<Surface variant="quaternary" className="p-0">
  ...
</Surface>

```

### Disable All Animations

Disable all animations including children by using the `"disable-all"` value for the `animation` prop.

```tsx
{
  /* Disable all animations including children */
}
<Surface animation="disable-all">No Animations</Surface>;

```

## Example

```tsx
import { Surface } from 'heroui-native';
import { Text, View } from 'react-native';

export default function SurfaceExample() {
  return (
    <View className="gap-4">
      <Surface variant="default" className="gap-2">
        <AppText className="text-foreground">Surface Content</AppText>
        <AppText className="text-muted">
          This is a default surface variant. It uses bg-surface styling.
        </AppText>
      </Surface>

      <Surface variant="secondary" className="gap-2">
        <AppText className="text-foreground">Surface Content</AppText>
        <AppText className="text-muted">
          This is a secondary surface variant. It uses bg-surface-secondary
          styling.
        </AppText>
      </Surface>

      <Surface variant="tertiary" className="gap-2">
        <AppText className="text-foreground">Surface Content</AppText>
        <AppText className="text-muted">
          This is a tertiary surface variant. It uses bg-surface-tertiary
          styling.
        </AppText>
      </Surface>

      <Surface variant="quaternary" className="gap-2">
        <AppText className="text-foreground">Surface Content</AppText>
        <AppText className="text-muted">
          This is a quaternary surface variant. It uses bg-surface-quaternary
          styling.
        </AppText>
      </Surface>
    </View>
  );
}

```

## API Reference

### Surface

| prop           | type                                                                      | default     | description                                                                               |
| -------------- | ------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `variant`      | `'default' \| 'secondary' \| 'tertiary' \| 'quaternary' \| 'transparent'` | `'default'` | Visual variant controlling background color and border                                    |
| `children`     | `React.ReactNode`                                                         | -           | Content to be rendered inside the surface                                                 |
| `className`    | `string`                                                                  | -           | Additional CSS classes to apply                                                           |
| `animation`    | `"disable-all" \| undefined`                                              | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `...ViewProps` | `ViewProps`                                                               | -           | All standard React Native View props are supported                                        |

</page>

<page url="/docs/native/components/avatar">
# Avatar

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/avatar
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(media)/avatar.mdx
> Displays a user avatar with support for images, text initials, or fallback icons.




## Import

```tsx
import { Avatar } from 'heroui-native';

```

## Anatomy

```tsx
<Avatar>
  <Avatar.Image />
  <Avatar.Fallback />
</Avatar>

```

* **Avatar**: Main container that manages avatar display state. Provides size and color context to child components. Supports animation configuration to control all child animations.
* **Avatar.Image**: Optional image component that displays the avatar image. Handles loading states and errors automatically with opacity-based fade-in animation.
* **Avatar.Fallback**: Optional fallback component shown when image fails to load or is unavailable. Displays a default person icon when no children are provided. Supports configurable entering animations with delay support.

## Usage

### Basic Usage

The Avatar component displays a default person icon when no image or text is provided.

```tsx
<Avatar>
  <Avatar.Fallback />
</Avatar>

```

### With Image

Display an avatar image with automatic fallback handling.

```tsx
<Avatar>
  <Avatar.Image source={{ uri: 'https://example.com/avatar.jpg' }} />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>

```

### With Text Initials

Show text initials as the avatar content.

```tsx
<Avatar>
  <Avatar.Fallback>AB</Avatar.Fallback>
</Avatar>

```

### With Custom Icon

Provide a custom icon as fallback content.

```tsx
<Avatar>
  <Avatar.Fallback>
    <Ionicons name="person" size={18} />
  </Avatar.Fallback>
</Avatar>

```

### Sizes

Control the avatar size with the size prop.

```tsx
<Avatar size="sm">
  <Avatar.Fallback />
</Avatar>

<Avatar size="md">
  <Avatar.Fallback />
</Avatar>

<Avatar size="lg">
  <Avatar.Fallback />
</Avatar>

```

### Variants

Choose between different visual styles with the `variant` prop.

```tsx
<Avatar variant="default">
  <Avatar.Fallback>DF</Avatar.Fallback>
</Avatar>

<Avatar variant="soft">
  <Avatar.Fallback>SF</Avatar.Fallback>
</Avatar>

```

### Colors

Apply different color variants to the avatar.

```tsx
<Avatar color="default">
  <Avatar.Fallback>DF</Avatar.Fallback>
</Avatar>

<Avatar color="accent">
  <Avatar.Fallback>AC</Avatar.Fallback>
</Avatar>

<Avatar color="success">
  <Avatar.Fallback>SC</Avatar.Fallback>
</Avatar>

<Avatar color="warning">
  <Avatar.Fallback>WR</Avatar.Fallback>
</Avatar>

<Avatar color="danger">
  <Avatar.Fallback>DG</Avatar.Fallback>
</Avatar>

```

### Delayed Fallback

Show fallback after a delay to prevent flashing during image load.

```tsx
<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} />
  <Avatar.Fallback delayMs={600}>NA</Avatar.Fallback>
</Avatar>

```

### Custom Image Component

Use a custom image component with the asChild prop.

```tsx
import { Image } from 'expo-image';

<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} asChild>
    <Image style={{ width: '100%', height: '100%' }} contentFit="cover" />
  </Avatar.Image>
  <Avatar.Fallback>EI</Avatar.Fallback>
</Avatar>;

```

### Animation Control

Control animations at different levels of the Avatar component.

#### Disable All Animations

Disable all animations including children from the root component:

```tsx
<Avatar animation="disable-all">
  <Avatar.Image source={{ uri: imageUrl }} />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>

```

#### Custom Image Animation

Customize the image opacity animation:

```tsx
<Avatar>
  <Avatar.Image
    source={{ uri: imageUrl }}
    animation={{
      opacity: {
        value: [0.3, 1],
        timingConfig: { duration: 300 },
      },
    }}
  />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>

```

#### Custom Fallback Animation

Customize the fallback entering animation:

```tsx
import { FadeInDown } from 'react-native-reanimated';

<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} />
  <Avatar.Fallback
    animation={{
      entering: {
        value: FadeInDown.duration(400),
      },
    }}
  >
    JD
  </Avatar.Fallback>
</Avatar>;

```

#### Disable Individual Animations

Disable animations for specific components:

```tsx
<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} animation={false} />
  <Avatar.Fallback animation="disabled">JD</Avatar.Fallback>
</Avatar>

```

## Example

```tsx
import { Avatar } from 'heroui-native';
import { View } from 'react-native';

export default function AvatarExample() {
  const users = [
    { id: 1, image: 'https://example.com/user1.jpg', name: 'John Doe' },
    { id: 2, image: 'https://example.com/user2.jpg', name: 'Jane Smith' },
    { id: 3, image: 'https://example.com/user3.jpg', name: 'Bob Johnson' },
  ];

  return (
    <View className="flex-row gap-4">
      {users.map((user) => (
        <Avatar key={user.id} size="lg" color="accent">
          <Avatar.Image source={{ uri: user.image }} />
          <Avatar.Fallback>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Avatar.Fallback>
        </Avatar>
      ))}
    </View>
  );
}

```

## API Reference

### Avatar

| prop           | type                                                          | default     | description                                                                               |
| -------------- | ------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`                                             | -           | Avatar content (Image and/or Fallback components)                                         |
| `size`         | `'sm' \| 'md' \| 'lg'`                                        | `'md'`      | Size of the avatar                                                                        |
| `variant`      | `'default' \| 'soft'`                                         | `'default'` | Visual variant of the avatar                                                              |
| `color`        | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'accent'`  | Color variant of the avatar                                                               |
| `className`    | `string`                                                      | -           | Additional CSS classes to apply                                                           |
| `animation`    | `"disable-all"` \| `undefined`                                | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `alt`          | `string`                                                      | -           | Alternative text description for accessibility                                            |
| `...ViewProps` | `ViewProps`                                                   | -           | All standard React Native View props are supported                                        |

### Avatar.Image

Props extend different base types depending on the `asChild` prop value:

* When `asChild={false}` (default): extends `AnimatedProps<ImageProps>` from React Native Reanimated
* When `asChild={true}`: extends primitive image props for custom image components

**Note:** When using `asChild={true}` with custom image components, the `className` prop may not be applied in some cases depending on the custom component's implementation. Ensure your custom component properly handles style props.

| prop                    | type                                           | default | description                                                  |
| ----------------------- | ---------------------------------------------- | ------- | ------------------------------------------------------------ |
| `source`                | `ImageSourcePropType`                          | -       | Image source (required when `asChild={false}`)               |
| `asChild`               | `boolean`                                      | `false` | Whether to use a custom image component as child             |
| `className`             | `string`                                       | -       | Additional CSS classes to apply                              |
| `animation`             | `AvatarImageAnimation`                         | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                                      | `true`  | Whether animated styles (react-native-reanimated) are active |
| `...AnimatedProps`      | `AnimatedProps<ImageProps>` or primitive props | -       | Additional props based on `asChild` value                    |

#### AvatarImageAnimation

Animation configuration for avatar image component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                   | type                    | default                                             | description                                           |
| ---------------------- | ----------------------- | --------------------------------------------------- | ----------------------------------------------------- |
| `state`                | `'disabled' \| boolean` | -                                                   | Disable animations while customizing properties       |
| `opacity.value`        | `[number, number]`      | `[0, 1]`                                            | Opacity values \[initial, loaded] for image animation |
| `opacity.timingConfig` | `WithTimingConfig`      | `{ duration: 200, easing: Easing.in(Easing.ease) }` | Animation timing configuration                        |

**Note:** Animation is automatically disabled when `asChild={true}`

### Avatar.Fallback

| prop                    | type                                                          | default               | description                                                                       |
| ----------------------- | ------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------- |
| `children`              | `React.ReactNode`                                             | -                     | Fallback content (text, icon, or custom element)                                  |
| `delayMs`               | `number`                                                      | `0`                   | Delay in milliseconds before showing the fallback (applied to entering animation) |
| `color`                 | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | inherited from parent | Color variant of the fallback                                                     |
| `className`             | `string`                                                      | -                     | Additional CSS classes for the container                                          |
| `classNames`            | `ElementSlots<AvatarFallbackSlots>`                           | -                     | Additional CSS classes for different parts                                        |
| `textProps`             | `TextProps`                                                   | -                     | Props to pass to Text component when children is a string                         |
| `iconProps`             | `PersonIconProps`                                             | -                     | Props to customize the default person icon                                        |
| `animation`             | `AvatarFallbackAnimation`                                     | -                     | Animation configuration                                                           |
| `...Animated.ViewProps` | `Animated.ViewProps`                                          | -                     | All Reanimated Animated.View props are supported                                  |

**classNames prop:** `ElementSlots<AvatarFallbackSlots>` provides type-safe CSS classes for different parts of the fallback component. Available slots: `container`, `text`.

#### AvatarFallbackAnimation

Animation configuration for avatar fallback component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                    | default                                                                                | description                                     |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| boolean` | -                                                                                      | Disable animations while customizing properties |
| `entering.value` | `EntryOrExitLayoutType` | `FadeIn`<br />`.duration(200)`<br />`.easing(Easing.in(Easing.ease))`<br />`.delay(0)` | Custom entering animation for fallback          |

#### PersonIconProps

| prop    | type     | description                           |
| ------- | -------- | ------------------------------------- |
| `size`  | `number` | Size of the icon in pixels (optional) |
| `color` | `string` | Color of the icon (optional)          |

## Hooks

### useAvatar Hook

Hook to access Avatar primitive root context. Provides access to avatar status.

**Note:** The `status` property is particularly useful for adding a skeleton loader while the image is loading.

```tsx
import { Avatar, useAvatar, Skeleton } from 'heroui-native';

function AvatarWithSkeleton() {
  return (
    <Avatar>
      <Avatar.Image source={{ uri: imageUrl }} />
      <AvatarContent />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}

function AvatarContent() {
  const { status } = useAvatar();

  if (status === 'loading') {
    return <Skeleton className="absolute inset-0 rounded-full" />;
  }

  return null;
}

```

| property    | type                                                 | description                                                 |
| ----------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| `status`    | `'loading' \| 'loaded' \| 'error'`                   | Current loading state of the avatar image.                  |
| `setStatus` | `(status: 'loading' \| 'loaded' \| 'error') => void` | Function to manually set the avatar status (advanced usage) |

**Status Values:**

* `'loading'`: Image is currently being loaded. Use this state to show a skeleton loader.
* `'loaded'`: Image has successfully loaded.
* `'error'`: Image failed to load or source is invalid. The fallback component is automatically shown in this state.

</page>

<page url="/docs/native/components/accordion">
# Accordion

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/accordion
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(navigation)/accordion.mdx
> A collapsible content panel for organizing information in a compact space




## Import

```tsx
import { Accordion } from 'heroui-native';

```

## Anatomy

```tsx
<Accordion>
  <Accordion.Item>
    <Accordion.Trigger>
      ...
      <Accordion.Indicator>...</Accordion.Indicator>
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

* **Accordion**: Main container that manages the accordion state and behavior. Controls expansion/collapse of items, supports single or multiple selection modes, and provides variant styling (default or surface).
* **Accordion.Item**: Container for individual accordion items. Wraps the trigger and content, managing the expanded state for each item.
* **Accordion.Trigger**: Interactive element that toggles item expansion. Built on Header and Trigger primitives.
* **Accordion.Indicator**: Optional visual indicator showing expansion state. Defaults to an animated chevron icon that rotates based on item state.
* **Accordion.Content**: Container for expandable content. Animated with layout transitions for smooth expand/collapse effects.

## Usage

### Basic Usage

The Accordion component uses compound parts to create expandable content sections.

```tsx
<Accordion selectionMode="single">
  <Accordion.Item value="1">
    <Accordion.Trigger>
      ...
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

### Single Selection Mode

Allow only one item to be expanded at a time.

```tsx
<Accordion selectionMode="single" defaultValue="2">
  <Accordion.Item value="1">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="2">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

### Multiple Selection Mode

Allow multiple items to be expanded simultaneously.

```tsx
<Accordion selectionMode="multiple" defaultValue={['1', '3']}>
  <Accordion.Item value="1">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="2">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="3">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

### Surface Variant

Apply a surface container style to the accordion.

```tsx
<Accordion selectionMode="single" variant="surface">
  <Accordion.Item value="1">
    <Accordion.Trigger>
      ...
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

### Custom Indicator

Replace the default chevron indicator with custom content.

```tsx
<Accordion selectionMode="single">
  <Accordion.Item value="1">
    <Accordion.Trigger>
      ...
      <Accordion.Indicator>
        <CustomIndicator />
      </Accordion.Indicator>
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

### Without Dividers

Hide the dividers between accordion items.

```tsx
<Accordion selectionMode="single" isDividerVisible={false}>
  <Accordion.Item value="1">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="2">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

### With PressableFeedback

Use `Accordion.Trigger` with `asChild` prop and wrap content with `PressableFeedback` to add custom press feedback animations.

```tsx
import { Accordion, PressableFeedback } from 'heroui-native';
import { View } from 'react-native';

<Accordion>
  <Accordion.Item value="1">
    <Accordion.Trigger asChild>
      <PressableFeedback>
        <View className="flex-row items-center flex-1 gap-3">
          <Text>Item Title</Text>
        </View>
        <Accordion.Indicator />
        <PressableFeedback.Highlight
          animation={{ opacity: { value: [0, 0.05] } }}
        />
      </PressableFeedback>
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>;

```

## Example

```tsx
import { Accordion, useThemeColor } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export default function AccordionExample() {
  const themeColorMuted = useThemeColor('muted');

  const accordionData = [
    {
      id: '1',
      title: 'How do I place an order?',
      icon: <Ionicons name="bag-outline" size={16} color={themeColorMuted} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
    {
      id: '2',
      title: 'What payment methods do you accept?',
      icon: <Ionicons name="card-outline" size={16} color={themeColorMuted} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
    {
      id: '3',
      title: 'How much does shipping cost?',
      icon: <Ionicons name="cube-outline" size={16} color={themeColorMuted} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
  ];

  return (
    <Accordion selectionMode="single" variant="surface" defaultValue="2">
      {accordionData.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Trigger>
            <View className="flex-row items-center flex-1 gap-3">
              {item.icon}
              <Text className="text-foreground text-base flex-1">
                {item.title}
              </Text>
            </View>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <Text className="text-muted text-base/relaxed px-[25px]">
              {item.content}
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

```

## API Reference

### Accordion

| prop                    | type                                               | default     | description                                                       |
| ----------------------- | -------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `children`              | `React.ReactNode`                                  | -           | Children elements to be rendered inside the accordion             |
| `selectionMode`         | `'single' \| 'multiple'`                           | -           | Whether the accordion allows single or multiple expanded items    |
| `variant`               | `'default' \| 'surface'`                           | `'default'` | Visual variant of the accordion                                   |
| `isDividerVisible`      | `boolean`                                          | `true`      | Whether to display a divider at the bottom of each accordion item |
| `defaultValue`          | `string \| string[] \| undefined`                  | -           | Default expanded item(s) in uncontrolled mode                     |
| `value`                 | `string \| string[] \| undefined`                  | -           | Controlled expanded item(s)                                       |
| `isDisabled`            | `boolean`                                          | -           | Whether all accordion items are disabled                          |
| `isCollapsible`         | `boolean`                                          | `true`      | Whether expanded items can be collapsed                           |
| `animation`             | `AccordionRootAnimation`                           | -           | Animation configuration for accordion                             |
| `className`             | `string`                                           | -           | Additional CSS classes for the container                          |
| `classNames`            | `ElementSlots<RootSlots>`                          | -           | Additional CSS classes for the slots                              |
| `onValueChange`         | `(value: string \| string[] \| undefined) => void` | -           | Callback when expanded items change                               |
| `...Animated.ViewProps` | `Animated.ViewProps`                               | -           | All Reanimated Animated.View props are supported                  |

#### `ElementSlots<RootSlots>`

| prop        | type     | description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `container` | `string` | Custom class name for the accordion container   |
| `divider`   | `string` | Custom class name for the divider between items |

#### AccordionRootAnimation

Animation configuration for accordion root component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop           | type                                     | default                                                                                             | description                                       |
| -------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `state`        | `'disabled' \| 'disable-all' \| boolean` | -                                                                                                   | Disable animations while customizing properties   |
| `layout.value` | `LayoutTransition`                       | `LinearTransition`<br />`.springify()`<br />`.damping(140)`<br />`.stiffness(1600)`<br />`.mass(4)` | Custom layout animation for accordion transitions |

### Accordion.Item

| prop                    | type                                                                        | default | description                                                                      |
| ----------------------- | --------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `children`              | `React.ReactNode \| ((props: AccordionItemRenderProps) => React.ReactNode)` | -       | Children elements to be rendered inside the accordion item, or a render function |
| `value`                 | `string`                                                                    | -       | Unique value to identify this item                                               |
| `isDisabled`            | `boolean`                                                                   | -       | Whether this specific item is disabled                                           |
| `className`             | `string`                                                                    | -       | Additional CSS classes                                                           |
| `...Animated.ViewProps` | `Animated.ViewProps`                                                        | -       | All Reanimated Animated.View props are supported                                 |

#### AccordionItemRenderProps

| prop         | type      | description                                      |
| ------------ | --------- | ------------------------------------------------ |
| `isExpanded` | `boolean` | Whether the accordion item is currently expanded |
| `value`      | `string`  | Unique value identifier for this accordion item  |

### Accordion.Trigger

| prop                | type              | default | description                                             |
| ------------------- | ----------------- | ------- | ------------------------------------------------------- |
| `children`          | `React.ReactNode` | -       | Children elements to be rendered inside the trigger     |
| `className`         | `string`          | -       | Additional CSS classes                                  |
| `isDisabled`        | `boolean`         | -       | Whether the trigger is disabled                         |
| `...PressableProps` | `PressableProps`  | -       | All standard React Native Pressable props are supported |

### Accordion.Indicator

| prop                    | type                          | default | description                                                            |
| ----------------------- | ----------------------------- | ------- | ---------------------------------------------------------------------- |
| `children`              | `React.ReactNode`             | -       | Custom indicator content, if not provided defaults to animated chevron |
| `className`             | `string`                      | -       | Additional CSS classes                                                 |
| `iconProps`             | `AccordionIndicatorIconProps` | -       | Icon configuration                                                     |
| `animation`             | `AccordionIndicatorAnimation` | -       | Animation configuration for indicator                                  |
| `isAnimatedStyleActive` | `boolean`                     | `true`  | Whether animated styles (react-native-reanimated) are active           |
| `...Animated.ViewProps` | `Animated.ViewProps`          | -       | All Reanimated Animated.View props are supported                       |

#### AccordionIndicatorIconProps

| prop    | type     | default      | description       |
| ------- | -------- | ------------ | ----------------- |
| `size`  | `number` | `16`         | Size of the icon  |
| `color` | `string` | `foreground` | Color of the icon |

#### AccordionIndicatorAnimation

Animation configuration for accordion indicator component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                    | type                    | default                                      | description                                       |
| ----------------------- | ----------------------- | -------------------------------------------- | ------------------------------------------------- |
| `state`                 | `'disabled' \| boolean` | -                                            | Disable animations while customizing properties   |
| `rotation.value`        | `[number, number]`      | `[0, -180]`                                  | Rotation values \[collapsed, expanded] in degrees |
| `rotation.springConfig` | `WithSpringConfig`      | `{ damping: 140, stiffness: 1000, mass: 4 }` | Spring animation configuration for rotation       |

### Accordion.Content

| prop           | type                        | default | description                                         |
| -------------- | --------------------------- | ------- | --------------------------------------------------- |
| `children`     | `React.ReactNode`           | -       | Children elements to be rendered inside the content |
| `className`    | `string`                    | -       | Additional CSS classes                              |
| `animation`    | `AccordionContentAnimation` | -       | Animation configuration for content                 |
| `...ViewProps` | `ViewProps`                 | -       | All standard React Native View props are supported  |

#### AccordionContentAnimation

Animation configuration for accordion content component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                    | default                                                                | description                                     |
| ---------------- | ----------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| boolean` | -                                                                      | Disable animations while customizing properties |
| `entering.value` | `EntryOrExitLayoutType` | `FadeIn`<br />`.duration(200)`<br />`.easing(Easing.out(Easing.ease))` | Custom entering animation for content           |
| `exiting.value`  | `EntryOrExitLayoutType` | `FadeOut`<br />`.duration(200)`<br />`.easing(Easing.in(Easing.ease))` | Custom exiting animation for content            |

## Hooks

### useAccordion

Hook to access the accordion root context. Must be used within an `Accordion` component.

```tsx
import { useAccordion } from 'heroui-native';

const { value, onValueChange, selectionMode, isCollapsible, isDisabled } =
  useAccordion();

```

#### Returns

| property        | type                                                                  | description                                                                  |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `selectionMode` | `'single' \| 'multiple' \| undefined`                                 | Whether the accordion allows single or multiple expanded items               |
| `value`         | `(string \| undefined) \| string[]`                                   | Currently expanded item(s) - string for single mode, array for multiple mode |
| `onValueChange` | `(value: string \| undefined) => void \| ((value: string[]) => void)` | Callback function to update expanded items                                   |
| `isCollapsible` | `boolean`                                                             | Whether expanded items can be collapsed                                      |
| `isDisabled`    | `boolean \| undefined`                                                | Whether all accordion items are disabled                                     |

### useAccordionItem

Hook to access the accordion item context. Must be used within an `Accordion.Item` component.

```tsx
import { useAccordionItem } from 'heroui-native';

const { value, isExpanded, isDisabled, nativeID } = useAccordionItem();

```

#### Returns

| property     | type                   | description                                          |
| ------------ | ---------------------- | ---------------------------------------------------- |
| `value`      | `string`               | Unique value identifier for this accordion item      |
| `isExpanded` | `boolean`              | Whether the accordion item is currently expanded     |
| `isDisabled` | `boolean \| undefined` | Whether this specific item is disabled               |
| `nativeID`   | `string`               | Native ID used for accessibility and ARIA attributes |

## Special Notes

When using the Accordion component alongside other components in the same view, you should import and apply `AccordionLayoutTransition` to those components to ensure smooth and consistent layout animations across the entire screen.

```jsx
import { Accordion, AccordionLayoutTransition } from 'heroui-native';
import Animated from 'react-native-reanimated';

<Animated.ScrollView layout={AccordionLayoutTransition}>
  <Animated.View layout={AccordionLayoutTransition}>
    {/* Other content */}
  </Animated.View>

  <Accordion>{/* Accordion items */}</Accordion>
</Animated.ScrollView>;

```

This ensures that when the accordion expands or collapses, all components on the screen animate with the same timing and easing, creating a cohesive user experience.

</page>

<page url="/docs/native/components/tabs">
# Tabs

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/tabs
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(navigation)/tabs.mdx
> Organize content into tabbed views with animated transitions and indicators.




## Import

```tsx
import { Tabs } from 'heroui-native';

```

## Anatomy

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.ScrollView>
      <Tabs.Indicator />
      <Tabs.Trigger>
        <Tabs.Label>...</Tabs.Label>
      </Tabs.Trigger>
    </Tabs.ScrollView>
  </Tabs.List>
  <Tabs.Content>...</Tabs.Content>
</Tabs>

```

* **Tabs**: Main container that manages tab state and selection. Controls active tab, handles value changes, and provides context to child components.
* **Tabs.List**: Container for tab triggers. Groups triggers together with optional styling variants (pill or line).
* **Tabs.ScrollView**: Optional scrollable wrapper for tab triggers. Enables horizontal scrolling when tabs overflow with automatic centering of active tab.
* **Tabs.Trigger**: Interactive button for each tab. Handles press events to change active tab and measures its position for indicator animation.
* **Tabs.Label**: Text content for tab triggers. Displays the tab title with appropriate styling.
* **Tabs.Indicator**: Animated visual indicator for active tab. Smoothly transitions between tabs using spring or timing animations.
* **Tabs.Content**: Container for tab panel content. Shows content when its value matches the active tab.

## Usage

### Basic Usage

The Tabs component uses compound parts to create navigable content sections.

```tsx
<Tabs value="tab1" onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="tab1">
      <Tabs.Label>Tab 1</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="tab2">
      <Tabs.Label>Tab 2</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">...</Tabs.Content>
  <Tabs.Content value="tab2">...</Tabs.Content>
</Tabs>

```

### Pill Variant

Default rounded pill style for tab triggers.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab} variant="pill">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="settings">
      <Tabs.Label>Settings</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="profile">
      <Tabs.Label>Profile</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="settings">...</Tabs.Content>
  <Tabs.Content value="profile">...</Tabs.Content>
</Tabs>

```

### Line Variant

Underline style indicator for a more minimal appearance.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab} variant="line">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="overview">
      <Tabs.Label>Overview</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="analytics">
      <Tabs.Label>Analytics</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">...</Tabs.Content>
  <Tabs.Content value="analytics">...</Tabs.Content>
</Tabs>

```

### Scrollable Tabs

Handle many tabs with horizontal scrolling.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.ScrollView scrollAlign="center">
      <Tabs.Indicator />
      <Tabs.Trigger value="tab1">
        <Tabs.Label>First Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab2">
        <Tabs.Label>Second Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab3">
        <Tabs.Label>Third Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab4">
        <Tabs.Label>Fourth Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab5">
        <Tabs.Label>Fifth Tab</Tabs.Label>
      </Tabs.Trigger>
    </Tabs.ScrollView>
  </Tabs.List>
  <Tabs.Content value="tab1">...</Tabs.Content>
  <Tabs.Content value="tab2">...</Tabs.Content>
  <Tabs.Content value="tab3">...</Tabs.Content>
  <Tabs.Content value="tab4">...</Tabs.Content>
  <Tabs.Content value="tab5">...</Tabs.Content>
</Tabs>

```

### Disabled Tabs

Disable specific tabs to prevent interaction.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="active">
      <Tabs.Label>Active</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="disabled" isDisabled>
      <Tabs.Label>Disabled</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="another">
      <Tabs.Label>Another</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="active">...</Tabs.Content>
  <Tabs.Content value="another">...</Tabs.Content>
</Tabs>

```

### With Icons

Combine icons with labels for enhanced visual context.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="home">
      <Icon name="home" size={16} />
      <Tabs.Label>Home</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="search">
      <Icon name="search" size={16} />
      <Tabs.Label>Search</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="home">...</Tabs.Content>
  <Tabs.Content value="search">...</Tabs.Content>
</Tabs>

```

### With Render Function

Use a render function on `Tabs.Trigger` to access state and customize content based on selection.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="settings">
      {({ isSelected, value, isDisabled }) => (
        <Tabs.Label
          className={isSelected ? 'text-accent font-medium' : 'text-foreground'}
        >
          Settings
        </Tabs.Label>
      )}
    </Tabs.Trigger>
    <Tabs.Trigger value="profile">
      {({ isSelected }) => (
        <>
          <Icon name="user" size={16} />
          <Tabs.Label className={isSelected ? 'text-accent' : 'text-muted'}>
            Profile
          </Tabs.Label>
        </>
      )}
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="settings">...</Tabs.Content>
  <Tabs.Content value="profile">...</Tabs.Content>
</Tabs>

```

## Example

```tsx
import { Tabs, TextField, FormField, Checkbox, Button } from 'heroui-native';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

const AnimatedContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Animated.View
    entering={FadeIn.duration(200)}
    exiting={FadeOut.duration(200)}
    className="gap-6"
  >
    {children}
  </Animated.View>
);

export default function TabsExample() {
  const [activeTab, setActiveTab] = useState('general');

  const [showSidebar, setShowSidebar] = useState(true);
  const [accountActivity, setAccountActivity] = useState(true);
  const [name, setName] = useState('');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} variant="pill">
      <Tabs.List>
        <Tabs.ScrollView>
          <Tabs.Indicator />
          <Tabs.Trigger value="general">
            <Tabs.Label>General</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications">
            <Tabs.Label>Notifications</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="profile">
            <Tabs.Label>Profile</Tabs.Label>
          </Tabs.Trigger>
        </Tabs.ScrollView>
      </Tabs.List>

      <Animated.View
        layout={LinearTransition.duration(200)}
        className="px-4 py-6 border border-border rounded-xl"
      >
        <Tabs.Content value="general">
          <AnimatedContentContainer>
            <FormField
              isSelected={showSidebar}
              onSelectedChange={setShowSidebar}
            >
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Show sidebar</FormField.Label>
                <FormField.Description>
                  Display the sidebar navigation panel
                </FormField.Description>
              </View>
            </FormField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <AnimatedContentContainer>
            <FormField
              isSelected={accountActivity}
              onSelectedChange={setAccountActivity}
            >
              <FormField.Indicator variant="checkbox" />
              <View className="flex-1">
                <FormField.Label>Account activity</FormField.Label>
                <FormField.Description>
                  Notifications about your account activity
                </FormField.Description>
              </View>
            </FormField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="profile">
          <AnimatedContentContainer>
            <TextField isRequired>
              <TextField.Label>Name</TextField.Label>
              <TextField.Input
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
              />
            </TextField>
            <Button size="sm" className="self-start">
              <Button.Label>Update profile</Button.Label>
            </Button>
          </AnimatedContentContainer>
        </Tabs.Content>
      </Animated.View>
    </Tabs>
  );
}

```

## API Reference

### Tabs

| prop            | type                         | default     | description                                                                               |
| --------------- | ---------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `children`      | `React.ReactNode`            | -           | Children elements to be rendered inside tabs                                              |
| `value`         | `string`                     | -           | Currently active tab value                                                                |
| `variant`       | `'pill' \| 'line'`           | `'pill'`    | Visual variant of the tabs                                                                |
| `className`     | `string`                     | -           | Additional CSS classes for the container                                                  |
| `animation`     | `"disable-all" \| undefined` | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `onValueChange` | `(value: string) => void`    | -           | Callback when the active tab changes                                                      |
| `...ViewProps`  | `ViewProps`                  | -           | All standard React Native View props are supported                                        |

### Tabs.List

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the list   |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Tabs.ScrollView

| prop                        | type                                     | default    | description                                              |
| --------------------------- | ---------------------------------------- | ---------- | -------------------------------------------------------- |
| `children`                  | `React.ReactNode`                        | -          | Children elements to be rendered inside the scroll view  |
| `scrollAlign`               | `'start' \| 'center' \| 'end' \| 'none'` | `'center'` | Scroll alignment variant for the selected item           |
| `className`                 | `string`                                 | -          | Additional CSS classes for the scroll view               |
| `contentContainerClassName` | `string`                                 | -          | Additional CSS classes for the content container         |
| `...ScrollViewProps`        | `ScrollViewProps`                        | -          | All standard React Native ScrollView props are supported |

### Tabs.Trigger

| prop                | type                                                                      | default | description                                                               |
| ------------------- | ------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode \| ((props: TabsTriggerRenderProps) => React.ReactNode)` | -       | Children elements to be rendered inside the trigger, or a render function |
| `value`             | `string`                                                                  | -       | The unique value identifying this tab                                     |
| `isDisabled`        | `boolean`                                                                 | `false` | Whether the trigger is disabled                                           |
| `className`         | `string`                                                                  | -       | Additional CSS classes                                                    |
| `...PressableProps` | `PressableProps`                                                          | -       | All standard React Native Pressable props are supported                   |

#### TabsTriggerRenderProps

When using a render function for `children`, the following props are provided:

| property     | type      | description                                |
| ------------ | --------- | ------------------------------------------ |
| `isSelected` | `boolean` | Whether this trigger is currently selected |
| `value`      | `string`  | The value of the trigger                   |
| `isDisabled` | `boolean` | Whether the trigger is disabled            |

### Tabs.Label

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Text content to be rendered as label               |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Tabs.Indicator

| prop                    | type                     | default | description                                                  |
| ----------------------- | ------------------------ | ------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode`        | -       | Custom indicator content                                     |
| `className`             | `string`                 | -       | Additional CSS classes                                       |
| `animation`             | `TabsIndicatorAnimation` | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                | `true`  | Whether animated styles (react-native-reanimated) are active |
| `...Animated.ViewProps` | `Animated.ViewProps`     | -       | All Reanimated Animated.View props are supported             |

#### TabsIndicatorAnimation

Animation configuration for Tabs.Indicator component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                                   | default                                                                      | description                                     |
| --------------- | -------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`                | -                                                                            | Disable animations while customizing properties |
| `width.type`    | `'spring' \| 'timing'`                 | `'spring'`                                                                   | Type of animation to use                        |
| `width.config`  | `WithSpringConfig \| WithTimingConfig` | `{ stiffness: 1200, damping: 120 }` (spring) or `{ duration: 200 }` (timing) | Reanimated animation configuration              |
| `height.type`   | `'spring' \| 'timing'`                 | `'spring'`                                                                   | Type of animation to use                        |
| `height.config` | `WithSpringConfig \| WithTimingConfig` | `{ stiffness: 1200, damping: 120 }` (spring) or `{ duration: 200 }` (timing) | Reanimated animation configuration              |
| `left.type`     | `'spring' \| 'timing'`                 | `'spring'`                                                                   | Type of animation to use                        |
| `left.config`   | `WithSpringConfig \| WithTimingConfig` | `{ stiffness: 1200, damping: 120 }` (spring) or `{ duration: 200 }` (timing) | Reanimated animation configuration              |

### Tabs.Content

| prop           | type              | default | description                                         |
| -------------- | ----------------- | ------- | --------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the content |
| `value`        | `string`          | -       | The value of the tab this content belongs to        |
| `className`    | `string`          | -       | Additional CSS classes                              |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported  |

## Hooks

### useTabs

Hook to access tabs root context values within custom components or compound components.

```tsx
import { useTabs } from 'heroui-native';

const CustomComponent = () => {
  const { value, onValueChange, nativeID } = useTabs();
  // ... your implementation
};

```

**Returns:** `UseTabsReturn`

| property        | type                      | description                                |
| --------------- | ------------------------- | ------------------------------------------ |
| `value`         | `string`                  | Currently active tab value                 |
| `onValueChange` | `(value: string) => void` | Callback function to change the active tab |
| `nativeID`      | `string`                  | Unique identifier for the tabs instance    |

**Note:** This hook must be used within a `Tabs` component. It will throw an error if called outside of the tabs context.

### useTabsMeasurements

Hook to access tab measurements context values for managing tab trigger positions and dimensions.

```tsx
import { useTabsMeasurements } from 'heroui-native';

const CustomIndicator = () => {
  const { measurements, variant } = useTabsMeasurements();
  // ... your implementation
};

```

**Returns:** `UseTabsMeasurementsReturn`

| property          | type                                                    | description                                       |
| ----------------- | ------------------------------------------------------- | ------------------------------------------------- |
| `measurements`    | `Record<string, ItemMeasurements>`                      | Record of measurements for each tab trigger       |
| `setMeasurements` | `(key: string, measurements: ItemMeasurements) => void` | Function to update measurements for a tab trigger |
| `variant`         | `'pill' \| 'line'`                                      | Visual variant of the tabs                        |

#### ItemMeasurements

| property | type     | description                         |
| -------- | -------- | ----------------------------------- |
| `width`  | `number` | Width of the tab trigger in pixels  |
| `height` | `number` | Height of the tab trigger in pixels |
| `x`      | `number` | X position of the tab trigger       |

**Note:** This hook must be used within a `Tabs` component. It will throw an error if called outside of the tabs context.

### useTabsTrigger

Hook to access tab trigger context values within custom components or compound components.

```tsx
import { useTabsTrigger } from 'heroui-native';

const CustomLabel = () => {
  const { value, isSelected, nativeID } = useTabsTrigger();
  // ... your implementation
};

```

**Returns:** `UseTabsTriggerReturn`

| property     | type      | description                                |
| ------------ | --------- | ------------------------------------------ |
| `value`      | `string`  | The value of this trigger                  |
| `nativeID`   | `string`  | Unique identifier for this trigger         |
| `isSelected` | `boolean` | Whether this trigger is currently selected |

**Note:** This hook must be used within a `Tabs.Trigger` component. It will throw an error if called outside of the trigger context.

</page>

<page url="/docs/native/components/bottom-sheet">
# Bottom Sheet

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/bottom-sheet
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(overlays)/bottom-sheet.mdx
> Displays a bottom sheet that slides up from the bottom with animated transitions and swipe-to-dismiss gestures.




## Import

```tsx
import {
  BottomSheet,
  useBottomSheet,
  useBottomSheetAnimation,
} from 'heroui-native';

```

## Anatomy

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay>...</BottomSheet.Overlay>
    <BottomSheet.Content>
      <BottomSheet.Close>...</BottomSheet.Close>
      <BottomSheet.Title>...</BottomSheet.Title>
      <BottomSheet.Description>...</BottomSheet.Description>
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>

```

* **BottomSheet**: Root component that manages open state and provides context to child components.
* **BottomSheet.Trigger**: Pressable element that opens the bottom sheet when pressed.
* **BottomSheet.Portal**: Renders bottom sheet content in a portal with full window overlay.
* **BottomSheet.Overlay**: Background overlay that covers the screen, typically closes bottom sheet when pressed.
* **BottomSheet.Content**: Main bottom sheet container using @gorhom/bottom-sheet for rendering with gesture support.
* **BottomSheet.Close**: Close button that dismisses the bottom sheet when pressed.
* **BottomSheet.Title**: Bottom sheet title text with semantic heading role and accessibility linking.
* **BottomSheet.Description**: Bottom sheet description text that provides additional context with accessibility linking.

## Usage

### Basic Bottom Sheet

Simple bottom sheet with title, description, and close button.

```tsx
<BottomSheet>
  <BottomSheet.Trigger asChild>
    <Button>Open Bottom Sheet</Button>
  </BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay />
    <BottomSheet.Content>
      <BottomSheet.Close />
      <BottomSheet.Title>...</BottomSheet.Title>
      <BottomSheet.Description>...</BottomSheet.Description>
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>

```

### Detached Bottom Sheet

Bottom sheet that appears detached from the bottom edge with custom spacing.

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay />
    <BottomSheet.Content
      detached={true}
      bottomInset={insets.bottom + 12}
      className="mx-4"
      backgroundClassName="rounded-[32px]"
    >
      ...
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>

```

### Scrollable with Snap Points

Bottom sheet with multiple snap points and scrollable content.

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay />
    <BottomSheet.Content snapPoints={['25%', '50%', '90%']}>
      <ScrollView>...</ScrollView>
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>

```

### Custom Overlay

Replace the default overlay with custom content like blur effects.

```tsx
import { BottomSheet, useBottomSheetAnimation } from 'heroui-native';
import { StyleSheet } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { AnimatedBlurView } from './animated-blur-view';
import { useUniwind } from 'uniwind';

export const BottomSheetBlurOverlay = () => {
  const { theme } = useUniwind();
  const { progress } = useBottomSheetAnimation();

  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  return (
    <BottomSheet.Close style={StyleSheet.absoluteFill}>
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={theme === 'dark' ? 'dark' : 'systemUltraThinMaterialDark'}
        style={StyleSheet.absoluteFill}
      />
    </BottomSheet.Close>
  );
};

```

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheetBlurOverlay />
    <BottomSheet.Content>...</BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>

```

## Example

```tsx
import { BottomSheet, Button } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import Ionicons from '@expo/vector-icons/Ionicons';

const StyledIonicons = withUniwind(Ionicons);

export default function BottomSheetExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <Button variant="secondary">Open Bottom Sheet</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="items-center mb-5">
            <View className="size-20 items-center justify-center rounded-full bg-green-500/10">
              <StyledIonicons
                name="shield-checkmark"
                size={40}
                className="text-green-500"
              />
            </View>
          </View>
          <View className="mb-8 gap-2 items-center">
            <BottomSheet.Title className="text-center">
              Keep yourself safe
            </BottomSheet.Title>
            <BottomSheet.Description className="text-center">
              Update your software to the latest version for better security and
              performance.
            </BottomSheet.Description>
          </View>
          <View className="gap-3">
            <Button onPress={() => setIsOpen(false)}>Update Now</Button>
            <Button variant="tertiary" onPress={() => setIsOpen(false)}>
              Later
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}

```

## API Reference

### BottomSheet

| prop                       | type                       | default | description                                                                                |
| -------------------------- | -------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `children`                 | `React.ReactNode`          | -       | Bottom sheet content and trigger elements                                                  |
| `isOpen`                   | `boolean`                  | -       | Controlled open state of the bottom sheet                                                  |
| `isDefaultOpen`            | `boolean`                  | `false` | Initial open state when uncontrolled                                                       |
| `closeDelay`               | `number`                   | `300`   | Delay in milliseconds before bottom sheet closes (should match closing animation duration) |
| `isDismissKeyboardOnClose` | `boolean`                  | `true`  | Whether to dismiss keyboard when bottom sheet closes                                       |
| `animation`                | `BottomSheetRootAnimation` | -       | Animation configuration                                                                    |
| `onOpenChange`             | `(value: boolean) => void` | -       | Callback when open state changes                                                           |
| `...ViewProps`             | `ViewProps`                | -       | All standard React Native View props are supported                                         |

#### BottomSheetRootAnimation

Animation configuration for bottom sheet root component. Can be:

* `"disable-all"`: Disable all animations including children
* `undefined`: Use default animations
* `object`: Custom animation configuration

| prop    | type                                     | default | description                                     |
| ------- | ---------------------------------------- | ------- | ----------------------------------------------- |
| `state` | `'disabled' \| 'disable-all' \| boolean` | -       | Disable animations while customizing properties |

### BottomSheet.Trigger

| prop                       | type                    | default | description                                                    |
| -------------------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Trigger element content                                        |
| `asChild`                  | `boolean`               | -       | Render as child element without wrapper                        |
| `...TouchableOpacityProps` | `TouchableOpacityProps` | -       | All standard React Native TouchableOpacity props are supported |

### BottomSheet.Portal

| prop         | type                   | default | description                                      |
| ------------ | ---------------------- | ------- | ------------------------------------------------ |
| `children`   | `React.ReactNode`      | -       | Portal content (overlay and bottom sheet)        |
| `className`  | `string`               | -       | Additional CSS classes for portal container      |
| `style`      | `StyleProp<ViewStyle>` | -       | Additional styles for portal container           |
| `hostName`   | `string`               | -       | Optional portal host name for specific container |
| `forceMount` | `boolean`              | -       | Force mount when closed for animation purposes   |

### BottomSheet.Overlay

| prop                    | type                          | default | description                                                  |
| ----------------------- | ----------------------------- | ------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode`             | -       | Custom overlay content                                       |
| `className`             | `string`                      | -       | Additional CSS classes for overlay                           |
| `style`                 | `ViewStyle`                   | -       | Additional styles for overlay container                      |
| `animation`             | `BottomSheetOverlayAnimation` | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                     | `true`  | Whether animated styles (react-native-reanimated) are active |
| `isCloseOnPress`        | `boolean`                     | `true`  | Whether pressing overlay closes bottom sheet                 |
| `forceMount`            | `boolean`                     | -       | Force mount when closed for animation purposes               |
| `...PressableProps`     | `PressableProps`              | -       | All standard React Native Pressable props are supported      |

#### BottomSheetOverlayAnimation

Animation configuration for bottom sheet overlay component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                       | default     | description                                     |
| --------------- | -------------------------- | ----------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`    | -           | Disable animations while customizing properties |
| `opacity.value` | `[number, number, number]` | `[0, 1, 0]` | Opacity values \[idle, open, close]             |

### BottomSheet.Content

| prop                        | type                                     | default | description                                                                                        |
| --------------------------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `children`                  | `React.ReactNode`                        | -       | Bottom sheet content                                                                               |
| `className`                 | `string`                                 | -       | Additional CSS classes for bottom sheet container                                                  |
| `containerClassName`        | `string`                                 | -       | Additional CSS classes for container                                                               |
| `contentContainerClassName` | `string`                                 | -       | Additional CSS classes for content container                                                       |
| `backgroundClassName`       | `string`                                 | -       | Additional CSS classes for background                                                              |
| `handleClassName`           | `string`                                 | -       | Additional CSS classes for handle                                                                  |
| `handleIndicatorClassName`  | `string`                                 | -       | Additional CSS classes for handle indicator                                                        |
| `contentContainerProps`     | `Omit<BottomSheetViewProps, 'children'>` | -       | Props for the content container                                                                    |
| `animation`                 | `AnimationDisabled`                      | -       | Animation configuration                                                                            |
| `...GorhomBottomSheetProps` | `Partial<GorhomBottomSheetProps>`        | -       | All [@gorhom/bottom-sheet props](https://gorhom.dev/react-native-bottom-sheet/props) are supported |

**Note**: You can use all components from [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/components/bottomsheetview) inside the content, such as `BottomSheetView`, `BottomSheetScrollView`, `BottomSheetFlatList`, etc.

### BottomSheet.Close

| prop                | type                        | default | description                                             |
| ------------------- | --------------------------- | ------- | ------------------------------------------------------- |
| `children`          | `React.ReactNode`           | -       | Custom close button content                             |
| `className`         | `string`                    | -       | Additional CSS classes for close button                 |
| `iconProps`         | `BottomSheetCloseIconProps` | -       | Configuration for default close icon                    |
| `hitSlop`           | `number`                    | `12`    | Hit slop area for the close button                      |
| `asChild`           | `boolean`                   | -       | Render as child element without wrapper                 |
| `...PressableProps` | `PressableProps`            | -       | All standard React Native Pressable props are supported |

#### BottomSheetCloseIconProps

| prop    | type     | description                             |
| ------- | -------- | --------------------------------------- |
| `size`  | `number` | Icon size (default: 18)                 |
| `color` | `string` | Icon color (default: theme color muted) |

### BottomSheet.Title

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Title content                                      |
| `className`    | `string`          | -       | Additional CSS classes for title                   |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### BottomSheet.Description

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Description content                                |
| `className`    | `string`          | -       | Additional CSS classes for description             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

## Hooks

### useBottomSheet

Hook to access bottom sheet primitive context.

```tsx
const { isOpen, onOpenChange } = useBottomSheet();

```

| property       | type                       | description                   |
| -------------- | -------------------------- | ----------------------------- |
| `isOpen`       | `boolean`                  | Current open state            |
| `onOpenChange` | `(value: boolean) => void` | Function to change open state |

### useBottomSheetAnimation

Hook to access bottom sheet animation context for advanced customization.

```tsx
const { bottomSheetState, progress } = useBottomSheetAnimation();

```

| property           | type                          | description                                  |
| ------------------ | ----------------------------- | -------------------------------------------- |
| `bottomSheetState` | `'idle' \| 'open' \| 'close'` | Internal bottom sheet state                  |
| `progress`         | `SharedValue<number>`         | Animation progress (0=idle, 1=open, 2=close) |

</page>

<page url="/docs/native/components/dialog">
# Dialog

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/dialog
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(overlays)/dialog.mdx
> Displays a modal overlay with animated transitions and gesture-based dismissal.




## Import

```tsx
import { Dialog, useDialog, useDialogAnimation } from 'heroui-native';

```

## Anatomy

```tsx
<Dialog>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay>...</Dialog.Overlay>
    <Dialog.Content>
      <Dialog.Close>...</Dialog.Close>
      <Dialog.Title>...</Dialog.Title>
      <Dialog.Description>...</Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>

```

* **Dialog**: Root component that manages open state and provides context to child components.
* **Dialog.Trigger**: Pressable element that opens the dialog when pressed.
* **Dialog.Portal**: Renders dialog content in a portal with centered layout and animation control.
* **Dialog.Overlay**: Background overlay that appears behind the dialog content, typically closes dialog when pressed.
* **Dialog.Content**: Main dialog container with gesture support for drag-to-dismiss.
* **Dialog.Close**: Close button that dismisses the dialog when pressed.
* **Dialog.Title**: Dialog title text with semantic heading role.
* **Dialog.Description**: Dialog description text that provides additional context.

## Usage

### Basic Dialog

Simple dialog with title, description, and close button.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Close />
      <Dialog.Title>...</Dialog.Title>
      <Dialog.Description>...</Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>

```

### Custom Animations

Configure open and close animations with spring or timing. The `closeDelay` should typically match your closing animation duration.

```tsx
<Dialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  closeDelay={200} // Match this with closing animation duration
  animation={{
    entering: {
      type: 'spring',
      config: { damping: 130, stiffness: 1100 },
    },
    exiting: {
      type: 'timing',
      config: { duration: 200 }, // Should match closeDelay
    },
  }}
>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>...</Dialog.Content>
  </Dialog.Portal>
</Dialog>

```

### Custom Backdrop

Replace the default overlay with custom content.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="bg-transparent">
      <BlurView style={StyleSheet.absoluteFill} />
    </Dialog.Overlay>
    <Dialog.Content>...</Dialog.Content>
  </Dialog.Portal>
</Dialog>

```

### Scrollable Content

Handle long content with scroll views.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Close />
      <Dialog.Title>...</Dialog.Title>
      <View className="h-[300px]">
        <ScrollView>...</ScrollView>
      </View>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>

```

### Form Dialog

Dialog with text inputs and keyboard handling.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <KeyboardAvoidingView behavior="padding">
      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Title>...</Dialog.Title>
        <TextField>...</TextField>
        <Button onPress={handleSubmit}>Submit</Button>
      </Dialog.Content>
    </KeyboardAvoidingView>
  </Dialog.Portal>
</Dialog>

```

## Example

```tsx
import { Button, Dialog } from 'heroui-native';
import { View } from 'react-native';
import { useState } from 'react';

export default function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close />
          <View className="mb-5 gap-1.5">
            <Dialog.Title>Confirm Action</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to proceed with this action? This cannot be
              undone.
            </Dialog.Description>
          </View>
          <View className="flex-row justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </Dialog.Close>
            <Button size="sm">Confirm</Button>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

```

## API Reference

### Dialog

| prop                       | type                       | default | description                                                                          |
| -------------------------- | -------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `children`                 | `React.ReactNode`          | -       | Dialog content and trigger elements                                                  |
| `isOpen`                   | `boolean`                  | -       | Controlled open state of the dialog                                                  |
| `isDefaultOpen`            | `boolean`                  | `false` | Initial open state when uncontrolled                                                 |
| `closeDelay`               | `number`                   | `300`   | Delay in milliseconds before dialog closes (should match closing animation duration) |
| `isDismissKeyboardOnClose` | `boolean`                  | `true`  | Whether to dismiss keyboard when dialog closes                                       |
| `animation`                | `DialogRootAnimation`      | -       | Animation configuration                                                              |
| `onOpenChange`             | `(value: boolean) => void` | -       | Callback when open state changes                                                     |
| `...ViewProps`             | `ViewProps`                | -       | All standard React Native View props are supported                                   |

#### DialogRootAnimation

Animation configuration for dialog root component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                                             | default                                                                                            | description                                     |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| 'disable-all' \| boolean`         | -                                                                                                  | Disable animations while customizing properties |
| `entering.value` | `SpringAnimationConfig \| TimingAnimationConfig` | `{ type: 'timing',`<br />`config: { duration: 200,`<br />`easing: Easing.out(Easing.ease) } }`     | Animation configuration for opening             |
| `exiting.value`  | `SpringAnimationConfig \| TimingAnimationConfig` | `{ type: 'timing',`<br />`config: { duration: 150,`<br />`easing: Easing.bezier(0.4, 0, 1, 1) } }` | Animation configuration for closing             |

#### SpringAnimationConfig

| prop     | type               | default | description                               |
| -------- | ------------------ | ------- | ----------------------------------------- |
| `type`   | `'spring'`         | -       | Animation type (must be `'spring'`)       |
| `config` | `WithSpringConfig` | -       | Reanimated spring animation configuration |

#### TimingAnimationConfig

| prop     | type               | default | description                               |
| -------- | ------------------ | ------- | ----------------------------------------- |
| `type`   | `'timing'`         | -       | Animation type (must be `'timing'`)       |
| `config` | `WithTimingConfig` | -       | Reanimated timing animation configuration |

### Dialog.Trigger

| prop                       | type                    | default | description                                                    |
| -------------------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Trigger element content                                        |
| `asChild`                  | `boolean`               | -       | Render as child element without wrapper                        |
| `...TouchableOpacityProps` | `TouchableOpacityProps` | -       | All standard React Native TouchableOpacity props are supported |

### Dialog.Portal

| prop         | type                   | default | description                                      |
| ------------ | ---------------------- | ------- | ------------------------------------------------ |
| `children`   | `React.ReactNode`      | -       | Portal content (overlay and dialog)              |
| `className`  | `string`               | -       | Additional CSS classes for portal container      |
| `style`      | `StyleProp<ViewStyle>` | -       | Additional styles for portal container           |
| `hostName`   | `string`               | -       | Optional portal host name for specific container |
| `forceMount` | `boolean`              | -       | Force mount when closed for animation purposes   |

### Dialog.Overlay

| prop                    | type                     | default | description                                                  |
| ----------------------- | ------------------------ | ------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode`        | -       | Custom overlay content                                       |
| `className`             | `string`                 | -       | Additional CSS classes for overlay                           |
| `style`                 | `ViewStyle`              | -       | Additional styles for overlay container                      |
| `animation`             | `DialogOverlayAnimation` | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                | `true`  | Whether animated styles (react-native-reanimated) are active |
| `isCloseOnPress`        | `boolean`                | `true`  | Whether pressing overlay closes dialog                       |
| `forceMount`            | `boolean`                | -       | Force mount when closed for animation purposes               |
| `...PressableProps`     | `PressableProps`         | -       | All standard React Native Pressable props are supported      |

#### DialogOverlayAnimation

Animation configuration for dialog overlay component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                       | default     | description                                     |
| --------------- | -------------------------- | ----------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`    | -           | Disable animations while customizing properties |
| `opacity.value` | `[number, number, number]` | `[0, 1, 0]` | Opacity values \[idle, open, close]             |

### Dialog.Content

| prop                    | type                                 | default | description                                                  |
| ----------------------- | ------------------------------------ | ------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode`                    | -       | Dialog content                                               |
| `className`             | `string`                             | -       | Additional CSS classes for content container                 |
| `style`                 | `StyleProp<ViewStyle>`               | -       | Additional styles for content container                      |
| `onLayout`              | `(event: LayoutChangeEvent) => void` | -       | Layout event handler                                         |
| `animation`             | `DialogContentAnimation`             | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                            | `true`  | Whether animated styles (react-native-reanimated) are active |
| `isSwipeable`           | `boolean`                            | `true`  | Whether the dialog content can be swiped to dismiss          |
| `forceMount`            | `boolean`                            | -       | Force mount when closed for animation purposes               |
| `...Animated.ViewProps` | `Animated.ViewProps`                 | -       | All Reanimated Animated.View props are supported             |

#### DialogContentAnimation

Animation configuration for dialog content component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                       | default           | description                                     |
| --------------- | -------------------------- | ----------------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`    | -                 | Disable animations while customizing properties |
| `opacity.value` | `[number, number, number]` | `[0, 1, 0]`       | Opacity values \[idle, open, close]             |
| `scale.value`   | `[number, number, number]` | `[0.97, 1, 0.97]` | Scale values \[idle, open, close]               |

### Dialog.Close

| prop                | type                   | default | description                                             |
| ------------------- | ---------------------- | ------- | ------------------------------------------------------- |
| `children`          | `React.ReactNode`      | -       | Custom close button content                             |
| `className`         | `string`               | -       | Additional CSS classes for close button                 |
| `iconProps`         | `DialogCloseIconProps` | -       | Configuration for default close icon                    |
| `hitSlop`           | `number`               | `12`    | Hit slop area for the close button                      |
| `asChild`           | `boolean`              | -       | Render as child element without wrapper                 |
| `...PressableProps` | `PressableProps`       | -       | All standard React Native Pressable props are supported |

#### DialogCloseIconProps

| prop    | type     | description                             |
| ------- | -------- | --------------------------------------- |
| `size`  | `number` | Icon size (default: 18)                 |
| `color` | `string` | Icon color (default: theme color muted) |

### Dialog.Title

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Title content                                      |
| `className`    | `string`          | -       | Additional CSS classes for title                   |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Dialog.Description

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Description content                                |
| `className`    | `string`          | -       | Additional CSS classes for description             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

## Hooks

### useDialog

Hook to access dialog primitive context.

```tsx
const { isOpen, onOpenChange } = useDialog();

```

| property       | type                       | description                   |
| -------------- | -------------------------- | ----------------------------- |
| `isOpen`       | `boolean`                  | Current open state            |
| `onOpenChange` | `(value: boolean) => void` | Function to change open state |

### useDialogAnimation

Hook to access dialog animation context for advanced customization.

```tsx
const { dialogState, progress, isDragging, isGestureReleaseAnimationRunning } =
  useDialogAnimation();

```

| property                           | type                          | description                                  |
| ---------------------------------- | ----------------------------- | -------------------------------------------- |
| `dialogState`                      | `'idle' \| 'open' \| 'close'` | Internal dialog state                        |
| `progress`                         | `SharedValue<number>`         | Animation progress (0=idle, 1=open, 2=close) |
| `isDragging`                       | `SharedValue<boolean>`        | Whether dialog is being dragged              |
| `isGestureReleaseAnimationRunning` | `SharedValue<boolean>`        | Whether gesture release animation is running |

</page>

<page url="/docs/native/components/popover">
# Popover

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/popover
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(overlays)/popover.mdx
> Displays a floating content panel anchored to a trigger element with placement and alignment options.




## Import

```tsx
import { Popover } from 'heroui-native';

```

## Anatomy

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>
      <Popover.Arrow />
      <Popover.Close />
      <Popover.Title>...</Popover.Title>
      <Popover.Description>...</Popover.Description>
    </Popover.Content>
  </Popover.Portal>
</Popover>

```

* **Popover**: Main container that manages open/close state, positioning, and provides context to child components.
* **Popover.Trigger**: Clickable element that toggles popover visibility. Wraps any child element with press handlers.
* **Popover.Portal**: Renders popover content in a portal layer above other content. Ensures proper stacking and positioning.
* **Popover.Overlay**: Optional background overlay. Can be transparent or semi-transparent to capture outside clicks.
* **Popover.Content**: Container for popover content with positioning, styling, and collision detection. Supports both popover and bottom-sheet presentations.
* **Popover.Arrow**: Optional arrow element pointing to the trigger. Automatically positioned based on placement.
* **Popover.Close**: Close button that dismisses the popover when pressed. Renders a default X icon if no children provided.
* **Popover.Title**: Optional title text with pre-styled typography.
* **Popover.Description**: Optional description text with muted styling.

## Usage

### Basic Usage

The Popover component uses compound parts to create floating content panels.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>...</Popover.Content>
  </Popover.Portal>
</Popover>

```

### With Title and Description

Structure popover content with title and description for better information hierarchy.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>
      <Popover.Close />
      <Popover.Title>...</Popover.Title>
      <Popover.Description>...</Popover.Description>
    </Popover.Content>
  </Popover.Portal>
</Popover>

```

### With Arrow

Add an arrow pointing to the trigger element for better visual connection.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content placement="top">
      <Popover.Arrow />
      ...
    </Popover.Content>
  </Popover.Portal>
</Popover>

```

### Width Control

Control the width of the popover content using the `width` prop.

```tsx
{
  /* Fixed width in pixels */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width={320}>...</Popover.Content>
  </Popover.Portal>
</Popover>;

{
  /* Match trigger width */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width="trigger">...</Popover.Content>
  </Popover.Portal>
</Popover>;

{
  /* Full width (100%) */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width="full">...</Popover.Content>
  </Popover.Portal>
</Popover>;

{
  /* Auto-size to content (default) */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width="content-fit">...</Popover.Content>
  </Popover.Portal>
</Popover>;

```

### Bottom Sheet Presentation

Use bottom sheet presentation for mobile-optimized interaction patterns.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content presentation="bottom-sheet">
      <Popover.Title>...</Popover.Title>
      <Popover.Description>...</Popover.Description>
      <Popover.Close asChild>
        <Button>Close</Button>
      </Popover.Close>
    </Popover.Content>
  </Popover.Portal>
</Popover>

```

### Placement Options

Control where the popover appears relative to the trigger element.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content placement="left">...</Popover.Content>
  </Popover.Portal>
</Popover>

```

### Alignment Options

Fine-tune content alignment along the placement axis.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content placement="top" align="start">
      ...
    </Popover.Content>
  </Popover.Portal>
</Popover>

```

### Custom Animation

Configure custom animations for open and close transitions using the `animation` prop on `Popover.Root`.

```tsx
<Popover
  animation={{
    entering: {
      type: 'spring',
      config: { damping: 15, stiffness: 300 },
    },
    exiting: {
      type: 'timing',
      config: { duration: 200 },
    },
  }}
>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>...</Popover.Content>
  </Popover.Portal>
</Popover>

```

### Programmatic control

```tsx
// Open or close popover programmatically using ref
const popoverRef = useRef<PopoverTriggerRef>(null);

// Open programmatically
popoverRef.current?.open();

// Close programmatically
popoverRef.current?.close();

// Full example
<Popover>
  <Popover.Trigger ref={popoverRef} asChild>
    <Button>Trigger</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>
      <Text>Content</Text>
      <Button onPress={() => popoverRef.current?.close()}>Close</Button>
    </Popover.Content>
  </Popover.Portal>
</Popover>;

```

## Example

```tsx
import { Ionicons } from '@expo/vector-icons';
import { Button, Popover, useThemeColor } from 'heroui-native';
import { Text, View } from 'react-native';

export default function PopoverExample() {
  const themeColorMuted = useThemeColor('muted');

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="tertiary" size="sm">
          <Button.StartContent>
            <Ionicons
              name="information-circle"
              size={20}
              color={themeColorMuted}
            />
          </Button.StartContent>
          <Button.LabelContent>Show Info</Button.LabelContent>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content width={320} className="gap-1 rounded-xl px-6 py-4">
          <Popover.Close className="absolute top-3 right-3 z-50" />
          <Popover.Title>Information</Popover.Title>
          <Popover.Description>
            This popover includes a title and description to provide more
            structured information to users.
          </Popover.Description>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}

```

## API Reference

### Popover

| prop            | type                        | default | description                                                               |
| --------------- | --------------------------- | ------- | ------------------------------------------------------------------------- |
| `children`      | `ReactNode`                 | -       | Children elements to be rendered inside the popover                       |
| `isOpen`        | `boolean`                   | -       | Whether the popover is open (controlled mode)                             |
| `isDefaultOpen` | `boolean`                   | -       | The open state of the popover when initially rendered (uncontrolled mode) |
| `onOpenChange`  | `(isOpen: boolean) => void` | -       | Callback when the popover open state changes                              |
| `closeDelay`    | `number`                    | `400`   | Delay in milliseconds before closing the popover                          |
| `animation`     | `PopoverRootAnimation`      | -       | Animation configuration                                                   |
| `asChild`       | `boolean`                   | `false` | Whether to render as a child element                                      |
| `...ViewProps`  | `ViewProps`                 | -       | All standard React Native View props are supported                        |

#### PopoverRootAnimation

Animation configuration for popover root component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop             | type                                             | default                                                                                            | description                                     |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `state`          | `'disabled' \| 'disable-all' \| boolean`         | -                                                                                                  | Disable animations while customizing properties |
| `entering.value` | `SpringAnimationConfig \| TimingAnimationConfig` | `{ type: 'timing',`<br />`config: { duration: 200,`<br />`easing: Easing.out(Easing.ease) } }`     | Animation configuration for opening             |
| `exiting.value`  | `SpringAnimationConfig \| TimingAnimationConfig` | `{ type: 'timing',`<br />`config: { duration: 150,`<br />`easing: Easing.bezier(0.4, 0, 1, 1) } }` | Animation configuration for closing             |

#### SpringAnimationConfig

| prop     | type               | default | description                               |
| -------- | ------------------ | ------- | ----------------------------------------- |
| `type`   | `'spring'`         | -       | Animation type (must be `'spring'`)       |
| `config` | `WithSpringConfig` | -       | Reanimated spring animation configuration |

#### TimingAnimationConfig

| prop     | type               | default | description                               |
| -------- | ------------------ | ------- | ----------------------------------------- |
| `type`   | `'timing'`         | -       | Animation type (must be `'timing'`)       |
| `config` | `WithTimingConfig` | -       | Reanimated timing animation configuration |

### Popover.Trigger

| prop                | type             | default | description                                             |
| ------------------- | ---------------- | ------- | ------------------------------------------------------- |
| `children`          | `ReactNode`      | -       | The trigger element content                             |
| `className`         | `string`         | -       | Additional CSS classes for the trigger                  |
| `asChild`           | `boolean`        | `true`  | Whether to render as a child element                    |
| `...PressableProps` | `PressableProps` | -       | All standard React Native Pressable props are supported |

### Popover.Portal

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The portal content (required)                      |
| `hostName`     | `string`    | -       | Optional name of the host element for the portal   |
| `forceMount`   | `boolean`   | -       | Whether to force mount the component in the DOM    |
| `className`    | `string`    | -       | Additional CSS classes for the portal container    |
| `...ViewProps` | `ViewProps` | -       | All standard React Native View props are supported |

### Popover.Overlay

| prop                    | type                      | default | description                                                  |
| ----------------------- | ------------------------- | ------- | ------------------------------------------------------------ |
| `className`             | `string`                  | -       | Additional CSS classes for the overlay                       |
| `closeOnPress`          | `boolean`                 | `true`  | Whether to close the popover when overlay is pressed         |
| `forceMount`            | `boolean`                 | -       | Whether to force mount the component in the DOM              |
| `animation`             | `PopoverOverlayAnimation` | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                 | `true`  | Whether animated styles (react-native-reanimated) are active |
| `asChild`               | `boolean`                 | `false` | Whether to render as a child element                         |
| `...Animated.ViewProps` | `Animated.ViewProps`      | -       | All Reanimated Animated.View props are supported             |

#### PopoverOverlayAnimation

Animation configuration for popover overlay component. Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                       | default     | description                                     |
| --------------- | -------------------------- | ----------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`    | -           | Disable animations while customizing properties |
| `opacity.value` | `[number, number, number]` | `[0, 1, 0]` | Opacity values \[idle, open, close]             |

### Popover.Content (Popover Presentation)

| prop                      | type                                             | default         | description                                                  |
| ------------------------- | ------------------------------------------------ | --------------- | ------------------------------------------------------------ |
| `children`                | `ReactNode`                                      | -               | The popover content                                          |
| `width`                   | `number \| 'trigger' \| 'content-fit' \| 'full'` | `'content-fit'` | Width sizing strategy for the content                        |
| `placement`               | `'top' \| 'bottom' \| 'left' \| 'right'`         | `'bottom'`      | Placement of the popover relative to trigger                 |
| `align`                   | `'start' \| 'center' \| 'end'`                   | `'center'`      | Alignment along the placement axis                           |
| `avoidCollisions`         | `boolean`                                        | `true`          | Whether to flip placement when close to viewport edges       |
| `offset`                  | `number`                                         | `8`             | Distance from trigger element in pixels                      |
| `alignOffset`             | `number`                                         | `0`             | Offset along the alignment axis in pixels                    |
| `disablePositioningStyle` | `boolean`                                        | `false`         | Whether to disable automatic positioning styles              |
| `forceMount`              | `boolean`                                        | -               | Whether to force mount the component in the DOM              |
| `insets`                  | `Insets`                                         | -               | Screen edge insets to respect when positioning               |
| `className`               | `string`                                         | -               | Additional CSS classes for the content container             |
| `presentation`            | `'popover'`                                      | -               | Presentation mode for the popover                            |
| `animation`               | `PopupPopoverContentAnimation`                   | -               | Animation configuration                                      |
| `isAnimatedStyleActive`   | `boolean`                                        | `true`          | Whether animated styles (react-native-reanimated) are active |
| `asChild`                 | `boolean`                                        | `false`         | Whether to render as a child element                         |
| `...Animated.ViewProps`   | `Animated.ViewProps`                             | -               | All Reanimated Animated.View props are supported             |

### Popover.Content (Bottom Sheet Presentation)

| prop                        | type                   | default | description                                      |
| --------------------------- | ---------------------- | ------- | ------------------------------------------------ |
| `children`                  | `ReactNode`            | -       | The bottom sheet content                         |
| `presentation`              | `'bottom-sheet'`       | -       | Presentation mode for the popover                |
| `contentContainerClassName` | `string`               | -       | Additional CSS classes for the content container |
| `contentContainerProps`     | `BottomSheetViewProps` | -       | Props for the content container                  |
| `enablePanDownToClose`      | `boolean`              | `true`  | Whether pan down gesture closes the sheet        |
| `backgroundStyle`           | `ViewStyle`            | -       | Style for the bottom sheet background            |
| `handleIndicatorStyle`      | `ViewStyle`            | -       | Style for the bottom sheet handle indicator      |
| `...BottomSheetProps`       | `BottomSheetProps`     | -       | All @gorhom/bottom-sheet props are supported     |

#### PopupPopoverContentAnimation

Animation configuration for popover content component (popover presentation). Can be:

* `false` or `"disabled"`: Disable all animations
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                    | type                       | default                                                          | description                                     |
| ----------------------- | -------------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| `state`                 | `'disabled' \| boolean`    | -                                                                | Disable animations while customizing properties |
| `opacity.value`         | `[number, number, number]` | `[0, 1, 0]`                                                      | Opacity values \[idle, open, close]             |
| `scale.value`           | `[number, number, number]` | `[0.95, 1, 0.95]`                                                | Scale values \[idle, open, close]               |
| `translateX.value`      | `[number, number, number]` | Based on placement<br />`(4, 0, 4)` or `(-4, 0, -4)`             | TranslateX values \[idle, open, close]          |
| `translateY.value`      | `[number, number, number]` | Based on placement<br />`(4, 0, 4)` or `(-4, 0, -4)`             | TranslateY values \[idle, open, close]          |
| `transformOrigin.value` | `string`                   | Based on placement<br />`'top'`, `'bottom'`, `'left'`, `'right'` | Transform origin value                          |

### Popover.Arrow

| prop                  | type                                     | default | description                                                           |
| --------------------- | ---------------------------------------- | ------- | --------------------------------------------------------------------- |
| `className`           | `string`                                 | -       | Additional CSS classes for the arrow                                  |
| `height`              | `number`                                 | `8`     | Height of the arrow in pixels                                         |
| `width`               | `number`                                 | `16`    | Width of the arrow in pixels                                          |
| `fill`                | `string`                                 | -       | Fill color of the arrow (defaults to content background)              |
| `stroke`              | `string`                                 | -       | Stroke (border) color of the arrow (defaults to content border color) |
| `strokeWidth`         | `number`                                 | `1`     | Stroke width of the arrow border in pixels                            |
| `strokeBaselineInset` | `number`                                 | `1`     | Baseline inset in pixels for stroke alignment                         |
| `placement`           | `'top' \| 'bottom' \| 'left' \| 'right'` | -       | Placement of the popover (inherited from content)                     |
| `children`            | `ReactNode`                              | -       | Custom arrow content (replaces default SVG arrow)                     |
| `style`               | `StyleProp<ViewStyle>`                   | -       | Additional styles for the arrow container                             |
| `...ViewProps`        | `ViewProps`                              | -       | All standard React Native View props are supported                    |

### Popover.Close

| prop                | type                    | default | description                                             |
| ------------------- | ----------------------- | ------- | ------------------------------------------------------- |
| `children`          | `ReactNode`             | -       | The close button content                                |
| `className`         | `string`                | -       | Additional CSS classes for the close button             |
| `iconProps`         | `PopoverCloseIconProps` | -       | Close icon configuration                                |
| `hitSlop`           | `number \| Insets`      | `12`    | Additional touch area around the button                 |
| `asChild`           | `boolean`               | -       | Whether to render as a child element                    |
| `...PressableProps` | `PressableProps`        | -       | All standard React Native Pressable props are supported |

#### PopoverCloseIconProps

| prop    | type     | default          | description       |
| ------- | -------- | ---------------- | ----------------- |
| `size`  | `number` | `18`             | Size of the icon  |
| `color` | `string` | `--colors.muted` | Color of the icon |

### Popover.Title

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The title text content                             |
| `className`    | `string`    | -       | Additional CSS classes for the title               |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

### Popover.Description

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The description text content                       |
| `className`    | `string`    | -       | Additional CSS classes for the description         |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

## Hooks

### usePopover

Hook to access popover context values within custom components or compound components.

```tsx
import { usePopover } from 'heroui-native';

const CustomContent = () => {
  const { isOpen, onOpenChange, triggerPosition } = usePopover();
  // ... your implementation
};

```

**Returns:** `UsePopoverReturn`

| property             | type                                                | description                                                       |
| -------------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| `isOpen`             | `boolean`                                           | Whether the popover is currently open                             |
| `onOpenChange`       | `(open: boolean) => void`                           | Callback function to change the popover open state                |
| `isDefaultOpen`      | `boolean \| undefined`                              | Whether the popover should be open by default (uncontrolled mode) |
| `isDisabled`         | `boolean \| undefined`                              | Whether the popover is disabled                                   |
| `triggerPosition`    | `LayoutPosition \| null`                            | The position of the trigger element relative to the viewport      |
| `setTriggerPosition` | `(triggerPosition: LayoutPosition \| null) => void` | Function to update the trigger element's position                 |
| `contentLayout`      | `LayoutRectangle \| null`                           | The layout measurements of the popover content                    |
| `setContentLayout`   | `(contentLayout: LayoutRectangle \| null) => void`  | Function to update the content layout measurements                |
| `nativeID`           | `string`                                            | Unique identifier for the popover instance                        |
| `closeDelay`         | `number \| undefined`                               | Delay in milliseconds before the popover closes                   |

**Note:** This hook must be used within a `Popover` component. It will throw an error if called outside of the popover context.

### usePopoverAnimation

Hook to access popover animation state values within custom components or compound components.

```tsx
import { usePopoverAnimation } from 'heroui-native';

const CustomContent = () => {
  const { popoverState, progress, isDragging } = usePopoverAnimation();
  // ... your implementation
};

```

**Returns:** `UsePopoverAnimationReturn`

| property       | type                          | description                                                        |
| -------------- | ----------------------------- | ------------------------------------------------------------------ |
| `popoverState` | `'idle' \| 'open' \| 'close'` | Extended internal state for coordinating animations                |
| `progress`     | `SharedValue<number>`         | Progress value for the popover animation (0=idle, 1=open, 2=close) |
| `isDragging`   | `SharedValue<boolean>`        | Dragging state shared value                                        |

**Note:** This hook must be used within a `Popover` component. It will throw an error if called outside of the popover animation context.

</page>

<page url="/docs/native/components/toast">
# Toast

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/toast
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(overlays)/toast.mdx
> Displays temporary notification messages that appear at the top or bottom of the screen.




## Import

```tsx
import { Toast, useToast } from 'heroui-native';

```

## Anatomy

```tsx
<Toast>
  <Toast.Title>...</Toast.Title>
  <Toast.Description>...</Toast.Description>
  <Toast.Action>...</Toast.Action>
  <Toast.Close />
</Toast>

```

* **Toast**: Main container that displays notification messages. Handles positioning, animations, and swipe gestures.
* **Toast.Title**: Title text of the toast notification. Inherits variant styling from parent Toast context.
* **Toast.Description**: Descriptive text content displayed below the title.
* **Toast.Action**: Action button within the toast. Button variant is automatically determined based on toast variant but can be overridden.
* **Toast.Close**: Close button for dismissing the toast. Renders as an icon-only button that calls hide when pressed.

## Usage

### Usage Pattern 1: Simple String

Show a toast with a simple string message.

```tsx
const { toast } = useToast();

toast.show('This is a toast message');

```

### Usage Pattern 2: Config Object

Show a toast with label, description, variant, and action button using a config object.

```tsx
const { toast } = useToast();

toast.show({
  variant: 'success',
  label: 'You have upgraded your plan',
  description: 'You can continue using HeroUI Chat',
  icon: <Icon name="check" />,
  actionLabel: 'Close',
  onActionPress: ({ hide }) => hide(),
});

```

### Usage Pattern 3: Custom Component

Show a toast with a fully custom component for complete control over styling and layout.

```tsx
const { toast } = useToast();

toast.show({
  component: (props) => (
    <Toast variant="accent" placement="top" {...props}>
      <Toast.Title>Custom Toast</Toast.Title>
      <Toast.Description>This is a custom toast component</Toast.Description>
      <Toast.Close />
    </Toast>
  ),
});

```

**Note**: Toast items are memoized for performance. If you need to pass external state (like loading state) to a custom toast component, it will not update automatically. Use shared state techniques instead, such as React Context, state management libraries, or refs to ensure state updates propagate to the toast component.

### Disabling All Animations

Disable all animations including children by using `"disable-all"`. This cascades down to all child components (like Button in Toast.Action).

```tsx
const { toast } = useToast();

toast.show({
  variant: 'success',
  label: 'Operation completed',
  description: 'All animations are disabled',
  animation: 'disable-all',
});

```

Or with a custom component:

```tsx
const { toast } = useToast();

toast.show({
  component: (props) => (
    <Toast variant="accent" animation="disable-all" {...props}>
      <Toast.Title>No animations</Toast.Title>
      <Toast.Description>
        This toast has all animations disabled
      </Toast.Description>
      <Toast.Action>Action</Toast.Action>
    </Toast>
  ),
});

```

## Example

```tsx
import { Button, Toast, useToast, useThemeColor } from 'heroui-native';
import { View } from 'react-native';

export default function ToastExample() {
  const { toast } = useToast();
  const themeColorForeground = useThemeColor('foreground');

  return (
    <View className="gap-4 p-4">
      <Button
        onPress={() =>
          toast.show({
            variant: 'success',
            label: 'You have upgraded your plan',
            description: 'You can continue using HeroUI Chat',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Show Success Toast
      </Button>

      <Button
        onPress={() =>
          toast.show({
            component: (props) => (
              <Toast variant="accent" {...props}>
                <Toast.Title>Custom Toast</Toast.Title>
                <Toast.Description>
                  This uses a custom component
                </Toast.Description>
                <Toast.Action onPress={() => props.hide()}>Undo</Toast.Action>
                <Toast.Close className="absolute top-0 right-0" />
              </Toast>
            ),
          })
        }
      >
        Show Custom Toast
      </Button>
    </View>
  );
}

```

## Global Configuration

Configure toast behavior globally using `HeroUINativeProvider` config prop. Global configs serve as defaults for all toasts unless overridden locally.

> **Note**: For complete provider configuration options, see the [Provider documentation](/docs/native/getting-started/handbook/provider#toast-configuration).

### Insets

Insets control the distance of toast sides from screen edges. Insets are added to safe area insets. To set all toasts to have a side distance of 20px from screen edges, configure insets:

```tsx
<HeroUINativeProvider
  config={{
    toast: {
      insets: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
  }}
>
  {children}
</HeroUINativeProvider>

```

### Content Wrapper with KeyboardAvoidingView

Wrap toast content with KeyboardAvoidingView to ensure toasts adjust when the keyboard appears:

```tsx
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from 'react-native-keyboard-controller';
import { HeroUINativeProvider } from 'heroui-native';
import { useCallback } from 'react';

function AppContent() {
  const contentWrapper = useCallback(
    (children: React.ReactNode) => (
      <KeyboardAvoidingView
        pointerEvents="box-none"
        behavior="padding"
        keyboardVerticalOffset={12}
        className="flex-1"
      >
        {children}
      </KeyboardAvoidingView>
    ),
    []
  );

  return (
    <KeyboardProvider>
      <HeroUINativeProvider
        config={{
          toast: {
            contentWrapper,
          },
        }}
      >
        {children}
      </HeroUINativeProvider>
    </KeyboardProvider>
  );
}

```

### Default Props

Set global defaults for variant, placement, animation, and swipe behavior:

```tsx
<HeroUINativeProvider
  config={{
    toast: {
      defaultProps: {
        variant: 'accent',
        placement: 'bottom',
        isSwipeable: false,
      },
    },
  }}
>
  {children}
</HeroUINativeProvider>

```

## API Reference

### Toast

| prop                    | type                                                          | default     | description                                                               |
| ----------------------- | ------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `variant`               | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Visual variant of the toast                                               |
| `placement`             | `'top' \| 'bottom'`                                           | `'top'`     | Placement of the toast on screen                                          |
| `isSwipeable`           | `boolean`                                                     | `true`      | Whether the toast can be swiped to dismiss and dragged with rubber effect |
| `animation`             | `ToastRootAnimation`                                          | -           | Animation configuration                                                   |
| `isAnimatedStyleActive` | `boolean`                                                     | `true`      | Whether animated styles (react-native-reanimated) are active              |
| `className`             | `string`                                                      | -           | Additional CSS class for the toast container                              |
| `...ViewProps`          | `ViewProps`                                                   | -           | All standard React Native View props are supported                        |

#### ToastRootAnimation

Animation configuration for Toast component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                      | type                                     | default                                                                                                                      | description                                                                      |
| ------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `state`                   | `'disabled' \| 'disable-all' \| boolean` | -                                                                                                                            | Disable animations while customizing properties                                  |
| `opacity.value`           | `[number, number]`                       | `[1, 0]`                                                                                                                     | Opacity interpolation values for fade effect as toasts move beyond visible stack |
| `opacity.timingConfig`    | `WithTimingConfig`                       | `{ duration: 300 }`                                                                                                          | Animation timing configuration for opacity transitions                           |
| `translateY.value`        | `[number, number]`                       | `[0, 10]`                                                                                                                    | Translate Y interpolation values for peek effect of stacked toasts               |
| `translateY.timingConfig` | `WithTimingConfig`                       | `{ duration: 300 }`                                                                                                          | Animation timing configuration for translateY transitions                        |
| `scale.value`             | `[number, number]`                       | `[1, 0.97]`                                                                                                                  | Scale interpolation values for depth effect of stacked toasts                    |
| `scale.timingConfig`      | `WithTimingConfig`                       | `{ duration: 300 }`                                                                                                          | Animation timing configuration for scale transitions                             |
| `entering.top`            | `EntryOrExitLayoutType`                  | `FadeInUp`<br />`.springify()`<br />`.withInitialValues({ opacity: 1, transform: [{ translateY: -100 }] })`<br />`.mass(3)`  | Custom entering animation for top placement                                      |
| `entering.bottom`         | `EntryOrExitLayoutType`                  | `FadeInDown`<br />`.springify()`<br />`.withInitialValues({ opacity: 1, transform: [{ translateY: 100 }] })`<br />`.mass(3)` | Custom entering animation for bottom placement                                   |
| `exiting.top`             | `EntryOrExitLayoutType`                  | Keyframe animation with<br />`translateY: -100, scale: 0.97, opacity: 0.5`                                                   | Custom exiting animation for top placement                                       |
| `exiting.bottom`          | `EntryOrExitLayoutType`                  | Keyframe animation with<br />`translateY: 100, scale: 0.97, opacity: 0.5`                                                    | Custom exiting animation for bottom placement                                    |

### Toast.Title

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to be rendered as title                    |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Toast.Description

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to be rendered as description              |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Toast.Action

Toast.Action extends all props from [Button](button) component. Button variant is automatically determined based on toast variant but can be overridden.

| prop        | type                   | default | description                                                                  |
| ----------- | ---------------------- | ------- | ---------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`      | -       | Content to be rendered as action button label                                |
| `variant`   | `ButtonVariant`        | -       | Button variant. If not provided, automatically determined from toast variant |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'sm'`  | Size of the action button                                                    |
| `className` | `string`               | -       | Additional CSS classes                                                       |

For inherited props including `onPress`, `isDisabled`, and all Button props, see [Button API Reference](button#api-reference).

### Toast.Close

Toast.Close extends all props from [Button](button) component.

| prop        | type                                | default | description                                    |
| ----------- | ----------------------------------- | ------- | ---------------------------------------------- |
| `children`  | `React.ReactNode`                   | -       | Custom close icon. Defaults to CloseIcon       |
| `iconProps` | `{ size?: number; color?: string }` | -       | Props for the default close icon               |
| `size`      | `'sm' \| 'md' \| 'lg'`              | `'sm'`  | Size of the close button                       |
| `className` | `string`                            | -       | Additional CSS classes                         |
| `onPress`   | `(event: any) => void`              | -       | Custom press handler. Defaults to hiding toast |

For inherited props including `isDisabled` and all Button props, see [Button API Reference](button#api-reference).

### ToastProviderProps

Props for configuring toast behavior globally via `HeroUINativeProvider` config prop.

| prop               | type                                                | default | description                                                      |
| ------------------ | --------------------------------------------------- | ------- | ---------------------------------------------------------------- |
| `defaultProps`     | `ToastGlobalConfig`                                 | -       | Global toast configuration used as defaults for all toasts       |
| `insets`           | `ToastInsets`                                       | -       | Insets for spacing from screen edges (added to safe area insets) |
| `maxVisibleToasts` | `number`                                            | `3`     | Maximum number of visible toasts before opacity starts fading    |
| `contentWrapper`   | `(children: React.ReactNode) => React.ReactElement` | -       | Custom wrapper function to wrap toast content                    |
| `children`         | `React.ReactNode`                                   | -       | Children to render                                               |

#### ToastGlobalConfig

Global toast configuration used as defaults for all toasts unless overridden locally.

| prop          | type                                                          | description                                                               |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `variant`     | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | Visual variant of the toast                                               |
| `placement`   | `'top' \| 'bottom'`                                           | Placement of the toast on screen                                          |
| `isSwipeable` | `boolean`                                                     | Whether the toast can be swiped to dismiss and dragged with rubber effect |
| `animation`   | `ToastRootAnimation`                                          | Animation configuration for toast                                         |

#### ToastInsets

Insets for spacing from screen edges. Values are added to safe area insets.

| prop     | type     | default | description                                                                                               |
| -------- | -------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `top`    | `number` | -       | Inset from the top edge in pixels (added to safe area inset). Platform-specific: iOS = 0, Android = 12    |
| `bottom` | `number` | -       | Inset from the bottom edge in pixels (added to safe area inset). Platform-specific: iOS = 6, Android = 12 |
| `left`   | `number` | -       | Inset from the left edge in pixels (added to safe area inset). Default: 12                                |
| `right`  | `number` | -       | Inset from the right edge in pixels (added to safe area inset). Default: 12                               |

## Hooks

### useToast

Hook to access toast functionality. Must be used within a `ToastProvider` (provided by `HeroUINativeProvider`).

| return value     | type           | description                              |
| ---------------- | -------------- | ---------------------------------------- |
| `toast`          | `ToastManager` | Toast manager with show and hide methods |
| `isToastVisible` | `boolean`      | Whether any toast is currently visible   |

#### ToastManager

| method | type                                              | description                                                                                                                          |
| ------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `show` | `(options: string \| ToastShowOptions) => string` | Show a toast. Returns the ID of the shown toast. Supports three usage patterns: simple string, config object, or custom component    |
| `hide` | `(ids?: string \| string[] \| 'all') => void`     | Hide one or more toasts. No argument hides the last toast, 'all' hides all toasts, single ID or array of IDs hides specific toast(s) |

#### ToastShowOptions

Options for showing a toast. Can be either a config object with default styling or a custom component.

**When using config object (without component):**

| prop            | type                                                                                                                              | default | description                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `variant`       | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'`                                                                     | -       | Visual variant of the toast                                                         |
| `placement`     | `'top' \| 'bottom'`                                                                                                               | -       | Placement of the toast on screen                                                    |
| `isSwipeable`   | `boolean`                                                                                                                         | -       | Whether the toast can be swiped to dismiss                                          |
| `animation`     | `ToastRootAnimation \| false \| "disabled" \| "disable-all"`                                                                      | -       | Animation configuration for toast                                                   |
| `duration`      | `number \| 'persistent'`                                                                                                          | `4000`  | Duration in milliseconds before auto-hide. Set to 'persistent' to prevent auto-hide |
| `id`            | `string`                                                                                                                          | -       | Optional ID for the toast. If not provided, one will be generated                   |
| `label`         | `string`                                                                                                                          | -       | Label text for the toast                                                            |
| `description`   | `string`                                                                                                                          | -       | Description text for the toast                                                      |
| `actionLabel`   | `string`                                                                                                                          | -       | Action button label text                                                            |
| `onActionPress` | `(helpers: { show: (options: string \| ToastShowOptions) => string; hide: (ids?: string \| string[] \| 'all') => void }) => void` | -       | Callback function called when the action button is pressed                          |
| `icon`          | `React.ReactNode`                                                                                                                 | -       | Icon element to display in the toast                                                |
| `onShow`        | `() => void`                                                                                                                      | -       | Callback function called when the toast is shown                                    |
| `onHide`        | `() => void`                                                                                                                      | -       | Callback function called when the toast is hidden                                   |

**When using custom component:**

| prop        | type                                                 | default | description                                                                         |
| ----------- | ---------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `id`        | `string`                                             | -       | Optional ID for the toast. If not provided, one will be generated                   |
| `component` | `(props: ToastComponentProps) => React.ReactElement` | -       | A function that receives toast props and returns a React element                    |
| `duration`  | `number \| 'persistent'`                             | `4000`  | Duration in milliseconds before auto-hide. Set to 'persistent' to prevent auto-hide |
| `onShow`    | `() => void`                                         | -       | Callback function called when the toast is shown                                    |
| `onHide`    | `() => void`                                         | -       | Callback function called when the toast is hidden                                   |

## Special Notes

### Styling Notes

#### Border as Padding

Toast uses `border-[16px]` class which serves as padding. This is intentional because when visible toasts have different heights, the toast adapts to the last visible toast height. In cases where a toast originally has one height and gets smaller when a new toast comes to stack, content might be visible behind the last toast without proper padding. The border ensures consistent spacing regardless of toast height changes.

For padding, use `border` classes. For actual borders, use `outline` classes.

</page>

<page url="/docs/native/components/pressable-feedback">
# PressableFeedback

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/pressable-feedback
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(utilities)/pressable-feedback.mdx
> Container component that provides visual feedback for press interactions with automatic scale animation.




## Import

```tsx
import { PressableFeedback } from 'heroui-native';

```

## Usage

### Basic Usage

The PressableFeedback component wraps content to provide press feedback effects. By default, it applies a subtle scale animation when pressed.

```tsx
<PressableFeedback>...</PressableFeedback>

```

### Highlight Variant

Default iOS-style highlight feedback effect with automatic scale animation.

```tsx
<PressableFeedback feedbackVariant="highlight">...</PressableFeedback>

```

### Ripple Variant

Android-style ripple feedback effect that emanates from the press point, combined with scale animation.

```tsx
<PressableFeedback feedbackVariant="ripple">...</PressableFeedback>

```

### Custom Highlight Animation

Configure highlight overlay opacity and background color while maintaining the default scale effect.

```tsx
<PressableFeedback
  feedbackVariant="highlight"
  animation={{
    highlight: {
      opacity: { value: [0, 0.2] },
      backgroundColor: { value: '#3b82f6' },
    },
  }}
>
  ...
</PressableFeedback>

```

### Custom Ripple Animation

Configure ripple effect color, opacity, and duration along with scale animation.

```tsx
<PressableFeedback
  feedbackVariant="ripple"
  animation={{
    ripple: {
      backgroundColor: { value: '#ec4899' },
      opacity: { value: [0, 0.3, 0] },
      progress: { baseDuration: 600 },
    },
  }}
>
  ...
</PressableFeedback>

```

### Feedback Position

Control whether the feedback effect renders above or below content.

```tsx
<PressableFeedback feedbackPosition="behind">
  ...
</PressableFeedback>

<PressableFeedback feedbackPosition="top">
  ...
</PressableFeedback>

```

### Custom Scale Animation

Customize or disable the default scale animation on press.

```tsx
<PressableFeedback
  animation={{
    scale: {
      value: 0.98,
      timingConfig: { duration: 150 }
    }
  }}
>
  ...
</PressableFeedback>

<PressableFeedback animation={{ scale: "disabled" }}>
  ...
</PressableFeedback>

```

### Disabled State

Disable press interactions and all feedback animations.

```tsx
<PressableFeedback animation="disabled">...</PressableFeedback>

```

## Example

```tsx
import { PressableFeedback, Card } from 'heroui-native';
import { View, Text, Image } from 'react-native';

export default function PressableFeedbackExample() {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row gap-4">
        <PressableFeedback
          feedbackVariant="ripple"
          className="flex-1 aspect-[1/1.3] rounded-3xl"
          animation={{
            ripple: {
              backgroundColor: { value: '#fecdd3' },
              opacity: { value: [0, 0.2, 0] },
            },
          }}
        >
          <Card className="flex-1">
            <View className="flex-1 gap-4">
              <Card.Header>
                <Image
                  source={{
                    uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg',
                  }}
                  style={{
                    height: 60,
                    aspectRatio: 1,
                    borderRadius: 14,
                  }}
                />
              </Card.Header>
              <Card.Body className="flex-1">
                <Card.Title>Indie Hackers</Card.Title>
                <Card.Description className="text-sm">
                  148 members
                </Card.Description>
              </Card.Body>
              <Card.Footer className="flex-row items-center gap-2">
                <View className="size-3 rounded-full bg-rose-400" />
                <Text className="text-sm font-medium text-foreground">
                  @indiehackers
                </Text>
              </Card.Footer>
            </View>
          </Card>
        </PressableFeedback>
        <PressableFeedback
          feedbackVariant="ripple"
          className="flex-1 aspect-[1/1.3] rounded-3xl"
          animation={{
            ripple: {
              backgroundColor: { value: '#67e8f9' },
            },
          }}
        >
          <Card className="flex-1">
            <View className="flex-1 gap-4">
              <Card.Header>
                <Image
                  source={{
                    uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg',
                  }}
                  style={{
                    height: 60,
                    aspectRatio: 1,
                    borderRadius: 14,
                  }}
                />
              </Card.Header>
              <Card.Body className="flex-1">
                <Card.Title>AI Builders</Card.Title>
                <Card.Description className="text-sm">
                  362 members
                </Card.Description>
              </Card.Body>
              <Card.Footer className="flex-row items-center gap-2">
                <View className="size-3 rounded-full bg-emerald-400" />
                <Text className="text-sm font-medium text-foreground">
                  @aibuilders
                </Text>
              </Card.Footer>
            </View>
          </Card>
        </PressableFeedback>
      </View>
    </View>
  );
}

```

## API Reference

### PressableFeedback

| prop               | type                                                                              | default       | description                                                          |
| ------------------ | --------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                                                                 | -             | Content to be wrapped with press feedback                            |
| `feedbackVariant`  | `'highlight' \| 'ripple'`                                                         | `'highlight'` | Type of feedback effect to display                                   |
| `feedbackPosition` | `'behind' \| 'top'`                                                               | `'top'`       | Controls z-index positioning of feedback effect relative to children |
| `isDisabled`       | `boolean`                                                                         | `false`       | Whether the pressable component is disabled                          |
| `className`        | `string`                                                                          | -             | Additional CSS classes                                               |
| `animation`        | `PressableFeedbackHighlightRootAnimation \| PressableFeedbackRippleRootAnimation` | -             | Animation configuration                                              |
| `...AnimatedProps` | `AnimatedProps<PressableProps>`                                                   | -             | All Reanimated Animated Pressable props are supported                |

#### PressableFeedbackHighlightRootAnimation

Animation configuration for PressableFeedback component with highlight variant. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                                              | type                                     | default                                              | description                                                                |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `state`                                           | `'disabled' \| 'disable-all' \| boolean` | -                                                    | Disable animations while customizing properties                            |
| `scale`<br />`.value`                             | `number`                                 | `0.985`                                              | Scale value when pressed (automatically adjusted based on container width) |
| `scale`<br />`.timingConfig`                      | `WithTimingConfig`                       | `{ duration: 300, easing: Easing.out(Easing.ease) }` | Animation timing configuration                                             |
| `scale`<br />`.ignoreScaleCoefficient`            | `boolean`                                | `false`                                              | Ignore automatic scale coefficient and use the scale value directly        |
| `highlight`<br />`.opacity`<br />`.value`         | `[number, number]`                       | `[0, 0.1]`                                           | Opacity values \[unpressed, pressed]                                       |
| `highlight`<br />`.opacity`<br />`.timingConfig`  | `WithTimingConfig`                       | `{ duration: 200 }`                                  | Animation timing configuration                                             |
| `highlight`<br />`.backgroundColor`<br />`.value` | `string`                                 | Computed based on theme                              | Background color of highlight overlay                                      |

#### PressableFeedbackRippleRootAnimation

Animation configuration for PressableFeedback component with ripple variant. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop                                                        | type                                     | default                                              | description                                                                  |
| ----------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| `state`                                                     | `'disabled' \| 'disable-all' \| boolean` | -                                                    | Disable animations while customizing properties                              |
| `scale`<br />`.value`                                       | `number`                                 | `0.985`                                              | Scale value when pressed (automatically adjusted based on container width)   |
| `scale`<br />`.timingConfig`                                | `WithTimingConfig`                       | `{ duration: 300, easing: Easing.out(Easing.ease) }` | Animation timing configuration                                               |
| `scale`<br />`.ignoreScaleCoefficient`                      | `boolean`                                | `false`                                              | Ignore automatic scale coefficient and use the scale value directly          |
| `ripple`<br />`.backgroundColor`<br />`.value`              | `string`                                 | Computed based on theme                              | Background color of ripple effect                                            |
| `ripple`<br />`.progress`<br />`.baseDuration`              | `number`                                 | `1000`                                               | Base duration for ripple progress (automatically adjusted based on diagonal) |
| `ripple`<br />`.progress`<br />`.minBaseDuration`           | `number`                                 | -                                                    | Minimum base duration for the ripple progress animation                      |
| `ripple`<br />`.progress`<br />`.ignoreDurationCoefficient` | `boolean`                                | `false`                                              | Ignore automatic duration coefficient and use base duration directly         |
| `ripple`<br />`.opacity`<br />`.value`                      | `[number, number, number]`               | `[0, 0.1, 0]`                                        | Opacity values \[start, peak, end] for ripple animation                      |
| `ripple`<br />`.opacity`<br />`.timingConfig`               | `WithTimingConfig`                       | `{ duration: 30 }`                                   | Animation timing configuration                                               |
| `ripple`<br />`.scale`<br />`.value`                        | `[number, number, number]`               | `[0, 1, 1]`                                          | Scale values \[start, peak, end] for ripple animation                        |
| `ripple`<br />`.scale`<br />`.timingConfig`                 | `WithTimingConfig`                       | `{ duration: 30 }`                                   | Animation timing configuration                                               |

</page>

<page url="/docs/native/components/scroll-shadow">
# ScrollShadow

**Category**: native
**URL**: https://v3.heroui.com/docs/native/components/scroll-shadow
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/components/(utilities)/scroll-shadow.mdx
> Adds dynamic gradient shadows to scrollable content based on scroll position and overflow.




## Import

```tsx
import { ScrollShadow } from 'heroui-native';

```

## Anatomy

```tsx
<ScrollShadow LinearGradientComponent={LinearGradient}>
  <ScrollView>...</ScrollView>
</ScrollShadow>

```

* **ScrollShadow**: Main container that wraps scrollable components and adds dynamic gradient shadows at the edges based on scroll position and content overflow. Automatically detects scroll orientation (horizontal/vertical) and manages shadow visibility.
* **LinearGradientComponent**: Required prop that accepts a LinearGradient component from compatible libraries (expo-linear-gradient, react-native-linear-gradient, etc.) to render the gradient shadows.

## Usage

### Basic Usage

Wrap any scrollable component to automatically add edge shadows.

```tsx
<ScrollShadow LinearGradientComponent={LinearGradient}>
  <ScrollView>...</ScrollView>
</ScrollShadow>

```

### Horizontal Scrolling

The component auto-detects horizontal scrolling from the child's `horizontal` prop.

```tsx
<ScrollShadow LinearGradientComponent={LinearGradient}>
  <FlatList horizontal data={data} renderItem={...} />
</ScrollShadow>

```

### Custom Shadow Size

Control the gradient shadow height/width with the `size` prop.

```tsx
<ScrollShadow size={100} LinearGradientComponent={LinearGradient}>
  <ScrollView>...</ScrollView>
</ScrollShadow>

```

### Visibility Control

Specify which shadows to display using the `visibility` prop.

```tsx
<ScrollShadow visibility="top" LinearGradientComponent={LinearGradient}>
  <ScrollView>...</ScrollView>
</ScrollShadow>

<ScrollShadow visibility="bottom" LinearGradientComponent={LinearGradient}>
  <ScrollView>...</ScrollView>
</ScrollShadow>

<ScrollShadow visibility="none" LinearGradientComponent={LinearGradient}>
  <ScrollView>...</ScrollView>
</ScrollShadow>

```

### Custom Shadow Color

Override the default shadow color which uses the theme's background.

```tsx
<ScrollShadow color="#ffffff" LinearGradientComponent={LinearGradient}>
  <ScrollView>...</ScrollView>
</ScrollShadow>

```

### With Custom Scroll Handler

**Important:** ScrollShadow internally converts the child to a Reanimated animated component. If you need to use the `onScroll` prop, you must use `useAnimatedScrollHandler` from react-native-reanimated.

```tsx
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    console.log(event.contentOffset.y);
  },
});

<ScrollShadow LinearGradientComponent={LinearGradient}>
  <Animated.ScrollView onScroll={scrollHandler}>...</Animated.ScrollView>
</ScrollShadow>;

```

## Example

```tsx
import { ScrollShadow, Surface } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, ScrollView, Text, View } from 'react-native';

export default function ScrollShadowExample() {
  const horizontalData = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Card ${i + 1}`,
  }));

  return (
    <View className="flex-1 bg-background">
      <Text className="px-5 py-3 text-lg font-semibold">Horizontal List</Text>
      <ScrollShadow LinearGradientComponent={LinearGradient}>
        <FlatList
          data={horizontalData}
          horizontal
          renderItem={({ item }) => (
            <Surface variant="2" className="w-32 h-24 justify-center px-4">
              <Text>{item.title}</Text>
            </Surface>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="p-5 gap-4"
        />
      </ScrollShadow>

      <Text className="px-5 py-3 text-lg font-semibold">Vertical Content</Text>
      <ScrollShadow
        size={80}
        className="h-48"
        LinearGradientComponent={LinearGradient}
      >
        <ScrollView
          contentContainerClassName="p-5"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-4 text-2xl font-bold">Long Content</Text>
          <Text className="mb-4 text-base leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text className="mb-4 text-base leading-6">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae.
          </Text>
        </ScrollView>
      </ScrollShadow>
    </View>
  );
}

```

## API Reference

### ScrollShadow

| prop                      | type                                                                   | default      | description                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `children`                | `React.ReactElement`                                                   | -            | The scrollable component to enhance with shadows. Must be a single React element (ScrollView, FlatList, etc.)   |
| `LinearGradientComponent` | `ComponentType<`<br />`LinearGradientProps>`                           | **required** | LinearGradient component from any compatible library (expo-linear-gradient, react-native-linear-gradient, etc.) |
| `size`                    | `number`                                                               | `50`         | Size (height/width) of the gradient shadow in pixels                                                            |
| `orientation`             | `'horizontal' \| 'vertical'`                                           | auto-detect  | Orientation of the scroll shadow. If not provided, will auto-detect from child's `horizontal` prop              |
| `visibility`              | `'auto' \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'both' \| 'none'` | `'auto'`     | Visibility mode for the shadows. 'auto' shows shadows based on scroll position and content overflow             |
| `color`                   | `string`                                                               | theme color  | Custom color for the gradient shadow. If not provided, uses the theme's background color                        |
| `isEnabled`               | `boolean`                                                              | `true`       | Whether the shadow effect is enabled                                                                            |
| `animation`               | `ScrollShadowRootAnimation`                                            | -            | Animation configuration                                                                                         |
| `className`               | `string`                                                               | -            | Additional CSS classes to apply to the container                                                                |
| `...ViewProps`            | `ViewProps`                                                            | -            | All standard React Native View props are supported                                                              |

#### ScrollShadowRootAnimation

Animation configuration for ScrollShadow component. Can be:

* `false` or `"disabled"`: Disable only root animations
* `"disable-all"`: Disable all animations including children
* `true` or `undefined`: Use default animations
* `object`: Custom animation configuration

| prop            | type                                     | default  | description                                                                          |
| --------------- | ---------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `state`         | `'disabled' \| 'disable-all' \| boolean` | -        | Disable animations while customizing properties                                      |
| `opacity.value` | `[number, number]`                       | `[0, 1]` | `Opacity values [initial, active].`<br />`For bottom/right shadow, this is reversed` |

### LinearGradientProps

The `LinearGradientComponent` prop expects a component that accepts these props:

| prop        | type                              | description                                                        |
| ----------- | --------------------------------- | ------------------------------------------------------------------ |
| `colors`    | `any`                             | Array of colors for the gradient                                   |
| `locations` | `any` (optional)                  | Array of numbers defining the location of each gradient color stop |
| `start`     | `any` (optional)                  | Start point of the gradient (e.g., `{ x: 0, y: 0 }`)               |
| `end`       | `any` (optional)                  | End point of the gradient (e.g., `{ x: 1, y: 0 }`)                 |
| `style`     | `StyleProp<ViewStyle>` (optional) | Style to apply to the gradient view                                |

## Special Notes

**Important:** ScrollShadow internally converts the child to a Reanimated animated component. If you need to use the `onScroll` prop on your scrollable component, you must use `useAnimatedScrollHandler` from react-native-reanimated instead of the standard `onScroll` prop.

</page>

<page url="/docs/native/getting-started/animation">
# Animation

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/animation
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(handbook)/animation.mdx
> Add smooth animations and transitions to HeroUI Native components


All animations in HeroUI Native are built with [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) and gesture control is handled by [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/). It's worth familiarizing yourself with these libraries if you want more control over animations.

## The `animation` Prop

Every animated component in HeroUI Native exposes a single `animation` prop that controls all animations for that component. This prop allows you to modify animation values, timing configurations, layout animations, or completely disable animations.

**Approach**: If you're working with animations, first look for the `animation` prop on the component you're using.

## Modifying Animations

You can customize animations by passing an object to the `animation` prop. Each component exposes different animation properties that you can modify. The approach is simple: if you want to slightly change the animation behavior of already written animations in components, we provide all necessary values for modification. If you want to write your own animations without relying on our written ones, you must create your own custom components with animations.

### Example 1: Simple Value Modification

Modify animation values like scale, opacity, or colors:

```tsx
import {Switch} from 'heroui-native';

<Switch
  animation={{
    scale: {
      value: [1, 0.9], // [unpressed, pressed]
    },
    backgroundColor: {
      value: ['#172554', '#eab308'], // [unselected, selected]
    },
  }}>
  <Switch.Thumb />
</Switch>;

```

### Example 2: Timing Configuration

Customize animation timing and easing:

```tsx
import {Accordion} from 'heroui-native';

<Accordion>
  <Accordion.Item value="1">
    <Accordion.Trigger>
      <Accordion.Indicator
        animation={{
          rotation: {
            value: [0, -180],
            springConfig: {
              damping: 60,
              stiffness: 900,
              mass: 3,
            },
          },
        }}
      />
    </Accordion.Trigger>
  </Accordion.Item>
</Accordion>;

```

### Example 3: Layout Animations (Entering/Exiting)

Customize entering and exiting animations using Reanimated's layout animations:

```tsx
import {Accordion} from 'heroui-native';
import {FadeInRight, FadeInLeft, ZoomIn} from 'react-native-reanimated';
import {Easing} from 'react-native-reanimated';

<Accordion>
  <Accordion.Item value="1">
    <Accordion.Content
      animation={{
        entering: {
          value: FadeInRight.delay(50).easing(Easing.inOut(Easing.ease)),
        },
      }}>
      Content here
    </Accordion.Content>
  </Accordion.Item>
</Accordion>;

```

### Example 4: State Prop for Granular Control

The `state` prop allows you to disable animations while still customizing animation properties. This is useful when you want to fine-tune component behavior without enabling animations:

```tsx
import {Switch} from 'heroui-native';

<Switch
  animation={{
    state: 'disabled', // Disable animations but allow property customization
    scale: {
      value: 0.95, // This value is still respected even though animations are disabled
    },
    backgroundColor: {
      value: ['#172554', '#eab308'],
    },
  }}>
  <Switch.Thumb />
</Switch>

```

The `state` prop accepts:

* `'disabled'`: Disable animations while allowing property customization
* `'disable-all'`: Disable all animations including children (only available at root level)
* `boolean`: Simple enable/disable control (`true` enables, `false` disables)

This provides more granular control over animation behavior, allowing you to customize properties without enabling animations.

## Disabling Animations

You can disable animations at different levels using the `animation` prop.

### Disable Options

* `animation={false}` or `animation="disabled"`: Disable animations for the specific component only
* `animation="disable-all"`: Disable all animations including children (only available at root level)
* `animation={true}` or `animation={undefined}`: Use default animations

### Component-Level Disabling

Disable animations for a specific component:

```tsx
<Switch>
  <Switch.Thumb animation={false} />
</Switch>

```

### Root-Level Disabling (`disable-all`)

The `"disable-all"` option is only available at the root level of compound components. When used, it disables all animations including children, even if those children are not part of the compound component structure:

```tsx
// Disables all animations including Button components inside Card
<Card animation="disable-all">
  <Card.Body>
    <Card.Title>$450</Card.Title>
    <Card.Description>Living room Sofa</Card.Description>
  </Card.Body>
  <Card.Footer className="gap-3">
    <Button variant="primary">Buy now</Button>
    <Button variant="ghost">Add to cart</Button>
  </Card.Footer>
</Card>

```

**Important**: `"disable-all"` cascades down to all child components, including standalone components like `Button`, `Spinner`, etc., not just compound component parts.

## Global Animation Configuration

You can disable all HeroUI Native animations globally using the `HeroUINativeProvider`:

```tsx
import {HeroUINativeProvider} from 'heroui-native';

<HeroUINativeProvider
  config={{
    animation: 'disable-all',
  }}>
  <App />
</HeroUINativeProvider>;

```

This will disable all animations across your entire application, regardless of individual component `animation` prop settings.

## Accessibility

Reduce motion is handled automatically under the hood. When a user enables "Reduce Motion" in their device accessibility settings, all animations are automatically disabled globally. This is handled by the `GlobalAnimationSettingsProvider` which checks `useReducedMotion()` from react-native-reanimated.

You don't need to do anything - the library respects the user's accessibility preferences automatically.

## Animation State Management

We keep disabled state of animations under control internally to ensure they look nice without unpredictable lags or jumps. When animations are disabled, components immediately jump to their final state rather than animating, preventing visual glitches or intermediate states.

## Children Render Function

Many components support a render function pattern for children, which is particularly handy when working with state like `isSelected`:

```tsx
import {Switch} from 'heroui-native';

<Switch
  isSelected={isSelected}
  onSelectedChange={setIsSelected}>
  {({isSelected, isDisabled}) => (
    <Switch.Thumb>{isSelected ? <CheckIcon /> : <XIcon />}</Switch.Thumb>
  )}
</Switch>;

```

This pattern allows you to conditionally render content based on component state, making it easy to create dynamic UIs that respond to selection, disabled states, and other component properties.

## Next Steps

* Learn about [Styling](/docs/native/getting-started/styling) approaches
* View [Theming](/docs/native/getting-started/theming) documentation
* Explore [Colors](/docs/native/getting-started/colors) documentation

</page>

<page url="/docs/native/getting-started/colors">
# Colors

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/colors
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(handbook)/colors.mdx
> Color palette and theming system for HeroUI Native


import {ColorSwatch, ColorPalette} from "@/components/color-swatch";

HeroUI Native uses CSS variables for colors that automatically switch between light and dark themes. All colors use the `oklch` color space for better color transitions.

## How It Works

HeroUI Native's color system is built on top of [Tailwind CSS v4](https://tailwindcss.com/docs/theme)'s theme via [Uniwind](https://uniwind.dev/). When you import `heroui-native/styles`, it uses Tailwind's built-in color palettes and maps them to semantic variables.

**Naming pattern:**

* Colors without a suffix are backgrounds (e.g., `--accent`)
* Colors with `-foreground` are for text on that background (e.g., `--accent-foreground`)

**Usage:**

```tsx
import { View, Text } from 'react-native';

// This gives you the right background and text colors
<View className="bg-background flex-1">
  <View className="bg-accent p-4 rounded-lg">
    <Text className="text-accent-foreground">Hello</Text>
  </View>
</View>

```

### Base Colors

These four colors stay the same in all themes:

<div className="flex flex-wrap gap-4 sm:gap-6">
  <ColorSwatch name="White" variable="--white" />

  <ColorSwatch name="Black" variable="--black" />

  <ColorSwatch name="Snow" variable="--snow" />

  <ColorSwatch name="Eclipse" variable="--eclipse" />
</div>

### Background & Surface

<ColorPalette
  colors={[
  { name: "Background", variable: "--background", foreground: "--foreground" },
  { name: "Foreground", variable: "--foreground" },
  { name: "Surface", variable: "--surface", foreground: "--surface-foreground" },
  { name: "Surface Foreground", variable: "--surface-foreground" },
  { name: "Overlay", variable: "--overlay", foreground: "--overlay-foreground" },
  { name: "Overlay Foreground", variable: "--overlay-foreground" },
]}
/>

### Primary Colors

**Accent** — Your main brand color (used for primary actions)
**Accent Soft** — A lighter version for secondary actions

<ColorPalette
  colors={[
  { name: "Accent", variable: "--accent", foreground: "--accent-foreground" },
  { name: "Accent Foreground", variable: "--accent-foreground" },
  { name: "Accent Soft", variable: "--accent-soft", foreground: "--accent-soft-foreground" },
  { name: "Accent Soft Foreground", variable: "--accent-soft-foreground" },
]}
/>

### Status Colors

For alerts, validation, and status messages:

<ColorPalette
  colors={[
  { name: "Success", variable: "--success", foreground: "--success-foreground" },
  { name: "Success Foreground", variable: "--success-foreground" },
  { name: "Warning", variable: "--warning", foreground: "--warning-foreground" },
  { name: "Warning Foreground", variable: "--warning-foreground" },
  { name: "Danger", variable: "--danger", foreground: "--danger-foreground" },
  { name: "Danger Foreground", variable: "--danger-foreground" },
]}
/>

### Form Field Colors

For consistent form field styling across input components:

<ColorPalette
  colors={[
  { name: "Field Background", variable: "--field-background", foreground: "--field-foreground" },
  { name: "Field Foreground", variable: "--field-foreground" },
  { name: "Field Placeholder", variable: "--field-placeholder" },
  { name: "Field Border", variable: "--field-border" },
]}
/>

### Other Colors

<ColorPalette
  colors={[
  { name: "Default", variable: "--default", foreground: "--default-foreground" },
  { name: "Default Foreground", variable: "--default-foreground" },
  { name: "Muted", variable: "--muted", foreground: "--foreground" },
  { name: "Border", variable: "--border" },
  { name: "Focus", variable: "--focus" },
  { name: "Link", variable: "--link" },
]}
/>

## How to Use Colors

**In your components:**

```tsx
import { View, Text } from 'react-native';
import { Button } from 'heroui-native';

<View className="bg-background flex-1 p-4">
  <Text className="text-foreground mb-4">Content</Text>
  <Button variant="primary" className="bg-accent">
    <Button.Label className="text-accent-foreground">Click me</Button.Label>
  </Button>
</View>

```

**In CSS files:**

```css title="global.css"
/* Direct CSS variables */
.container {
  flex: 1;
  background-color: var(--accent);
  width: 50px;
  height: 50px;
  border-radius: var(--radius);
}

```

## Default Theme

The complete theme definition can be found in ([variables.css](https://github.com/heroui-inc/heroui-native/blob/beta/src/styles/variables.css)). This theme automatically switches between light and dark modes through [Uniwind's theming system](https://docs.uniwind.dev/theming/basics), which supports system preferences and programmatic theme switching.

```css
  @theme {
    /* Primitive Colors (Do not change between light and dark) */
    --white: oklch(100% 0 0);
    --black: oklch(0% 0 0);
    --snow: oklch(0.9911 0 0);
    --eclipse: oklch(0.2103 0.0059 285.89);

    /* Base radius */
    --radius: 0.5rem;

    /* Opacity */
    --opacity-disabled: 0.5;
}

@layer theme {
    :root {
      @variant light {
        /* Base Colors */
        --background: oklch(0.9702 0 0);
        --foreground: var(--eclipse);

        /* Surface: Used for non-overlay components (cards, accordions, disclosure groups) */
        --surface: var(--white);
        --surface-foreground: var(--foreground);

        /* Overlay: Used for floating/overlay components (dialogs, popovers, modals, menus) */
        --overlay: var(--white);
        --overlay-foreground: var(--foreground);

        --muted: oklch(55.2% 0.016 285.938);

        --default: oklch(94% 0.001 286.375);
        --default-foreground: var(--eclipse);

        --accent: oklch(0.6204 0.195 253.83);
        --accent-foreground: var(--snow);

        /* Form Field Defaults - Colors */
        --field-background: var(--white);
        --field-foreground: oklch(0.2103 0.0059 285.89);
        --field-placeholder: var(--muted);
        --field-border: transparent; /* no border by default on form fields */

        /* Status Colors */
        --success: oklch(0.7329 0.1935 150.81);
        --success-foreground: var(--eclipse);

        --warning: oklch(0.7819 0.1585 72.33);
        --warning-foreground: var(--eclipse);

        --danger: oklch(0.6532 0.2328 25.74);
        --danger-foreground: var(--snow);

        /* Component Colors */
        --segment: var(--white);
        --segment-foreground: var(--eclipse);

        /* Misc Colors */
        --border: oklch(0 0 0 / 0%);
        --divider: oklch(72% 0.004 286.32);
        --link: var(--foreground);
      }

      @variant dark {
        /* Base Colors */
        --background: var(--black);
        --foreground: var(--snow);

        /* Surface: Used for non-overlay components (cards, accordions, disclosure groups) */
        --surface: oklch(0.2103 0.0059 285.89);
        --surface-foreground: var(--foreground);

        /* Overlay: Used for floating/overlay components (dialogs, popovers, modals, menus) - lighter for contrast */
        --overlay: oklch(
          0.2563 0.0058 271.19
        ); /* Lighter than surface for visibility in dark mode */
        --overlay-foreground: var(--foreground);

        --muted: oklch(70.5% 0.015 286.067);

        --default: oklch(27.4% 0.006 286.033);
        --default-foreground: var(--snow);

        --accent: oklch(0.6204 0.195 253.83);
        --accent-foreground: var(--snow);

        /* Form Field Defaults - Colors (only the ones that are different from light theme) */
        --field-background: var(--default);
        --field-foreground: var(--foreground);
        --field-placeholder: var(--muted);
        --field-border: transparent; /* no border by default on form fields */

        /* Status Colors */
        --success: oklch(0.7329 0.1935 150.81);
        --success-foreground: var(--eclipse);

        --warning: oklch(0.8203 0.1388 76.34);
        --warning-foreground: var(--eclipse);

        --danger: oklch(0.594 0.1967 24.63);
        --danger-foreground: var(--snow);

        /* Component Colors */
        --segment: oklch(0.3964 0.01 285.93);
        --segment-foreground: var(--foreground);

        /* Misc Colors */
        --border: oklch(1 0 0 / 0%);
        --divider: oklch(38% 0.006 286.033);
        --link: var(--foreground);
      }
    }
  }

```

## Customizing Colors

**Override existing colors:**

```css
@layer theme {
  @variant light {
    /* Override default colors */
    --accent: oklch(0.65 0.25 270); /* Custom indigo accent */
    --success: oklch(0.65 0.15 155);
  }

  @variant dark {
    /* Override dark theme colors */
    --accent: oklch(0.65 0.25 270);
    --success: oklch(0.75 0.12 155);
  }
}

```

**Tip:** Convert colors at [oklch.com](https://oklch.com)

**Add your own colors:**

```css
@layer theme {
  @variant light {
    --info: oklch(0.6 0.15 210);
    --info-foreground: oklch(0.98 0 0);
  }

  @variant dark {
    --info: oklch(0.7 0.12 210);
    --info-foreground: oklch(0.15 0 0);
  }
}

@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}

```

Now you can use it:

```tsx
import { View, Text } from 'react-native';

<View className="bg-info p-4 rounded-lg">
  <Text className="text-info-foreground">Info message</Text>
</View>

```

> **Note**: To learn more about theme variables and how they work in Tailwind CSS v4, see the [Tailwind CSS Theme documentation](https://tailwindcss.com/docs/theme).

## use-theme-color Hook

The `use-theme-color` hook has been enhanced to support multiple colors selection, making it more flexible for complex theming scenarios.

**Multiple Colors Selection:**

You can now select multiple colors at once, which is useful when you need to work with related color values together:

```tsx
import { useThemeColor } from 'heroui-native';

// Select multiple colors at once
const { accent, accentForeground, success, danger } = useThemeColor([
  'accent',
  'accentForeground',
  'success',
  'danger',
]);

// Use the selected colors
<View style={{ backgroundColor: accent }}>
  <Text style={{ color: accentForeground }}>Accent Text</Text>
</View>

```

This enhancement improves performance when working with multiple color values and makes it easier to manage complex theming scenarios where multiple colors need to be selected and applied together.

## Quick Tips

* Always use color variables, not hard-coded values
* Use foreground/background pairs for good contrast
* Test in both light and dark modes
* The system respects user's theme preference automatically

## Related

* [Theming](/docs/native/getting-started/theming) - Learn about the theming system
* [Styling](/docs/native/getting-started/styling) - Styling components with CSS
* [Design Principles](/docs/native/getting-started/design-principles) - Understanding HeroUI's design philosophy

</page>

<page url="/docs/native/getting-started/composition">
# Composition

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/composition
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(handbook)/composition.mdx
> Build flexible UI with component composition patterns


HeroUI Native uses composition patterns to create flexible, customizable components. Change the rendered element, compose components together, and maintain full control over markup.

## Compound Components

HeroUI Native components use a compound component pattern with dot notation—components export sub-components as properties (e.g., `Button.Label`, `Dialog.Trigger`, `Accordion.Item`) that work together to form complete UI elements.

```tsx
import { Button, Dialog } from 'heroui-native';

function DialogExample() {
  return (
    <Dialog>
      <Dialog.Trigger>
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close />
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog description</Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

```

## The asChild Prop

The `asChild` prop lets you change what element a component renders. When `asChild` is true, HeroUI Native clones the child element and merges props instead of rendering its default element.

```tsx
import { Button, Dialog } from 'heroui-native';

function DialogExample() {
  return (
    <Dialog>
      {/* With asChild: Button becomes the trigger directly, no wrapper element */}
      <Dialog.Trigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          {/* Dialog.Close can also use asChild */}
          <Dialog.Close asChild>
            <Button variant="ghost" size="sm">Cancel</Button>
          </Dialog.Close>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog description</Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

```

## Custom Components

Create your own components by composing HeroUI Native primitives:

```tsx
import { Button, Card, Popover } from 'heroui-native';
import { View } from 'react-native';

// Product card component
function ProductCard({ title, description, price, onBuy, ...props }) {
  return (
    <Card {...props}>
      <Card.Body>
        <Card.Title>{price}</Card.Title>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onPress={onBuy}>
          <Button.Label>Buy now</Button.Label>
        </Button>
      </Card.Footer>
    </Card>
  );
}

// Popover button component
function PopoverButton({ children, popoverContent, ...props }) {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button {...props}>
          <Button.Label>{children}</Button.Label>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content>
          <Popover.Close />
          {popoverContent}
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}

// Usage
<ProductCard
  title="Living room Sofa"
  description="Perfect for modern spaces"
  price="$450"
  onBuy={() => console.log('Buy')}
/>

<PopoverButton variant="tertiary" popoverContent={
  <View>
    <Popover.Title>Information</Popover.Title>
    <Popover.Description>Additional details here</Popover.Description>
  </View>
}>
  Show Info
</PopoverButton>

```

## Custom Variants

Create custom variants using `tailwind-variants` to extend component styling:

```tsx
import { Button } from 'heroui-native';
import type { ButtonRootProps } from 'heroui-native';
import { tv, type VariantProps } from 'tailwind-variants';

const customButtonVariants = tv({
  base: 'font-semibold rounded-lg',
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200',
      danger: 'bg-red-500 text-white',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

type CustomButtonVariants = VariantProps<typeof customButtonVariants>;

interface CustomButtonProps
  extends Omit<ButtonRootProps, 'className' | 'variant'>,
    CustomButtonVariants {
  className?: string;
}

export function CustomButton({
  intent,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={customButtonVariants({ intent, className })}
      {...props}
    >
      <Button.Label>{children}</Button.Label>
    </Button>
  );
}

```

## Next Steps

* Learn about [Styling](/docs/native/getting-started/styling) system
* Explore [Theming](/docs/native/getting-started/theming) documentation
* Explore [Animation](/docs/native/getting-started/animation) options

</page>

<page url="/docs/native/getting-started/provider">
# Provider

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/provider
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(handbook)/provider.mdx
> Configure HeroUI Native provider with text, animation, and toast settings


The `HeroUINativeProvider` is the root provider component that configures and initializes HeroUI Native in your React Native application. It provides global configuration and portal management for your application.

## Overview

The provider serves as the main entry point for HeroUI Native, wrapping your application with essential contexts and configurations:

* **Safe Area Insets**: Automatically handles safe area insets updates via `SafeAreaListener` and syncs them with Uniwind for use in Tailwind classes (e.g., `pb-safe-offset-3`)
* **Text Configuration**: Global text component settings for consistency across all HeroUI components
* **Animation Configuration**: Global animation control to disable all animations across the application
* **Toast Configuration**: Global toast system configuration including insets, default props, and wrapper components
* **Portal Management**: Handles overlays, modals, and other components that render on top of the app hierarchy

## Basic Setup

Wrap your application root with the provider:

```tsx
import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>{/* Your app content */}</HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}

```

## Configuration Options

The provider accepts a `config` prop with the following options:

### Text Component Configuration

Global settings for all Text components within HeroUI Native. These props are carefully selected to include only those that make sense to configure globally across all Text components in the application:

```tsx
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';

const config: HeroUINativeConfig = {
  textProps: {
    // Disable font scaling for accessibility
    allowFontScaling: false,

    // Auto-adjust font size to fit container
    adjustsFontSizeToFit: false,

    // Maximum font size multiplier when scaling
    maxFontSizeMultiplier: 1.5,

    // Minimum font scale (iOS only, 0.01-1.0)
    minimumFontScale: 0.5,
  },
};

export default function App() {
  return (
    <HeroUINativeProvider config={config}>
      {/* Your app content */}
    </HeroUINativeProvider>
  );
}

```

### Animation Configuration

Global animation configuration for the entire application:

```tsx
const config: HeroUINativeConfig = {
  // Disable all animations across the application (cascades to all children)
  animation: 'disable-all',
};

```

<Callout type="warning">
  **Note**: When set to `'disable-all'`, all animations across the application will be disabled. This is useful for accessibility or performance optimization.
</Callout>

### Toast Configuration

Configure the global toast system including insets, default props, and wrapper components:

```tsx
import { KeyboardAvoidingView } from 'react-native';

const config: HeroUINativeConfig = {
  toast: {
    // Global toast configuration (used as defaults for all toasts)
    defaultProps: {
      variant: 'default',
      placement: 'top',
      isSwipeable: true,
      animation: true,
    },
    // Insets for spacing from screen edges (added to safe area insets)
    insets: {
      top: 0,      // Default: iOS = 0, Android = 12
      bottom: 6,   // Default: iOS = 6, Android = 12
      left: 12,    // Default: 12
      right: 12,   // Default: 12
    },
    // Maximum number of visible toasts before opacity starts fading
    maxVisibleToasts: 3,
    // Custom wrapper function to wrap the toast content
    contentWrapper: (children) => (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={24}
        className="flex-1"
      >
        {children}
      </KeyboardAvoidingView>
    ),
  },
};

```

## Complete Example

Here's a comprehensive example showing all configuration options:

```tsx
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const config: HeroUINativeConfig = {
  // Global text configuration
  textProps: {
    minimumFontScale: 0.5,
    maxFontSizeMultiplier: 1.5,
    allowFontScaling: true,
    adjustsFontSizeToFit: false,
  },
  // Global animation configuration
  animation: 'disable-all', // Optional: disable all animations
  // Global toast configuration
  toast: {
    defaultProps: {
      variant: 'default',
      placement: 'top',
    },
    insets: {
      top: 0,
      bottom: 6,
      left: 12,
      right: 12,
    },
    maxVisibleToasts: 3,
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={config}>
        <YourApp />
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}

```

## Integration with Expo Router

When using Expo Router, wrap your root layout:

```tsx
// app/_layout.tsx
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';
import { Stack } from 'expo-router';

const config: HeroUINativeConfig = {
  textProps: {
    minimumFontScale: 0.5,
    maxFontSizeMultiplier: 1.5,
  },
};

export default function RootLayout() {
  return (
    <HeroUINativeProvider config={config}>
      <Stack />
    </HeroUINativeProvider>
  );
}

```

## Architecture

### Provider Hierarchy

The `HeroUINativeProvider` internally composes multiple providers:

```

HeroUINativeProvider
├── SafeAreaListener (handles safe area insets updates)
│   └── GlobalAnimationSettingsProvider (animation configuration)
│       └── TextComponentProvider (text configuration)
│           └── ToastProvider (toast configuration)
│               └── Your App
│               └── PortalHost (for overlays)

```

### Safe Area Insets Handling

The provider automatically wraps your application with [`SafeAreaListener`](https://appandflow.github.io/react-native-safe-area-context/api/safe-area-listener) from `react-native-safe-area-context`. This component listens to safe area insets and frame changes without triggering re-renders, and automatically updates Uniwind with the latest insets via the `onChange` callback.

## Best Practices

### 1. Single Provider Instance

Always use a single `HeroUINativeProvider` at the root of your app. Don't nest multiple providers:

```tsx
// ❌ Bad
<HeroUINativeProvider>
  <SomeComponent>
    <HeroUINativeProvider> {/* Don't do this */}
      <AnotherComponent />
    </HeroUINativeProvider>
  </SomeComponent>
</HeroUINativeProvider>

// ✅ Good
<HeroUINativeProvider>
  <SomeComponent>
    <AnotherComponent />
  </SomeComponent>
</HeroUINativeProvider>

```

### 2. Configuration Object

Define your configuration outside the component to prevent recreating on each render:

```tsx
// ❌ Bad
function App() {
  return (
    <HeroUINativeProvider
      config={{
        textProps: {
          /* inline config */
        },
      }}
    >
      {/* ... */}
    </HeroUINativeProvider>
  );
}

// ✅ Good
const config: HeroUINativeConfig = {
  textProps: {
    maxFontSizeMultiplier: 1.5,
  },
};

function App() {
  return (
    <HeroUINativeProvider config={config}>{/* ... */}</HeroUINativeProvider>
  );
}

```

### 3. Text Configuration

Consider accessibility when configuring text props:

```tsx
const config: HeroUINativeConfig = {
  textProps: {
    // Allow font scaling for accessibility
    allowFontScaling: true,
    // But limit maximum scale
    maxFontSizeMultiplier: 1.5,
  },
};

```

## TypeScript Support

The provider is fully typed. Import types for better IDE support:

```tsx
import { HeroUINativeProvider, type HeroUINativeConfig } from 'heroui-native';

const config: HeroUINativeConfig = {
  // Full type safety and autocomplete
  textProps: {
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.5,
  },
  animation: 'disable-all', // Optional: disable all animations
  toast: {
    defaultProps: {
      variant: 'default',
      placement: 'top',
    },
    insets: {
      top: 0,
      bottom: 6,
      left: 12,
      right: 12,
    },
  },
};

```

## Related

* [Quick Start](/docs/native/getting-started/quick-start) - Basic setup guide
* [Theming](/docs/native/getting-started/theming) - Customize colors and themes
* [Styling](/docs/native/getting-started/styling) - Style components with Tailwind

</page>

<page url="/docs/native/getting-started/styling">
# Styling

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/styling
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(handbook)/styling.mdx
> Style HeroUI Native components with Tailwind or StyleSheet API


HeroUI Native components provide flexible styling options: Tailwind CSS utilities, StyleSheet API, and render props for dynamic styling.

## Styling Principles

HeroUI Native is built with `className` as the go-to styling solution. You can use Tailwind CSS classes via the `className` prop on all components.

**StyleSheet precedence:** The `style` prop (StyleSheet API) can be used and has precedence over `className` when both are provided. This allows you to override Tailwind classes when needed.

**Animated styles:** Some style properties are animated using `react-native-reanimated` and, like StyleSheet styles, they have precedence over `className`. To identify which styles are animated and cannot be used via `className`:

* **Hover over `className` in your IDE** - The TypeScript definitions will show which properties are available
* **Check component documentation** - Each component page includes a link to the component's style source at the top, which contains notes about animated properties

**Customizing animated styles:** If styles are occupied by animation, you can modify them via the `animation` prop on components that support it.

## Basic Styling

**Using className:** All HeroUI Native components accept `className` props:

```tsx
import { Button } from 'heroui-native';

<Button className="bg-accent px-6 py-3 rounded-lg">
  <Button.Label>Custom Button</Button.Label>
</Button>

```

**Using style:** Components also accept inline styles via the `style` prop:

```tsx
import { Button } from 'heroui-native';

<Button style={{ backgroundColor: '#8B5CF6', paddingHorizontal: 24 }}>
  <Button.Label>Styled Button</Button.Label>
</Button>

```

## Render Props

Use a render function to access component state and customize content dynamically:

```tsx
import { RadioGroup, cn } from 'heroui-native';

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="option1">
    {({ isSelected, isInvalid, isDisabled }) => (
      <>
        <RadioGroup.Label
          className={cn(
            "text-foreground",
            isSelected && "text-accent font-semibold"
          )}
        >
          Option 1
        </RadioGroup.Label>
        <RadioGroup.Indicator
          className={cn(
            "border-2 rounded-full",
            isSelected && "border-accent bg-accent"
          )}
        >
          {isSelected && <CustomIcon />}
        </RadioGroup.Indicator>
      </>
    )}
  </RadioGroup.Item>
</RadioGroup>

```

## Creating Wrapper Components

Create reusable custom components using [tailwind-variants](https://tailwind-variants.org/)—a Tailwind CSS first-class variant API:

```tsx
import { Button } from 'heroui-native';
import type { ButtonRootProps } from 'heroui-native';
import { tv, type VariantProps } from 'tailwind-variants';

const customButtonVariants = tv({
  base: 'font-semibold rounded-lg',
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200',
      danger: 'bg-red-500 text-white',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

type CustomButtonVariants = VariantProps<typeof customButtonVariants>;

interface CustomButtonProps
  extends Omit<ButtonRootProps, 'className' | 'variant'>,
    CustomButtonVariants {
  className?: string;
}

export function CustomButton({
  intent,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={customButtonVariants({ intent, className })}
      {...props}
    >
      <Button.Label>{children}</Button.Label>
    </Button>
  );
}

```

## Responsive Design

HeroUI Native supports Tailwind's responsive breakpoint system via [Uniwind](https://docs.uniwind.dev/breakpoints). Use breakpoint prefixes like `sm:`, `md:`, `lg:`, and `xl:` to apply styles conditionally based on screen width.

**Mobile-first approach:** Start with mobile styles (no prefix), then use breakpoints to enhance for larger screens.

### Responsive Typography and Spacing

```tsx
import { Button } from 'heroui-native';
import { View, Text } from 'react-native';

<View className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
  <Text className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
    Responsive Heading
  </Text>
  <Button className="px-3 sm:px-4 lg:px-6">
    <Button.Label className="text-sm sm:text-base lg:text-lg">
      Responsive Button
    </Button.Label>
  </Button>
</View>

```

### Responsive Layouts

```tsx
import { View, Text } from 'react-native';

<View className="flex-row flex-wrap">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
  <View className="w-full sm:w-1/2 lg:w-1/3 p-2">
    <View className="bg-accent p-4 rounded-lg">
      <Text className="text-accent-foreground">Item 1</Text>
    </View>
  </View>
</View>

```

**Default breakpoints:**

* `sm`: 640px
* `md`: 768px
* `lg`: 1024px
* `xl`: 1280px
* `2xl`: 1536px

For custom breakpoints and more details, see the [Uniwind breakpoints documentation](https://docs.uniwind.dev/breakpoints).

## Utilities

HeroUI Native provides utility functions to assist with styling components.

### cn Utility

The `cn` utility function merges Tailwind CSS classes with proper conflict resolution. It's particularly useful when combining conditional classes or merging classes from props:

```tsx
import { cn } from 'heroui-native';
import { View } from 'react-native';

function MyComponent({ className, isActive }) {
  return (
    <View
      className={cn(
        'bg-background p-4 rounded-lg',
        'border border-divider',
        isActive && 'bg-accent',
        className
      )}
    />
  );
}

```

The `cn` utility is powered by `tailwind-variants` and includes:

* Automatic Tailwind class merging (`twMerge: true`)
* Custom opacity class group support
* Proper conflict resolution (later classes override earlier ones)

**Example with conflicts:**

```tsx
// 'bg-accent' overrides 'bg-background'
cn('bg-background p-4', 'bg-accent');
// Result: 'p-4 bg-accent'

```

### useThemeColor Hook

Retrieves theme color values from CSS variables. Supports both single color and multiple colors for efficient batch retrieval.

**Single color usage:**

```tsx
import { useThemeColor } from 'heroui-native';

function MyComponent() {
  const accentColor = useThemeColor('accent');
  const dangerColor = useThemeColor('danger');

  return (
    <View style={{ borderColor: accentColor }}>
      <Text style={{ color: dangerColor }}>Error message</Text>
    </View>
  );
}

```

**Multiple colors usage (more efficient):**

```tsx
import { useThemeColor } from 'heroui-native';

function MyComponent() {
  const [accentColor, backgroundColor, dangerColor] = useThemeColor([
    'accent',
    'background',
    'danger',
  ]);

  return (
    <View style={{ borderColor: accentColor, backgroundColor }}>
      <Text style={{ color: dangerColor }}>Error message</Text>
    </View>
  );
}

```

**Type signatures:**

```tsx
// Single color
useThemeColor(themeColor: ThemeColor): string

// Multiple colors (with type inference for tuples)
useThemeColor<T extends readonly [ThemeColor, ...ThemeColor[]]>(
  themeColor: T
): CreateStringTuple<T['length']>

// Multiple colors (array)
useThemeColor(themeColor: ThemeColor[]): string[]

```

Available theme colors include: `background`, `foreground`, `surface`, `accent`, `default`, `success`, `warning`, `danger`, and all their variants (hover, soft, foreground, etc.), plus semantic colors like `muted`, `border`, `divider`, `field`, `overlay`, and more.

## Next Steps

* Learn about [Animation](/docs/native/getting-started/animation) techniques
* Explore [Theming](/docs/native/getting-started/theming) system
* Explore [Colors](/docs/native/getting-started/colors) documentation

</page>

<page url="/docs/native/getting-started/theming">
# Theming

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/theming
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(handbook)/theming.mdx
> Customize HeroUI Native's design system with CSS variables and global styles


HeroUI Native uses CSS variables for theming. Customize everything from colors to component styles using standard CSS.

## How It Works

HeroUI Native's theming system is built on top of [Tailwind CSS v4](https://tailwindcss.com/docs/theme)'s theme via [Uniwind](https://uniwind.dev/). When you import `heroui-native/styles`, it uses Tailwind's built-in color palettes, maps them to semantic variables, automatically switches between light and dark themes, and uses CSS layers and the `@theme` directive for organization.

**Naming pattern:**

* Colors without a suffix are backgrounds (e.g., `--accent`)
* Colors with `-foreground` are for text on that background (e.g., `--accent-foreground`)

## Quick Start

**Apply colors in your components:**

```tsx
import { View, Text } from 'react-native';

<View className="bg-background flex-1">
  <Text className="text-foreground">Your app content</Text>
</View>

```

**Switch themes:**

HeroUI Native automatically supports dark mode through [Uniwind](https://docs.uniwind.dev/theming/basics). The theme switches between light and dark variants based on system preferences or manual selection:

```tsx
import { Uniwind, useUniwind } from 'uniwind';
import { Button } from 'heroui-native';

function ThemeToggle() {
  const { theme } = useUniwind();

  return (
    <Button
      onPress={() => Uniwind.setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Button.Label>Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode</Button.Label>
    </Button>
  );
}

```

**Override colors:**

```css
/* global.css */
@layer theme {
  @variant light {
    /* Override any color variable */
    --accent: oklch(0.65 0.25 270); /* Custom indigo accent */
    --success: oklch(0.65 0.15 155);
  }

  @variant dark {
    --accent: oklch(0.65 0.25 270);
    --success: oklch(0.75 0.12 155);
  }
}

```

> **Note**: See [Colors](/docs/native/getting-started/colors) for the complete color palette and visual reference.

**Create your own theme:**

Create multiple themes using Uniwind's variant system. For complete custom theme documentation, see the [Uniwind Custom Themes Guide](https://docs.uniwind.dev/theming/custom-themes).

<Callout type="warning">
  **Important:** All themes must define the same variables. See the [Default Theme](/docs/native/getting-started/colors#default-theme) section for a complete list of all required variables.
</Callout>

```css
/* global.css */
@layer theme {
  :root {
    @variant ocean-light {
      /* Base Colors */
      --background: oklch(0.95 0.02 230);
      --foreground: oklch(0.25 0.04 230);

      /* Surface: Used for non-overlay components (cards, accordions, disclosure groups) */
      --surface: oklch(0.98 0.01 230);
      --surface-foreground: oklch(0.3 0.045 230);

      /* Overlay: Used for floating/overlay components (dialogs, popovers, modals, menus) */
      --overlay: oklch(0.998 0.003 230);
      --overlay-foreground: oklch(0.3 0.045 230);

      --muted: oklch(0.55 0.035 230);

      --default: oklch(0.94 0.018 230);
      --default-foreground: oklch(0.4 0.05 230);

      /* Accent */
      --accent: oklch(0.6 0.2 230);
      --accent-foreground: oklch(0.98 0.005 230);

      /* Form Field Defaults - Colors */
      --field-background: oklch(0.98 0.01 230);
      --field-foreground: oklch(0.25 0.04 230);
      --field-placeholder: var(--muted);
      --field-border: transparent;

      /* Status Colors */
      --success: oklch(0.72 0.14 165);
      --success-foreground: oklch(0.25 0.08 165);

      --warning: oklch(0.78 0.12 85);
      --warning-foreground: oklch(0.3 0.08 85);

      --danger: oklch(0.68 0.18 15);
      --danger-foreground: oklch(0.98 0.005 15);

      /* Component Colors */
      --segment: oklch(0.98 0.01 230);
      --segment-foreground: oklch(0.25 0.04 230);

      /* Misc Colors */
      --border: oklch(0 0 0 / 0%);
      --divider: oklch(0.91 0.015 230);
      --link: oklch(0.62 0.17 230);
    }

    @variant ocean-dark {
      /* Base Colors */
      --background: oklch(0.15 0.04 230);
      --foreground: oklch(0.94 0.01 230);

      /* Surface: Used for non-overlay components (cards, accordions, disclosure groups) */
      --surface: oklch(0.2 0.048 230);
      --surface-foreground: oklch(0.9 0.015 230);

      /* Overlay: Used for floating/overlay components (dialogs, popovers, modals, menus) */
      --overlay: oklch(0.23 0.045 230);
      --overlay-foreground: oklch(0.9 0.015 230);

      --muted: oklch(0.5 0.04 230);

      --default: oklch(0.25 0.05 230);
      --default-foreground: oklch(0.88 0.018 230);

      /* Accent */
      --accent: oklch(0.72 0.21 230);
      --accent-foreground: oklch(0.15 0.04 230);

      /* Form Field Defaults - Colors */
      --field-background: var(--default);
      --field-foreground: var(--foreground);
      --field-placeholder: var(--muted);
      --field-border: transparent;

      /* Status Colors */
      --success: oklch(0.68 0.16 165);
      --success-foreground: oklch(0.95 0.008 165);

      --warning: oklch(0.75 0.14 90);
      --warning-foreground: oklch(0.2 0.04 90);

      --danger: oklch(0.65 0.2 20);
      --danger-foreground: oklch(0.95 0.008 20);

      /* Component Colors */
      --segment: oklch(0.22 0.046 230);
      --segment-foreground: oklch(0.9 0.015 230);

      /* Misc Colors */
      --border: oklch(0 0 0 / 0%);
      --divider: oklch(0.28 0.045 230);
      --link: oklch(0.75 0.18 230);
    }
  }
}

```

**Important:** When adding custom themes, you must register them in your Metro config:

```js
// metro.config.js
const { withUniwindConfig } = require('uniwind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = {
  // ... your existing config
};

module.exports = withUniwindConfig(wrapWithReanimatedMetroConfig(config), {
  cssEntryFile: './global.css',
  dtsFile: './src/uniwind.d.ts',
  extraThemes: [
    'ocean-light',
    'ocean-dark',
  ],
});

```

Apply themes in your app:

```tsx
import { Uniwind } from 'uniwind';
import { Button } from 'heroui-native';

function App() {
  return (
    <Button onPress={() => Uniwind.setTheme('ocean-light')}>
      <Button.Label>Ocean Theme</Button.Label>
    </Button>
  );
}

```

## Adding Custom Colors

Add your own semantic colors to the theme:

```css
@layer theme {
  @variant light {
    --info: oklch(0.6 0.15 210);
    --info-foreground: oklch(0.98 0 0);
  }

  @variant dark {
    --info: oklch(0.7 0.12 210);
    --info-foreground: oklch(0.15 0 0);
  }
}

/* Make the color available to Tailwind */
@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}

```

Now use it in your components:

```tsx
import { View, Text } from 'react-native';

<View className="bg-info p-4 rounded-lg">
  <Text className="text-info-foreground">Info message</Text>
</View>

```

## Custom Fonts

To use a custom font family in your app, you need to load the fonts and then override the font CSS variables.

### 1. Load Fonts in Your App

First, load your custom fonts (using Expo's `useFonts` hook for example):

```tsx
import { useFonts } from 'expo-font';
import { HeroUINativeProvider } from 'heroui-native';
import { YourFont_400Regular, YourFont_500Medium, YourFont_600SemiBold } from '@expo-google-fonts/your-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    YourFont_400Regular,
    YourFont_500Medium,
    YourFont_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // Or return a loading screen
  }

  return (
    <HeroUINativeProvider>
      {/* Your app content */}
    </HeroUINativeProvider>
  );
}

```

### 2. Configure Font CSS Variables

After loading the fonts, override the font CSS variables in your `global.css` file:

```css
@theme {
  --font-normal: 'YourFont-Regular';
  --font-medium: 'YourFont-Medium';
  --font-semibold: 'YourFont-SemiBold';
}

```

**Note:** The font names in CSS variables should match the PostScript names of your loaded fonts. Check your font package documentation or use the font names exactly as they appear in your `useFonts` hook.

All HeroUI Native components automatically use these font variables, ensuring consistent typography throughout your app.

## Variables Reference

HeroUI defines three types of variables:

1. **Base Variables** — Non-changing values like `--white`, `--black`
2. **Theme Variables** — Colors that change between light/dark themes
3. **Calculated Variables** — Automatically generated hover (pressed) states and size variants

For a complete reference, see: [Colors Documentation](/docs/native/getting-started/colors), [Default Theme Variables](https://github.com/heroui-inc/heroui-native/blob/beta/src/styles/variables.css), [Shared Theme Utilities](https://github.com/heroui-inc/heroui-native/blob/beta/src/styles/theme.css)

**Calculated variables (Tailwind):**

We use Tailwind's `@theme` directive to automatically create calculated variables for hover (pressed) states and radius variants. These are defined in [theme.css](https://github.com/heroui-inc/heroui-native/blob/beta/src/styles/theme.css):

```css
  @theme inline static {
    --color-background: var(--background);
    --color-foreground: var(--foreground);

    --color-surface: var(--surface);
    --color-surface-foreground: var(--surface-foreground);

    --color-overlay: var(--overlay);
    --color-overlay-foreground: var(--overlay-foreground);

    --color-muted: var(--muted);

    --color-accent: var(--accent);
    --color-accent-foreground: var(--accent-foreground);

    --color-segment: var(--segment);
    --color-segment-foreground: var(--segment-foreground);

    --color-border: var(--border);
    --color-divider: var(--divider);
    --color-focus: var(--focus);
    --color-link: var(--link);

    --color-default: var(--default);
    --color-default-foreground: var(--default-foreground);

    --color-success: var(--success);
    --color-success-foreground: var(--success-foreground);

    --color-warning: var(--warning);
    --color-warning-foreground: var(--warning-foreground);

    --color-danger: var(--danger);
    --color-danger-foreground: var(--danger-foreground);

    /* Form Field Tokens */
    --color-field: var(--field-background, var(--color-default));
    --color-field-hover: color-mix(
      in oklab,
      var(--field-background, var(--color-default)) 90%,
      var(--field-foreground, var(--color-default-foreground)) 10%
    );
    --color-field-foreground: var(--field-foreground, var(--color-foreground));
    --color-field-placeholder: var(--field-placeholder, var(--color-muted));
    --color-field-border: var(--field-border, var(--color-border));
    --radius-field: var(--field-radius, var(--radius-xl));
    --border-width-field: var(--field-border-width, var(--border-width));

    /* Calculated Variables */

    /* Colors */

    /* --- background shades --- */
    --color-background-secondary: color-mix(
      in oklab,
      var(--color-background) 96%,
      var(--color-foreground) 4%
    );
    --color-background-tertiary: color-mix(
      in oklab,
      var(--color-background) 92%,
      var(--color-foreground) 8%
    );
    --color-background-quaternary: color-mix(
      in oklab,
      var(--color-background) 86%,
      var(--color-foreground) 14%
    );
    --color-background-inverse: var(--color-foreground);

    /* ------------------------- */
    --color-default-hover: color-mix(
      in oklab,
      var(--color-default) 90%,
      var(--color-default-foreground) 2%
    );
    --color-accent-hover: color-mix(
      in oklab,
      var(--color-accent) 90%,
      var(--color-accent-foreground) 10%
    );
    --color-success-hover: color-mix(
      in oklab,
      var(--color-success) 90%,
      var(--color-success-foreground) 10%
    );
    --color-warning-hover: color-mix(
      in oklab,
      var(--color-warning) 90%,
      var(--color-warning-foreground) 10%
    );
    --color-danger-hover: color-mix(
      in oklab,
      var(--color-danger) 90%,
      var(--color-danger-foreground) 10%
    );

    /* Form Field Colors */
    --color-field-hover: color-mix(
      in oklab,
      var(--color-field) 90%,
      var(--color-field-foreground) 2%
    );
    --color-field-focus: var(--color-field);
    --color-field-border-hover: color-mix(
      in oklab,
      var(--color-field-border) 88%,
      var(--color-field-foreground) 10%
    );
    --color-field-border-focus: color-mix(
      in oklab,
      var(--color-field-border) 74%,
      var(--color-field-foreground) 22%
    );

    /* Soft Colors */
    --color-accent-soft: color-mix(
      in oklab,
      var(--color-accent) 15%,
      transparent
    );
    --color-accent-soft-foreground: var(--color-accent);
    --color-accent-soft-hover: color-mix(
      in oklab,
      var(--color-accent) 20%,
      transparent
    );

    --color-danger-soft: color-mix(
      in oklab,
      var(--color-danger) 15%,
      transparent
    );
    --color-danger-soft-foreground: var(--color-danger);
    --color-danger-soft-hover: color-mix(
      in oklab,
      var(--color-danger) 20%,
      transparent
    );

    --color-warning-soft: color-mix(
      in oklab,
      var(--color-warning) 15%,
      transparent
    );
    --color-warning-soft-foreground: var(--color-warning);
    --color-warning-soft-hover: color-mix(
      in oklab,
      var(--color-warning) 20%,
      transparent
    );

    --color-success-soft: color-mix(
      in oklab,
      var(--color-success) 15%,
      transparent
    );
    --color-success-soft-foreground: var(--color-success);
    --color-success-soft-hover: color-mix(
      in oklab,
      var(--color-success) 20%,
      transparent
    );

    /* Surface Levels - progressively darker/lighter shades for layering */
    --color-surface-secondary: color-mix(
      in oklab,
      var(--surface) 94%,
      var(--surface-foreground) 6%
    );
    --color-surface-tertiary: color-mix(
      in oklab,
      var(--surface) 92%,
      var(--surface-foreground) 8%
    );
    --color-surface-quaternary: color-mix(
      in oklab,
      var(--surface) 86%,
      var(--default-foreground) 14%
    );

    /* On Surface Colors */
    --color-on-surface: color-mix(
      in oklab,
      var(--color-surface) 93%,
      var(--color-surface-foreground) 7%
    );
    --color-on-surface-foreground: var(--color-surface-foreground);
    --color-on-surface-hover: color-mix(
      in oklab,
      var(--color-surface) 91%,
      var(--color-surface-foreground) 9%
    );
    --color-on-surface-focus: var(--color-on-surface);

    /* Radius and default sizes - defaults can change by just changing the --radius */
    --radius-xs: calc(var(--radius) * 0.25); /* 0.125rem (2px) */
    --radius-sm: calc(var(--radius) * 0.5); /* 0.25rem (4px) */
    --radius-md: calc(var(--radius) * 0.75); /* 0.375rem (6px) */
    --radius-lg: calc(var(--radius) * 1); /* 0.5rem (8px) */
    --radius-xl: calc(var(--radius) * 1.5); /* 0.75rem (12px) */
    --radius-2xl: calc(var(--radius) * 2); /* 1rem (16px) */
    --radius-3xl: calc(var(--radius) * 3); /* 1.5rem (24px) */
    --radius-4xl: calc(var(--radius) * 4); /* 2rem (32px) */
  }

```

Form controls now rely on the `--field-*` variables and their calculated hover/focus variants. Update them in your theme to restyle inputs, checkboxes, radios, and OTP slots without impacting surfaces like buttons or cards.

## Resources

* [Colors Documentation](/docs/native/getting-started/colors)
* [Styling Guide](/docs/native/getting-started/styling)
* [Tailwind CSS v4 Theming](https://tailwindcss.com/docs/theme)
* [OKLCH Color Tool](https://oklch.com)

</page>

<page url="/docs/native/getting-started/design-principles">
# Design Principles

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/design-principles
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(overview)/design-principles.mdx
> Core principles that guide HeroUI v3's design and development


HeroUI Native follows 9 core principles that prioritize clarity, accessibility, customization, and developer experience.

## Core Principles

### 1. Semantic Intent Over Visual Style

Use semantic naming (primary, secondary, tertiary) instead of visual descriptions (solid, flat, bordered). Inspired by [Uber's Base design system](https://base.uber.com/6d2425e9f/p/756216-button), variants follow a clear hierarchy:



```tsx
// ✅ Semantic variants communicate hierarchy
<Button variant="primary">Save</Button>
<Button variant="secondary">Edit</Button>
<Button variant="tertiary">Cancel</Button>

```

| Variant       | Purpose                           | Usage            |
| ------------- | --------------------------------- | ---------------- |
| **Primary**   | Main action to move forward       | 1 per context    |
| **Secondary** | Alternative actions               | Multiple allowed |
| **Tertiary**  | Dismissive actions (cancel, skip) | Sparingly        |
| **Danger**    | Destructive actions               | When needed      |

### 2. Accessibility as Foundation

Accessibility follows mobile development best practices with proper touch accessibility, focus management, and screen reader support built into every component. All components include proper accessibility labels and semantic structure for VoiceOver (iOS) and TalkBack (Android).

```tsx
import { Tabs } from 'heroui-native';

<Tabs value="profile" onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="profile">
      <Tabs.Label>Profile</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="security">
      <Tabs.Label>Security</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile">Content</Tabs.Content>
  <Tabs.Content value="security">Content</Tabs.Content>
</Tabs>

```

### 3. Composition Over Configuration

Compound components let you rearrange, customize, or omit parts as needed. Use dot notation to compose components exactly as you need them.

```tsx
// Compose parts to build exactly what you need
import { Accordion } from 'heroui-native';

<Accordion>
  <Accordion.Item value="1">
    <Accordion.Trigger>
      Question Text
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>Answer content</Accordion.Content>
  </Accordion.Item>
</Accordion>

```

### 4. Progressive Disclosure

Start simple, add complexity only when needed. Components work with minimal props and scale up as requirements grow.

```tsx
import { Button, Icon, Spinner } from 'heroui-native';

// Level 1: Minimal
<Button>Click me</Button>

// Level 2: Enhanced
<Button variant="primary" size="lg">
  <Icon name="check" size={20} />
  <Button.Label>Submit</Button.Label>
</Button>

// Level 3: Advanced
<Button variant="primary" isDisabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner size="sm" />
      <Button.Label>Loading...</Button.Label>
    </>
  ) : (
    <Button.Label>Submit</Button.Label>
  )}
</Button>

```

### 5. Predictable Behavior

Consistent patterns across all components: sizes (`sm`, `md`, `lg`), variants, and className support. Same API, same behavior.

```tsx
import { Button, Chip, Avatar } from 'heroui-native';

// All components follow the same patterns
<Button size="lg" variant="primary" className="custom">
  <Button.Label>Click me</Button.Label>
</Button>
<Chip size="lg" color="success" className="custom">
  <Chip.Label>Success</Chip.Label>
</Chip>
<Avatar size="lg" className="custom">
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>

```

### 6. Type Safety First

Full TypeScript support with IntelliSense, auto-completion, and compile-time error detection. Extend types for custom components.

```tsx
import type { ButtonRootProps } from 'heroui-native';

// Type-safe props and event handlers
<Button
  variant="primary"  // Autocomplete: primary | secondary | tertiary | ghost | danger | danger-soft
  size="md"          // Type checked: sm | md | lg
  onPress={() => {   // Properly typed press handler
    console.log('Button pressed');
  }}
>
  <Button.Label>Click me</Button.Label>
</Button>

// Extend types for custom components
interface CustomButtonProps extends Omit<ButtonRootProps, 'variant'> {
  intent: 'save' | 'cancel' | 'delete';
}

```

### 7. Developer Experience Excellence

Clear APIs, descriptive errors, IntelliSense and AI-friendly markdown docs.

### 8. Complete Customization

Beautiful defaults out-of-the-box. Transform the entire look with CSS variables through [Uniwind's theming system](https://docs.uniwind.dev/theming/basics). Every slot is customizable.

```css
/* Custom colors using Uniwind's theme layer */
@layer theme {
  @variant light {
    --accent: oklch(0.65 0.25 270); /* Custom indigo accent */
    --background: oklch(0.98 0 0);  /* Custom background */
  }

  @variant dark {
    --accent: oklch(0.65 0.25 270);
    --background: oklch(0.15 0 0);
  }
}

/* Radius customization */
@theme {
  --radius: 0.75rem; /* Increase for rounder components */
}

```

### 9. Open and Extensible

Wrap, extend, and customize components to match your needs. Create custom wrappers or apply custom styles using className.

```tsx
import { Button } from 'heroui-native';
import type { ButtonRootProps } from 'heroui-native';

// Custom wrapper component
interface CTAButtonProps extends Omit<ButtonRootProps, 'variant'> {
  intent?: 'primary-cta' | 'secondary-cta' | 'minimal';
}

const CTAButton = ({
  intent = 'primary-cta',
  children,
  ...props
}: CTAButtonProps) => {
  const variantMap = {
    'primary-cta': 'primary',
    'secondary-cta': 'secondary',
    'minimal': 'ghost'
  } as const;

  return (
    <Button variant={variantMap[intent]} {...props}>
      <Button.Label>{children}</Button.Label>
    </Button>
  );
};

// Usage
<CTAButton intent="primary-cta">Get Started</CTAButton>
<CTAButton intent="secondary-cta">Learn More</CTAButton>

```

**Extend with Tailwind Variants:**

```tsx
import { Button } from 'heroui-native';
import { tv } from 'tailwind-variants';

// Extend button styles with custom variants
const myButtonVariants = tv({
  base: 'px-4 py-2 rounded-lg',
  variants: {
    variant: {
      'primary-cta': 'bg-accent text-accent-foreground px-8 py-4 shadow-lg',
      'secondary-cta': 'border-2 border-accent text-accent px-6 py-3',
    }
  },
  defaultVariants: {
    variant: 'primary-cta',
  }
});

// Use the custom variants
function CustomButton({ variant, className, ...props }) {
  return (
    <Button className={myButtonVariants({ variant, className })} {...props}>
      <Button.Label>Get Started</Button.Label>
    </Button>
  );
}

// Usage
<CustomButton variant="primary-cta">Get Started</CustomButton>
<CustomButton variant="secondary-cta">Learn More</CustomButton>

```

</page>

<page url="/docs/native/getting-started/quick-start">
# Quick Start

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/quick-start
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(overview)/quick-start.mdx
> Get started with HeroUI Native in minutes


## Getting Started

### 1. Install HeroUI Native

<Tabs items={["npm", "pnpm", "yarn", "bun"]}>
  <Tab value="npm">
    ```bash
    npm install heroui-native
    ```
  </Tab>

  <Tab value="pnpm">
    ```bash
    pnpm add heroui-native
    ```
  </Tab>

  <Tab value="yarn">
    ```bash
    yarn add heroui-native
    ```
  </Tab>

  <Tab value="bun">
    ```bash
    bun add heroui-native
    ```
  </Tab>
</Tabs>

### 2. Install Mandatory Peer Dependencies

<Tabs items={["npm", "pnpm", "yarn", "bun"]}>
  <Tab value="npm">
    ```bash
    npm install react-native-screens@~4.16.0 react-native-reanimated@~4.1.1 react-native-gesture-handler@^2.28.0 react-native-worklets@0.5.1 react-native-safe-area-context@~5.6.0 react-native-svg@15.12.1 tailwind-variants@^3.2.2 tailwind-merge@^3.4.0 @gorhom/bottom-sheet@^5
    ```
  </Tab>

  <Tab value="pnpm">
    ```bash
    pnpm add react-native-screens@~4.16.0 react-native-reanimated@~4.1.1 react-native-gesture-handler@^2.28.0 react-native-worklets@0.5.1 react-native-safe-area-context@~5.6.0 react-native-svg@15.12.1 tailwind-variants@^3.2.2 tailwind-merge@^3.4.0 @gorhom/bottom-sheet@^5
    ```
  </Tab>

  <Tab value="yarn">
    ```bash
    yarn add react-native-screens@~4.16.0 react-native-reanimated@~4.1.1 react-native-gesture-handler@^2.28.0 react-native-worklets@0.5.1 react-native-safe-area-context@~5.6.0 react-native-svg@15.12.1 tailwind-variants@^3.2.2 tailwind-merge@^3.4.0 @gorhom/bottom-sheet@^5
    ```
  </Tab>

  <Tab value="bun">
    ```bash
    bun add react-native-screens@~4.16.0 react-native-reanimated@~4.1.1 react-native-gesture-handler@^2.28.0 react-native-worklets@0.5.1 react-native-safe-area-context@~5.6.0 react-native-svg@15.12.1 tailwind-variants@^3.2.2 tailwind-merge@^3.4.0 @gorhom/bottom-sheet@^5
    ```
  </Tab>
</Tabs>

<Callout type="warning">
  It's recommended to use the exact versions specified above to avoid compatibility issues. Version mismatches may cause unexpected bugs.
</Callout>

### 3. Set Up Uniwind

Follow the [Uniwind installation guide](https://docs.uniwind.dev/quickstart) to set up Tailwind CSS for React Native.

If you're migrating from NativeWind, see the [migration guide](https://docs.uniwind.dev/migration-from-nativewind).

### 4. Configure global.css

Inside your `global.css` file add the following imports:

```css
@import 'tailwindcss';
@import 'uniwind';

@import 'heroui-native/styles';

/* Path to the heroui-native lib inside node_modules from the root of your project */
@source './node_modules/heroui-native/lib';

```

### 5. Wrap Your App with Provider

Wrap your application with `HeroUINativeProvider`. You must wrap it with `GestureHandlerRootView`:

```tsx
import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>{/* Your app content */}</HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}

```

> **Note**: For advanced configuration options including text props, animation settings, and toast configuration, see the [Provider documentation](/docs/native/getting-started/provider).

### 6. Use Your First Component

```tsx
import { Button } from 'heroui-native';
import { View } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Button onPress={() => console.log('Pressed!')}>Get Started</Button>
    </View>
  );
}

```

## What's Next?

* [HeroUI Native Provider](/docs/native/getting-started/provider)
* [Styling Guide](/docs/native/getting-started/styling)
* [Theming Documentation](/docs/native/getting-started/theming)

## Running on Web (Expo)

<Callout type="warning">
  HeroUI Native is currently not recommended for web use. We are focusing on mobile platforms (iOS and Android) at this time.
</Callout>

</page>

<page url="/docs/native/getting-started/llms-txt">
# LLMs.txt

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/llms-txt
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(ui-for-agents)/llms-txt.mdx
> Enable AI assistants like Claude, Cursor, and Windsurf to understand HeroUI Native


We provide [LLMs.txt](https://llmstxt.org/) files to make HeroUI Native documentation accessible to AI coding assistants.

## Available Files

**Core documentation:**

* [/native/llms.txt](/native/llms.txt) — Quick reference index for Native documentation
* [/native/llms-full.txt](/native/llms-full.txt) — Complete HeroUI Native documentation

**For limited context windows:**

* [/native/llms-components.txt](/native/llms-components.txt) — Component documentation only
* [/native/llms-patterns.txt](/native/llms-patterns.txt) — Common patterns and recipes

**All platforms:**

* [/llms.txt](/llms.txt) — Quick reference index (React + Native)
* [/llms-full.txt](/llms-full.txt) — Complete documentation (React + Native)
* [/llms-components.txt](/llms-components.txt) — All component documentation
* [/llms-patterns.txt](/llms-patterns.txt) — All patterns and recipes

## Integration

**Claude Code:** Tell Claude to reference the documentation:

```
Use HeroUI Native documentation from https://v3.heroui.com/native/llms.txt

```

Or add to your project's `.claude` file for automatic loading.

**Cursor:** Use the `@Docs` feature:

```
@Docs https://v3.heroui.com/native/llms-full.txt

```

[Learn more](https://docs.cursor.com/context/@-symbols/@-docs)

**Windsurf:** Add to your `.windsurfrules` file:

```
#docs https://v3.heroui.com/native/llms-full.txt

```

[Learn more](https://docs.codeium.com/windsurf/memories#memories-and-rules)

**Other AI tools:** Most AI assistants can reference documentation by URL. Simply provide:

```
https://v3.heroui.com/native/llms.txt

```

**For component-specific documentation:**

```

https://v3.heroui.com/native/llms-components.txt

```

**For patterns and best practices:**

```

https://v3.heroui.com/native/llms-patterns.txt

```

## Contributing

Found an issue with AI-generated code? Help us improve our LLMs.txt files on [GitHub](https://github.com/heroui-inc/heroui).

</page>

<page url="/docs/native/getting-started/mcp-server">
# MCP Server

**Category**: native
**URL**: https://v3.heroui.com/docs/native/getting-started/mcp-server
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/native/getting-started/(ui-for-agents)/mcp-server.mdx
> Access HeroUI Native documentation directly in your AI assistant


The HeroUI MCP Server gives AI assistants direct access to HeroUI Native component documentation, making it easier to build with HeroUI in AI-powered development environments.



The MCP server currently supports **heroui-native** and [stdio transport](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#stdio). Published at `@heroui/native-mcp` on npm. View the source code on [GitHub](https://github.com/heroui-inc/heroui-mcp).

<Callout>
  As we add more components to HeroUI Native, they'll be available in the MCP server too.
</Callout>

## Quick Setup

**Cursor:**

<div className="flex items-center gap-3 mb-4">
  <a href="https://link.heroui.com/mcp-cursor-install" className="button button--tertiary button--sm no-underline">
    <svg viewBox="0 0 466.73 532.09" className="w-5 h-5 fill-current">
      <path d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z" />
    </svg>

    <span>Install in Cursor</span>
  </a>
</div>

Or manually add to **Cursor Settings** → **Tools** → **MCP Servers**:

```json title=".cursor/mcp.json"
{
  "mcpServers": {
    "heroui-native": {
      "command": "npx",
      "args": ["-y", "@heroui/native-mcp@latest"]
    }
  }
}

```

Alternatively, add the following to your `~/.cursor/mcp.json` file. To learn more, see the [Cursor documentation](https://cursor.com/docs/context/mcp).

**Claude Code:** Run this command in your terminal:

```bash
claude mcp add heroui-native -- npx -y @heroui/native-mcp@latest

```

Or manually add to your project's `.mcp.json` file:

```json title=".mcp.json"
{
  "mcpServers": {
    "heroui-native": {
      "command": "npx",
      "args": ["-y", "@heroui/native-mcp@latest"]
    }
  }
}

```

After adding the configuration, restart Claude Code and run `/mcp` to see the HeroUI MCP server in the list. If you see **Connected**, you're ready to use it.

See the [Claude Code MCP documentation](https://docs.claude.com/en/docs/claude-code/mcp) for more details.

**Windsurf:** Add the HeroUI server to your project's `.windsurf/mcp.json` configuration file:

```json title=".windsurf/mcp.json"
{
  "mcpServers": {
    "heroui-native": {
      "command": "npx",
      "args": ["-y", "@heroui/native-mcp@latest"]
    }
  }
}

```

After adding the configuration, restart Windsurf to activate the MCP server.

See the [Windsurf MCP documentation](https://docs.windsurf.com/windsurf/cascade/mcp) for more details.

**VS Code:** To configure MCP in VS Code with GitHub Copilot, add the HeroUI server to your project's `.vscode/mcp.json` configuration file:

```json title=".vscode/mcp.json"
{
  "mcpServers": {
    "heroui-native": {
      "command": "npx",
      "args": ["-y", "@heroui/native-mcp@latest"]
    }
  }
}

```

After adding the configuration, open `.vscode/mcp.json` and click **Start** next to the heroui-native server.

See the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) for more details.

## Usage

Once configured, ask your AI assistant questions like:

* "Help me install HeroUI Native in my Expo app"
* "Show me all HeroUI Native components"
* "What props does the Button component have?"
* "Give me an example of using the Card component"
* "Get the source code for the Button component"
* "Show me the default styles for Card"
* "What are the theme variables for dark mode?"

### Automatic Updates

The MCP server can help you upgrade to the latest HeroUI Native version:

```bash
"Hey Cursor, update HeroUI Native to the latest version"

```

Your AI assistant will automatically:

* Compare your current version with the latest release
* Review the changelog for breaking changes
* Apply the necessary code updates to your project

This works for any version upgrade, whether you're updating to the latest alpha, beta, or stable release.

## Available Tools

The MCP server provides these tools to AI assistants:

| Tool                     | Description                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `installation`           | Get complete installation instructions for your specific framework (Expo or Bare React Native) and package manager |
| `list_components`        | List all available HeroUI Native components                                                                        |
| `get_component_info`     | Get detailed documentation, anatomy, props, and examples for specific components                                   |
| `get_component_props`    | Get detailed props information for HeroUI Native components                                                        |
| `get_component_examples` | Get usage examples for HeroUI Native components                                                                    |
| `get_theme_info`         | Access theme variables for colors, typography, spacing with light/dark mode support                                |
| `get_docs`               | Browse the full HeroUI Native documentation including guides and principles                                        |

## Troubleshooting

**Requirements:** Node.js 18 or higher. The package will be automatically downloaded when using `npx`.

**Need help?** [GitHub Issues](https://github.com/heroui-inc/heroui-mcp/issues) | [Discord Community](https://discord.gg/heroui)

## Links

* [npm Package](https://www.npmjs.com/package/@heroui/native-mcp)
* [GitHub Repository](https://github.com/heroui-inc/heroui-mcp)
* [Contributing Guide](https://github.com/heroui-inc/heroui-mcp/blob/main/CONTRIBUTING.md)

</page>