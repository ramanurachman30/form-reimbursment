import { User } from '../types/auth';

export interface DummyAccount {
  credentials: {
    email: string;
    password: string;
  };
  user: User;
  badge: string;
  description: string;
}

export const DUMMY_ACCOUNTS: DummyAccount[] = [
  {
    credentials: {
      email: 'budi.pratama@perusahaan.com',
      password: 'password123',
    },
    user: {
      id: 'USR-001',
      name: 'Budi Pratama',
      email: 'budi.pratama@perusahaan.com',
      role: 'employee',
      roleLabel: 'Staf Operasional',
      department: 'Logistik & Operasional',
      phoneNumber: '+62 812-3456-7890',
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '8820 4912 30',
      joinedDate: '15 Maret 2022',
    },
    badge: 'Karyawan',
    description: 'Pengaju reimbursement',
  },
  {
    credentials: {
      email: 'siti.rahma@perusahaan.com',
      password: 'password123',
    },
    user: {
      id: 'USR-002',
      name: 'Siti Rahma, S.E.',
      email: 'siti.rahma@perusahaan.com',
      role: 'approver',
      roleLabel: 'Finance Manager',
      department: 'Finance & Accounting',
      phoneNumber: '+62 811-9876-5432',
      bankName: 'Bank Mandiri',
      accountNumber: '1410 0192 8841',
      joinedDate: '10 Januari 2020',
    },
    badge: 'Approver / Finance',
    description: 'Penyetuju klaim reimburse',
  },
];
