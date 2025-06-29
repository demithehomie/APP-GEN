
import { create } from 'zustand';

export interface Participant {
  id: string;
  nome: string;
  idade: number;
  nota1: number;
  nota2: number;
  media: number;
}

interface ParticipantsState {
  participants: Participant[];
  addParticipant: (participant: Omit<Participant, 'id' | 'media'>) => void;
  updateParticipant: (id: string, participant: Omit<Participant, 'id' | 'media'>) => void;
  deleteParticipant: (id: string) => void;
  getParticipant: (id: string) => Participant | undefined;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const calculateMedia = (nota1: number, nota2: number): number => {
  return Number(((nota1 + nota2) / 2).toFixed(1));
};

const mockParticipants: Participant[] = [
  {
    id: '1',
    nome: 'Ana Silva Santos',
    idade: 25,
    nota1: 8.5,
    nota2: 9.0,
    media: calculateMedia(8.5, 9.0)
  },
  {
    id: '2',
    nome: 'João Pedro Oliveira',
    idade: 30,
    nota1: 7.5,
    nota2: 8.5,
    media: calculateMedia(7.5, 8.5)
  },
  {
    id: '3',
    nome: 'Maria Fernanda Costa',
    idade: 28,
    nota1: 9.0,
    nota2: 9.5,
    media: calculateMedia(9.0, 9.5)
  }
];

export const useParticipantsStore = create<ParticipantsState>((set, get) => ({
  participants: [],

  addParticipant: (participantData) => {
    const newParticipant: Participant = {
      ...participantData,
      id: Date.now().toString(),
      media: calculateMedia(participantData.nota1, participantData.nota2)
    };

    set((state) => ({
      participants: [...state.participants, newParticipant]
    }));
    
    get().saveToStorage();
  },

  updateParticipant: (id, participantData) => {
    const updatedParticipant: Participant = {
      ...participantData,
      id,
      media: calculateMedia(participantData.nota1, participantData.nota2)
    };

    set((state) => ({
      participants: state.participants.map(p => 
        p.id === id ? updatedParticipant : p
      )
    }));
    
    get().saveToStorage();
  },

  deleteParticipant: (id) => {
    set((state) => ({
      participants: state.participants.filter(p => p.id !== id)
    }));
    
    get().saveToStorage();
  },

  getParticipant: (id) => {
    return get().participants.find(p => p.id === id);
  },

  loadFromStorage: () => {
    const stored = localStorage.getItem('participants');
    if (stored) {
      try {
        const participants = JSON.parse(stored);
        set({ participants });
      } catch (error) {
        console.error('Erro ao carregar participantes do localStorage:', error);
        set({ participants: mockParticipants });
        get().saveToStorage();
      }
    } else {
      // Carregar dados mockados na primeira vez
      set({ participants: mockParticipants });
      get().saveToStorage();
    }
  },

  saveToStorage: () => {
    const { participants } = get();
    localStorage.setItem('participants', JSON.stringify(participants));
  }
}));
