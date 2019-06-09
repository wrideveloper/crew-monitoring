import Admin from "../pages/Admin"
import Anggota from "../pages/Anggota"
import Checkin from "../pages/Checkin"
import Divisi from "../pages/Divisi"
import HakAkses from "../pages/HakAkses"
import Jabatan from "../pages/Jabatan"
import KategoriKegiatan from "../pages/KategoriKegiatan"
import Kegiatan from "../pages/Kegiatan"
import Level from "../pages/Level"
import Login from "../pages/Login"
import Miniclass from "../pages/Miniclass"
import NomorSurat from "../pages/NomorSurat"
import Presensi from "../pages/Presensi"

const routes: IRoute[] = [
  {
    name: "anggota",
    component: Anggota,
    label: "Anggota",
    icon: "address card outline",
    path: "/anggota",
    private: true,
  },
  {
    name: "divisi",
    component: Divisi,
    label: "Divisi",
    icon: "building outline",
    path: "/divisi",
    private: true,
  },
  {
    name: "jabatan",
    component: Jabatan,
    label: "Jabatan",
    icon: "handshake outline",
    path: "/jabatan",
    private: true,
  },
  {
    name: "kegiatan",
    component: Kegiatan,
    label: "Kegiatan",
    icon: "calendar alternate outline",
    path: "/kegiatan",
    private: true,
  },
  {
    name: "kategoriKegiatan",
    component: KategoriKegiatan,
    label: "Kategori Kegiatan",
    path: "/kegiatan/kategori",
    hide: true,
    private: true,
  },
  {
    name: "miniclass",
    component: Miniclass,
    label: "Miniclass",
    icon: "lightbulb outline",
    path: "/miniclass",
    private: true,
  },
  {
    name: "presensi",
    component: Presensi,
    label: "Presensi",
    icon: "edit outline",
    path: "/presensi",
    private: true,
  },
  {
    name: "checkin",
    component: Checkin,
    label: "Checkin",
    path: "/presensi/checkin",
    hide: true,
    private: true,
  },
  {
    name: "nomorSurat",
    component: NomorSurat,
    label: "Nomor Surat",
    icon: "envelope outline",
    path: "/nomorSurat",
    private: true,
  },
  {
    name: "admin",
    component: Admin,
    label: "Admin",
    icon: "user outline",
    path: "/admin",
    private: true,
  },
  {
    name: "level",
    component: Level,
    label: "Level Admin",
    path: "/admin/level",
    hide: true,
    private: true,
  },
  {
    name: "hakAkses",
    component: HakAkses,
    label: "Hak Akses",
    path: "/admin/level/hakAkses",
    hide: true,
    private: true,
  },
  {
    name: "login",
    component: Login,
    path: "/login",
    hide: true,
  },
]

export default routes
