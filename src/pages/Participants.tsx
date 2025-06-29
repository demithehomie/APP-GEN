
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParticipantsStore } from '@/store/participantsStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const Participants = () => {
  const { participants, loadFromStorage, deleteParticipant } = useParticipantsStore();
  const { toast } = useToast();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleDelete = (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir ${nome}?`)) {
      deleteParticipant(id);
      toast({
        title: "Participante excluído",
        description: `${nome} foi removido com sucesso.`
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
            <Link to="/participants/new">
              Adicionar Participante
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Participantes ({participants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {participants.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum participante cadastrado ainda.</p>
                <Button asChild className="mt-4">
                  <Link to="/participants/new">
                    Adicionar Primeiro Participante
                  </Link>
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
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-mono text-sm">
                          {participant.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {participant.nome}
                        </TableCell>
                        <TableCell>{participant.idade} anos</TableCell>
                        <TableCell>{participant.nota1.toFixed(1)}</TableCell>
                        <TableCell>{participant.nota2.toFixed(1)}</TableCell>
                        <TableCell>
                          <Badge className={getMediaColor(participant.media)}>
                            {participant.media.toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link to={`/participants/${participant.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(participant.id, participant.nome)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
