
import Navigation from '@/components/Navigation';
import ParticipantForm from '@/components/ParticipantForm';

const NewParticipant = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Novo Participante</h1>
          <p className="text-muted-foreground mt-1">
            Adicione um novo participante ao sistema
          </p>
        </div>

        <ParticipantForm />
      </div>
    </div>
  );
};

export default NewParticipant;
