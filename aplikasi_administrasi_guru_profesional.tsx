import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  UserCheck, 
  GraduationCap, 
  ClipboardList, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Printer, 
  Search, 
  Filter, 
  Download, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  Calendar, 
  Users, 
  X,
  ChevronRight,
  TrendingUp,
  AwardIcon,
  Check,
  Building,
  User,
  Hash,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Initial Mock Data
const INITIAL_SCHOOL_INFO = {
  schoolName: "SMPN 1 PLAMPANG",
  principalName: "SUAIDI, S.Pd",
  principalNip: "19691231 199512 1 001",
  teacherName: "ARDIN, S.Pd",
  nip: "19880510 201503 1 002",
  subject: "Informatika / IPA",
  academicYear: "2024/2025",
  semester: "Ganjil",
  gradeLevel: "Fase D (Kelas VII/VIII/IX)"
};

const INITIAL_CLASSES = ["VII-A", "VII-B", "VIII-A", "IX-A"];

const INITIAL_STUDENTS = [
  { id: "101", nis: "2425001", name: "Ahmad Rizky", class: "VII-A", gender: "L" },
  { id: "102", nis: "2425002", name: "Anisa Rahmawati", class: "VII-A", gender: "P" },
  { id: "103", nis: "2425003", name: "Bagus Setiawan", class: "VII-A", gender: "L" },
  { id: "104", nis: "2425004", name: "Citra Dewi", class: "VII-A", gender: "P" },
  { id: "105", nis: "2425005", name: "Deni Pratama", class: "VII-A", gender: "L" }
];

const INITIAL_ATTENDANCE = {
  "2024-11-04": {
    "VII-A": {
      "101": "H", "102": "H", "103": "S", "104": "H", "105": "I"
    }
  }
};

const INITIAL_JOURNAL = [
  {
    id: 1,
    date: "2024-11-04",
    hour: "1-2",
    class: "VII-A",
    topic: "Berpikir Komputasional - Algoritma Searching",
    activity: "Diskusi kelompok dan penyelesaian LKPD kuis interaktif.",
    notes: "Siswa sangat antusias. Bagus perlu bimbingan tambahan pada materi rekursi.",
    status: "Selesai"
  }
];

const INITIAL_QUESTION_BANK = [
  {
    id: 1,
    type: "PG",
    topic: "Berpikir Komputasional",
    question: "Langkah-langkah logis dan terstruktur untuk menyelesaikan suatu masalah dinamakan...",
    options: ["Algoritma", "Pemrograman", "Hardware", "Software"],
    answer: "A",
    indicator: "Siswa dapat menjelaskan definisi algoritma"
  },
  {
    id: 2,
    type: "Uraian",
    topic: "Berpikir Komputasional",
    question: "Jelaskan perbedaan antara pencarian linier (linear search) dan pencarian biner (binary search)!",
    answer: "Linear search memeriksa data satu per satu dari awal, sedangkan binary search membagi data terurut menjadi dua bagian secara berulang.",
    indicator: "Siswa mampu membandingkan metode pencarian"
  }
];

const INITIAL_MODULES = [
  {
    id: 1,
    title: "Modul Ajar 1: Berpikir Komputasional",
    subject: "Informatika",
    phase: "Fase D",
    class: "VII",
    timeAllocation: "4 JP (2 x 40 menit)",
    cp: "Pada akhir fase D, peserta didik mampu menerapkan berpikir komputasional untuk menghasilkan beberapa solusi dalam menyelesaikan persoalan.",
    tp: "1. Memahami konsep algoritma pencarian (searching)\n2. Menerapkan algoritma pencarian linear dan binary pada kasus nyata.",
    atp: "Alur 1: Mengenal masalah -> Alur 2: Merancang Algoritma -> Alur 3: Evaluasi",
    ppp: ["Bernalar Kritis", "Gotong Royong", "Mandiri"],
    media: "Komputer / Laptop, LKPD 01, Proyektor",
    model: "Problem Based Learning (PBL)"
  }
];

const INITIAL_GRADES = [
  { studentId: "101", tp1: 85, tp2: 90, tp3: 88, sumatif1: 85, sumatif2: 92, pas: 88 },
  { studentId: "102", tp1: 92, tp2: 95, tp3: 90, sumatif1: 90, sumatif2: 94, pas: 92 },
  { studentId: "103", tp1: 70, tp2: 75, tp3: 72, sumatif1: 72, sumatif2: 70, pas: 74 }
];

const INITIAL_COUNSELING = [
  {
    id: 1,
    date: "2024-11-02",
    studentId: "103",
    type: "Prestasi",
    category: "Akademik",
    description: "Juara 2 Lomba OSN IPA / TIK Tingkat Kecamatan Plampang.",
    followUp: "Diberikan penghargaan dan piagam dari sekolah.",
    points: 25
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("VII-A");

  // App Data States with localStorage fallback
  const [schoolInfo, setSchoolInfo] = useState(() => {
    const saved = localStorage.getItem("guru_school_info_ardin");
    return saved ? JSON.parse(saved) : INITIAL_SCHOOL_INFO;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("guru_students_ardin");
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("guru_attendance_ardin");
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem("guru_journals_ardin");
    return saved ? JSON.parse(saved) : INITIAL_JOURNAL;
  });

  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem("guru_modules_ardin");
    return saved ? JSON.parse(saved) : INITIAL_MODULES;
  });

  const [questionBank, setQuestionBank] = useState(() => {
    const saved = localStorage.getItem("guru_questions_ardin");
    return saved ? JSON.parse(saved) : INITIAL_QUESTION_BANK;
  });

  const [grades, setGrades] = useState(() => {
    const saved = localStorage.getItem("guru_grades_ardin");
    return saved ? JSON.parse(saved) : INITIAL_GRADES;
  });

  const [counseling, setCounseling] = useState(() => {
    const saved = localStorage.getItem("guru_counseling_ardin");
    return saved ? JSON.parse(saved) : INITIAL_COUNSELING;
  });

  // Local Storage Save Effects
  useEffect(() => { localStorage.setItem("guru_school_info_ardin", JSON.stringify(schoolInfo)); }, [schoolInfo]);
  useEffect(() => { localStorage.setItem("guru_students_ardin", JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem("guru_attendance_ardin", JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem("guru_journals_ardin", JSON.stringify(journals)); }, [journals]);
  useEffect(() => { localStorage.setItem("guru_modules_ardin", JSON.stringify(modules)); }, [modules]);
  useEffect(() => { localStorage.setItem("guru_questions_ardin", JSON.stringify(questionBank)); }, [questionBank]);
  useEffect(() => { localStorage.setItem("guru_grades_ardin", JSON.stringify(grades)); }, [grades]);
  useEffect(() => { localStorage.setItem("guru_counseling_ardin", JSON.stringify(counseling)); }, [counseling]);

  // Attendance Date Selector State
  const [currentAttendanceDate, setCurrentAttendanceDate] = useState(new Date().toISOString().split('T')[0]);

  // Toast / Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper Stats Calculation
  const filteredStudents = useMemo(() => students.filter(s => s.class === selectedClass), [students, selectedClass]);
  
  const totalStudents = students.length;
  const totalModules = modules.length;

  const attendanceSummary = useMemo(() => {
    let present = 0, total = 0;
    Object.keys(attendance).forEach(date => {
      Object.keys(attendance[date] || {}).forEach(cls => {
        Object.values(attendance[date][cls] || {}).forEach(status => {
          total++;
          if (status === 'H') present++;
        });
      });
    });
    return total > 0 ? Math.round((present / total) * 100) : 100;
  }, [attendance]);

  const handlePrint = () => {
    window.print();
  };

  // Helper to Export Document Content directly to Microsoft Word (.docx)
  const exportToDocx = (documentTitle, htmlBodyContent) => {
    const fullHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${documentTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Times New Roman', sans-serif; font-size: 11pt; line-height: 1.3; color: #000; }
          .header-kop { text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px; }
          .header-kop h2 { font-size: 14pt; margin: 0; font-weight: bold; text-transform: uppercase; }
          .header-kop h1 { font-size: 16pt; margin: 2px 0; font-weight: bold; text-transform: uppercase; }
          .header-kop p { font-size: 9pt; margin: 0; font-style: italic; }
          .doc-title { text-align: center; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; text-decoration: underline; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; font-size: 10pt; }
          th, td { border: 1px solid #000; padding: 6px 8px; text-align: left; vertical-align: top; }
          th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
          .meta-table { border: none; margin-bottom: 15px; }
          .meta-table td { border: none; padding: 2px 5px; }
          .signature-table { border: none; margin-top: 30px; width: 100%; }
          .signature-table td { border: none; text-align: center; width: 50%; padding-top: 10px; }
          .badge { display: inline-block; padding: 2px 6px; font-size: 9pt; background: #eee; border: 1px solid #ccc; }
        </style>
      </head>
      <body>
        <!-- KOP SURAT RESMI -->
        <div class="header-kop">
          <h2>PEMERINTAH KABUPATEN SUMBAWA</h2>
          <h2>DINAS PENDIDIKAN DAN KEBUDAYAAN</h2>
          <h1>${schoolInfo.schoolName}</h1>
          <p>Kecamatan Plampang, Kabupaten Sumbawa, Nusa Tenggara Barat</p>
        </div>

        <div class="doc-title">${documentTitle}</div>

        <table class="meta-table">
          <tr>
            <td width="18%"><strong>Mata Pelajaran</strong></td>
            <td width="2%">:</td>
            <td width="30%">${schoolInfo.subject}</td>
            <td width="18%"><strong>Tahun Ajaran</strong></td>
            <td width="2%">:</td>
            <td width="30%">${schoolInfo.academicYear}</td>
          </tr>
          <tr>
            <td><strong>Kelas / Fase</strong></td>
            <td>:</td>
            <td>${selectedClass} / ${schoolInfo.gradeLevel}</td>
            <td><strong>Semester</strong></td>
            <td>:</td>
            <td>${schoolInfo.semester}</td>
          </tr>
          <tr>
            <td><strong>Guru Pengampu</strong></td>
            <td>:</td>
            <td>${schoolInfo.teacherName}</td>
            <td><strong>NIP</strong></td>
            <td>:</td>
            <td>${schoolInfo.nip}</td>
          </tr>
        </table>

        ${htmlBodyContent}

        <!-- LEMBAR PENGESAHAN / TANDA TANGAN -->
        <table class="signature-table">
          <tr>
            <td>
              Mengetahui,<br>
              Kepala ${schoolInfo.schoolName}<br><br><br><br><br>
              <strong><u>${schoolInfo.principalName}</u></strong><br>
              NIP. ${schoolInfo.principalNip}
            </td>
            <td>
              Plampang, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br>
              Guru Mata Pelajaran<br><br><br><br><br>
              <strong><u>${schoolInfo.teacherName}</u></strong><br>
              NIP. ${schoolInfo.nip}
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', fullHtml], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${selectedClass}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Dokumen Word "${documentTitle}" berhasil diunduh!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <GraduationCap className="w-8 h-8 text-indigo-200" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ADMINISTRASI GURU PROFESIONAL</h1>
              <p className="text-xs text-indigo-200 flex items-center gap-2 mt-0.5">
                <span className="font-semibold text-white">{schoolInfo.schoolName}</span> • <span className="bg-indigo-700/60 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border border-indigo-500/30">KURIKULUM MERDEKA</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-all shadow-sm hover:shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Cetakan</span>
            </button>
            <div className="h-8 w-px bg-indigo-700/60 hidden md:block"></div>
            <div className="text-right hidden md:block">
              <p className="text-xs font-semibold text-white">{schoolInfo.teacherName}</p>
              <p className="text-[11px] text-indigo-300">NIP. {schoolInfo.nip}</p>
            </div>
          </div>
        </div>
      </header>

      {/* App Body Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 print:hidden">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-3 sticky top-6 space-y-1">
            <p className="text-[11px] font-bold text-slate-400 px-3 py-2 tracking-wider uppercase">Menu Utama</p>
            
            <SidebarButton 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard Utama"
            />
            <SidebarButton 
              active={activeTab === 'modules'} 
              onClick={() => setActiveTab('modules')}
              icon={<BookOpen className="w-4 h-4" />}
              label="Modul & Perangkat Ajar"
            />
            <SidebarButton 
              active={activeTab === 'questions'} 
              onClick={() => setActiveTab('questions')}
              icon={<HelpCircle className="w-4 h-4" />}
              label="Bank Soal & Kisi-Kisi"
            />
            <SidebarButton 
              active={activeTab === 'attendance'} 
              onClick={() => setActiveTab('attendance')}
              icon={<UserCheck className="w-4 h-4" />}
              label="Presensi & Absensi"
            />
            <SidebarButton 
              active={activeTab === 'journal'} 
              onClick={() => setActiveTab('journal')}
              icon={<ClipboardList className="w-4 h-4" />}
              label="Jurnal Harian Guru"
            />
            <SidebarButton 
              active={activeTab === 'grades'} 
              onClick={() => setActiveTab('grades')}
              icon={<FileText className="w-4 h-4" />}
              label="Penilaian (Rapor)"
            />
            <SidebarButton 
              active={activeTab === 'counseling'} 
              onClick={() => setActiveTab('counseling')}
              icon={<Award className="w-4 h-4" />}
              label="Catatan Siswa & BK"
            />
            <SidebarButton 
              active={activeTab === 'identity'} 
              onClick={() => setActiveTab('identity')}
              icon={<Settings className="w-4 h-4" />}
              label="Identitas & Kelas"
            />

            <div className="pt-4 border-t border-slate-100 mt-4 px-3">
              <label className="text-xs font-semibold text-slate-500 block mb-1.5">Pilih Kelas Aktif:</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs p-2 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {INITIAL_CLASSES.map(cls => (
                  <option key={cls} value={cls}>Kelas {cls}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Dynamic Content View Area */}
        <main className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 min-h-[600px] overflow-x-auto">
          
          {/* Printable Official Header (Only Visible When Printing) */}
          <div className="hidden print:block mb-8 border-b-2 border-slate-800 pb-4 text-center">
            <h2 className="text-xl font-bold uppercase tracking-wide">{schoolInfo.schoolName}</h2>
            <p className="text-sm">BERKAS ADMINISTRASI GURU PROFESIONAL - KURIKULUM MERDEKA</p>
            <p className="text-xs text-slate-600 mt-1">Tahun Ajaran: {schoolInfo.academicYear} | Semester: {schoolInfo.semester}</p>
            <div className="grid grid-cols-2 gap-4 text-left text-xs mt-4 pt-2 border-t border-slate-300">
              <div>
                <p><strong>Nama Guru:</strong> {schoolInfo.teacherName}</p>
                <p><strong>NIP:</strong> {schoolInfo.nip}</p>
              </div>
              <div>
                <p><strong>Mata Pelajaran:</strong> {schoolInfo.subject}</p>
                <p><strong>Fase/Kelas:</strong> {schoolInfo.gradeLevel} / {selectedClass}</p>
              </div>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <DashboardTab 
              schoolInfo={schoolInfo}
              totalStudents={totalStudents}
              totalModules={totalModules}
              attendanceRate={attendanceSummary}
              journals={journals}
              counseling={counseling}
            />
          )}

          {activeTab === 'modules' && (
            <ModulesTab 
              modules={modules}
              setModules={setModules}
              schoolInfo={schoolInfo}
              showNotification={showNotification}
              exportToDocx={exportToDocx}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionBankTab 
              questionBank={questionBank}
              setQuestionBank={setQuestionBank}
              showNotification={showNotification}
              exportToDocx={exportToDocx}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceTab 
              students={filteredStudents}
              attendance={attendance}
              setAttendance={setAttendance}
              selectedClass={selectedClass}
              currentDate={currentAttendanceDate}
              setCurrentDate={setCurrentAttendanceDate}
              showNotification={showNotification}
              exportToDocx={exportToDocx}
            />
          )}

          {activeTab === 'journal' && (
            <JournalTab 
              journals={journals}
              setJournals={setJournals}
              selectedClass={selectedClass}
              showNotification={showNotification}
              exportToDocx={exportToDocx}
            />
          )}

          {activeTab === 'grades' && (
            <GradesTab 
              students={filteredStudents}
              grades={grades}
              setGrades={setGrades}
              selectedClass={selectedClass}
              showNotification={showNotification}
              exportToDocx={exportToDocx}
            />
          )}

          {activeTab === 'counseling' && (
            <CounselingTab 
              students={students}
              counseling={counseling}
              setCounseling={setCounseling}
              selectedClass={selectedClass}
              showNotification={showNotification}
              exportToDocx={exportToDocx}
            />
          )}

          {activeTab === 'identity' && (
            <IdentityTab 
              schoolInfo={schoolInfo}
              setSchoolInfo={setSchoolInfo}
              students={students}
              setStudents={setStudents}
              selectedClass={selectedClass}
              showNotification={showNotification}
            />
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-auto py-4 text-center text-xs text-slate-500 print:hidden">
        <p>© {new Date().getFullYear()} Aplikasi Administrasi Guru — Bapak ARDIN, S.Pd ({schoolInfo.schoolName}).</p>
      </footer>
    </div>
  );
}

// Sub Component: Sidebar Button
function SidebarButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
        active 
          ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className={active ? 'text-indigo-600' : 'text-slate-400'}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ----------------------------------------------------------------------
// DASHBOARD OVERVIEW TAB
// ----------------------------------------------------------------------
function DashboardTab({ schoolInfo, totalStudents, totalModules, attendanceRate, journals, counseling }) {
  const chartData = [
    { name: 'Kehadiran (%)', score: attendanceRate, fill: '#4f46e5' },
    { name: 'Ketercapaian TP (%)', score: 88, fill: '#10b981' },
    { name: 'Ketepatan Jurnal (%)', score: 95, fill: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              Dashboard Pendidik
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Selamat Datang, Bapak {schoolInfo.teacherName}</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Aplikasi Administrasi Guru Kurikulum Merdeka resmi untuk <span className="text-white font-semibold">{schoolInfo.schoolName}</span>.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs space-y-1 min-w-[200px]">
            <p className="flex justify-between text-slate-300"><span>Mata Pelajaran:</span> <span className="text-white font-medium">{schoolInfo.subject}</span></p>
            <p className="flex justify-between text-slate-300"><span>Tahun Ajaran:</span> <span className="text-white font-medium">{schoolInfo.academicYear}</span></p>
            <p className="flex justify-between text-slate-300"><span>Semester:</span> <span className="text-white font-medium">{schoolInfo.semester}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Siswa Diampu" 
          value={totalStudents} 
          unit="Siswa"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          bgColor="bg-indigo-50 border-indigo-100"
        />
        <MetricCard 
          title="Modul Ajar Dibuat" 
          value={totalModules} 
          unit="Perangkat"
          icon={<BookOpen className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50 border-emerald-100"
        />
        <MetricCard 
          title="Rata-Rata Kehadiran" 
          value={`${attendanceRate}%`} 
          unit="Bulan Ini"
          icon={<UserCheck className="w-5 h-5 text-blue-600" />}
          bgColor="bg-blue-50 border-blue-100"
        />
        <MetricCard 
          title="Catatan Bimbingan" 
          value={counseling.length} 
          unit="Kejadian"
          icon={<Award className="w-5 h-5 text-amber-600" />}
          bgColor="bg-amber-50 border-amber-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            Rekapitulasi Indikator Pembelajaran
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col">
          <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            Jurnal Terbaru
          </h3>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-60">
            {journals.slice(0, 3).map(j => (
              <div key={j.id} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between items-center text-slate-500">
                  <span className="font-semibold text-indigo-600">Kelas {j.class} (Jam ke-{j.hour})</span>
                  <span>{j.date}</span>
                </div>
                <p className="font-medium text-slate-800 line-clamp-1">{j.topic}</p>
                <p className="text-slate-500 line-clamp-1 text-[11px]">{j.activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, icon, bgColor }) {
  return (
    <div className={`p-4 rounded-xl border ${bgColor} flex items-center justify-between`}>
      <div>
        <p className="text-xs font-semibold text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">{unit}</p>
      </div>
      <div className="p-3 bg-white rounded-xl shadow-xs">
        {icon}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MODUL AJAR & PERANGKAT AJAR TAB (Kurikulum Merdeka)
// ----------------------------------------------------------------------
function ModulesTab({ modules, setModules, schoolInfo, showNotification, exportToDocx }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subject: schoolInfo.subject,
    phase: schoolInfo.gradeLevel,
    timeAllocation: "4 JP",
    cp: "",
    tp: "",
    atp: "",
    ppp: ["Bernalar Kritis", "Gotong Royong"],
    media: "",
    model: "Problem Based Learning (PBL)"
  });

  const handleExportDocx = () => {
    let htmlContent = `
      <h3>MODUL AJAR & PERANGKAT PEMBELAJARAN</h3>
    `;
    modules.forEach((mod, idx) => {
      htmlContent += `
        <h4 style="margin-top:15px; margin-bottom:5px;">${idx + 1}. ${mod.title}</h4>
        <table>
          <tr><td width="25%"><strong>Fase / Kelas</strong></td><td>${mod.phase}</td></tr>
          <tr><td><strong>Alokasi Waktu</strong></td><td>${mod.timeAllocation}</td></tr>
          <tr><td><strong>Model Pembelajaran</strong></td><td>${mod.model}</td></tr>
          <tr><td><strong>Capaian Pembelajaran (CP)</strong></td><td>${mod.cp}</td></tr>
          <tr><td><strong>Tujuan Pembelajaran (TP)</strong></td><td>${mod.tp.replace(/\n/g, '<br>')}</td></tr>
          <tr><td><strong>Alur Tujuan Pembelajaran (ATP)</strong></td><td>${mod.atp}</td></tr>
          <tr><td><strong>Profil Pelajar Pancasila</strong></td><td>${mod.ppp.join(', ')}</td></tr>
          <tr><td><strong>Media / Alat Peraga</strong></td><td>${mod.media}</td></tr>
        </table>
      `;
    });
    exportToDocx("MODUL_AJAR_KURIKULUM_MERDEKA", htmlContent);
  };

  const handleCreateNew = () => {
    setSelectedModule(null);
    setFormData({
      title: "",
      subject: schoolInfo.subject,
      phase: schoolInfo.gradeLevel,
      timeAllocation: "4 JP",
      cp: "",
      tp: "",
      atp: "",
      ppp: ["Bernalar Kritis"],
      media: "",
      model: "Problem Based Learning (PBL)"
    });
    setShowModal(true);
  };

  const handleSaveModule = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    if (selectedModule) {
      setModules(modules.map(m => m.id === selectedModule.id ? { ...formData, id: selectedModule.id } : m));
      showNotification("Modul ajar diperbarui!");
    } else {
      setModules([...modules, { ...formData, id: Date.now() }]);
      showNotification("Modul ajar baru berhasil ditambahkan!");
    }
    setShowModal(false);
  };

  const handleDeleteModule = (id) => {
    setModules(modules.filter(m => m.id !== id));
    showNotification("Modul ajar telah dihapus.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Modul Ajar & Perangkat Pembelajaran</h2>
          <p className="text-xs text-slate-500">Penyusunan Perangkat Ajar Kurikulum Merdeka (CP, TP, ATP, P3) - {schoolInfo.schoolName}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleExportDocx}
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2.5 rounded-lg transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Word (.docx)</span>
          </button>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Modul Ajar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <div key={mod.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-indigo-300 transition-all space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {mod.subject} • {mod.phase}
                </span>
                <h3 className="font-bold text-slate-800 text-sm mt-1">{mod.title}</h3>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => { setSelectedModule(mod); setFormData(mod); setShowModal(true); }}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteModule(mod.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-white rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-xs text-slate-600 space-y-1">
              <p><strong>Alokasi Waktu:</strong> {mod.timeAllocation}</p>
              <p><strong>Model:</strong> {mod.model}</p>
              <p className="line-clamp-2"><strong>TP:</strong> {mod.tp}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-base">{selectedModule ? "Edit Modul Ajar" : "Buat Modul Ajar Baru"}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Modul Ajar</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="misal: Modul Ajar 1: Berpikir Komputasional" 
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alokasi Waktu</label>
                  <input 
                    type="text" 
                    value={formData.timeAllocation} 
                    onChange={(e) => setFormData({ ...formData, timeAllocation: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Model Pembelajaran</label>
                  <input 
                    type="text" 
                    value={formData.model} 
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Capaian Pembelajaran (CP)</label>
                <textarea 
                  rows="2"
                  value={formData.cp} 
                  onChange={(e) => setFormData({ ...formData, cp: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tujuan Pembelajaran (TP)</label>
                <textarea 
                  rows="3"
                  value={formData.tp} 
                  onChange={(e) => setFormData({ ...formData, tp: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Media / Alat Peraga</label>
                <input 
                  type="text" 
                  value={formData.media} 
                  onChange={(e) => setFormData({ ...formData, media: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                >
                  Simpan Modul
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// BANK SOAL & KISI-KISI TAB
// ----------------------------------------------------------------------
function QuestionBankTab({ questionBank, setQuestionBank, showNotification, exportToDocx }) {
  const [newQuestion, setNewQuestion] = useState({
    type: "PG",
    topic: "",
    question: "",
    options: ["", "", "", ""],
    answer: "A",
    indicator: ""
  });

  const handleExportDocx = () => {
    let htmlContent = `
      <h3>NASKAH SOAL DAN KISI-KISI ASESMEN</h3>
      <table>
        <thead>
          <tr>
            <th width="5%">No</th>
            <th width="10%">Tipe</th>
            <th width="20%">Materi & Indikator</th>
            <th width="45%">Butir Soal & Pilihan Jawaban</th>
            <th width="20%">Kunci / Rubrik</th>
          </tr>
        </thead>
        <tbody>
    `;

    questionBank.forEach((q, idx) => {
      let optionsHtml = '';
      if (q.type === 'PG' && q.options) {
        optionsHtml = '<ol type="A" style="margin-top:5px; margin-bottom:0; padding-left:15px;">';
        q.options.forEach(opt => {
          optionsHtml += `<li>${opt}</li>`;
        });
        optionsHtml += '</ol>';
      }

      htmlContent += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td style="text-align:center;">${q.type}</td>
          <td>
            <strong>Materi:</strong> ${q.topic}<br>
            <i>Indikator:</i> ${q.indicator || '-'}
          </td>
          <td>
            <div>${q.question}</div>
            ${optionsHtml}
          </td>
          <td><strong>Kunci:</strong> ${q.answer}</td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

    exportToDocx("BANK_SOAL_DAN_KISI_KISI", htmlContent);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question) return;

    setQuestionBank([...questionBank, { ...newQuestion, id: Date.now() }]);
    setNewQuestion({
      type: "PG",
      topic: "",
      question: "",
      options: ["", "", "", ""],
      answer: "A",
      indicator: ""
    });
    showNotification("Soal baru ditambahkan ke bank soal!");
  };

  const handleDelete = (id) => {
    setQuestionBank(questionBank.filter(q => q.id !== id));
    showNotification("Soal berhasil dihapus.");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Bank Soal & Kisi-Kisi Asesmen</h2>
          <p className="text-xs text-slate-500">Pembuat Soal Pilihan Ganda & Uraian Lengkap dengan Indikator Soal</p>
        </div>
        <button
          onClick={handleExportDocx}
          className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2.5 rounded-lg transition-all shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Word (.docx)</span>
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Tambah Soal Baru</h3>
        <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-600 mb-1">Tipe Soal</label>
              <select 
                value={newQuestion.type} 
                onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              >
                <option value="PG">Pilihan Ganda (PG)</option>
                <option value="Uraian">Uraian / Essay</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Materi / Topik</label>
              <input 
                type="text" 
                value={newQuestion.topic} 
                onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                placeholder="misal: Algoritma Searching"
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Indikator Soal</label>
              <input 
                type="text" 
                value={newQuestion.indicator} 
                onChange={(e) => setNewQuestion({ ...newQuestion, indicator: e.target.value })}
                placeholder="misal: Siswa mampu membandingkan..."
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Butir Pertanyaan</label>
            <textarea 
              rows="2"
              value={newQuestion.question} 
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              required
            />
          </div>

          {newQuestion.type === "PG" && (
            <div className="grid grid-cols-2 gap-2">
              {['A', 'B', 'C', 'D'].map((opt, idx) => (
                <div key={opt} className="flex items-center space-x-1">
                  <span className="font-bold text-slate-500 w-4">{opt}.</span>
                  <input 
                    type="text" 
                    value={newQuestion.options[idx] || ''} 
                    onChange={(e) => {
                      const newOpts = [...newQuestion.options];
                      newOpts[idx] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: newOpts });
                    }}
                    className="w-full border border-slate-200 rounded-lg p-1.5 bg-white"
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-slate-600 mb-1">Kunci Jawaban / Rubrik</label>
            <input 
              type="text" 
              value={newQuestion.answer} 
              onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 bg-white"
            />
          </div>

          <button type="submit" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-xs hover:bg-indigo-700">
            Simpan Soal
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {questionBank.map((q, idx) => (
          <div key={q.id} className="border border-slate-200 rounded-lg p-3 text-xs space-y-1 hover:border-slate-300 relative">
            <button onClick={() => handleDelete(q.id)} className="absolute top-3 right-3 text-slate-400 hover:text-rose-600">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-indigo-600">#{idx + 1} [{q.type}]</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{q.topic}</span>
            </div>
            <p className="font-semibold text-slate-800">{q.question}</p>
            {q.indicator && <p className="text-[11px] text-slate-500 italic">Indikator: {q.indicator}</p>}
            {q.type === 'PG' && q.options && (
              <div className="grid grid-cols-2 gap-1 text-slate-600 pl-2 mt-1">
                {q.options.map((opt, i) => (
                  <p key={i}>{String.fromCharCode(65 + i)}. {opt}</p>
                ))}
              </div>
            )}
            <p className="text-emerald-700 font-medium pt-1">Kunci: {q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PRESENSI & ABSENSI TAB
// ----------------------------------------------------------------------
function AttendanceTab({ students, attendance, setAttendance, selectedClass, currentDate, setCurrentDate, showNotification, exportToDocx }) {
  const classAttendance = attendance[currentDate]?.[selectedClass] || {};

  const handleExportDocx = () => {
    let htmlContent = `
      <h3>REKAP PRESENSI KELAS ${selectedClass}</h3>
      <p>Tanggal: <strong>${currentDate}</strong></p>
      <table>
        <thead>
          <tr>
            <th width="5%">No</th>
            <th width="20%">NIS</th>
            <th width="45%">Nama Siswa</th>
            <th width="15%">L/P</th>
            <th width="15%">Status Kehadiran</th>
          </tr>
        </thead>
        <tbody>
    `;

    students.forEach((st, idx) => {
      const stt = classAttendance[st.id] || 'H';
      let statusText = 'Hadir';
      if (stt === 'I') statusText = 'Izin';
      if (stt === 'S') statusText = 'Sakit';
      if (stt === 'A') statusText = 'Alpa';

      htmlContent += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${st.nis}</td>
          <td>${st.name}</td>
          <td style="text-align:center;">${st.gender}</td>
          <td style="text-align:center;"><strong>${statusText} (${stt})</strong></td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

    exportToDocx(`PRESENSI_SISWA_${selectedClass}_${currentDate}`, htmlContent);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [currentDate]: {
        ...(prev[currentDate] || {}),
        [selectedClass]: {
          ...(prev[currentDate]?.[selectedClass] || {}),
          [studentId]: status
        }
      }
    }));
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach(s => { updated[s.id] = status; });
    setAttendance(prev => ({
      ...prev,
      [currentDate]: {
        ...(prev[currentDate] || {}),
        [selectedClass]: updated
      }
    }));
    showNotification(`Semua siswa ditandai '${status}'`);
  };

  const counts = useMemo(() => {
    let H = 0, S = 0, I = 0, A = 0;
    students.forEach(s => {
      const st = classAttendance[s.id] || 'H';
      if (st === 'H') H++;
      if (st === 'S') S++;
      if (st === 'I') I++;
      if (st === 'A') A++;
    });
    return { H, S, I, A };
  }, [students, classAttendance]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Presensi & Attendance Tracker</h2>
          <p className="text-xs text-slate-500">Pencatatan Kehadiran Siswa Kelas <span className="font-semibold text-indigo-600">{selectedClass}</span></p>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => markAll('H')}
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          >
            Semua Hadir
          </button>
          <button
            onClick={handleExportDocx}
            className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Word</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
          <p className="text-[10px] font-bold text-emerald-700 uppercase">Hadir (H)</p>
          <p className="text-xl font-bold text-emerald-800 mt-1">{counts.H}</p>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-[10px] font-bold text-blue-700 uppercase">Izin (I)</p>
          <p className="text-xl font-bold text-blue-800 mt-1">{counts.I}</p>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
          <p className="text-[10px] font-bold text-amber-700 uppercase">Sakit (S)</p>
          <p className="text-xl font-bold text-amber-800 mt-1">{counts.S}</p>
        </div>
        <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
          <p className="text-[10px] font-bold text-rose-700 uppercase">Alpa (A)</p>
          <p className="text-xl font-bold text-rose-800 mt-1">{counts.A}</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">NIS</th>
              <th className="p-3">Nama Siswa</th>
              <th className="p-3 text-center">L/P</th>
              <th className="p-3 text-center">Status Kehadiran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">Belum ada data siswa di kelas ini.</td>
              </tr>
            ) : (
              students.map((st, idx) => {
                const currentStatus = classAttendance[st.id] || 'H';
                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-medium text-slate-500">{idx + 1}</td>
                    <td className="p-3 font-mono text-slate-600">{st.nis}</td>
                    <td className="p-3 font-semibold text-slate-800">{st.name}</td>
                    <td className="p-3 text-center text-slate-500">{st.gender}</td>
                    <td className="p-3">
                      <div className="flex justify-center space-x-1">
                        {['H', 'I', 'S', 'A'].map(status => {
                          const isSelected = currentStatus === status;
                          let btnClass = "w-8 h-8 rounded-lg font-bold transition-all text-xs border ";
                          if (status === 'H') btnClass += isSelected ? "bg-emerald-600 text-white border-emerald-600 shadow-xs" : "border-slate-200 text-slate-600 hover:bg-emerald-50";
                          if (status === 'I') btnClass += isSelected ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "border-slate-200 text-slate-600 hover:bg-blue-50";
                          if (status === 'S') btnClass += isSelected ? "bg-amber-600 text-white border-amber-600 shadow-xs" : "border-slate-200 text-slate-600 hover:bg-amber-50";
                          if (status === 'A') btnClass += isSelected ? "bg-rose-600 text-white border-rose-600 shadow-xs" : "border-slate-200 text-slate-600 hover:bg-rose-50";

                          return (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(st.id, status)}
                              className={btnClass}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// JURNAL HARIAN GURU TAB
// ----------------------------------------------------------------------
function JournalTab({ journals, setJournals, selectedClass, showNotification, exportToDocx }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    hour: "1-2",
    class: selectedClass,
    topic: "",
    activity: "",
    notes: "",
    status: "Selesai"
  });

  const filteredJournals = journals.filter(j => j.class === selectedClass);

  const handleExportDocx = () => {
    let htmlContent = `
      <h3>JURNAL HARIAN MENGAJAR GURU</h3>
      <p>Kelas: <strong>${selectedClass}</strong></p>
      <table>
        <thead>
          <tr>
            <th width="5%">No</th>
            <th width="15%">Tanggal & Jam</th>
            <th width="25%">Materi / Pokok Bahasan</th>
            <th width="35%">Aktivitas Pembelajaran</th>
            <th width="20%">Hambatan & Solusi</th>
          </tr>
        </thead>
        <tbody>
    `;

    filteredJournals.forEach((j, idx) => {
      htmlContent += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${j.date}<br><i>Jam ke-${j.hour}</i></td>
          <td><strong>${j.topic}</strong></td>
          <td>${j.activity || '-'}</td>
          <td>${j.notes || '-'}</td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

    exportToDocx(`JURNAL_HARIAN_GURU_${selectedClass}`, htmlContent);
  };

  const handleAddJournal = (e) => {
    e.preventDefault();
    if (!formData.topic) return;

    setJournals([{ ...formData, id: Date.now() }, ...journals]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      hour: "1-2",
      class: selectedClass,
      topic: "",
      activity: "",
      notes: "",
      status: "Selesai"
    });
    showNotification("Jurnal harian mengajar dicatat!");
  };

  const handleDelete = (id) => {
    setJournals(journals.filter(j => j.id !== id));
    showNotification("Jurnal dihapus.");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Jurnal Harian Guru</h2>
          <p className="text-xs text-slate-500">Pencatatan Pembelajaran Kelas <span className="font-semibold text-indigo-600">{selectedClass}</span></p>
        </div>
        <button
          onClick={handleExportDocx}
          className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2.5 rounded-lg transition-all shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Word (.docx)</span>
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Tambah Catatan Jurnal Harian</h3>
        <form onSubmit={handleAddJournal} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 mb-1">Tanggal</label>
              <input 
                type="date" 
                value={formData.date} 
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Jam Ke-</label>
              <input 
                type="text" 
                value={formData.hour} 
                onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                placeholder="misal: 1-2 atau 3-4"
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Materi / Pokok Bahasan</label>
            <input 
              type="text" 
              value={formData.topic} 
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="misal: Berpikir Komputasional - Algoritma"
              className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Aktivitas Pembelajaran</label>
            <textarea 
              rows="2"
              value={formData.activity} 
              onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
              placeholder="Aktivitas siswa dan metode yang digunakan..."
              className="w-full border border-slate-200 rounded-lg p-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Hambatan / Catatan Kendala</label>
            <input 
              type="text" 
              value={formData.notes} 
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Catatan perbaikan atau siswa yang membutuhkan bimbingan..."
              className="w-full border border-slate-200 rounded-lg p-2 bg-white"
            />
          </div>

          <button type="submit" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-xs hover:bg-indigo-700">
            Simpan Jurnal
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {filteredJournals.map((j) => (
          <div key={j.id} className="border border-slate-200 rounded-lg p-3 text-xs space-y-1 hover:border-slate-300 relative">
            <button onClick={() => handleDelete(j.id)} className="absolute top-3 right-3 text-slate-400 hover:text-rose-600">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="font-semibold text-indigo-600">{j.date}</span>
              <span>• Jam ke-{j.hour}</span>
            </div>
            <p className="font-bold text-slate-800">{j.topic}</p>
            <p className="text-slate-600">{j.activity}</p>
            {j.notes && <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded">Catatan: {j.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PENILAIAN (RAPOR) TAB
// ----------------------------------------------------------------------
function GradesTab({ students, grades, setGrades, selectedClass, showNotification, exportToDocx }) {
  const calculateFinalScore = (g) => {
    const tp1 = Number(g.tp1) || 0;
    const tp2 = Number(g.tp2) || 0;
    const tp3 = Number(g.tp3) || 0;
    const s1 = Number(g.sumatif1) || 0;
    const s2 = Number(g.sumatif2) || 0;
    const pas = Number(g.pas) || 0;

    const avgFormatif = (tp1 + tp2 + tp3) / 3;
    const avgSumatif = (s1 + s2 + pas) / 3;

    if (!avgFormatif && !avgSumatif) return 0;
    return Math.round((avgFormatif * 0.4) + (avgSumatif * 0.6));
  };

  const getPredicate = (score) => {
    if (score >= 90) return { label: "Sangat Baik", desc: "Menunjukkan penguasaan yang sangat baik dalam seluruh TP" };
    if (score >= 80) return { label: "Baik", desc: "Menunjukkan penguasaan yang baik dalam sebagian besar TP" };
    if (score >= 70) return { label: "Cukup", desc: "Cukup menguasai TP, perlu tingkatkan pada materi lanjutan" };
    return { label: "Perlu Bimbingan", desc: "Perlu bimbingan khusus pada pemahaman materi dasar" };
  };

  const handleGradeChange = (studentId, field, val) => {
    setGrades(prev => {
      const existingIdx = prev.findIndex(g => g.studentId === studentId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], [field]: val };
        return updated;
      } else {
        return [...prev, { studentId, [field]: val }];
      }
    });
  };

  const handleExportDocx = () => {
    let htmlContent = `
      <h3>DAFTAR NILAI DAN DESKRIPSI RAPOR</h3>
      <p>Kelas: <strong>${selectedClass}</strong></p>
      <table>
        <thead>
          <tr>
            <th width="5%">No</th>
            <th width="25%">Nama Siswa</th>
            <th width="10%">Formatif</th>
            <th width="10%">Sumatif</th>
            <th width="10%">PAS</th>
            <th width="10%">Nilai Akhir</th>
            <th width="30%">Capaian Competensi (Deskripsi Rapor)</th>
          </tr>
        </thead>
        <tbody>
    `;

    students.forEach((st, idx) => {
      const g = grades.find(item => item.studentId === st.id) || {};
      const finalScore = calculateFinalScore(g);
      const pred = getPredicate(finalScore);

      htmlContent += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${st.name}</td>
          <td style="text-align:center;">${g.tp1 || '-'}</td>
          <td style="text-align:center;">${g.sumatif1 || '-'}</td>
          <td style="text-align:center;">${g.pas || '-'}</td>
          <td style="text-align:center;"><strong>${finalScore}</strong></td>
          <td><strong>${pred.label}:</strong> ${pred.desc}</td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

    exportToDocx(`DAFTAR_NILAI_RAPOR_${selectedClass}`, htmlContent);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Daftar Nilai & Deskripsi Rapor</h2>
          <p className="text-xs text-slate-500">Penilaian Formatif, Sumatif & Generasi Deskripsi Kurikulum Merdeka</p>
        </div>
        <button
          onClick={handleExportDocx}
          className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2.5 rounded-lg transition-all shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Word (.docx)</span>
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-3 border-r border-slate-200" rowSpan="2">Nama Siswa</th>
              <th className="p-2 text-center border-r border-slate-200 bg-indigo-50/50" colSpan="3">Formatif (TP)</th>
              <th className="p-2 text-center border-r border-slate-200 bg-blue-50/50" colSpan="2">Sumatif</th>
              <th className="p-2 text-center border-r border-slate-200" rowSpan="2">PAS</th>
              <th className="p-2 text-center border-r border-slate-200 font-bold bg-slate-100" rowSpan="2">Nilai Akhir</th>
              <th className="p-3 text-center" rowSpan="2">Deskripsi Otomatis Rapor</th>
            </tr>
            <tr className="border-b border-slate-200 text-[11px]">
              <th className="p-1.5 text-center border-r border-slate-200">TP 1</th>
              <th className="p-1.5 text-center border-r border-slate-200">TP 2</th>
              <th className="p-1.5 text-center border-r border-slate-200">TP 3</th>
              <th className="p-1.5 text-center border-r border-slate-200">ST 1</th>
              <th className="p-1.5 text-center border-r border-slate-200">ST 2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((st) => {
              const g = grades.find(item => item.studentId === st.id) || {};
              const finalScore = calculateFinalScore(g);
              const pred = getPredicate(finalScore);

              return (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800 border-r border-slate-100">{st.name}</td>
                  
                  <td className="p-1 border-r border-slate-100 text-center">
                    <input type="number" value={g.tp1 || ''} onChange={(e) => handleGradeChange(st.id, 'tp1', e.target.value)} className="w-12 text-center p-1 border rounded" />
                  </td>
                  <td className="p-1 border-r border-slate-100 text-center">
                    <input type="number" value={g.tp2 || ''} onChange={(e) => handleGradeChange(st.id, 'tp2', e.target.value)} className="w-12 text-center p-1 border rounded" />
                  </td>
                  <td className="p-1 border-r border-slate-100 text-center">
                    <input type="number" value={g.tp3 || ''} onChange={(e) => handleGradeChange(st.id, 'tp3', e.target.value)} className="w-12 text-center p-1 border rounded" />
                  </td>
                  <td className="p-1 border-r border-slate-100 text-center">
                    <input type="number" value={g.sumatif1 || ''} onChange={(e) => handleGradeChange(st.id, 'sumatif1', e.target.value)} className="w-12 text-center p-1 border rounded" />
                  </td>
                  <td className="p-1 border-r border-slate-100 text-center">
                    <input type="number" value={g.sumatif2 || ''} onChange={(e) => handleGradeChange(st.id, 'sumatif2', e.target.value)} className="w-12 text-center p-1 border rounded" />
                  </td>
                  <td className="p-1 border-r border-slate-100 text-center">
                    <input type="number" value={g.pas || ''} onChange={(e) => handleGradeChange(st.id, 'pas', e.target.value)} className="w-12 text-center p-1 border rounded" />
                  </td>

                  <td className="p-3 text-center border-r border-slate-100 font-bold font-mono bg-slate-50">
                    {finalScore}
                  </td>

                  <td className="p-2 text-[11px] text-slate-600 max-w-xs">
                    <span className="font-semibold text-slate-800">{pred.label}:</span> {pred.desc}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// CATATAN SISWA & BK TAB
// ----------------------------------------------------------------------
function CounselingTab({ students, counseling, setCounseling, selectedClass, showNotification, exportToDocx }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    studentId: students[0]?.id || "",
    type: "Prestasi",
    category: "Akademik",
    description: "",
    followUp: "",
    points: 10
  });

  const filteredCounseling = counseling.filter(c => {
    const st = students.find(s => s.id === c.studentId);
    return st && st.class === selectedClass;
  });

  const handleExportDocx = () => {
    let htmlContent = `
      <h3>CATATAN BIMBINGAN DAN PRESTASI SISWA</h3>
      <p>Kelas: <strong>${selectedClass}</strong></p>
      <table>
        <thead>
          <tr>
            <th width="5%">No</th>
            <th width="15%">Tanggal</th>
            <th width="20%">Nama Siswa</th>
            <th width="15%">Kategori</th>
            <th width="25%">Uraian Kejadian / Prestasi</th>
            <th width="20%">Tindak Lanjut</th>
          </tr>
        </thead>
        <tbody>
    `;

    filteredCounseling.forEach((c, idx) => {
      const st = students.find(s => s.id === c.studentId);
      htmlContent += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${c.date}</td>
          <td><strong>${st?.name || '-'}</strong></td>
          <td>${c.type} (${c.category})</td>
          <td>${c.description}</td>
          <td>${c.followUp || '-'}</td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

    exportToDocx(`CATATAN_BIMBINGAN_SISWA_${selectedClass}`, htmlContent);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.description) return;

    setCounseling([{ ...formData, id: Date.now() }, ...counseling]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      studentId: students[0]?.id || "",
      type: "Prestasi",
      category: "Akademik",
      description: "",
      followUp: "",
      points: 10
    });
    showNotification("Catatan bimbingan disimpan!");
  };

  const handleDelete = (id) => {
    setCounseling(counseling.filter(c => c.id !== id));
    showNotification("Catatan dihapus.");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Catatan Siswa & Bimbingan (BK)</h2>
          <p className="text-xs text-slate-500">Pencatatan Kejadian, Pelanggaran & Prestasi Siswa Kelas <span className="font-semibold text-indigo-600">{selectedClass}</span></p>
        </div>
        <button
          onClick={handleExportDocx}
          className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2.5 rounded-lg transition-all shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Word (.docx)</span>
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Tambah Catatan Siswa</h3>
        <form onSubmit={handleAdd} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-600 mb-1">Pilih Siswa</label>
              <select 
                value={formData.studentId} 
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.nis})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Jenis Catatan</label>
              <select 
                value={formData.type} 
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              >
                <option value="Prestasi">Prestasi (+ Poin)</option>
                <option value="Pelanggaran">Pelanggaran / Pembinaan (- Poin)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Tanggal</label>
              <input 
                type="date" 
                value={formData.date} 
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Uraian Kejadian / Catatan</label>
            <textarea 
              rows="2"
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Tindak Lanjut / Solusi</label>
            <input 
              type="text" 
              value={formData.followUp} 
              onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 bg-white"
            />
          </div>

          <button type="submit" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-xs hover:bg-indigo-700">
            Simpan Catatan
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {filteredCounseling.map((c) => {
          const st = students.find(s => s.id === c.studentId);
          return (
            <div key={c.id} className="border border-slate-200 rounded-lg p-3 text-xs space-y-1 hover:border-slate-300 relative">
              <button onClick={() => handleDelete(c.id)} className="absolute top-3 right-3 text-slate-400 hover:text-rose-600">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-800">{st?.name}</span>
                <span className={`px-2 py-0.5 rounded font-medium ${c.type === 'Prestasi' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {c.type}
                </span>
                <span className="text-slate-400">• {c.date}</span>
              </div>
              <p className="text-slate-700">{c.description}</p>
              {c.followUp && <p className="text-[11px] text-slate-500 italic">Tindak Lanjut: {c.followUp}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// IDENTITAS & DATA KELAS TAB
// ----------------------------------------------------------------------
function IdentityTab({ schoolInfo, setSchoolInfo, students, setStudents, selectedClass, showNotification }) {
  const [newStudent, setNewStudent] = useState({ nis: "", name: "", gender: "L" });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name) return;

    setStudents([...students, { ...newStudent, id: Date.now().toString(), class: selectedClass }]);
    setNewStudent({ nis: "", name: "", gender: "L" });
    showNotification("Siswa berhasil ditambahkan!");
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    showNotification("Siswa dihapus dari daftar.");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-800">Identitas Sekolah & Data Siswa</h2>
        <p className="text-xs text-slate-500">Pengaturan Profil Guru dan Anggota Kelas <span className="font-semibold text-indigo-600">{selectedClass}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
          <h3 className="text-xs font-bold text-slate-700">Profil Guru & Sekolah</h3>
          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-slate-600 mb-1">Nama Guru</label>
              <input 
                type="text" 
                value={schoolInfo.teacherName} 
                onChange={(e) => setSchoolInfo({ ...schoolInfo, teacherName: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">NIP Guru</label>
              <input 
                type="text" 
                value={schoolInfo.nip} 
                onChange={(e) => setSchoolInfo({ ...schoolInfo, nip: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Nama Kepala Sekolah</label>
              <input 
                type="text" 
                value={schoolInfo.principalName} 
                onChange={(e) => setSchoolInfo({ ...schoolInfo, principalName: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">NIP Kepala Sekolah</label>
              <input 
                type="text" 
                value={schoolInfo.principalNip} 
                onChange={(e) => setSchoolInfo({ ...schoolInfo, principalNip: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
          <h3 className="text-xs font-bold text-slate-700">Tambah Siswa Kelas {selectedClass}</h3>
          <form onSubmit={handleAddStudent} className="space-y-2 text-xs">
            <div>
              <label className="block text-slate-600 mb-1">NIS / NISN</label>
              <input 
                type="text" 
                value={newStudent.nis} 
                onChange={(e) => setNewStudent({ ...newStudent, nis: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Nama Lengkap Siswa</label>
              <input 
                type="text" 
                value={newStudent.name} 
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Jenis Kelamin</label>
              <select 
                value={newStudent.gender} 
                onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              >
                <option value="L">Laki-Laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-xs hover:bg-indigo-700 w-full">
              Tambah Siswa
            </button>
          </form>

          <div className="pt-3 border-t border-slate-200 max-h-48 overflow-y-auto space-y-1">
            {students.filter(s => s.class === selectedClass).map(s => (
              <div key={s.id} className="flex justify-between items-center text-xs bg-white p-2 rounded border border-slate-200">
                <span>{s.name} ({s.nis})</span>
                <button onClick={() => handleDeleteStudent(s.id)} className="text-rose-600 hover:text-rose-800">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}