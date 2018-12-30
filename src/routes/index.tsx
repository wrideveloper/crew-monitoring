import React from "react"

import Crew from "../pages/Crew"
import Divisi from "../pages/Divisi"
import Jabatan from "../pages/Jabatan"

const routes: IRoute[] = [
  {
    component: Crew,
    label: "Data Crew",
    path: "/crew",
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
