import Admin from "../pages/Admin"
import Anggota from "../pages/Anggota"
import Checkin from "../pages/Checkin"
import Divisi from "../pages/Divisi"
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
    component: Anggota,
    label: "Anggota",
    icon: "address card outline",
    path: "/anggota",
    private: true,
  },
  {
    component: Divisi,
    label: "Divisi",
    icon: "building outline",
    path: "/divisi",
    private: true,
  },
  {
    component: Jabatan,
    label: "Jabatan",
    icon: "handshake outline",
    path: "/jabatan",
    private: true,
  },
  {
    component: Kegiatan,
    label: "Kegiatan",
    icon: "calendar alternate outline",
    path: "/kegiatan",
    private: true,
  },
  {
    component: KategoriKegiatan,
    path: "/kegiatan/kategori",
    hide: true,
    private: true,
  },
  {
    component: Miniclass,
    label: "Miniclass",
    icon: "lightbulb outline",
    path: "/miniclass",
    private: true,
  },
  {
    component: Presensi,
    label: "Presensi",
    icon: "edit outline",
    path: "/presensi",
    private: true,
  },
  {
    component: Checkin,
    path: "/presensi/checkin",
    hide: true,
    private: true,
  },
  {
    component: NomorSurat,
    label: "Nomor Surat",
    icon: "envelope outline",
    path: "/nomorSurat",
    private: true,
  },
  {
    component: Admin,
    label: "Admin",
    icon: "user outline",
    path: "/admin",
    private: true,
  },
  {
    component: Level,
    label: "Level Admin",
    path: "/admin/level",
    hide: true,
    private: true,
  },
  {
    component: Login,
    path: "/login",
    hide: true,
  },
]

export default routes
