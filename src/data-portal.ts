export type Member = {
  id: number
  firstName: string
  lastName: string
  name: string
  role: 'Primary' | 'Partner' | 'Dependant'
  status: 'Active'
  memberNumber: string
  memberId: string
  validThrough: string
  photo: string
}

export const FAMILY: Member[] = [
  {
    id: 1,
    firstName: 'Marcus',
    lastName: 'Delgado',
    name: 'Marcus Delgado',
    role: 'Primary',
    status: 'Active',
    memberNumber: '618',
    memberId: '2941736',
    validThrough: '03/2027',
    photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 2,
    firstName: 'Priya',
    lastName: 'Delgado',
    name: 'Priya Delgado',
    role: 'Partner',
    status: 'Active',
    memberNumber: '618.2',
    memberId: '2957318',
    validThrough: '03/2027',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 3,
    firstName: 'Isla',
    lastName: 'Delgado',
    name: 'Isla Delgado',
    role: 'Dependant',
    status: 'Active',
    memberNumber: '618.3',
    memberId: '2903482',
    validThrough: '03/2027',
    photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 4,
    firstName: 'Noah',
    lastName: 'Delgado',
    name: 'Noah Delgado',
    role: 'Dependant',
    status: 'Active',
    memberNumber: '618.1',
    memberId: '2968057',
    validThrough: '03/2027',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
  },
]

export const RECENT_VISITS = [
  { who: 'Marcus', facility: 'Goodlife Health Club — Sandringham', when: 'Today, 6:42 AM' },
  { who: 'Priya', facility: 'Bayside Aquatic Centre', when: 'Yesterday, 5:30 PM' },
  { who: 'Marcus', facility: 'Fitness First — Bourke St', when: 'Mon, 19 May, 7:15 AM' },
  { who: 'Noah', facility: 'YMCA — Aspendale Gardens', when: 'Sat, 17 May, 10:02 AM' },
]

export const NOTIFICATIONS = [
  {
    date: '19-Jan-2026 08:02',
    text: 'Your employer has verified your membership!',
    kind: 'success' as const,
    unread: true,
  },
  {
    date: '15-Jan-2026 14:21',
    text: 'Titanium plan renewal scheduled for 02-Feb. $70.00 will be debited from your account.',
    kind: 'info' as const,
    unread: true,
  },
  { date: '13-Oct-2025 11:59', text: 'Your employer has verified your membership!', kind: 'success' as const },
  { date: '14-Feb-2025 09:47', text: 'Your employer has verified your membership!', kind: 'success' as const },
  { date: '09-Jan-2025 10:03', text: 'Your employer has verified your membership!', kind: 'success' as const },
  {
    date: '08-Jan-2025 12:07',
    text: 'Your profile has been created in the Fitness Passport system.',
    kind: 'info' as const,
  },
]

export const PAYMENT_HISTORY = [
  { from: '19-May-2026', to: '02-Jun-2026', amount: 70.0, ref: 'INV-2026-114' },
  { from: '05-May-2026', to: '19-May-2026', amount: 70.0, ref: 'INV-2026-098' },
  { from: '21-Apr-2026', to: '05-May-2026', amount: 70.0, ref: 'INV-2026-082' },
  { from: '07-Apr-2026', to: '21-Apr-2026', amount: 70.0, ref: 'INV-2026-066' },
  { from: '24-Mar-2026', to: '07-Apr-2026', amount: 70.0, ref: 'INV-2026-050' },
  { from: '10-Mar-2026', to: '24-Mar-2026', amount: 70.0, ref: 'INV-2026-034' },
]
