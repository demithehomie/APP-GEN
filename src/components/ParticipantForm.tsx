import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { APIURLDEV } from '@/services/apiService';

interface ParticipantFormProps {
  participantId?: string;
  isEditing?: boolean;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ participantId, isEditing = false }) => {
  const [formData, setFormData] = useState({ nome: '', idade: '', nota1: '', nota2: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Carrega dados para edição
  useEffect(() => {
    if (isEditing && participantId) {
      (async () => {
        setLoading(true);
        try {
          const resp = await axios.get(`${APIURLDEV}/api/participants/${participantId}`);
          const data = resp.data;
          setFormData({
            nome: data.full_name,
            idade: data.age.toString(),
            nota1: data.first_semester.toString(),
            nota2: data.second_semester.toString(),
          });
        } catch (err) {
          toast({ title: 'Erro', description: 'Participante não encontrado.', variant: 'destructive' });
          navigate('/participants');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isEditing, participantId, navigate, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { nome, idade, nota1, nota2 } = formData;
    if (!nome.trim()) {
      toast({ title: 'Erro', description: 'Nome é obrigatório.', variant: 'destructive' });
      return false;
    }
    const idadeNum = parseInt(idade);
    if (isNaN(idadeNum) || idadeNum < 1 || idadeNum > 120) {
      toast({ title: 'Erro', description: 'Idade deve ser entre 1 e 120.', variant: 'destructive' });
      return false;
    }
    const nota1Num = parseFloat(nota1);
    const nota2Num = parseFloat(nota2);
    if (isNaN(nota1Num) || nota1Num < 0 || nota1Num > 10) {
      toast({ title: 'Erro', description: 'Nota 1 deve ser entre 0 e 10.', variant: 'destructive' });
      return false;
    }
    if (isNaN(nota2Num) || nota2Num < 0 || nota2Num > 10) {
      toast({ title: 'Erro', description: 'Nota 2 deve ser entre 0 e 10.', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const payload = {
      full_name: formData.nome.trim(),
      age: parseInt(formData.idade),
      first_semester: parseFloat(formData.nota1),
      second_semester: parseFloat(formData.nota2),
    };

    try {
      if (isEditing && participantId) {
        await axios.put(`${APIURLDEV}/api/participants/${participantId}`, payload);
      } else {
        await axios.post(APIURLDEV+'/api/participants', payload);
      }
      toast({
        title: 'Sucesso',
        description: isEditing
          ? 'Participante atualizado com sucesso!'
          : 'Participante adicionado com sucesso!',
      });
      navigate('/participants');
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao salvar participante.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Editar Participante' : 'Novo Participante'}</CardTitle>
        <CardDescription>
          {isEditing
            ? 'Atualize as informações do participante'
            : 'Adicione um novo participante ao sistema'}
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
              onChange={e => handleInputChange('nome', e.target.value)}
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
              onChange={e => handleInputChange('idade', e.target.value)}
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
                onChange={e => handleInputChange('nota1', e.target.value)}
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
                onChange={e => handleInputChange('nota2', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (isEditing ? 'Atualizando...' : 'Salvando...') : isEditing ? 'Atualizar' : 'Salvar'}
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
