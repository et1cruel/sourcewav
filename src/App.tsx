import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const CommunityFeed = lazy(() => import('@/pages/CommunityFeed').then(m => ({ default: m.CommunityFeed })));
const ArtistDirectory = lazy(() => import('@/pages/ArtistDirectory').then(m => ({ default: m.ArtistDirectory })));
const ArtistProfile = lazy(() => import('@/pages/ArtistProfile').then(m => ({ default: m.ArtistProfile })));
const PortfolioDetail = lazy(() => import('@/pages/PortfolioDetail').then(m => ({ default: m.PortfolioDetail })));
const EventDiscovery = lazy(() => import('@/pages/EventDiscovery').then(m => ({ default: m.EventDiscovery })));
const EventMap = lazy(() => import('@/pages/EventMap').then(m => ({ default: m.EventMap })));
const EventDetail = lazy(() => import('@/pages/EventDetail').then(m => ({ default: m.EventDetail })));
const VenueDirectory = lazy(() => import('@/pages/VenueDirectory').then(m => ({ default: m.VenueDirectory })));
const VenueDetail = lazy(() => import('@/pages/VenueDetail').then(m => ({ default: m.VenueDetail })));
const Marketplace = lazy(() => import('@/pages/Marketplace').then(m => ({ default: m.Marketplace })));
const ProductDetail = lazy(() => import('@/pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const News = lazy(() => import('@/pages/News').then(m => ({ default: m.News })));
const NewsDetail = lazy(() => import('@/pages/NewsDetail').then(m => ({ default: m.NewsDetail })));
const Collaborations = lazy(() => import('@/pages/Collaborations').then(m => ({ default: m.Collaborations })));
const Login = lazy(() => import('@/pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('@/pages/Register').then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const Feed = lazy(() => import('@/pages/Feed').then(m => ({ default: m.Feed })));
const CreatePost = lazy(() => import('@/pages/CreatePost').then(m => ({ default: m.CreatePost })));
const ProfileEdit = lazy(() => import('@/pages/ProfileEdit').then(m => ({ default: m.ProfileEdit })));
const PortfolioManage = lazy(() => import('@/pages/PortfolioManage').then(m => ({ default: m.PortfolioManage })));
const EventsCreate = lazy(() => import('@/pages/EventsCreate').then(m => ({ default: m.EventsCreate })));
const EventsManage = lazy(() => import('@/pages/EventsManage').then(m => ({ default: m.EventsManage })));
const MyTickets = lazy(() => import('@/pages/MyTickets').then(m => ({ default: m.MyTickets })));
const Orders = lazy(() => import('@/pages/Orders').then(m => ({ default: m.Orders })));
const MarketplaceManage = lazy(() => import('@/pages/MarketplaceManage').then(m => ({ default: m.MarketplaceManage })));
const CollaborationsManage = lazy(() => import('@/pages/CollaborationsManage').then(m => ({ default: m.CollaborationsManage })));
const Messages = lazy(() => import('@/pages/Messages').then(m => ({ default: m.Messages })));
const Notifications = lazy(() => import('@/pages/Notifications').then(m => ({ default: m.Notifications })));
const Settings = lazy(() => import('@/pages/Settings').then(m => ({ default: m.Settings })));
const OrganizerDashboard = lazy(() => import('@/pages/OrganizerDashboard').then(m => ({ default: m.OrganizerDashboard })));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityFeed />} />
        <Route path="/discover" element={<ArtistDirectory />} />
        <Route path="/artists" element={<ArtistDirectory />} />
        <Route path="/artists/:username" element={<ArtistProfile />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/events" element={<EventDiscovery />} />
        <Route path="/events/map" element={<EventMap />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/venues" element={<VenueDirectory />} />
        <Route path="/venues/:slug" element={<VenueDetail />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:id" element={<ProductDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/collaborations" element={<Collaborations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/portfolio/manage" element={<PortfolioManage />} />
        <Route path="/events/create" element={<EventsCreate />} />
        <Route path="/events/manage" element={<EventsManage />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/marketplace/manage" element={<MarketplaceManage />} />
        <Route path="/collaborations/manage" element={<CollaborationsManage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}

export default App;