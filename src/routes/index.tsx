import Anggota from "../pages/Anggota"
import Divisi from "../pages/Divisi"
import Jabatan from "../pages/Jabatan"
import Miniclass from "../pages/Miniclass"

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
  {
    component: Miniclass,
    label: "Miniclass",
    path: "/miniclass",
  },
]

export default routes
