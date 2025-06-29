
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ParticipantForm from '@/components/ParticipantForm';

const EditParticipant = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Editar Participante</h1>
          <p className="text-muted-foreground mt-1">
            Atualize as informações do participante
          </p>
        </div>

        <ParticipantForm participantId={id} isEditing={true} />
      </div>
    </div>
  );
};

export default EditParticipant;
