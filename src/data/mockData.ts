export const doctorImages = [
    'https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    'https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    'https://images.unsplash.com/photo-1755190897791-7040dfdb988f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    'https://images.unsplash.com/photo-1675526607070-f5cbd71dde92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    'https://images.unsplash.com/photo-1659353887977-c310d90c751a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    'https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
];

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    reviews: number;
    experience: number;
    bio: string;
    hospital: string;
    fee: number;
    available: boolean;
    availableSlots: string[];
}

export interface Appointment {
    id: string;
    doctorId: string;
    doctorName: string;
    doctorImage: string;
    specialty: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    type: 'Video Call' | 'In-Person';
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'appointment' | 'reminder' | 'system';
}

export const categories = [
    { id: '1', name: 'General', icon: 'Stethoscope', color: '#2F80ED' },
    { id: '2', name: 'Dentist', icon: 'SmilePlus', color: '#27AE60' },
    { id: '3', name: 'Eye', icon: 'Eye', color: '#F2994A' },
    { id: '4', name: 'Heart', icon: 'Heart', color: '#EB5757' },
    { id: '5', name: 'Brain', icon: 'Brain', color: '#9B51E0' },
    { id: '6', name: 'Bone', icon: 'Bone', color: '#56CCF2' },
    { id: '7', name: 'Skin', icon: 'Sparkles', color: '#F2C94C' },
    { id: '8', name: 'Lungs', icon: 'Wind', color: '#6FCF97' },
];

export const doctors: Doctor[] = [
    {
        id: '1',
        name: 'د. سارة المصري',
        specialty: 'Cardiologist',
        image: doctorImages[1],
        rating: 4.9,
        reviews: 234,
        experience: 12,
        bio: 'د. سارة المصري طبيبة قلب معتمدة بخبرة تزيد عن 12 عامًا في علاج أمراض القلب. متخصصة في الطب الوقائي للقلب وإدارة قصور القلب.',
        hospital: 'مستشفى القلب - القاهرة',
        fee: 500,
        available: true,
        availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    },
    {
        id: '2',
        name: 'د. أحمد حسن',
        specialty: 'Dermatologist',
        image: doctorImages[0],
        rating: 4.8,
        reviews: 187,
        experience: 8,
        bio: 'د. أحمد حسن طبيب جلدية متخصص في صحة البشرة وعلاج حب الشباب وإجراءات التجميل الجلدية.',
        hospital: 'عيادة الجلدية - الإسكندرية',
        fee: 400,
        available: true,
        availableSlots: ['09:30', '10:30', '13:00', '14:30', '16:00'],
    },
    {
        id: '3',
        name: 'د. فاطمة عبد الرحمن',
        specialty: 'Neurologist',
        image: doctorImages[3],
        rating: 4.7,
        reviews: 156,
        experience: 15,
        bio: 'د. فاطمة عبد الرحمن طبيبة أعصاب رائدة بخبرة في علاج الاضطرابات العصبية والصداع والصرع.',
        hospital: 'مركز المخ والأعصاب - الجيزة',
        fee: 600,
        available: true,
        availableSlots: ['08:00', '09:00', '11:00', '13:00', '15:00'],
    },
    {
        id: '4',
        name: 'د. محمد خالد',
        specialty: 'Orthopedic',
        image: doctorImages[4],
        rating: 4.6,
        reviews: 203,
        experience: 10,
        bio: 'د. محمد خالد متخصص في جراحة العظام والطب الرياضي، يساعد المرضى على التعافي من الإصابات وتحسين الحركة.',
        hospital: 'مركز العظام - المنصورة',
        fee: 450,
        available: false,
        availableSlots: [],
    },
    {
        id: '5',
        name: 'د. نورا إبراهيم',
        specialty: 'Pediatrician',
        image: doctorImages[5],
        rating: 4.9,
        reviews: 312,
        experience: 14,
        bio: 'د. نورا إبراهيم طبيبة أطفال حنونة مكرسة لتقديم رعاية صحية ممتازة للأطفال من جميع الأعمار.',
        hospital: 'مستشفى الأطفال - القاهرة',
        fee: 350,
        available: true,
        availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    },
    {
        id: '6',
        name: 'د. عمر يوسف',
        specialty: 'General Physician',
        image: doctorImages[2],
        rating: 4.5,
        reviews: 145,
        experience: 7,
        bio: 'د. عمر يوسف طبيب عام ذو خبرة يقدم خدمات الرعاية الأولية الشاملة.',
        hospital: 'مستشفى النيل العام - القاهرة',
        fee: 250,
        available: true,
        availableSlots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    },
];

export const appointments: Appointment[] = [
    {
        id: '1',
        doctorId: '1',
        doctorName: 'د. سارة الامصري',
        doctorImage: doctorImages[1],
        specialty: 'Cardiologist',
        date: 'Mar 2, 2026',
        time: '10:00 AM',
        status: 'upcoming',
        type: 'Video Call',
    },
    {
        id: '2',
        doctorId: '5',
        doctorName: 'د. نورا إبراهيم',
        doctorImage: doctorImages[5],
        specialty: 'Pediatrician',
        date: 'Mar 5, 2026',
        time: '2:00 PM',
        status: 'upcoming',
        type: 'In-Person',
    },
    {
        id: '3',
        doctorId: '2',
        doctorName: 'د. أحمد حسن',
        doctorImage: doctorImages[0],
        specialty: 'Dermatologist',
        date: 'Feb 20, 2026',
        time: '11:00 AM',
        status: 'completed',
        type: 'Video Call',
    },
    {
        id: '4',
        doctorId: '3',
        doctorName: 'د. فاطمة عبد الرحمن',
        doctorImage: doctorImages[3],
        specialty: 'Neurologist',
        date: 'Feb 15, 2026',
        time: '9:00 AM',
        status: 'cancelled',
        type: 'In-Person',
    },
];

export const notifications: Notification[] = [
    {
        id: '1',
        title: 'Appointment Reminder',
        message: 'Your appointment with د. سارة المصري is tomorrow at 10:00 AM',
        time: '1 hour ago',
        read: false,
        type: 'reminder',
    },
    {
        id: '2',
        title: 'Booking Confirmed',
        message: 'Your appointment with د. نورا إبراهيم has been confirmed for Mar 5',
        time: '3 hours ago',
        read: false,
        type: 'appointment',
    },
    {
        id: '3',
        title: 'New Feature Available',
        message: 'You can now chat with your doctor directly through the app',
        time: '1 day ago',
        read: true,
        type: 'system',
    },
    {
        id: '4',
        title: 'Review Reminder',
        message: 'How was your visit with د. أحمد حسن? Leave a review!',
        time: '2 days ago',
        read: true,
        type: 'system',
    },
];

export const reviews = [
    { id: '1', name: 'محمود أ.', rating: 5, comment: 'دكتور ممتاز! دقيق جدا ومهتم بالمريض.', date: 'Feb 25, 2026' },
    { id: '2', name: 'هدى س.', rating: 4, comment: 'محترف جدا. شرح كل شيء بوضوح.', date: 'Feb 20, 2026' },
    { id: '3', name: 'كريم م.', rating: 5, comment: 'أنصح بشدة! تعامل ممتاز مع المرضى.', date: 'Feb 18, 2026' },
];
