import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ModifyReservation from '../ModifyReservation'

// Mock console.log
console.log = vi.fn();

// Mock navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('Cancel Reservation', () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <ModifyReservation />
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // TC-05 Case A: Basic Cancel Reservation Test
    it('handles reservation cancellation', async () => {
        const user = userEvent.setup();
        renderComponent();

        // Find and click the cancel button
        const cancelButton = screen.getByRole('button', { name: /cancel reservation/i });
        await user.click(cancelButton);

        // Verify cancellation was logged
        expect(console.log).toHaveBeenCalledWith('Reservation Cancelled');
    });


    // Test Back Link
    it('renders back link correctly', () => {
        renderComponent();
        
        const backLink = screen.getByText(/go back/i);
        expect(backLink).toBeInTheDocument();
        expect(backLink.getAttribute('href')).toBe('/customer-home');
    });

    // Test Button Presence
    it('renders cancel button', () => {
        renderComponent();
        
        const cancelButton = screen.getByRole('button', { name: /cancel reservation/i });
        expect(cancelButton).toBeInTheDocument();
    });
});