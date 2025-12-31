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

#### Semantic Domain Aliases
*   **User Status**:
    *   `Status.Success` -> **Active**
    *   `Status.Danger` -> **Blocked** / **Inactive**
*   **Loan Status**:
    *   `Status.Success` -> **Open**
    *   `Status.Warning` -> **Overdue** (Initial warning)
    *   `Status.Danger` -> **Loss** / **Damage**
*   **Unit Status**:
    *   `Status.Warning` -> **Maintenance**

### Typography
*   **Font**: Inter (sans-serif)
*   **Scale**: Consistent use of `text-xs` to `text-3xl`.

## 3. Component Library (`components/DesignSystem.tsx`)

### Core Components

#### `Button`
Standard interaction element.
```tsx
// Domain: Inventory Context
<Button variant="primary" icon="add">Add Work Copy</Button>

// Domain: Circulation Context
<Button variant="secondary">Cancel Reservation</Button>
<Button variant="danger">Report Lost Book</Button>
```

#### `Input` / `Select` / `TextArea`
Standardized form fields with built-in label and icon support.
```tsx
// Domain: User Context (Registration)
<Input 
    label="Full Name" 
    icon="person" 
    placeholder="John Doe" 
    required 
/>

<Input 
    label="CPF" 
    icon="badge" 
    placeholder="000.000.000-00" 
    mask="999.999.999-99"
    required 
/>

<Select label="Role" icon="security">
    <option value="librarian">Librarian</option>
    <option value="admin">Administrator</option>
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
<Modal isOpen={true} title="Edit User Profile" onClose={handleClose}>
    <UserForm user={selectedUser} onSubmit={handleUpdate} />
</Modal>
```

## 4. Developer Guidelines

1.  **Do not write raw HTML inputs**. Always use `Input`, `Select`, or `TextArea` to ensure visual consistency and accessibility.
2.  **Use Semantic Colors**. Use `text-text-secondary` for icons and labels, `bg-surface-dark` for containers.
3.  **Composition**. Build new UI features by composing existing Atoms and Molecules.
