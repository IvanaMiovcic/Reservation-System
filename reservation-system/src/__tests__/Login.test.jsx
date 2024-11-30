import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login'

describe('Login Component', () => {
    const renderLogin = () => {
        return render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
    }

    it('renders login form', () => {
        renderLogin()
        // Look for the text content instead of heading role
        expect(screen.getByText('Login')).toBeInTheDocument()
    })

    it('renders email and password inputs', () => {
        renderLogin()
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    })

    it('renders continue button', () => {
        renderLogin()
        expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
    })

    it('renders create account link', () => {
        renderLogin()
        expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
    })

    // Test form validation
    it('shows validation error for invalid email', async () => {
        renderLogin()
        const emailInput = screen.getByPlaceholderText('Email')
        const submitButton = screen.getByRole('button', { name: /continue/i })

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.click(submitButton)

        // Wait for the validation error message
        expect(await screen.findByText(/email should be in a valid format/i)).toBeInTheDocument()
    })
})