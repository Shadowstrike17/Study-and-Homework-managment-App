import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AnalyticsData {
  weeklyStudyTime: { name: string; studyTime: number; tasks: number }[];
  taskDistribution: { name: string; value: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/analytics');
      
      // Ensure the data is serializable
      const serializableData = JSON.parse(JSON.stringify(response.data));
      
      setAnalyticsData(serializableData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to fetch analytics data. Please try again later.');
      toast.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!analyticsData) {
    return <div>No data available</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Analytics</h1>
      {/* Charts */}
    </div>
  );
};

export default Analytics;