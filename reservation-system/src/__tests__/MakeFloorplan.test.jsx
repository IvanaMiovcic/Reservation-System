import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ModifyFloorplan from '../ModifyFloorplan'

// Mock Supabase
const mockSupabase = {
    createClient: vi.fn(() => ({
        from: vi.fn(() => ({
            select: vi.fn().mockReturnThis(),
            insert: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis()
        })),
        channel: vi.fn(() => ({
            on: vi.fn().mockReturnThis(),
            subscribe: vi.fn()
        })),
        auth: {
            getUser: vi.fn()
        }
    }))
};

vi.mock('@supabase/supabase-js', () => ({
    createClient: () => mockSupabase.createClient()
}));

// Mock components
vi.mock('../components/FloorplanTable', () => ({
    default: () => <div data-testid="floorplan-table">Floorplan Table</div>
}));

vi.mock('../components/FloorPlanModify', () => ({
    default: () => <div data-testid="floorplan-modify">Floorplan Modify</div>
}));

describe('Make Floor Plan (TC-07)', () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <ModifyFloorplan />
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // TC-07 Case A: Create Floor Plan Button Present
    it('shows create floor plan button with correct link', () => {
        renderComponent();

        // Check if create button exists
        const createButton = screen.getByRole('button', { name: /create a floorplan/i });
        expect(createButton).toBeInTheDocument();

        // Check if it links to the correct route
        const createLink = screen.getByRole('link', { name: /create a floorplan/i });
        expect(createLink.getAttribute('href')).toBe('/add-floorplan');
    });

    // Test that main components are rendered
    it('renders all necessary floor plan components', () => {
        renderComponent();

        // Check for main components
        expect(screen.getByTestId('floorplan-table')).toBeInTheDocument();
        expect(screen.getByTestId('floorplan-modify')).toBeInTheDocument();
    });

    // Test navigation
    it('contains proper navigation elements', () => {
        renderComponent();

        // Check for back navigation
        const backButton = screen.getByRole('button', { name: /back/i });
        expect(backButton).toBeInTheDocument();

        const backLink = screen.getByRole('link', { name: /back/i });
        expect(backLink).toBeInTheDocument();
        expect(backLink.getAttribute('href')).toBe('/employee-home');
    });

    // Test layout structure
    it('renders with correct styling classes', () => {
        renderComponent();

        // Check main container has required classes
        const mainContainer = screen.getByTestId('floorplan-modify')
            .closest('div[class*="dark bg-background"]');
        expect(mainContainer).toHaveClass('dark bg-background font-poppins');
    });

    // Test container layout
    it('maintains proper flex layout structure', () => {
        renderComponent();

        const flexContainer = screen.getByTestId('floorplan-modify')
            .closest('div[class*="flex flex-col"]');
        expect(flexContainer).toHaveClass('flex flex-col h-[100%]');
    });
});