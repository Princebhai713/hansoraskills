import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import mockData from '../data/mockData.json';

const usePortalStore = create(
  persist(
    (set, get) => ({
      ...mockData,
      activeRole: 'public', // 'public' | 'center' | 'admin'
      publicTab: 'home',    // 'home' | 'about' | 'courses' | 'centers' | 'student-zone' | 'franchise' | 'contact'
      centerTab: 'dashboard',
      isCenterLoggedIn: false,
      currentCenterCode: 'HS-UP-101',
      selectedStudentForPrint: null,
      printDocumentType: null,

      setActiveRole: (role) => set({ activeRole: role }),
      setPublicTab: (tab) => set({ publicTab: tab }),
      setCenterTab: (tab) => set({ centerTab: tab }),
      setCurrentCenterCode: (code) => set({ currentCenterCode: code }),
      
      setPrintDocument: (student, type) => set({ selectedStudentForPrint: student, printDocumentType: type }),
      clearPrintDocument: () => set({ selectedStudentForPrint: null, printDocumentType: null }),

      loginCenter: (centerCode) => set({
        isCenterLoggedIn: true,
        currentCenterCode: centerCode || 'HS-UP-101',
        activeRole: 'center'
      }),

      logoutCenter: () => set({
        isCenterLoggedIn: false,
        activeRole: 'public'
      }),

      addStudent: (studentData) => set(state => {
        const newStudent = {
          ...studentData,
          id: `std_${Date.now()}`,
          status: 'Applied',
          admission_date: studentData.admission_date || new Date().toISOString().split('T')[0],
          id_card_issued: false,
          admit_card_issued: false,
          marks: null
        };
        return { students: [newStudent, ...state.students] };
      }),

      acceptStudent: (studentId) => set(state => {
        const student = state.students.find(s => s.id === studentId);
        if (!student) return state;

        const course = state.courses.find(c => c.code === student.course_code);
        const center = state.centers.find(c => c.center_code === student.center_code);
        const fee = course?.enrollment_fee || 200;

        if (center.wallet_balance < fee) {
          alert(`अपर्याप्त वॉलेट बैलेंस! आवश्यक: ₹${fee}, उपलब्ध: ₹${center.wallet_balance}`);
          return state;
        }

        const newBalance = center.wallet_balance - fee;
        const sequentialRoll = `26101${String(state.students.length + 1).padStart(3, '0')}`;

        const newTx = {
          id: `tx_${Date.now()}`,
          center_code: center.center_code,
          type: 'DEBIT',
          amount: fee,
          description: `Enrollment Fee (${student.course_code}): Roll ${sequentialRoll}`,
          balance_after: newBalance,
          timestamp: new Date().toLocaleString('en-IN')
        };

        const updatedCenters = state.centers.map(c =>
          c.center_code === center.center_code ? { ...c, wallet_balance: newBalance } : c
        );

        const updatedStudents = state.students.map(s =>
          s.id === studentId
            ? { ...s, status: 'Accepted', roll_no: sequentialRoll, id_card_issued: true, admit_card_issued: true }
            : s
        );

        return {
          centers: updatedCenters,
          students: updatedStudents,
          wallet_transactions: [newTx, ...(state.wallet_transactions || [])]
        };
      }),

      rejectStudent: (studentId) => set(state => ({
        students: state.students.map(s => s.id === studentId ? { ...s, status: 'Rejected' } : s)
      })),

      submitMarks: (studentId, scores) => set(state => {
        const totalMax = scores.reduce((sum, item) => sum + (Number(item.max_theory) || 70) + (Number(item.max_practical) || 30), 0);
        const totalObtained = scores.reduce((sum, item) => sum + Number(item.theory_obtained || 0) + Number(item.practical_obtained || 0), 0);
        const percentage = Number(((totalObtained / totalMax) * 100).toFixed(2));
        const grade = percentage >= 85 ? 'A+' : percentage >= 75 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'Fail';

        const updatedStudents = state.students.map(s =>
          s.id === studentId
            ? {
                ...s,
                status: 'Pending Verification',
                marks: {
                  scores,
                  total_max: totalMax,
                  total_obtained: totalObtained,
                  percentage,
                  grade,
                  is_approved: false
                }
              }
            : s
        );
        return { students: updatedStudents };
      }),

      approveResult: (studentId, overrideScores = null) => set(state => {
        const updatedStudents = state.students.map(s => {
          if (s.id !== studentId) return s;
          let currentMarks = s.marks;
          if (overrideScores) {
            const totalMax = overrideScores.reduce((sum, item) => sum + (Number(item.max_theory) || 70) + (Number(item.max_practical) || 30), 0);
            const totalObtained = overrideScores.reduce((sum, item) => sum + Number(item.theory_obtained || 0) + Number(item.practical_obtained || 0), 0);
            const percentage = Number(((totalObtained / totalMax) * 100).toFixed(2));
            const grade = percentage >= 85 ? 'A+' : percentage >= 75 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'Fail';
            currentMarks = { ...currentMarks, scores: overrideScores, total_max: totalMax, total_obtained: totalObtained, percentage, grade };
          }
          return {
            ...s,
            status: 'Certified',
            marks: {
              ...currentMarks,
              is_approved: true,
              approved_by: 'Director of Examinations (Hansora Skills)',
              approved_at: new Date().toISOString().split('T')[0]
            }
          };
        });
        return { students: updatedStudents };
      }),

      addFunds: (centerCode, amount) => set(state => {
        const numAmount = Number(amount);
        const center = state.centers.find(c => c.center_code === centerCode);
        const newBal = (center?.wallet_balance || 0) + numAmount;

        const newTx = {
          id: `tx_${Date.now()}`,
          center_code: centerCode,
          type: 'CREDIT',
          amount: numAmount,
          description: 'Wallet Top-Up (Approved)',
          balance_after: newBal,
          timestamp: new Date().toLocaleString('en-IN')
        };

        return {
          centers: state.centers.map(c =>
            c.center_code === centerCode ? { ...c, wallet_balance: newBal } : c
          ),
          wallet_transactions: [newTx, ...(state.wallet_transactions || [])]
        };
      })
    }),
    {
      name: 'hansora-skills-storage-v3',
    }
  )
);

export const usePortalContext = () => usePortalStore();
export default usePortalContext;