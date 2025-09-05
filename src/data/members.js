import positions from './photoPositions.json'

const members = [
  {
    id: 1,
    name: 'إبراهيم الجيري',
    role: 'رئيس المجلس',
  photo: 'assets/member 1 - chairman.jpg',
    description: 'Experienced leader with a passion for youth development and community engagement.'
  },
  {
    id: 2,
    name: 'فاطمة الشحي',
    role: 'نائب رئيس المجلس',
  photo: 'assets/member 2 - vice president.jpg',
    description: 'Focused on educational initiatives and public outreach.'
  },
  {
    id: 3,
    name: 'فاطمة الشرهان',
    role: 'أمين السر',
  photo: 'assets/member 3.jpg',
  photoPosition: 'center 20%',
    description: 'Coordinates council activities and documentation.'
  },
  {
    id: 4,
    name: 'سيف الياسي',
    role: 'مسؤول البيانات والاحصاء',
  photo: 'assets/member 4.jpg',
  photoPosition: 'center 15%',
    description: 'Manages council a.'
  },
  {
    id: 5,
    name: 'آمنة الشحي',
    role: 'مسؤول التخطيط والتطوير',
  photo: 'assets/member 5.jpg',
  photoPosition: 'center 20%',
    description: 'Organizes and oversees council events and activities.'
  },
  {
    id: 6,
    name: 'خالد البلوشي',
    role: 'مسؤول الإتصال والشراكة',
  photo: 'assets/member 6.png',
  photoPosition: 'center 12%',
    description: 'Handles media relations and council communications.'
  },
  {
    id: 7,
    name: 'مريم الشحي',
    role: 'مسؤول المبادرات والمشاريع',
  photo: 'assets/member 7.jpg',
  photoPosition: 'center 30%',
    description: 'Builds partnerships with local organizations.'
  },
  {
    id: 8,
    name: 'هزاع الشحي',
    role: 'المسؤول الإعلامي',
  photo: 'assets/member 8.jpg',
  photoPosition: 'center 15%',
    description: 'Represents youth interests and feedback.'
  },
  {
    id: 9,
    name: 'شذى المهيري',
    role: 'مسؤول المبادرات والمشاريع',
  photo: 'assets/member 9.jpg',
  photoPosition: 'center 15%',
    description: 'Maintains council website and digital presence.'
  },
  {
    id: 10,
    name: 'محمد بريم',
    role: 'مسؤول الدعم اللوجستي',
  photo: 'assets/member 10.jpg',
    description: 'Supports various council initiatives and projects.'
  }
]

// merge positions from photoPositions.json (if present)
const merged = members.map(m => ({ ...m, photoPosition: positions[m.id] ?? m.photoPosition }))

export default merged
