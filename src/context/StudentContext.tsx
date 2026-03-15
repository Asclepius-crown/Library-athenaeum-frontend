/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import api from "../api/axiosClient";
import { StudentProfile } from "../types/index";

interface StudentContextType {
  students: StudentProfile[];
  loading: boolean;
  error: string;
  fetchStudents: () => Promise<void>;
  addStudent: (student: StudentProfile) => Promise<void>;
  updateStudent: (rollNo: string, updatedData: Partial<StudentProfile>) => Promise<void>;
  deleteStudent: (rollNo: string) => Promise<void>;
  fetchStudentById: (id: string) => Promise<StudentProfile | undefined>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);
export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};

interface StudentProviderProps {
  children: React.ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchStudents = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch {
      setError("Failed to fetch students");
    }
    setLoading(false);
  };

  const addStudent = async (student: StudentProfile): Promise<void> => {
    try {
      const res = await api.post("/students", student);
      setStudents((prev) => [...prev, res.data]);
    } catch {
      setError("Failed to add student");
    }
  };

  const updateStudent = async (rollNo: string, updatedData: Partial<StudentProfile>): Promise<void> => {
    try {
      const res = await api.put(`/students/${rollNo}`, updatedData);
      setStudents((prev) => prev.map((s) => s.rollNo === rollNo ? res.data : s));
    } catch {
      setError("Failed to update student");
    }
  };

  const deleteStudent = async (rollNo: string): Promise<void> => {
    if (!window.confirm("Delete student?")) return;
    try {
      await api.delete(`/students/${rollNo}`);
      setStudents((prev) => prev.filter((s) => s.rollNo !== rollNo));
    } catch {
      setError("Failed to delete student");
    }
  };

  const fetchStudentById = async (id: string): Promise<StudentProfile | undefined> => {
    setLoading(true);
    try {
      const res = await api.get(`/students/${id}`);
      return res.data;
    } catch {
      setError("Failed to fetch student");
    } finally {
      setLoading(false);
    }
  };

  // fetchStudents is NOT called automatically on mount.
  // Only admin components should call fetchStudents() explicitly,
  // to avoid firing admin-only API requests for unauthenticated or student users.

  return (
    <StudentContext.Provider value={{ students, loading, error, fetchStudents, addStudent, updateStudent, deleteStudent, fetchStudentById }}>
      {children}
    </StudentContext.Provider>
  );
};
