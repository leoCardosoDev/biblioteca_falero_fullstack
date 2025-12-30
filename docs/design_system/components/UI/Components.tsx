// Facade Pattern: Re-exporting from the new centralized Design System
// This ensures existing pages continue to work without massive refactoring
// while moving the source of truth to ../DesignSystem.tsx

export { 
    Icon, 
    Button, 
    Badge, 
    Card, 
    Avatar, 
    Switch,
    Input,
    Select,
    TextArea 
} from '../DesignSystem';
