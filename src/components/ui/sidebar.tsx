import * as React from "react"
import { ChevronRight, ChevronDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slot, Slottable } from "@/components/ui/slot"
const SIDEBAR_WIDTH = "17.5rem"
const SIDEBAR_COLLAPSED_WIDTH = "4rem"
interface SidebarContextValue {
  open: boolean
  collapsed: boolean
  onOpenChange: (open: boolean) => void
  onCollapsedChange?: (collapsed: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  isMobile: boolean
}
const SidebarContext = React.createContext<SidebarContextValue | null>(null)
const useSidebar = (): SidebarContextValue => {
  const context = React.useContext(SidebarContext)
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider")
  return context
}
interface SidebarProviderProps extends React.PropsWithChildren {
  defaultOpen?: boolean
  defaultCollapsed?: boolean
  collapsible?: "icon" | "always" | "never"
}
const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  SidebarProviderProps
>(({ children, defaultOpen = true, defaultCollapsed = false, collapsible = "icon" }, ref) => {
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false
  const [open, setOpen] = React.useState(defaultOpen)
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  React.useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false)
    }
  }, [isMobile])
  React.useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024
      if (!newIsMobile) {
        setMobileOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  React.useEffect(() => {
    // Set CSS variables
    document.documentElement.style.setProperty("--sidebar-width", SIDEBAR_WIDTH)
    document.documentElement.style.setProperty("--sidebar-width-collapsed", SIDEBAR_COLLAPSED_WIDTH)
    // Set data attributes on document element
    document.documentElement.setAttribute("data-sidebar-open", open.toString())
    document.documentElement.setAttribute("data-sidebar-collapsed", collapsed.toString())
    return () => {
      document.documentElement.style.removeProperty("--sidebar-width")
      document.documentElement.style.removeProperty("--sidebar-width-collapsed")
      document.documentElement.removeAttribute("data-sidebar-open")
      document.documentElement.removeAttribute("data-sidebar-collapsed")
    }
  }, [open, collapsed])
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setOpen(newOpen)
    if (isMobile) {
      setMobileOpen(newOpen)
    }
  }, [isMobile])
  const handleCollapsedChange = React.useCallback((newCollapsed: boolean) => {
    setCollapsed(newCollapsed)
  }, [])
  const value: SidebarContextValue = React.useMemo(
    () => ({
      open,
      collapsed,
      onOpenChange: handleOpenChange,
      onCollapsedChange: collapsible === "never" ? undefined : handleCollapsedChange,
      mobileOpen,
      setMobileOpen,
      isMobile,
    }),
    [open, collapsed, handleOpenChange, handleCollapsedChange, mobileOpen, isMobile, collapsible]
  )
  return (
    <SidebarContext.Provider value={value}>
      <Slot ref={ref}>{children}</Slot>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"
const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-screen bg-background",
        "lg:ml-[var(--sidebar-width)] data-[sidebar-open=false]:lg:ml-0 data-[sidebar-collapsed=true]:lg:ml-[var(--sidebar-width-collapsed)]",
        "lg:transition-all lg:duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarInset.displayName = "SidebarInset"
const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { mobileOpen, setMobileOpen } = useSidebar()
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("lg:hidden", className)}
      onClick={() => setMobileOpen(!mobileOpen)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="9" x2="21" y1="9" y2="9" />
        <line x1="9" x2="21" y1="15" y2="15" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
      {children}
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"
const Sidebar = React.forwardRef<
  HTMLDivElement,
  Slottable & {
    collapsible?: "icon" | "always" | "never"
  }
>(({ className, asChild = false, collapsible, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  const { open, collapsed, isMobile } = useSidebar()
  return (
    <Comp
      ref={ref}
      data-state={open ? "open" : "closed"}
      data-collapsible={collapsible || "icon"}
      className={cn(
        "group data-[collapsible=icon]:w-16 h-screen flex flex-col bg-card border-r shadow-sm",
        isMobile
          ? "fixed inset-y-0 left-0 z-50 w-72 border-r transition-transform duration-200 ease-out translate-x-[-100%] data-[state=open]:translate-x-0"
          : "lg:relative lg:translate-x-0 lg:inset-0 lg:w-[var(--sidebar-width)] lg:data-[collapsible=icon]:w-[var(--sidebar-width-collapsed)] lg:data-[state=closed]:w-[var(--sidebar-width-collapsed)] lg:data-[state=open]:w-[var(--sidebar-width)] lg:transition-all lg:duration-300",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
Sidebar.displayName = "Sidebar"
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollArea className={cn("flex flex-col gap-2 px-3 py-4", className)} ref={ref} {...props}>
      {children}
    </ScrollArea>
  )
})
SidebarContent.displayName = "SidebarContent"
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-14 shrink-0 items-center border-b border-border px-4", className)} {...props}>
    {children}
  </div>
))
SidebarHeader.displayName = "SidebarHeader"
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}>
    {children}
  </div>
))
SidebarFooter.displayName = "SidebarFooter"
const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("relative flex flex-col gap-2 p-2", className)} {...props}>
    {children}
  </div>
))
SidebarGroup.displayName = "SidebarGroup"
const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
      className
    )}
    {...props}
  >
    {children}
  </p>
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"
const SidebarMenu = React.forwardRef<
  HTMLNavElement,
  React.HTMLAttributes<HTMLNavElement>
>(({ className, children, ...props }, ref) => (
  <nav ref={ref} className={cn("flex flex-1 flex-col gap-1 p-2", className)} {...props}>
    {children}
  </nav>
))
SidebarMenu.displayName = "SidebarMenu"
const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-1", className)} {...props}>
      {children}
    </div>
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"
const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    isActive?: boolean
  }
>(({ className, isActive = false, children, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : Button
  return (
    <Comp
      ref={ref}
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "justify-start h-12 px-3 font-medium hover:no-underline hover:bg-accent hover:text-accent-foreground",
        "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
        className
      )}
      data-active={isActive}
      {...props}
    >
      {children}
    </Comp>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"
export {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
}