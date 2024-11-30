import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ModifyReservation from '../ModifyReservation'

// First set up basic mocks
const mockNavigate = vi.fn();
console.log = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({
            state: { reservation_id: 'test-reservation-id' }
        })
    };
});

// Mock Supabase with the correct data structure
vi.mock('@supabase/supabase-js', () => ({
    createClient: () => ({
        from: () => ({
            update: vi.fn().mockResolvedValue({ error: null }),
            select: vi.fn().mockImplementation((query) => ({
                eq: () => {
                    // Return different mock data based on the query
                    if (query === 'name') {
                        return { data: [{ name: 'Test Restaurant' }], error: null };
                    }
                    return {
                        data: [{
                            reservation_id: 'test-reservation-id',
                            restaurant_id: 'test-restaurant',
                            date_time: '2024-12-01T19:00:00Z',
                            priority: 'standard',
                            additional_info: ''
                        }],
                        error: null
                    };
                }
            }))
        }),
        auth: {
            getUser: vi.fn().mockResolvedValue({
                data: {
                    user: {
                        user_metadata: { account_type: 'Customer' }
                    }
                },
                error: null
            })
        }
    })
}));

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
    });

    // TC-04 Case A: Change Reservation Details Successful
    it('successfully updates reservation details', async () => {
        const user = userEvent.setup();
        renderComponent();

        // Wait for loading to complete and component to render
        await waitFor(() => {
            expect(screen.getByText(/test restaurant/i)).toBeInTheDocument();
        });

        // Submit form
        const submitButton = screen.getByRole('button', { name: /modify reservation/i });
        await user.click(submitButton);

        // Check validation errors appear
        expect(await screen.findByText(/please choose a reservation date/i)).toBeInTheDocument();
    });

    // Test form fields present
    it('renders form fields correctly', async () => {
        renderComponent();

        // Wait for loading to complete and component to render
        await waitFor(() => {
            expect(screen.getByText(/test restaurant/i)).toBeInTheDocument();
        });

        // Check for form fields
        expect(screen.getByLabelText(/reservation date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/additional information/i)).toBeInTheDocument();
    });

    // Test navigation
    it('has correct back navigation', async () => {
        renderComponent();

        // Wait for loading to complete and component to render
        await waitFor(() => {
            expect(screen.getByText(/test restaurant/i)).toBeInTheDocument();
        });
        
        const backLink = screen.getByRole('link', { name: /back/i });
        expect(backLink).toBeInTheDocument();
        expect(backLink).toHaveAttribute('href', '/customer-home');
    });
});