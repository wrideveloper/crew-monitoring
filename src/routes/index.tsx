import Anggota from "../pages/Anggota"
import Divisi from "../pages/Divisi"
import Jabatan from "../pages/Jabatan"

const routes: IRoute[] = [
  {
    component: Anggota,
    label: "Anggota",
    path: "/anggota",
  },
  {
    component: Divisi,
    label: "Divisi",
    path: "/divisi",
  },
  {
    component: Jabatan,
    label: "Jabatan",
    path: "/jabatan",
  },
]

export default routes
