
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityDataPoint {
  date: string;
  gamesCreated: number;
  gamesPlayed: number;
  activeUsers: number;
}

interface ActivityChartProps {
  data: ActivityDataPoint[];
  title?: string;
}

export function ActivityChart({ data, title = "Activity Overview" }: ActivityChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="gamesCreated" 
                name="Games Created" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="gamesPlayed" 
                name="Games Played" 
                stroke="#82ca9d" 
              />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                name="Active Users" 
                stroke="#ffc658" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivityChart;
