'use client'

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { ViewFacilitiesModal } from '@/components/portal/modals/view-facilities-modal'
import { FAMILY } from '@/data-portal'
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  ArrowsRightLeftIcon,
  BanknotesIcon,
  CreditCardIcon,
  DocumentTextIcon,
  PauseCircleIcon,
  PhotoIcon,
  PresentationChartBarIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="/member">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let user = FAMILY[0]
  let [cardOpen, setCardOpen] = useState(false)

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem href="/notifications" aria-label="Notifications">
              <BellIcon />
            </NavbarItem>
            <NavbarItem onClick={() => setCardOpen(true)}>
              <QrCodeIcon />
              <NavbarLabel>My card</NavbarLabel>
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src={user.photo} square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/teams/catalyst.svg" />
                <SidebarLabel>Fitness Passport</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/security">
                  <ShieldCheckIcon />
                  <DropdownLabel>Security</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/support">
                  <QuestionMarkCircleIcon />
                  <DropdownLabel>Support</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarHeading>Home</SidebarHeading>
              <SidebarItem href="/" current={pathname === '/'}>
                <PresentationChartBarIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/member" current={pathname.startsWith('/member')}>
                <UserGroupIcon />
                <SidebarLabel>Member Details</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading>Manage Membership</SidebarHeading>
              <SidebarItem href="/photos" current={pathname.startsWith('/photos')}>
                <PhotoIcon />
                <SidebarLabel>Membership Photos</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/suspend" current={pathname.startsWith('/suspend')}>
                <PauseCircleIcon />
                <SidebarLabel>Suspend Membership</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/transfer" current={pathname.startsWith('/transfer')}>
                <ArrowsRightLeftIcon />
                <SidebarLabel>Employer Transfer</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading>Payments &amp; Contracts</SidebarHeading>
              <SidebarItem href="/payments" current={pathname.startsWith('/payments')}>
                <BanknotesIcon />
                <SidebarLabel>Payment History</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/contracts" current={pathname.startsWith('/contracts')}>
                <DocumentTextIcon />
                <SidebarLabel>Contracts</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/debit" current={pathname.startsWith('/debit')}>
                <CreditCardIcon />
                <SidebarLabel>Direct Debit</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarHeading>Account</SidebarHeading>
              <SidebarItem href="/notifications" current={pathname.startsWith('/notifications')}>
                <BellIcon />
                <SidebarLabel>Notifications</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/security" current={pathname.startsWith('/security')}>
                <ShieldCheckIcon />
                <SidebarLabel>Security</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/support" current={pathname.startsWith('/support')}>
                <QuestionMarkCircleIcon />
                <SidebarLabel>Customer Support</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src={user.photo} className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {user.name}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      Member #{user.memberNumber}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
      <ViewFacilitiesModal open={cardOpen} onClose={() => setCardOpen(false)} />
    </SidebarLayout>
  )
}
