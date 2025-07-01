import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { APIURLDEV } from '@/services/apiService';

interface RawParticipant {
  id: string;
  full_name: string;
  age: number;
  first_semester: string;   // vem como string
  second_semester: string;  // vem como string
  final_average: string;    // idem
  created_at: string;
  updated_at: string;
}

interface Participant {
  id: string;
  full_name: string;
  age: number;
  first_semester: number;
  second_semester: number;
  final_average: number;
}

const Participants: React.FC = () => {
  // Agora guardamos Participant[], não RawParticipant[]
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const api = APIURLDEV;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // busco RawParticipant[]
        const resp = await axios.get<RawParticipant[]>(`${api}/api/participants`);
        // converto para Participant[]
        const parsed: Participant[] = resp.data.map(r => ({
          id: r.id,
          full_name: r.full_name,
          age: r.age,
          first_semester: parseFloat(r.first_semester),
          second_semester: parseFloat(r.second_semester),
          final_average: parseFloat(r.final_average),
        }));
        setParticipants(parsed);
      } catch {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar participantes.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [api, toast]);

  const handleDelete = async (id: string, nome: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir ${nome}?`)) return;
    try {
      await axios.delete(`${api}/api/participants/${id}`);
      setParticipants(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Participante excluído', description: `${nome} removido.` });
    } catch {
      toast({
        title: 'Erro',
        description: 'Falha ao excluir participante.',
        variant: 'destructive',
      });
    }
  };

  const getMediaColor = (media: number) => {
    if (media >= 9) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (media >= 7) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Participantes</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os participantes e suas notas
            </p>
          </div>
          <Button asChild>
            <Link to="/participants/new">Adicionar Participante</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Lista de Participantes ({loading ? '...' : participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {participants.length === 0 && !loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum participante cadastrado.</p>
                <Button asChild className="mt-4">
                  <Link to="/participants/new">Adicionar Primeiro</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>Nota 1</TableHead>
                      <TableHead>Nota 2</TableHead>
                      <TableHead>Média</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map(p => {
                      const media = (p.first_semester + p.second_semester) / 2;
                      return (
                        <TableRow key={p.id}>
                          <TableCell className="font-mono text-sm">{p.id}</TableCell>
                          <TableCell className="font-medium">{p.full_name}</TableCell>
                          <TableCell>{p.age} anos</TableCell>
                          <TableCell>{p.first_semester.toFixed(1)}</TableCell>
                          <TableCell>{p.second_semester.toFixed(1)}</TableCell>
                          <TableCell>
                            <Badge className={getMediaColor(media)}>
                              {media.toFixed(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/participants/${p.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(p.id, p.full_name)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Participants;
