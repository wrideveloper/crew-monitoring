import Admin from "../pages/Admin"
import Anggota from "../pages/Anggota"
import Checkin from "../pages/Checkin"
import Divisi from "../pages/Divisi"
import Jabatan from "../pages/Jabatan"
import KategoriKegiatan from "../pages/KategoriKegiatan"
import Kegiatan from "../pages/Kegiatan"
import Login from "../pages/Login"
import Miniclass from "../pages/Miniclass"
import NomorSurat from "../pages/NomorSurat"
import Presensi from "../pages/Presensi"

const routes: IRoute[] = [
  {
    component: Anggota,
    label: "Anggota",
    icon: "group",
    path: "/anggota",
    private: true,
  },
  {
    component: Divisi,
    label: "Divisi",
    icon: "shield",
    path: "/divisi",
    private: true,
  },
  {
    component: Jabatan,
    label: "Jabatan",
    icon: "sitemap",
    path: "/jabatan",
    private: true,
  },
  {
    component: Kegiatan,
    label: "Kegiatan",
    icon: "laptop",
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
    icon: "student",
    path: "/miniclass",
    private: true,
  },
  {
    component: Presensi,
    label: "Presensi",
    icon: "address book",
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
    icon: "user",
    path: "/admin",
    private: true,
  },
  {
    component: Login,
    path: "/login",
    hide: true,
  },
]

export default routes
