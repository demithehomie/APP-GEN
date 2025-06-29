
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      default: return '💻';
    }
  };

  if (!currentUser) return null;

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/participants" className="text-xl font-bold text-primary">
              ParticipantePal
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/participants" 
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Participantes
              </Link>
              <Link 
                to="/participants/new" 
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Adicionar
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {currentUser.email}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-lg"
              title={`Tema atual: ${theme}`}
            >
              {getThemeIcon()}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
