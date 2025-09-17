import positions from './photoPositions.json'

const base = import.meta.env.BASE_URL || '/'

const members = [
  {
    id: 1,
    name: 'إبراهيـم محمـد الجـيـري',
    role: 'رئيس المجلس',
  photo: base + 'assets/member 1 - chairman.jpg',
    description: 'Experienced leader with a passion for youth development and community engagement.'
  },
  {
    id: 2,
    name: 'فاطمـة محمـد الشـحـي',
    role: 'نائب رئيس المجلس',
  photo: base + 'assets/member 2 - vice president.jpg',
    description: 'Focused on educational initiatives and public outreach.'
  },
  {
    id: 3,
    name: 'فاطمـة عدنان الشرهان',
    role: 'أمين السر',
  photo: base + 'assets/member 3.jpg',
  photoPosition: 'center 20%',
    description: 'Coordinates council activities and documentation.'
  },
  {
    id: 4,
    name: 'سـيـف خالد بوقفـل',
    role: 'مسؤول البيانات والاحصاء',
  photo: base + 'assets/member 4.jpg',
  photoPosition: 'center 15%',
    description: 'Testt'
  },
  {
    id: 5,
    name: 'آمنـه إسماعيـل العوضـي',
    role: 'مسؤول التخطيط والتطوير',
  photo: base + 'assets/member 5.jpg',
  photoPosition: 'center 20%',
    description: 'Organizes and oversees council events and activities.'
  },
  {
    id: 6,
    name: 'خالد مراد البلوشـي',
    role: 'مسؤول الإتصال والشراكة',
  photo: base + 'assets/member 6.png',
  photoPosition: 'center 12%',
    description: 'Handles media relations and council communications.'
  },
  {
    id: 7,
    name: 'مـريـم مـحمـد الـشحـي',
    role: 'مسؤول المبادرات والمشاريع',
  photo: base + 'assets/member 7.jpg',
  photoPosition: 'center 30%',
    description: 'Builds partnerships with local organizations.'
  },
  {
    id: 8,
    name: 'هـزاع عبدالله الـشحـي',
    role: 'المسؤول الإعلامي',
  photo: base + 'assets/member 8.jpg',
  photoPosition: 'center 15%',
    description: 'Represents youth interests and feedback.'
  },
  {
    id: 9,
    name: 'شـذى عبدالله الـمهيـري',
    role: 'مسؤول المبادرات والمشاريع',
  photo: base + 'assets/member 9.jpg',
  photoPosition: 'center 15%',
    description: 'Maintains council website and digital presence.'
  },
  {
    id: 10,
    name: 'مـحمـد عـلـي بـريـم',
    role: 'مسؤول الدعم اللوجستي',
  photo: base + 'assets/member 10.jpg',
    description: 'Supports various council initiatives and projects.'
  }
]

// merge positions from photoPositions.json (if present)
const merged = members.map(m => ({ ...m, photoPosition: positions[m.id] ?? m.photoPosition }))

export default merged
