import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../context/useAuth';

interface CreateCaseModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

function CreateCaseModal({ onClose, onSuccess }: CreateCaseModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('low');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {token} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Name is required');
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post('http://localhost:8000/api/cases', 
                { name, description, severity },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            onSuccess();
            onClose();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.error || 'Failed to create case');
            } else {
                setError('Network error');
            }
        } finally {
          setIsSubmitting(false);
        }
    };

    return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={onClose}
        >
          <div
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '8px',
              minWidth: '400px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>New Case</h2>
            
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...': 'Create'}
                </button>
              <button type="button" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            </form>
          </div>
        </div>
      );
    }

export default CreateCaseModal;

