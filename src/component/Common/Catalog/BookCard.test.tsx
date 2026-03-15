import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookCard from './BookCard';
import { Book } from '../../../types';

// Mock useAuth and useToast
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ user: { role: 'student' } }),
}));

vi.mock('./useToast', () => ({
  default: () => ({ addToast: vi.fn() }),
}));

describe('BookCard', () => {
  const mockBook: Book = {
    _id: '1',
    title: 'Test Book',
    author: 'Test Author',
    genre: 'Fiction',
    description: 'Test description',
    publishedYear: 2023,
    publisher: 'Test Publisher',
    imageUrl: 'test.jpg',
    isFeatured: false,
    totalCopies: 5,
    availableCopies: 3,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    isbn: '1234567890',
    status: 'Available',
  };

  it('should render book details', () => {
    render(<BookCard book={mockBook} onClick={vi.fn()} onHover={vi.fn()} isActive={false} isAdmin={false} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', () => {
    const onClick = vi.fn();
    render(<BookCard book={mockBook} onClick={onClick} onHover={vi.fn()} isActive={false} isAdmin={false} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledWith(mockBook);
  });

  it('should be keyboard accessible', () => {
    render(<BookCard book={mockBook} onClick={vi.fn()} onHover={vi.fn()} isActive={false} isAdmin={false} />);

    const card = screen.getByRole('button');
    card.focus();
    expect(document.activeElement).toBe(card);
  });
});