export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  date: string;
  emoji?: string;
  likes?: number;
}

export interface RsvpSubmission {
  id: string;
  name: string;
  phone: string;
  attending: 'yes' | 'no' | 'maybe';
  guestCount: number;
  notes?: string;
  createdAt: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  subtitle: string;
  content: string;
  imageTag?: string;
}
