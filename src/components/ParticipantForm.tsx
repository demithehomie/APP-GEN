
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParticipantsStore, Participant } from '@/store/participantsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ParticipantFormProps {
  participantId?: string;
  isEditing?: boolean;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ participantId, isEditing = false }) => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    nota1: '',
    nota2: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { addParticipant, updateParticipant, getParticipant } = useParticipantsStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isEditing && participantId) {
      const participant = getParticipant(participantId);
      if (participant) {
        setFormData({
          nome: participant.nome,
          idade: participant.idade.toString(),
          nota1: participant.nota1.toString(),
          nota2: participant.nota2.toString()
        });
      } else {
        toast({
          title: "Erro",
          description: "Participante não encontrado.",
          variant: "destructive"
        });
        navigate('/participants');
      }
    }
  }, [isEditing, participantId, getParticipant, navigate, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { nome, idade, nota1, nota2 } = formData;
    
    if (!nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório.",
        variant: "destructive"
      });
      return false;
    }

    const idadeNum = parseInt(idade);
    if (isNaN(idadeNum) || idadeNum < 1 || idadeNum > 120) {
      toast({
        title: "Erro",
        description: "Idade deve ser um número entre 1 e 120.",
        variant: "destructive"
      });
      return false;
    }

    const nota1Num = parseFloat(nota1);
    const nota2Num = parseFloat(nota2);

    if (isNaN(nota1Num) || nota1Num < 0 || nota1Num > 10) {
      toast({
        title: "Erro",
        description: "Nota 1 deve ser um número entre 0 e 10.",
        variant: "destructive"
      });
      return false;
    }

    if (isNaN(nota2Num) || nota2Num < 0 || nota2Num > 10) {
      toast({
        title: "Erro",
        description: "Nota 2 deve ser um número entre 0 e 10.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const participantData = {
        nome: formData.nome.trim(),
        idade: parseInt(formData.idade),
        nota1: parseFloat(formData.nota1),
        nota2: parseFloat(formData.nota2)
      };

      if (isEditing && participantId) {
        updateParticipant(participantId, participantData);
        toast({
          title: "Sucesso",
          description: "Participante atualizado com sucesso!"
        });
      } else {
        addParticipant(participantData);
        toast({
          title: "Sucesso",
          description: "Participante adicionado com sucesso!"
        });
      }

      navigate('/participants');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar participante.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculatePreviewMedia = () => {
    const nota1 = parseFloat(formData.nota1);
    const nota2 = parseFloat(formData.nota2);
    
    if (!isNaN(nota1) && !isNaN(nota2)) {
      return ((nota1 + nota2) / 2).toFixed(1);
    }
    return '---';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Editar Participante' : 'Novo Participante'}
        </CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Atualize as informações do participante' 
            : 'Adicione um novo participante ao sistema'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Ex: João Silva Santos"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idade">Idade *</Label>
            <Input
              id="idade"
              type="number"
              placeholder="Ex: 25"
              min="1"
              max="120"
              value={formData.idade}
              onChange={(e) => handleInputChange('idade', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nota1">Nota 1 *</Label>
              <Input
                id="nota1"
                type="number"
                placeholder="0.0"
                min="0"
                max="10"
                step="0.1"
                value={formData.nota1}
                onChange={(e) => handleInputChange('nota1', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nota2">Nota 2 *</Label>
              <Input
                id="nota2"
                type="number"
                placeholder="0.0"
                min="0"
                max="10"
                step="0.1"
                value={formData.nota2}
                onChange={(e) => handleInputChange('nota2', e.target.value)}
                required
              />
            </div>
          </div>

          {(formData.nota1 && formData.nota2) && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Média calculada: <span className="font-bold text-foreground">{calculatePreviewMedia()}</span>
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading 
                ? (isEditing ? 'Atualizando...' : 'Salvando...') 
                : (isEditing ? 'Atualizar' : 'Salvar')
              }
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/participants')}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParticipantForm;
