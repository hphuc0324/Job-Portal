export interface User {
  id: string;
  name: string;
  job?: string;
  location?: string;
  experience?: string;
  avatarUrl?: string;
  role: string;
  description?: string;
  skills?: string;
}

export interface Experience {
  id?: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isCurrentlyWorking: boolean;
  company: User;
  location: string;
}

export interface Job {
  title: string;
  location: string;
  slug: string;
  type: 'fulltime' | 'partime';
  salary: number;
  description: string;
  status: string;
  level: string;
  experience: number;
  company: User;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
