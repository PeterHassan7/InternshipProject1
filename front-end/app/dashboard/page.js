"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  SignOutIcon,
  GearSixIcon,
  UsersIcon,
  ShieldCheckIcon,
  BrainIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  Squares2X2Icon,
  PlusIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useAuthLogic } from "./logic";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { EllipsisVerticalIcon } from "lucide-react";
import { ArrowUpIcon , ArrowDownIcon , DotsThreeVerticalIcon,  StorefrontIcon,FacebookLogoIcon} from "@phosphor-icons/react";

export default function Homepage() {
  const { username, logout , isDark , toggleDarkMode } = useAuthLogic();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={`side ${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
          <Sidebar
            rootStyles={{
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              position: "fixed",

            }}
            collapsed={collapsed}>
              <div className={styles.collapseToggle}>
          <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '>>' : '<<'}
          </button>
          </div>
            <Menu
              rootStyles={{
                backgroundColor: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
              menuItemStyles={{
              button: ({ level, active, disabled }) => ({
              fontSize: "0.85rem",
              height: "48px",
              backgroundColor: active
              ? isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)"
              : "transparent",
         "&:hover": {
            backgroundColor: isDark
         ? "rgba(255,255,255,0.15)"
         : "rgba(0,0,0,0.08)",
     },
   }),
  }}

            >
              <MenuItem className="sidething" icon={<Squares2X2Icon className="sideicons" />}>
                Dashboard
              </MenuItem>

              <div className="submenu-group">
                <MenuItem className="sidething submenu-item">Light Sidebar</MenuItem>
                <MenuItem className="sidething submenu-item">Right Sidebar</MenuItem>
              </div>

              <MenuItem
                style={{
                  opacity: "0.6",
                  fontWeight: "bold",
                  cursor: "default",
                  userSelect: "none",
                }}
                className="sidetitle"
              >
                User
              </MenuItem>

              <SubMenu className="sidesubm" icon={<UserCircleIcon className="sideicons" />} label="Public Profile" />
              <SubMenu className="sidesubm" icon={<GearSixIcon size={30} className="sideicons" />} label="My Account" />
              <SubMenu className="sidesubm" icon={<UsersIcon size={30} className="sideicons" />} label="Network" />
              <SubMenu className="sidesubm" icon={<ShieldCheckIcon size={30} className="sideicons" />} label="Authentication" />

              <MenuItem
                style={{
                  opacity: "0.6",
                  fontWeight: "bold",
                  cursor: "default",
                  userSelect: "none",
                }}
                className="sidetitle"
              >
                Apps
              </MenuItem>

              <MenuItem className="sidething" icon={<UsersIcon size={30} className="sideicons" />}>
                Store-Client
              </MenuItem>

              <MenuItem
                suffix={
                  <span
                    style={{
                      backgroundColor: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid grey",
                      borderRadius: "5px",
                      padding: "2px 8px",
                    }}
                  >
                    Soon
                  </span>
                }
                className="sidething"
                icon={<GearSixIcon size={30} className="sideicons" />}
              >
                Store-Admin
              </MenuItem>

              <MenuItem
                suffix={
                  <span
                    style={{
                      backgroundColor: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid grey",
                      borderRadius: "5px",
                      padding: "2px 8px",
                    }}
                  >
                    Soon
                  </span>
                }
                className="sidething"
                icon={<CodeBracketIcon className="sideicons" style={{ width: 30, height: 30 }} />}
              >
                Store - Services
              </MenuItem>

              <MenuItem
                suffix={
                  <span
                    style={{
                      backgroundColor: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid grey",
                      borderRadius: "5px",
                      padding: "2px 8px",
                    }}
                  >
                    Soon
                  </span>
                }
                className="sidething"
                icon={<BrainIcon size={30} className="sideicons" />}
              >
                AI Prompt
              </MenuItem>

              <MenuItem
                suffix={
                  <span
                    style={{
                      backgroundColor: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid grey",
                      borderRadius: "5px",
                      padding: "2px 8px",
                    }}
                  >
                    Soon
                  </span>
                }
                className="sidething"
                icon={<DocumentTextIcon className="sideicons" style={{ width: 30, height: 30 }} />}
              >
                Invoice Generator
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>

        <div className={styles.mainContent}>
          <nav className={`${styles.navbar} ${collapsed ? styles.collapsed : ""}`}>
            <div className={styles.leftMenu}>
              <span className={styles.menuItem}>Home</span>
              <span className={styles.menuItem}>Profiles</span>
              <span className={styles.menuItem}>My Account</span>
              <span className={styles.menuItem}>Network</span>
              <span className={styles.menuItem}>Store</span>
              <span className={styles.menuItem}>Authentication</span>
              <span className={styles.menuItem}>Help</span>
            </div>

            <div className={styles.rightContainer}>
              <button className={styles.iconButton} title="Search">
                <MagnifyingGlassIcon className={styles.iconSvg} />
              </button>
              <button className={styles.iconButton} title="Add Images">
                <PlusIcon className={styles.iconSvg} />
              </button>
              <button className={styles.iconButton} title="Messaging">
                <ChatBubbleLeftRightIcon className={styles.iconSvg} />
              </button>
              <button className={styles.iconButton} title="More">
                <Squares2X2Icon className={styles.iconSvg} />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={styles.profileIcon}>
                    <UserCircleIcon className={styles.iconSvg} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={styles.dropdownContent}>
                  <div className={styles.usernameText}>{username}</div>
                  <div className={styles.dropdowndivider}></div>
                  <DropdownMenuItem onClick={toggleDarkMode} className={styles.dropdownItem}>
                    {isDark ? (
                      <>
                      <SunIcon className={styles.iconSvg}/>
                      Light Mode
                      </>
                    ) : (
                      <>
                      <MoonIcon className={styles.iconSvg} />
                      Dark Mode
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className={styles.dropdownItem}>
                    <SignOutIcon size={20} weight="bold" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          <div className={styles.dashboardHeader}>
            <div className={styles.headerText}>
              <h1 className={styles.title}>Dashboard</h1>
              <p className={styles.description}>Central Hub for Personal Customization</p>
            </div>
            <button className={styles.viewProfileButton}>View Profile</button>
          </div>
          <div className={styles.cardGrid}>
  <Card className={styles.card}>
    <CardContent className={styles.cardContent}>
      <div className={styles.logo}><img src="https://www.svgrepo.com/show/157006/linkedin.svg"/></div>
      <div className={styles.number}>9.3k</div>
      <div className={styles.text}>Amazing mates</div>
    </CardContent>
  </Card>

  <Card className={styles.card}>
    <CardContent className={styles.cardContent}>
      <div className={styles.logo}><img src="https://www.svgrepo.com/show/13671/youtube.svg"/></div>
      <div className={styles.number}>24k</div>
      <div className={styles.text}>Lessons Views</div>
    </CardContent>
  </Card>

  <Card className={styles.card}>
    <CardContent className={styles.cardContent}>
      <div className={styles.logo}><img src="https://www.svgrepo.com/show/13639/instagram.svg"/></div>
      <div className={styles.number}>608</div>
      <div className={styles.text}>New Subscribers</div>
    </CardContent>
  </Card>

  <Card className={styles.card}>
    <CardContent className={styles.cardContent}>
      <div className={styles.logo}><img src="https://www.svgrepo.com/show/452114/tiktok.svg"/></div>
      <div className={styles.number}>2.5k</div>
      <div className={styles.text}>Stream Audience</div>
    </CardContent>
  </Card>
</div>
<Card className={styles.highlightsCard}>
  <CardContent className={styles.highlightsContent}>
    <div className={styles.highlightsHeader}>
      <h2>Highlights</h2>
      <button className={styles.iconButton}>
        <DotsThreeVerticalIcon size={20} />
      </button>
    </div>
    <hr className={styles.divider} />

    <div className={styles.allTimeSales}>
      <div className={styles.label}>All Time Sales</div>
      <div className={styles.salesNumberProgress}>
        <span className={styles.salesNumber}>$295.7k</span>
        <span className={styles.progressUp}>
          <ArrowUpIcon /> 2.7%
        </span>
      </div>
    </div>

    <div className={styles.segmentedBar}>
      <div className={styles.metronicBarSegment} title="Metronic: 45%"></div>
      <div className={styles.bundleBarSegment} title="Bundle: 30%"></div>
      <div className={styles.metronicNextBarSegment} title="MetronicNext: 25%"></div>
    </div>

    <div className={styles.barLegend}>
      <span><div className={styles.greenDot}></div> Metronic</span>
      <span><div className={styles.redDot}></div> Bundle</span>
      <span><div className={styles.purpleDot}></div> MetronicNext</span>
    </div>

    <hr className={styles.divider} />

    <ul className={styles.highlightsList}>
      <li>
        <div className={styles.listLeft}>
          <StorefrontIcon size={18} />
          <span>Online Store</span>
        </div>
        <div className={styles.listRight}>
          <span>$172k</span>
          <span className={styles.progressUp}>
            <ArrowUpIcon /> 3.9%
          </span>
        </div>
      </li>
      <li>
        <div className={styles.listLeft}>
          <FacebookLogoIcon size={18} />
          <span>Facebook</span>
        </div>
        <div className={styles.listRight}>
          <span>$85k</span>
          <span className={styles.progressDown}>
            <ArrowDownIcon /> 0.7%
          </span>
        </div>
      </li>
      <li>
        <div className={styles.listLeft}>
          <InstagramLogoIcon size={18} />
          <span>Instagram</span>
        </div>
        <div className={styles.listRight}>
          <span>$36k</span>
          <span className={styles.progressUp}>
            <ArrowUpIcon /> 8.2%
          </span>
        </div>
      </li>
    </ul>
  </CardContent>
</Card>
<Card className={styles.meetingCard}>
  <CardContent className={styles.meetingContent}>
    <div className={styles.meetingHeader}>
  <div className={styles.meetingTextBlock}>
    <div className={styles.meetingTitle}>Team Meeting</div>
     <div className={styles.meetingTime}>09:00 - 09:30</div>
  </div>
  <div className={styles.meetingIcon}>
    <img src="https://www.svgrepo.com/show/452140/zoom.svg" alt="App" />
  </div>
</div>
    <div className={styles.meetingDescription}>
      Team meeting to discuss strategies, outline project milestones, define key goals and establish clear timelines.
    </div>

    <button className={styles.joinButton}>Join Meeting</button>
  </CardContent>
</Card>

        </div>
      </div>
    </>
  );
}
