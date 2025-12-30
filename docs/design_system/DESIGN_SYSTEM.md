# Falero Design System

## 1. Philosophy & Architecture
The Falero Design System follows **Atomic Design** principles to ensure scalability, consistency, and reusability across the application.

*   **Atoms**: Basic building blocks (Icons, Buttons, Badges, Avatars, Inputs).
*   **Molecules**: Combinations of atoms (Form Fields, Search Bars, Cards).
*   **Organisms**: Complex sections (Modals, Tables).
*   **Templates/Pages**: Application-specific layouts (Dashboard, Settings).

## 2. Design Tokens
We utilize Tailwind CSS as our token engine. Key semantic tokens include:

### Colors
*   **Primary**: `#137fec` (Actionable elements, active states)
*   **Surface**: `#192633` (Cards, Inputs, Sidebar)
*   **Background**: `#101922` (App background)
*   **Text Secondary**: `#92adc9` (Subtitles, Icons)
*   **Status**:
    *   Success: `#0bda5b`
    *   Warning: `#f59e0b`
    *   Danger: `#ef4444`

### Typography
*   **Font**: Inter (sans-serif)
*   **Scale**: Consistent use of `text-xs` to `text-3xl`.

## 3. Component Library (`components/DesignSystem.tsx`)

### Core Components

#### `Button`
Standard interaction element.
```tsx
<Button variant="primary" icon="add">Add Item</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Transparent</Button>
```

#### `Input` / `Select` / `TextArea`
Standardized form fields with built-in label and icon support.
```tsx
<Input 
    label="Username" 
    icon="person" 
    placeholder="Enter username" 
    required 
/>

<Select label="Role" icon="badge">
    <option value="admin">Admin</option>
</Select>
```

#### `Card`
The fundamental container for content.
```tsx
<Card className="p-6">
    <Content />
</Card>
```

#### `Modal`
Overlay for focused tasks.
```tsx
<Modal isOpen={true} title="Edit User" onClose={handleClose}>
    <Form />
</Modal>
```

## 4. Developer Guidelines

1.  **Do not write raw HTML inputs**. Always use `Input`, `Select`, or `TextArea` to ensure visual consistency and accessibility.
2.  **Use Semantic Colors**. Use `text-text-secondary` for icons and labels, `bg-surface-dark` for containers.
3.  **Composition**. Build new UI features by composing existing Atoms and Molecules.
