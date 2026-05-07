import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react"
import CreateCaseModal from '../components/CreateCaseModal';

interface Case {
  id: number;
  name: string;
  description: string | null;
  severity: string;
  status: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

function DashboardPage() {
  const [cases, setCases] = useState<Case[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {token} = useAuth();
  const fetchCases = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cases', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCases(response.data);

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Failed to fetch cases');
      } else {
        setError('Network error');
      }
      
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCases();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>New Case</button>

      {cases?.map(c => ( 
        <div key={c.id}>
          <strong>{c.name}</strong> - {c.severity} - {c.status}
        </div>
      ))}

      {isModalOpen && (
        <CreateCaseModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchCases}
          />
        )}
      </div>
    );
}
  export default DashboardPage;