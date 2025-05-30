import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


import {FiAirplay, FiUsers} from "react-icons/fi";
import { BsPersonWorkspace } from "react-icons/bs";
import "./style.css";

const sideBarNavlinks = [
  { title: 'Dashboard', link: '/dashboard', icon: <FiAirplay size={16} /> },
  { title: 'User Management', link: '/user-management', icon: <FiUsers size={16} /> },
  { title: 'Vendor Management', link: '/vendor-management', icon: <BsPersonWorkspace size={16} /> }
  // { title: 'Event Assign Management', link: '/interested-volunteer-management', icon: VolunteersManagement },
  // { title: 'Create Notification', link: '/create-notification', icon: VolunteersManagement },
  // { title: 'CMS Stats', link: '/stats', icon: EventManagement },
  // { title: 'Programs Management', link: '/programs-management', icon: ProgramsManagement },
  // { title: 'Event Management', link: '/event-management', icon: EventManagement },
  // { title: 'Podcast Management', link: '/podcast-management', icon: PodcastManagement },
  // { title: 'Sponsor Program', link: '/sponsor-program', icon: SponsorshipManagement },
  // { title: 'Top Volunteer Management', link: '/top-volunteer-management', icon: VolunteersManagement },
  // { title: 'Announcement Management', link: '/announcement-management', icon: AnnouncementManagement },
  // { title: 'Sponsorship Management', link: '/sponsorship-management', icon: SponsorshipManagement },
  // { title: 'Our Works Management', link: '/project-management', icon: Dashbord },
  // { title: 'Brand Management', link: '/brand-management', icon: BrandManagement },
];

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        {sideBarNavlinks.map((linkItem) => (
          <li className="sidebar-li" key={linkItem.link}>
            <Link
              className={`sideLink ${location.pathname.includes(linkItem.link) ? 'active' : ''}`}
              to={linkItem.link}
            >
              <span className="sideIcon">
                {linkItem.icon}
              </span>
              <span className="sideLinkText">{linkItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
