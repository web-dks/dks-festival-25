import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pxbjfvqketvghoivtjwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YmpmdnFrZXR2Z2hvaXZ0and5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTEwMDUsImV4cCI6MjA1OTE4NzAwNX0.xTMQRHUYuRgmhSjcld7b6cMxb9XHJDJ8ZyYqb-Ig_iY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Participante {
  uuid: string;
  primeiro_nome: string;
  email: string | null;
  telefone: number;
  brinde_recebido: boolean;
  jogou_quebra_cabeca: boolean;
  jogou_jogo_dados: boolean;
  created_at: string | null;
}

