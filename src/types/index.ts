// API Response Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  rollNo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  _id: string;
  userId: string;
  rollNo: string;
  name: string;
  email: string;
  department: string;
  yearOfStudy: string;
  admissionYear: string;
  wishlist: string[]; // Array of book IDs
  readingStreak: number;
  totalBooksRead: number;
  favoriteGenres: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  description: string;
  publishedYear: number;
  publisher: string;
  coverImage?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  totalCopies: number;
  availableCopies: number;
  location?: string;
  status: 'Available' | 'Borrowed';
  borrower?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupedBook extends Omit<Book, '_id'> {
  _id: string;
  availableCopies: number;
  copies?: any[];
  derivedStatus?: string;
  copyIds?: string[];
}

export interface BorrowedRecord {
  _id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  returnStatus: 'Borrowed' | 'Returned' | 'Overdue';
  fineAmount?: string | number;
  isPaymentEnabled?: boolean;
  isFinePaid?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

// API Error Type
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  borrowedCount: number;
  overdueCount: number;
  timeline: Array<{
    _id: string;
    count: number;
  }>;
  genreStats: Array<{
    _id: string;
    count: number;
  }>;
}

// Student Data for forms
export interface StudentData {
  name: string;
  department: string;
  yearOfStudy: string;
  admissionYear: string;
  email: string;
}

// New Book Data
export interface NewBookData {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  description: string;
  publishedYear: number;
  publisher: string;
  coverImage?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  publishedCount: number;
  status: string;
  height: number;
  totalCopies: number;
  availableCopies: number;
  location?: string;
}