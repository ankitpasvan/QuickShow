import React from 'react'
import { assets } from '../../assets/assets'
import {
  LayoutDashboardIcon,
  PlusSquareIcon,
  ListIcon,
  ListCollapseIcon
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {

  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  }

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon }
  ]

  return (
    <div className='h-[calc(100vh-64px)] flex flex-col items-center pt-8 w-60 border-r border-gray-300/20 text-sm'>

      <img className='h-10 w-10 md:h-14 md:w-14 rounded-full' src={user.imageUrl} alt="" />

      <p className='mt-2 text-base max-md:hidden'>
        {user.firstName} {user.lastName}
      </p>

      <div className='w-full mt-6'>

        {adminNavlinks.map((link, index) => {
          const Icon = link.icon

          return (
            <NavLink
              key={index}
              to={link.path}
              end
              className={({ isActive }) =>
                `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 text-gray-400 
                ${isActive ? 'bg-primary/15 text-primary' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <p className='max-md:hidden'>{link.name}</p>

                  <span className={`absolute right-0 w-1 h-full rounded-l 
                    ${isActive ? 'bg-primary' : ''}`} />
                </>
              )}
            </NavLink>
          )
        })}

      </div>
    </div>
  )
}

export default AdminSidebar