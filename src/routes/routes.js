import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Administrator/Auth/AuthLayout.vue";
// GeneralViews
import NotFound from "@/views/GeneralViews/NotFoundPage.vue";

// Calendar
const Calendar = () => import("@/views/Calendar/Calendar.vue");
// Charts
const Charts = () => import("@/views/Charts.vue");

// Components pages
const Buttons = () => import("@/views/Components/Buttons.vue");
const Cards = () => import("@/views/Components/Cards.vue");
const GridSystem = () => import("@/views/Components/GridSystem.vue");
const Notifications = () => import("@/views/Components/Notifications.vue");
const Icons = () => import("@/views/Components/Icons.vue");
const Typography = () => import("@/views/Components/Typography.vue");

// Dashboard pages
const Dashboard = () => import("@/views/Dashboard/Dashboard.vue");
const AdminDashboard = () => import("@/views/Administrator/DashboardNew.vue");
const AlternativeDashboard = () =>
  import("@/views/Dashboard/AlternativeDashboard.vue");
const Widgets = () => import("@/views/Widgets.vue");

// Forms pages
const FormElements = () => import("@/views/Forms/FormElements.vue");
const FormComponents = () => import("@/views/Forms/FormComponents.vue");
const FormValidation = () => import("@/views/Forms/FormValidation.vue");

// Maps pages
const GoogleMaps = () => import("@/views/Maps/GoogleMaps.vue");
const VectorMaps = () => import("@/views/Maps/VectorMaps.vue");

// Pages
const User = () => import("@/views/Pages/UserProfile.vue");
const Pricing = () => import("@/views/Pages/Pricing.vue");
const TimeLine = () => import("@/views/Pages/TimeLinePage.vue");
const Login = () => import("@/views/Administrator/Auth/Login.vue");
const Forgot = () => import("@/views/Administrator/Auth/Forgot.vue");
const Logout = () => import("@/views/Administrator/Auth/Logout.vue");
const Home = () => import("@/views/Pages/Home.vue");
const Register = () => import("@/views/Administrator/Auth/Register.vue");
const Lock = () => import("@/views/Pages/Lock.vue");
const Reset = () => import("@/views/Administrator/Auth/Reset.vue");

// TableList pages
const RegularTables = () => import("@/views/Tables/RegularTables.vue");
const SortableTables = () => import("@/views/Tables/SortableTables.vue");
const PaginatedTables = () => import("@/views/Tables/PaginatedTables.vue");

//Reporting
// const Telecenter = () =>
//   import("@/views/Administrator/Reporting/Telecenter.vue");

// Settings Banner
const UpdateBeranda = () =>
  import("@/views/Administrator/Settings/Banner/UpdateBeranda.vue");
const UpdateProfil = () =>
  import("@/views/Administrator/Settings/Banner/UpdateProfil.vue");
const UpdateProdukPembiayaan = () =>
  import("@/views/Administrator/Settings/Banner/UpdateProdukPembiayaan.vue");
const UpdateSimulasiCicilan = () =>
  import("@/views/Administrator/Settings/Banner/UpdateSimulasiCicilan.vue");
const UpdateMitraBisnis = () =>
  import("@/views/Administrator/Settings/Banner/UpdateMitraBisnis.vue");
const UpdateAxi = () =>
  import("@/views/Administrator/Settings/Banner/UpdateAxi.vue");
const UpdateGudangInfo = () =>
  import("@/views/Administrator/Settings/Banner/UpdateGudangInfo.vue");
const UpdateGambar = () =>
  import("@/views/Administrator/Settings/Banner/UpdateGambar.vue");

// Produk
const MAXITravel = () =>
  import("@/views/Administrator/Products/MAXITravel.vue");
const MAXIEdukasi = () =>
  import("@/views/Administrator/Products/MAXIEdukasi.vue");
const MAXIUsaha = () => import("@/views/Administrator/Products/MAXIUsaha.vue");
const MAXISehat = () => import("@/views/Administrator/Products/MAXISehat.vue");
const MAXIGriya = () => import("@/views/Administrator/Products/MAXIGriya.vue");
const MAXIExtraguna = () =>
  import("@/views/Administrator/Products/MAXIExtraguna.vue");
const DetailMAXITravel = () =>
  import("@/views/Administrator/Products/DetailMAXITravel.vue");
const DetailMAXIEdukasi = () =>
  import("@/views/Administrator/Products/DetailMAXIEdukasi.vue");
const DetailMAXIUsaha = () =>
  import("@/views/Administrator/Products/DetailMAXIUsaha.vue");
const DetailMAXISehat = () =>
  import("@/views/Administrator/Products/DetailMAXISehat.vue");
const DetailMAXIGriya = () =>
  import("@/views/Administrator/Products/DetailMAXIGriya.vue");
const DetailMAXIExtraguna = () =>
  import("@/views/Administrator/Products/DetailMAXIExtraguna.vue");

// Produk
const Profile = () => import("@/views/Administrator/Profile.vue");

// Konten
const ArtikelBerita = () =>
  import("@/views/Administrator/Contents/ArtikelBerita.vue");
const TambahArtikel = () =>
  import("@/views/Administrator/Contents/TambahArtikel.vue");
const EditArtikel = () =>
  import("@/views/Administrator/Contents/EditArtikel.vue");
const Kategori = () => import("@/views/Administrator/Contents/Kategori.vue");
const MateriAXI = () => import("@/views/Administrator/Contents/MateriAXI.vue");
const TagProduk = () => import("@/views/Administrator/Contents/TagProduk.vue");
const DetailTagProduk = () =>
  import("@/views/Administrator/Contents/DetailTagProduk.vue");
const Testimoni = () => import("@/views/Administrator/Contents/Testimoni.vue");

// Users
const VendorList = () => import("@/views/Administrator/Users/Vendor.vue");
const CalonNasabahList = () =>
  import("@/views/Administrator/Users/CalonNasabah.vue");
const InternalList = () => import("@/views/Administrator/Users/Internal.vue");

// Settings
const Banner = () => import("@/views/Administrator/Settings/Banner/Banner.vue");
const Privilege = () =>
  import("@/views/Administrator/Settings/Privilege/Privilege.vue");
const UserPrivilege = () =>
  import("@/views/Administrator/Settings/Privilege/UserPrivilege.vue");
const Help = () => import("@/views/Administrator/Settings/Help/Help.vue");

// Notifikasi
const Notification = () =>
  import("@/views/Administrator/Notifications/ListNotification.vue");
const EmailReminder = () => import("@/views/Administrator/Inbox/EmailReminder.vue");

// Inbox
// const NewPopup = () => import('@/views/Administrator/Inbox/NewPopup.vue');
const NewMessage = () => import("@/views/Administrator/Inbox/NewMessage.vue");
// const ListMessage = () => import('@/views/Administrator/Inbox/ListMessage.vue');
const ListPopup = () => import("@/views/Administrator/Inbox/ListPopup.vue");
const Manual = () => import("@/views/Administrator/Inbox/Manual.vue");
const Automatic = () => import("@/views/Administrator/Inbox/Info.vue");
const Info = () => import("@/views/Administrator/Inbox/Info.vue");

// Pengajuan Cicilan
const Requests = () => import("@/views/Administrator/Requests/Requests.vue");
const DetailRequests = () =>
  import("@/views/Administrator/Requests/DetailRequests.vue");
const OrderByAXI = () =>
  import("@/views/Administrator/Requests/OrderByAXI/OrderByAXI.vue");
const OrderStatus = () =>
  import("@/views/Administrator/Requests/OrderStatus/OrderStatus.vue");

// AXI
const AXI = () => import("@/views/Administrator/AXI/ListAXI.vue");
const DetailAXI = () => import("@/views/Administrator/AXI/DetailAXI.vue");
const DetailAXINew = () => import("@/views/Administrator/AXI/DetailAXINew.vue");
const DetailPendaftaranAXI = () =>
  import("@/views/Administrator/AXI/DetailPendaftaranAXI.vue");
const ListPendaftaranAXI = () =>
  import("@/views/Administrator/AXI/ListPendaftaranAXI.vue");
const ListPendaftaranAXIOld = () =>
  import("@/views/Administrator/AXI/ListPendaftaranAXIOld.vue");
const ImportAXI = () => import("@/views/Administrator/AXI/ImportAXI.vue");
const EditPendaftaranAXI = () =>
  import("@/views/Administrator/AXI/EditPendaftaranAXI.vue");
const ManualReprocess = () =>
  import("@/views/Administrator/AXI/ManualReprocess.vue");
const PendaftaranEpks = () => import("@/views/Administrator/Epks/ListEPKS.vue");
const DetailPendaftaranEpks = () =>
  import("@/views/Administrator/Epks/DetailEPKS.vue");

// INFORMAXI
const Trip = () => import("@/views/Administrator/InformAXI/Trip.vue");
const Gathering = () => import("@/views/Administrator/InformAXI/Gathering.vue");

// MAXI
const MAXI = () => import("@/views/Administrator/MAXI/ListMAXI.vue");
const DetailMAXI = () => import("@/views/Administrator/MAXI/DetailMAXI.vue");
const PendaftaranMAXI = () =>
  import("@/views/Administrator/MAXI/pendaftaran/ListPendaftaran.vue");
const PengajuanProduk = () =>
  import("@/views/Administrator/MAXI/pengajuan/Pengajuan.vue");
const MAXISaya = () => import("@/views/Administrator/MAXI/MAXISaya.vue");
const MAXISayaDetail = () =>
  import("@/views/Administrator/MAXI/MAXISayaDetail.vue");

// Program
const PromoPartnershipUser = () =>
  import("@/views/Administrator/Program/PromoPartnershipUser.vue");
const PromoPartnershipUserDetail = () =>
  import("@/views/Administrator/Program/NewEditPromoPartnershipUser.vue");
const ListPromoPartnership = () =>
  import("@/views/Administrator/Program/ListPromoPartnership.vue");
const EditPromoPartnership = () =>
  import("@/views/Administrator/Program/EditPromoPartnership.vue");
const NewPromoPartnership = () =>
  import("@/views/Administrator/Program/NewPromoPartnership.vue");
const ManageContent = () =>
  import("@/views/Administrator/Program/ManageContent/Browse.vue");

// Not Found Pages
const PageNotFound = () => import("@/views/Administrator/404NotFound.vue");

// let componentsMenu = {
//   path: '/components',
//   component: DashboardLayout,
//   redirect: '/components/buttons',
//   name: 'Components',
//   children: [
//     {
//       path: 'buttons',
//       name: 'Buttons',
//       component: Buttons
//     },
//     {
//       path: 'cards',
//       name: 'Cards',
//       component: Cards
//     },
//     {
//       path: 'grid-system',
//       name: 'Grid System',
//       component: GridSystem
//     },
//     {
//       path: 'notifications',
//       name: 'Notifications',
//       component: Notifications
//     },
//     {
//       path: 'icons',
//       name: 'Icons',
//       component: Icons
//     },
//     {
//       path: 'typography',
//       name: 'Typography',
//       component: Typography
//     }
//   ]
// };
// let formsMenu = {
//   path: '/forms',
//   component: DashboardLayout,
//   redirect: '/forms/elements',
//   name: 'Forms',
//   children: [
//     {
//       path: 'elements',
//       name: 'Form elements',
//       component:  FormElements
//     },
//     {
//       path: 'components',
//       name: 'Form components',
//       component:  FormComponents
//     },
//     {
//       path: 'validation',
//       name: 'Form validation',
//       component:  FormValidation
//     }
//   ]
// };

// let tablesMenu = {
//   path: '/tables',
//   component: DashboardLayout,
//   redirect: '/table/regular',
//   name: 'Tables menu',
//   children: [
//     {
//       path: 'regular',
//       name: 'Tables',
//       component: RegularTables
//     },
//     {
//       path: 'sortable',
//       name: 'Sortable',
//       component: SortableTables
//     },
//     {
//       path: 'paginated',
//       name: 'Paginated Tables',
//       component: PaginatedTables
//     }
//   ]
// };

// let mapsMenu = {
//   path: '/maps',
//   component: DashboardLayout,
//   name: 'Maps',
//   redirect: '/maps/google',
//   children: [
//     {
//       path: 'google',
//       name: 'Google Maps',
//       component: GoogleMaps
//     },
//     {
//       path: 'vector',
//       name: 'Vector Map',
//       component: VectorMaps
//     }
//   ]
// };

// let pagesMenu = {
//   path: '/pages',
//   component: DashboardLayout,
//   name: 'Pages',
//   redirect: '/pages/user',
//   children: [
//     {
//       path: 'user',
//       name: 'User Page',
//       component: User
//     },
//     {
//       path: 'timeline',
//       name: 'Timeline Page',
//       component: TimeLine
//     }
//   ]
// };

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home,
    //   meta: {
    //     noBodyBackground: true
    //   }
    // },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/forgot-password",
      component: Forgot,
      name: "Forgot"
    },
    {
      path: "/password/reset/:token",
      component: Reset,
      name: "Reset"
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    // {
    //   path: '/logout',
    //   name: 'Logout',
    //   component: Logout
    // },
    { path: "*", component: NotFound }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/login",
    name: "Login Admin"
  },
  // componentsMenu,
  // formsMenu,
  // tablesMenu,
  // mapsMenu,
  // pagesMenu,
  {
    path: "/administrator",
    component: DashboardLayout,
    redirect: "/administrator/dashboard",
    name: "Dashboard layout",
    children: [
      //Dashboard
      {
        path: "dashboard",
        name: "Dashboard",
        component: AdminDashboard,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      //Profile
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Produk
      {
        path: "products/maxi-travel",
        name: "MAXITravel",
        component: MAXITravel,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-travel/:id/detail",
        name: "detail_maxitravel",
        component: DetailMAXITravel,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-edukasi",
        name: "MAXIEdukasi",
        component: MAXIEdukasi,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-edukasi/:id/detail",
        name: "detail_maxiedukasi",
        component: DetailMAXIEdukasi,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-usaha",
        name: "MAXIUsaha",
        component: MAXIUsaha,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-usaha/:id/detail",
        name: "detail_maxiusaha",
        component: DetailMAXIUsaha,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-sehat",
        name: "MAXISehat",
        component: MAXISehat,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-sehat/:id/detail",
        name: "detail_maxisehat",
        component: DetailMAXISehat,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-griya",
        name: "MAXIGriya",
        component: MAXIGriya,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-griya/:id/detail",
        name: "detail_maxigriya",
        component: DetailMAXIGriya,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-extraguna",
        name: "MAXIExtraguna",
        component: MAXIExtraguna,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "products/maxi-extraguna/:id/detail",
        name: "detail_maxiextraguna",
        component: DetailMAXIExtraguna,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Konten
      {
        path: "contents/news",
        name: "artikel berita",
        component: ArtikelBerita,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "contents/news/add",
        name: "tambah artikel",
        component: TambahArtikel,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "contents/news/edit/:id",
        name: "edit artikel",
        component: EditArtikel,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "contents/axi",
        name: "materi axi",
        component: MateriAXI,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "contents/categories",
        name: "kategori",
        component: Kategori,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "contents/tag-products",
        name: "tag produk",
        component: TagProduk,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "contents/tag-products/:id/detail",
        name: "detail tag produk",
        component: DetailTagProduk,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "contents/testimonial",
        name: "testimoni",
        component: Testimoni,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      //Requests
      {
        path: "requests",
        name: "Pengajuan Cicilan",
        component: Requests,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "requests/listorder",
        name: "List Order Pengajuan",
        props: true,
        component: () =>
          import("@/views/Administrator/Requests/OrderByAXI/OrderByAXI.vue"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "requests/statusorder",
        name: "Status Order",
        props: true,
        component: () =>
          import("@/views/Administrator/Requests/OrderStatus/OrderStatus.vue"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "requests/listorder/detail/:id",
        name: "List Order Pengajuan Detail",
        props: true,
        component: () =>
          import("@/views/Administrator/Requests/OrderByAXI/EditOrderbyAXI.vue"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "requests/:id/detail",
        name: "details",
        component: DetailRequests,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      //AXI
      {
        path: "axi/list",
        name: "Semua Data AXI",
        component: AXI,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/list/:id/detail",
        name: "details axi",
        component: DetailAXI,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/list/:id/detailnew",
        name: "details axi new",
        component: DetailAXINew,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/pendaftaran",
        name: "Pendaftaran AXI",
        component: ListPendaftaranAXI,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/pendaftaran/:id/detail",
        name: "details pendaftaran axi",
        component: DetailPendaftaranAXI,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/pendaftaran-epks",
        name: "Pendaftaran E-PKS",
        component: PendaftaranEpks,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/detail-epks/:id",
        name: "Detail E-PKS",
        component: DetailPendaftaranEpks,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/import",
        name: "Import AXI",
        component: ImportAXI,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/pendaftaran/edit/:id",
        name: "edit pendaftaran axi",
        component: EditPendaftaranAXI,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "axi/listreprocess/",
        name: "list reprosess",
        component: ManualReprocess,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      //MAXI
      {
        path: "maxi/list",
        name: "Semua Data MAXI",
        component: MAXI,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/list/:id/detail",
        name: "details maxi",
        component: DetailMAXI,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/produk-saya",
        name: "Semua Data MAXI Produk",
        component: MAXISaya,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/produk-saya/:id/detail",
        name: "Detail Produk Saya",
        component: MAXISayaDetail,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/profile",
        name: "Profile MAXI",
        component: () => import("@/views/Administrator/MAXI/Profile"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/change_password",
        name: "Change Password MAXI",
        component: () => import("@/views/Administrator/MAXI/ChangePassword"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/pendaftaran",
        name: "Pendaftaran MAXI",
        component: PendaftaranMAXI,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/pendaftaran/:id/detail",
        name: "details_maxipendaftaran",
        component: () =>
          import("@/views/Administrator/MAXI/pendaftaran/Detail"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/tambah_produk",
        name: "Tambah Produk MAXI",
        component: () =>
          import("@/views/Administrator/MAXI/pendaftaran/Tambah"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/pengajuan",
        name: "Pengajuan Produk",
        component: PengajuanProduk,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "maxi/pengajuan/:id/detail",
        name: "details_maxipengajuan",
        component: () => import("@/views/Administrator/MAXI/pengajuan/Detail"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Users
      {
        path: "users/calon-nasabah",
        name: "Calon Nasabah List",
        component: CalonNasabahList,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "users/vendor",
        name: "Vendor List",
        component: VendorList,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "users/internal-user",
        name: "Internal List",
        component: InternalList,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      // Settings
      {
        path: "settings/banner",
        name: "Banner",
        component: Banner,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/beranda",
        name: "Halaman Beranda",
        component: UpdateBeranda,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/profil",
        name: "Halaman Profil",
        component: UpdateProfil,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/produk-pembiayaan",
        name: "Halaman Produk Pembiayaan",
        component: UpdateProdukPembiayaan,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/simulasi-cicilan",
        name: "Halaman Simulasi Cicilan",
        component: UpdateSimulasiCicilan,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/mitra-bisnis",
        name: "Halaman Mitra Bisnis",
        component: UpdateMitraBisnis,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/axi",
        name: "Halaman AXI",
        component: UpdateAxi,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/gudang-info",
        name: "Halaman Gudang Info",
        component: UpdateGudangInfo,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/banner/:id",
        name: "Ubah Gambar",
        component: UpdateGambar,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "settings/user-privilege",
        name: "User Privilege",
        component: UserPrivilege,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      // {
      //   path: 'settings/privilege',
      //   name: 'Privilege',
      //   component: Privilege,
      //   meta: {
      //     navbarClasses: 'bg-gradient-orange navbar-dark',
      //     searchClasses: 'navbar-search-light'
      //   }
      // },
      // {
      //   path: 'settings/help',
      //   name: 'Help',
      //   component: Help,
      //   meta: {
      //     navbarClasses: 'bg-gradient-orange navbar-dark',
      //     searchClasses: 'navbar-search-light'
      //   }
      // },

      //Reporting
      {
        path: "reporting/orderbyaxi",
        name: "orderbyaxi",
        component: () =>
          import("@/views/Administrator/Reporting/OrderByAXI.vue"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "reporting/registrasi",
        name: "registrasi_report",
        component: () =>
          import("@/views/Administrator/Reporting/RegistrationAXI.vue"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "reporting/dataallaxi",
        name: "dataallaxi",
        component: () =>
          import("@/views/Administrator/Reporting/DataAllAXI.vue"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Old Menu
      {
        path: "axi/pendaftaran/listaxi",
        name: "Pendaftaran AXI Old",
        component: ListPendaftaranAXIOld,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Notification
      {
        path: "notification",
        name: "notification",
        component: Notification,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Inbox
      // {
      //   path: 'inbox/listmessage',
      //   name: 'listmessage',
      //   component: ListMessage,
      //   meta: {
      //     navbarClasses: 'bg-gradient-orange navbar-dark',
      //     searchClasses: 'navbar-search-light'
      //   }
      // },
      {
        path: "inbox/listpopup",
        name: "listpopup",
        component: ListPopup,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "inbox/newmessage",
        name: "newmessage",
        component: NewMessage,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "inbox/emailreminder",
        name: "emailreminder",
        component: EmailReminder,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      // {
      //   path: 'inbox/newpopup',
      //   name: 'newpopup',
      //   component: NewPopup,
      //   meta: {
      //     navbarClasses: 'bg-gradient-orange navbar-dark',
      //     searchClasses: 'navbar-search-light'
      //   }
      // },
      {
        path: "inbox/manual",
        name: "manual",
        component: Manual,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "inbox/automatic",
        name: "automatic",
        component: Automatic,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "inbox/info",
        name: "info",
        component: Info,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // simulation
      // {
      //   path: "simulasi/settings",
      //   name: "simulation_setting",
      //   component: () => import("@/views/Administrator/Simulation/Setting"),
      //   meta: {
      //     navbarClasses: "bg-gradient-orange navbar-dark",
      //     searchClasses: "navbar-search-light"
      //   }
      // },
      {
        path: "simulasi/settings/mobil_passenger",
        name: "simulation_setting_mobil_passenger",
        component: () => import("@/views/Administrator/Simulation/settings/SettingMobilPassenger"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "simulasi/settings/mobil_commercial",
        name: "simulation_setting_mobil_commercial",
        component: () => import("@/views/Administrator/Simulation/settings/SettingMobilCommercial"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      {
        path: "simulasi/settings/motor",
        name: "simulation_setting_motor",
        component: () => import("@/views/Administrator/Simulation/settings/SettingMotor"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      }, 

      {
        path: "simulasi/mrp/mobil",
        name: "simulation_mobil",
        component: () => import("@/views/Administrator/Simulation/mrp/Mobil"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "simulasi/mrp/motor",
        name: "simulation_motor",
        component: () => import("@/views/Administrator/Simulation/mrp/Motor"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "simulasi/rate/lending",
        name: "rate_lending",
        component: () =>
          import("@/views/Administrator/Simulation/rate/Lending"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "simulasi/rate/lending_motor",
        name: "rate_lending_motor",
        component: () =>
          import("@/views/Administrator/Simulation/rate/LendingMotor"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "simulasi/rate/premi",
        name: "rate_premi",
        component: () => import("@/views/Administrator/Simulation/rate/Premi"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "simulasi/konfigurasi_dokumen",
        name: "konfigurasi_dokumen",
        component: () => import("@/views/Administrator/Simulation/KonfigurasiDokumen"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Business Reward
      {
        path: "business-reward/redeem",
        name: "business-reward-redeem",
        component: () =>
          import("@/views/Administrator/BusinessReward/claim/Redeem"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "business-reward/catalog",
        name: "business-reward-catalog",
        component: () => import("@/views/Administrator/BusinessReward/Catalog"),
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },

      // Inform AXI
      {
        path: "inform-axi/trip",
        name: "inform-axi-trip",
        component: Trip,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "inform-axi/gathering",
        name: "inform-axi-gathering",
        component: Gathering,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      // Program
      {
        path: "program/partnership",
        name: "list-partnership",
        component: ListPromoPartnership,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "program/partnership/manage-content",
        name: "manage-content",
        component: ManageContent,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "program/partnership/create",
        name: "new-partnership",
        component: NewPromoPartnership,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "program/partnership/update",
        name: "update-partnership",
        component: NewPromoPartnership,
        props: true,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "program/partnership-user",
        name: "Promo / Partnership User",
        component: PromoPartnershipUser,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "program/partnership-user/:param/:id?",
        name: "Promo / Partnership User Detail",
        props: true,
        component: PromoPartnershipUserDetail,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      },
      {
        path: "*",
        name: "Page Not Found",
        component: PageNotFound,
        meta: {
          navbarClasses: "bg-gradient-orange navbar-dark",
          searchClasses: "navbar-search-light"
        }
      }
    ]
  },

  authPages
];

export default routes;
