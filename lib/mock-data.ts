export interface Donor {
  id: string
  name: string
  email: string
  phone: string
  bloodType: string
  dateOfBirth: string
  lastDonation: string | null
  isEligible: boolean
  totalDonations: number
}

export interface Donation {
  id: string
  donorId: string
  donorName: string
  bloodType: string
  quantity: number
  date: string
  status: "completed" | "pending" | "rejected"
  workerId: string
}

export interface BloodTest {
  id: string
  donorId: string
  donorName: string
  hemoglobin: number
  hiv: "negative" | "positive"
  hepatitisB: "negative" | "positive"
  hepatitisC: "negative" | "positive"
  malaria: "negative" | "positive"
  date: string
  result: "pass" | "fail"
}

export interface BloodInventory {
  bloodType: string
  units: number
  lastUpdated: string
  status: "critical" | "low" | "adequate" | "surplus"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  date: string
  read: boolean
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: "worker" | "donor"
  content: string
  timestamp: string
}

export interface AuditLog {
  id: string
  action: string
  userId: string
  userName: string
  userRole: string
  timestamp: string
  details: string
}

export const donors: Donor[] = [
  {
    id: "d1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 234 567 8901",
    bloodType: "A+",
    dateOfBirth: "1985-03-15",
    lastDonation: "2024-01-15",
    isEligible: true,
    totalDonations: 12,
  },
  {
    id: "d2",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 234 567 8902",
    bloodType: "O-",
    dateOfBirth: "1990-07-22",
    lastDonation: "2024-02-28",
    isEligible: false,
    totalDonations: 8,
  },
  {
    id: "d3",
    name: "David Johnson",
    email: "david.j@email.com",
    phone: "+1 234 567 8903",
    bloodType: "B+",
    dateOfBirth: "1988-11-10",
    lastDonation: "2023-12-01",
    isEligible: true,
    totalDonations: 15,
  },
  {
    id: "d4",
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    phone: "+1 234 567 8904",
    bloodType: "AB+",
    dateOfBirth: "1992-05-18",
    lastDonation: null,
    isEligible: true,
    totalDonations: 0,
  },
  {
    id: "d5",
    name: "Michael Brown",
    email: "michael.b@email.com",
    phone: "+1 234 567 8905",
    bloodType: "O+",
    dateOfBirth: "1978-09-30",
    lastDonation: "2024-03-10",
    isEligible: true,
    totalDonations: 25,
  },
]

export const donations: Donation[] = [
  {
    id: "don1",
    donorId: "d1",
    donorName: "John Smith",
    bloodType: "A+",
    quantity: 450,
    date: "2024-01-15",
    status: "completed",
    workerId: "w1",
  },
  {
    id: "don2",
    donorId: "d2",
    donorName: "Maria Garcia",
    bloodType: "O-",
    quantity: 450,
    date: "2024-02-28",
    status: "completed",
    workerId: "w1",
  },
  {
    id: "don3",
    donorId: "d3",
    donorName: "David Johnson",
    bloodType: "B+",
    quantity: 450,
    date: "2024-03-05",
    status: "pending",
    workerId: "w2",
  },
  {
    id: "don4",
    donorId: "d5",
    donorName: "Michael Brown",
    bloodType: "O+",
    quantity: 450,
    date: "2024-03-10",
    status: "completed",
    workerId: "w1",
  },
]

export const bloodTests: BloodTest[] = [
  {
    id: "bt1",
    donorId: "d1",
    donorName: "John Smith",
    hemoglobin: 14.5,
    hiv: "negative",
    hepatitisB: "negative",
    hepatitisC: "negative",
    malaria: "negative",
    date: "2024-01-15",
    result: "pass",
  },
  {
    id: "bt2",
    donorId: "d2",
    donorName: "Maria Garcia",
    hemoglobin: 11.2,
    hiv: "negative",
    hepatitisB: "negative",
    hepatitisC: "negative",
    malaria: "negative",
    date: "2024-02-28",
    result: "fail",
  },
  {
    id: "bt3",
    donorId: "d3",
    donorName: "David Johnson",
    hemoglobin: 15.1,
    hiv: "negative",
    hepatitisB: "negative",
    hepatitisC: "negative",
    malaria: "negative",
    date: "2024-03-05",
    result: "pass",
  },
]

export const bloodInventory: BloodInventory[] = [
  { bloodType: "A+", units: 45, lastUpdated: "2024-03-15", status: "adequate" },
  { bloodType: "A-", units: 12, lastUpdated: "2024-03-15", status: "low" },
  { bloodType: "B+", units: 28, lastUpdated: "2024-03-15", status: "adequate" },
  { bloodType: "B-", units: 5, lastUpdated: "2024-03-15", status: "critical" },
  { bloodType: "AB+", units: 18, lastUpdated: "2024-03-15", status: "adequate" },
  { bloodType: "AB-", units: 3, lastUpdated: "2024-03-15", status: "critical" },
  { bloodType: "O+", units: 52, lastUpdated: "2024-03-15", status: "surplus" },
  { bloodType: "O-", units: 8, lastUpdated: "2024-03-15", status: "low" },
]

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Donation Reminder",
    message: "You are now eligible to donate blood again. Schedule your appointment today!",
    type: "info",
    date: "2024-03-15",
    read: false,
  },
  {
    id: "n2",
    title: "Test Results Available",
    message: "Your blood test results from your last donation are now available.",
    type: "success",
    date: "2024-03-14",
    read: false,
  },
  {
    id: "n3",
    title: "Urgent: O- Blood Needed",
    message: "Critical shortage of O- blood type. Please donate if eligible.",
    type: "warning",
    date: "2024-03-13",
    read: true,
  },
]

export const messages: Message[] = [
  {
    id: "m1",
    senderId: "w1",
    senderName: "James Wilson",
    senderRole: "worker",
    content: "Hello! Your next appointment is scheduled for March 20th at 10:00 AM.",
    timestamp: "2024-03-15T09:30:00",
  },
  {
    id: "m2",
    senderId: "d3",
    senderName: "Emily Chen",
    senderRole: "donor",
    content: "Thank you! Can I reschedule to the afternoon?",
    timestamp: "2024-03-15T10:15:00",
  },
  {
    id: "m3",
    senderId: "w1",
    senderName: "James Wilson",
    senderRole: "worker",
    content: "Of course! I have rescheduled your appointment to 2:00 PM.",
    timestamp: "2024-03-15T10:45:00",
  },
]

export const auditLogs: AuditLog[] = [
  {
    id: "al1",
    action: "Donation Recorded",
    userId: "w1",
    userName: "James Wilson",
    userRole: "Worker",
    timestamp: "2024-03-15T14:30:00",
    details: "Recorded donation for donor John Smith (450ml, A+)",
  },
  {
    id: "al2",
    action: "Donor Eligibility Updated",
    userId: "w2",
    userName: "Lisa Anderson",
    userRole: "Worker",
    timestamp: "2024-03-15T13:15:00",
    details: "Updated eligibility status for Maria Garcia to ineligible",
  },
  {
    id: "al3",
    action: "Inventory Updated",
    userId: "a1",
    userName: "Dr. Sarah Johnson",
    userRole: "Admin",
    timestamp: "2024-03-15T11:00:00",
    details: "Added 10 units of O+ blood to inventory",
  },
  {
    id: "al4",
    action: "Worker Created",
    userId: "a1",
    userName: "Dr. Sarah Johnson",
    userRole: "Admin",
    timestamp: "2024-03-14T09:00:00",
    details: "Created new worker account for Lisa Anderson",
  },
]

export const workers = [
  {
    id: "w1",
    name: "James Wilson",
    email: "james.w@bloodbank.com",
    phone: "+1 234 567 8910",
    shift: "Morning",
    status: "active",
  },
  {
    id: "w2",
    name: "Lisa Anderson",
    email: "lisa.a@bloodbank.com",
    phone: "+1 234 567 8911",
    shift: "Evening",
    status: "active",
  },
  {
    id: "w3",
    name: "Robert Martinez",
    email: "robert.m@bloodbank.com",
    phone: "+1 234 567 8912",
    shift: "Night",
    status: "inactive",
  },
]

export const dashboardStats = {
  admin: {
    totalDonors: 1247,
    totalDonations: 3842,
    totalWorkers: 28,
    bloodUnits: 171,
    monthlyDonations: 156,
    pendingTests: 12,
  },
  worker: {
    todayDonations: 8,
    pendingTests: 5,
    eligibleDonors: 342,
    scheduledAppointments: 15,
  },
  donor: {
    totalDonations: 12,
    lastDonation: "2024-01-15",
    nextEligibleDate: "2024-04-15",
    isEligible: true,
  },
}
