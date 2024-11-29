import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ModifyReservation from '../ModifyReservation'

// Mock console.log
console.log = vi.fn();

describe('ModifyReservation Component', () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <ModifyReservation />
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'log'); // Add this line to properly spy on console.log
    });

    // TC-04 Case A: Change Reservation Size Successful
    it('updates reservation size successfully', async () => {
        const user = userEvent.setup();
        renderComponent();

        // Get and change party size
        const partySizeSelect = screen.getByLabelText(/party size/i);
        await user.selectOptions(partySizeSelect, '6');

        // Need to also set a required time value since the form requires it
        const timeInput = screen.getByLabelText(/time/i);
        await user.type(timeInput, '7:00 PM');

        // Submit form
        const submitButton = screen.getByRole('button', { name: /modify reservation/i });
        await user.click(submitButton);

        // Wait for the console.log to be called
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith(
                'Creating reservation with:',
                expect.objectContaining({
                    partySize: '6',
                    time: '7:00 PM'
                })
            );
        });
    });


    // TC-04 Case C: Change Seating Type Successful
    it('updates seating type successfully', async () => {
        const user = userEvent.setup();
        renderComponent();

        // Set required time value
        const timeInput = screen.getByLabelText(/time/i);
        await user.type(timeInput, '7:00 PM');

        // Change seating type
        const seatingTypeSelect = screen.getByLabelText(/seating type/i);
        await user.selectOptions(seatingTypeSelect, 'Bar');

        // Submit form
        const submitButton = screen.getByRole('button', { name: /modify reservation/i });
        await user.click(submitButton);

        // Wait for the console.log
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith(
                'Creating reservation with:',
                expect.objectContaining({
                    seatingType: 'Bar',
                    time: '7:00 PM'
                })
            );
        });
    });

    // TC-04 Case E: Change All Fields
    it('updates all reservation details successfully', async () => {
        const user = userEvent.setup();
        renderComponent();

        // Update time
        const timeInput = screen.getByLabelText(/time/i);
        await user.clear(timeInput);
        await user.type(timeInput, '7:00 PM');

        // Update party size
        const partySizeSelect = screen.getByLabelText(/party size/i);
        await user.selectOptions(partySizeSelect, '4');

        // Update seating type
        const seatingTypeSelect = screen.getByLabelText(/seating type/i);
        await user.selectOptions(seatingTypeSelect, 'Bar');

        // Update seating location
        const locationSelect = screen.getByLabelText(/seating location/i);
        await user.selectOptions(locationSelect, 'Outdoor');

        // Submit form
        const submitButton = screen.getByRole('button', { name: /modify reservation/i });
        await user.click(submitButton);

        expect(console.log).toHaveBeenCalledWith('Creating reservation with:',
            expect.objectContaining({
                time: '7:00 PM',
                partySize: '4',
                seatingType: 'Bar',
                seatingLocation: 'Outdoor'
            })
        );
    });

    // Test Cancellation
    it('handles reservation cancellation', async () => {
        const user = userEvent.setup();
        renderComponent();

        const cancelButton = screen.getByRole('button', { name: /cancel reservation/i });
        await user.click(cancelButton);

        expect(console.log).toHaveBeenCalledWith('Reservation Cancelled');
    });

    // Test Form Rendering
    it('renders all form fields correctly', () => {
        renderComponent();

        expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/party size/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/seating type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/seating location/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /modify reservation/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel reservation/i })).toBeInTheDocument();
    });

    // Test Navigation Link
    it('renders back link correctly', () => {
        renderComponent();

        const backLink = screen.getByText(/go back/i);
        expect(backLink).toBeInTheDocument();
        expect(backLink.getAttribute('href')).toBe('/customer-home');
    });
});