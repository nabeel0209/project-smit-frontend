// Dummy data for the Creator Dashboard

export interface EarningsDataPoint {
  month: string;
  earnings: number;
}

export interface StatsData {
  id: string;
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  students: number;
  price: number;
  rating: number;
  published: boolean;
}

export interface Activity {
  id: string;
  type: 'enrollment' | 'payment' | 'review' | 'comment';
  message: string;
  timestamp: string;
  user?: string;
  course?: string;
}

export interface EngagementData {
  courseId: string;
  courseName: string;
  views: number;
  maxViews: number;
  likes: number;
  maxLikes: number;
  comments: number;
  maxComments: number;
}

// Monthly earnings data for chart
export const earningsData: EarningsDataPoint[] = [
  { month: 'Jan', earnings: 2400 },
  { month: 'Feb', earnings: 1398 },
  { month: 'Mar', earnings: 9800 },
  { month: 'Apr', earnings: 3908 },
  { month: 'May', earnings: 4800 },
  { month: 'Jun', earnings: 3800 },
  { month: 'Jul', earnings: 4300 },
  { month: 'Aug', earnings: 5600 },
  { month: 'Sep', earnings: 7200 },
  { month: 'Oct', earnings: 8100 },
  { month: 'Nov', earnings: 9400 },
  { month: 'Dec', earnings: 11200 },
];

// Summary statistics
export const statsData: StatsData[] = [
  {
    id: 'total-earnings',
    title: 'Total Earnings',
    value: '$71,908',
    icon: 'DollarSign',
    trend: '+12.5%',
    trendUp: true,
  },
  {
    id: 'monthly-earnings',
    title: 'This Month',
    value: '$11,200',
    icon: 'TrendingUp',
    trend: '+8.2%',
    trendUp: true,
  },
  {
    id: 'total-courses',
    title: 'Published Courses',
    value: '12',
    icon: 'BookOpen',
    trend: '+2',
    trendUp: true,
  },
  {
    id: 'total-students',
    title: 'Total Students',
    value: '3,847',
    icon: 'Users',
    trend: '+156',
    trendUp: true,
  },
  {
    id: 'engagement',
    title: 'Engagement Rate',
    value: '87%',
    icon: 'Activity',
    trend: '+5.3%',
    trendUp: true,
  },
];

// Published courses
export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Complete React & Next.js Masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    students: 1247,
    price: 89.99,
    rating: 4.8,
    published: true,
  },
  {
    id: '2',
    title: 'Advanced TypeScript for Professionals',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
    students: 892,
    price: 79.99,
    rating: 4.9,
    published: true,
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop',
    students: 634,
    price: 69.99,
    rating: 4.7,
    published: true,
  },
  {
    id: '4',
    title: 'MongoDB & Database Design',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop',
    students: 421,
    price: 59.99,
    rating: 4.6,
    published: true,
  },
  {
    id: '5',
    title: 'Full-Stack MERN Project Course',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop',
    students: 389,
    price: 129.99,
    rating: 4.9,
    published: true,
  },
  {
    id: '6',
    title: 'CSS & Tailwind Mastery',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
    students: 264,
    price: 49.99,
    rating: 4.5,
    published: true,
  },
];

// Recent activity
export const activityData: Activity[] = [
  {
    id: '1',
    type: 'enrollment',
    message: 'New student enrolled in React Masterclass',
    timestamp: '2 minutes ago',
    user: 'John D.',
    course: 'Complete React & Next.js Masterclass',
  },
  {
    id: '2',
    type: 'payment',
    message: 'Payment received: $89.99',
    timestamp: '15 minutes ago',
    user: 'Sarah M.',
    course: 'Complete React & Next.js Masterclass',
  },
  {
    id: '3',
    type: 'review',
    message: 'New 5-star review received',
    timestamp: '1 hour ago',
    user: 'Mike R.',
    course: 'Advanced TypeScript for Professionals',
  },
  {
    id: '4',
    type: 'comment',
    message: 'New comment on Lesson 5',
    timestamp: '2 hours ago',
    user: 'Emily C.',
    course: 'Node.js Backend Development',
  },
  {
    id: '5',
    type: 'enrollment',
    message: 'New student enrolled in TypeScript course',
    timestamp: '3 hours ago',
    user: 'David L.',
    course: 'Advanced TypeScript for Professionals',
  },
  {
    id: '6',
    type: 'payment',
    message: 'Payment received: $129.99',
    timestamp: '4 hours ago',
    user: 'Anna K.',
    course: 'Full-Stack MERN Project Course',
  },
  {
    id: '7',
    type: 'review',
    message: 'New 4-star review received',
    timestamp: '5 hours ago',
    user: 'Chris B.',
    course: 'MongoDB & Database Design',
  },
];

// Engagement data per course
export const engagementData: EngagementData[] = [
  {
    courseId: '1',
    courseName: 'React & Next.js Masterclass',
    views: 45200,
    maxViews: 50000,
    likes: 3420,
    maxLikes: 4000,
    comments: 892,
    maxComments: 1000,
  },
  {
    courseId: '2',
    courseName: 'Advanced TypeScript',
    views: 32100,
    maxViews: 50000,
    likes: 2890,
    maxLikes: 4000,
    comments: 654,
    maxComments: 1000,
  },
  {
    courseId: '3',
    courseName: 'Node.js Backend',
    views: 28400,
    maxViews: 50000,
    likes: 2120,
    maxLikes: 4000,
    comments: 478,
    maxComments: 1000,
  },
];
