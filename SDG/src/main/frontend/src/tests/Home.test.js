import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockedUsedNavigate,
}))

describe('Home Component', () => {
  test('renders site title and buttons', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText(/SDG LearningHub/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test('renders hero section and image', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText(/Empowering Students for a Sustainable Future/i)).toBeInTheDocument();
    
    const heroImage = screen.getByAltText(/Sustainability Illustration/i);
    expect(heroImage).toBeInTheDocument();
  });

  test('renders feature sections with images', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText(/Personalized Dashboard/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Dashboard/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Interactive Comic Book Modules/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Comic Book Module/i)).toBeInTheDocument();
  });

  test('navigates to login page on login button click', () => {
    renderWithRouter(<Home />);
    
    const loginButton = screen.getByText(/Log in/i);
    
    userEvent.click(loginButton);
    
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');

    
  });

  test('navigates to register page on sign up button click', () => {
    renderWithRouter(<Home />);
    
    const registerButton = screen.getByText(/Sign Up/i);
    
    userEvent.click(registerButton);
    
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/register');

  });
});
