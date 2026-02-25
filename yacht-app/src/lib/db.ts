import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const sql = neon(process.env.DATABASE_URL);

// Type definitions for our data models
export interface Yacht {
  id: number;
  name: string;
  hin: string;
  model: string;
  manufacturer: string;
  year: number;
  length_meters: number;
  engine_type: string;
  owner_name: string;
  owner_email: string;
  health_score: number;
  status: 'active' | 'maintenance' | 'offline';
  created_at: string;
}

export interface Alert {
  id: number;
  yacht_id: number;
  yacht_name: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  component: string;
  resolved: boolean;
  created_at: string;
}

export interface MaintenanceRecord {
  id: number;
  yacht_id: number;
  yacht_name: string;
  type: string;
  description: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  technician: string;
  cost: number;
  scheduled_date: string;
  completed_date?: string;
}

export interface SensorReading {
  id: number;
  yacht_id: number;
  sensor_type: string;
  value: number;
  unit: string;
  recorded_at: string;
}
