"use client";

import { useState , useMemo } from "react";
import styles from "./page.module.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  SignOutIcon,
  GearSixIcon,
  UsersIcon,
  ShieldCheckIcon,
  BrainIcon,
  InstagramLogoIcon,
  StarIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from "@/components/ui/table";
import { Avatar , AvatarFallback } from "@/components/ui/avatar";
import { LineChart , Line , XAxis , YAxis , CartesianGrid , Tooltip , ResponsiveContainer } from "recharts";
import { Pagination , PaginationContent , PaginationItem, PaginationLink , PaginationEllipsis , PaginationNext , PaginationPrevious } from "@/components/ui/pagination";
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
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useAuthLogic } from "./logic";
import Switch from "react-switch";
import { Select , SelectTrigger , SelectValue , SelectContent , SelectItem } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowUpIcon , ArrowDownIcon , DotsThreeVerticalIcon,  StorefrontIcon,FacebookLogoIcon} from "@phosphor-icons/react";
export default function Homepage() {
  const { username, logout , isDark , toggleDarkMode , sortTeams } = useAuthLogic();
  const [collapsed, setCollapsed] = useState(false);
  const [sortConfig , setSortConfig ]= useState({key: null , direction : "asc"});
  const [checked , setChecked] =useState(false);
  const [searchTerm , setSearchTerm] = useState("");

  const earningsData = [
  { month: "Jan", earnings: 75000 },
  { month: "Feb", earnings: 22000 },
  { month: "Mar", earnings: 45000 },
  { month: "Apr", earnings: 18500 },
  { month: "May", earnings: 85000 },
  { month: "Jun", earnings: 38000 },
  { month: "Jul", earnings: 70000 },
  { month: "Aug", earnings: 22000 },
  { month: "Sep", earnings: 38500 },
  { month: "Oct", earnings: 18500 },
  { month: "Nov", earnings: 42000 },
  { month: "Dec", earnings: 30000 },
];

  const teamsData = [
    {
            name: "Product Management",
            desc: "Product development & lifecycle",
            rating: 5,
            modified: "21 Oct, 2024",
            members: ["JD", "AE", "KT", "+10"],
          },
          {
            name: "Marketing Team",
            desc: "Campaigns & market analysis",
            rating: 3.5,
            modified: "15 Oct, 2024",
            members: ["G", "E"],
          },
          {
            name: "HR Department",
            desc: "Talent acquisition, employee welfare",
            rating: 5,
            modified: "10 Oct, 2024",
            members: ["BA", "FS", "AD", "CA"],
          },
          {
            name: "Sales Division",
            desc: "Customer relations, sales strategy",
            rating: 5,
            modified: "05 Oct, 2024",
            members: ["KL", "OM"],
          },
          {
            name: "Development Team",
            desc: "Software development",
            rating: 4.5,
            modified: "01 Oct, 2024",
            members: ["RA", "CE", "RS", "+5"],
          },
  ]

  const handleSort = (key) => {
  setSortConfig((prev) => ({
    key,
    direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
  }));
};

const sortedTeams = useMemo(() => {
  if(!sortConfig.key) return teamsData;
  return sortTeams(teamsData , sortConfig);
}, [teamsData,sortConfig]);

const filteredTeams = useMemo(() => {
    return sortedTeams.filter(team =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortedTeams]);

  const totalItems=15;
  const perPage=5;
  const totalPages=Math.ceil(totalItems/perPage);

  const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div style={{ 
     backgroundColor: 'hsl(0, 0%, 12%)',
     border: '1px solid hsl(0, 0%, 30%)',
     borderRadius: 5,
     padding: 10,
     opacity: 0.95,
     color: 'hsl(0, 0%, 98%)'
    }}>
      <p>{`Month: ${label}`}</p>
      <p>{`$${payload[0].value.toLocaleString()}`}</p>
    </div>
  );
};


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

              <SubMenu className="sidesubm" icon={<UsersIcon size={30} className="sideicons" />} label="Store - Client" />

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
                Store - Admin
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
          <div className={styles.cardsContainer}>
          <div className={styles.leftCards}>
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
    <img src="https://www.svgrepo.com/show/452140/zoom.svg" alt="Zoom App" />
  </div>
</div>
    <div className={styles.meetingDescription}>
      Team meeting to discuss strategies, outline project milestones, define key goals and establish clear timelines.
    </div>
<div className={styles.infoBox}>
        <div className={styles.infoLabels}>
          <div className={styles.infoLabel}>
            <MapPinIcon className={styles.icon} />
            <span>Location</span>
          </div>
          <div className={styles.infoLabel}>
            <UsersIcon className={styles.icon} />
            <span>Team</span>
          </div>
        </div>

        <div className={styles.infoValues}>
          <div className={styles.location}>Amsterdam</div>
          <div className={styles.meetingAvatars}>
            {["AL", "CR", "NM", "SK"].map((initial, idx) => (
              <Avatar key={idx} className={styles.meetingAvatar}>
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    <button className={styles.joinButton}>Join Meeting</button>
  </CardContent>
</Card>
</div>
<div className={styles.rightCards}>
   <Card className={styles.keencard}>
      <CardContent>
  <div className={styles.keenCardContent}>
    <div className={styles.keenAvatars}>
    {["AL", "CR", "NM", "SK"].map((initial, idx) => (
      <Avatar key={idx} className={styles.keenAvatar}>
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
    ))}
  </div>
    <h2>
      Connect Today & Join the <span className={styles.keenthemesHighlight}>KeenThemes</span> Network
    </h2>
    <p>
      Enhance your projects with premium themes and templates. Join the KeenThemes community today for top-quality designs and resources.
    </p>
  </div>
  <div className={styles.getStartedWrapper}>
    <button className={styles.getStartedButton}>Get Started</button>
  </div>
</CardContent>

    </Card>
    <Card className={styles.chartCard}>
      <CardContent>
        <div className={styles.earningContainer}>
          <div className={styles.chartCardHeader}>
          <h2 className={styles.earningsTitle}>Earnings</h2>
          <div className={styles.chartHeaderRight}>
            <Switch 
            checked={checked} 
            onChange={setChecked}
            height={20}
            width={40}
            />
            <label>Referrals Only</label>
            <Select className={styles.selectMenu}>
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent className={styles.SelectContent}>
        <SelectItem className={styles.selectItem} value="week">This Week</SelectItem>
        <SelectItem className={styles.selectItem} value="month">This Month</SelectItem>
        <SelectItem className={styles.selectItem} value="year">This Year</SelectItem>
      </SelectContent>
    </Select>
          </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={earningsData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            ticks={[0, 20000, 40000, 60000, 80000, 100000]}
            domain={[0, 100000]}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip 
          content={<CustomTooltip />}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    <Card className={styles.teamsCard}>
  <CardContent className={styles.cardContent}>
    <div className={styles.headerwithSearch}>
    <h2 className={styles.heading}>Teams</h2>
  
    <div className={styles.searchContainer}>
      <MagnifyingGlassIcon className={styles.searchIcon}/>
      <input
      type="text"
      placeholder="Search Teams"
      className={styles.searchInput}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    </div>

    <Table className={styles.table}>
  <TableHeader className={styles.tableHeader}>
    <TableRow className={styles.tableRow}>
      <TableHead className={styles.tableHead}>
        <input type="checkbox" className={styles.checkboxCell} />
      </TableHead>
       <TableHead
        className={styles.tableHeadTeam}
        style={{ cursor: "pointer" }}
        onClick={() => handleSort("name")}
      >
        <div className={styles.sortableHeader}>
        Team{" "}
        {sortConfig.key === "name" &&
          (sortConfig.direction === "asc" ? (
            <SortAscendingIcon size={16} />
          ) : (
            <SortDescendingIcon size={16} />
          ))}
          </div>
      </TableHead>
      <TableHead
        className={styles.tableHead}
        style={{ cursor: "pointer" }}
        onClick={() => handleSort("rating")}
      >
        <div className={styles.sortableHeader}>
        Rating{" "}
        {sortConfig.key === "rating" &&
          (sortConfig.direction === "asc" ? (
            <SortAscendingIcon size={16} />
          ) : (
            <SortDescendingIcon size={16} />
          ))}
          </div>
      </TableHead>
      <TableHead
        className={styles.tableHead}
        style={{ cursor: "pointer" }}
        onClick={() => handleSort("modified")}
      >
        <div className={styles.sortableHeader}>
        Last Modified{" "}
        {sortConfig.key === "modified" &&
          (sortConfig.direction === "asc" ? (
            <SortAscendingIcon size={16} />
          ) : (
            <SortDescendingIcon size={16} />
          ))}
          </div>
      </TableHead>
      <TableHead className={styles.tableHead}>Members</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody className={styles.tableBody}>
    {sortedTeams.map((team, i) => (
      <TableRow key={i} className={styles.tableRow}>
        <TableCell className={styles.checkboxCell}>
          <input type="checkbox" className={styles.checkbox} />
        </TableCell>
        <TableCell className={styles.tableCell}>
          <div className={styles.teamName}>{team.name}</div>
          <div className={styles.teamDesc}>{team.desc}</div>
        </TableCell>
        <TableCell className={styles.tableCell}>
          <div className={styles.rating}>
  {[...Array(Math.floor(team.rating))].map((_, idx) => (
    <StarIcon key={idx} className={styles.starIcon} />
  ))}

  {team.rating % 1 >= 0.5 && (
    <div className={styles.halfStar} key="half">
      <StarIcon className={styles.starIcon} />
    </div>
  )}
</div>

        </TableCell>
        <TableCell className={styles.tableCell}>{team.modified}</TableCell>
        <TableCell className={styles.tableCell}>
          <div className={styles.avatarGroup}>
            {team.members.map((initial, idx) => (
              <Avatar key={idx} className={styles.avatar}>
                <AvatarFallback className={styles.avatarFallback}>
                  {initial}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
    <div className={styles.paginationContainer}>
  <div className={styles.paginationInfo}>1–5 of {totalItems}</div>
  <Pagination>
    <PaginationContent className={styles.paginationContent}>
      <PaginationItem>
        <PaginationPrevious href="#" className={styles.prevNextButton}/>
      </PaginationItem>
      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        return (
          <PaginationItem key={page}>
            <PaginationLink href="#" className={styles.paginationLink}>
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      {totalPages > 3 && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      <PaginationItem>
        <PaginationNext href="#" className={styles.prevNextButton}/>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>
  </CardContent>
</Card>
</div>
</div>

        </div>
      </div>
    </>
  );
}
