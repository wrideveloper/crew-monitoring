import Admin from "../pages/Admin"
import Anggota from "../pages/Anggota"
import Checkin from "../pages/Checkin"
import Divisi from "../pages/Divisi"
import Jabatan from "../pages/Jabatan"
import KategoriKegiatan from "../pages/KategoriKegiatan"
import Kegiatan from "../pages/Kegiatan"
import Login from "../pages/Login"
import Miniclass from "../pages/Miniclass"
import Presensi from "../pages/Presensi"

const routes: IRoute[] = [
  {
    component: Anggota,
    label: "Anggota",
    path: "/anggota",
    private: true,
  },
  {
    component: Divisi,
    label: "Divisi",
    path: "/divisi",
    private: true,
  },
  {
    component: Jabatan,
    label: "Jabatan",
    path: "/jabatan",
    private: true,
  },
  {
    component: Miniclass,
    label: "Miniclass",
    path: "/miniclass",
    private: true,
  },
  {
    component: Presensi,
    label: "Presensi",
    path: "/presensi",
    private: true,
  },
  {
    component: Checkin,
    path: "/checkin",
    hide: true,
    private: true,
  },
  {
    component: Kegiatan,
    label: "Kegiatan",
    path: "/kegiatan",
    private: true,
  },
  {
    component: KategoriKegiatan,
    label: "Kategori Kegiatan",
    path: "/kategoriKegiatan",
    private: true,
  },
  {
    component: Admin,
    label: "Admin",
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
