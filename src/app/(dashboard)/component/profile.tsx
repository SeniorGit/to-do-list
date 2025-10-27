import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LogOut, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import { Task } from '@/types/typeTask';

export default function Profile(){
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = (): void => {
        logout();
        router.push('/signIn');
    };

    const completedTasks = filteredTasks.filter(task => task.is_completed).length;
    const totalTasks = filteredTasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const highPriorityTasks = filteredTasks.filter(task => task.priority === 'high').length;
    const getUserInitials = (username?: string) => {
        return username ? username.charAt(0).toUpperCase() : 'U';
    };
    return(
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
            <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-amber-900">
                <TrendingUp className="h-5 w-5" />
                <span>Your Progress</span>
                {selectedDate && (
                <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700">
                    Filtered
                </Badge>
                )}
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-amber-300 shadow-md">
                <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} />
                <AvatarFallback className="bg-amber-500 text-white text-lg font-bold">
                    {getUserInitials(user?.username)}
                </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                <p className="font-semibold text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 mt-1">
                    {completedTasks} tasks done
                </Badge>
                </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-semibold text-amber-700">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-2 bg-amber-200" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 rounded-lg bg-amber-50 border border-amber-200">
                <p className="font-bold text-amber-700 text-lg">{totalTasks}</p>
                <p className="text-xs text-amber-600">
                    {selectedDate ? 'Date Tasks' : 'Total Tasks'}
                </p>
                </div>
                <div className="text-center p-2 rounded-lg bg-red-50 border border-red-200">
                <p className="font-bold text-red-700 text-lg">{highPriorityTasks}</p>
                <p className="text-xs text-red-600">High Priority</p>
                </div>
            </div>
            
            <Button 
                variant="outline" 
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={handleLogout}
            >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
            </Button>
            </CardContent>
        </Card>

    )
}