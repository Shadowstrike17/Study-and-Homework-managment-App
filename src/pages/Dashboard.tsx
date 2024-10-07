import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Calendar, CheckSquare, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Welcome, {user?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Upcoming Tasks"
          icon={<CheckSquare className="text-primary" size={24} />}
          count={5}
        />
        <DashboardCard
          title="Today's Schedule"
          icon={<Calendar className="text-primary" size={24} />}
          count={3}
        />
        <DashboardCard
          title="Study Time Today"
          icon={<Clock className="text-primary" size={24} />}
          count={120}
          unit="min"
        />
      </div>
      {/* Add more dashboard components here */}
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  unit?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, count, unit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {icon}
      </div>
      <p className="text-3xl font-bold text-primary">
        {count}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </p>
    </div>
  );
};

export default Dashboard;