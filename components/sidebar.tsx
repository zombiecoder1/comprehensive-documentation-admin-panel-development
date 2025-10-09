"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Server,
  Bot,
  Database,
  Scale,
  FileCode,
  Terminal,
  Mic,
  Smartphone,
  Settings,
  Code2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Models", href: "/models", icon: Server },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Memory", href: "/memory", icon: Database },
  { name: "Load Balancer", href: "/loadbalancer", icon: Scale },
  { name: "Prompt Templates", href: "/prompt-templates", icon: FileCode },
  { name: "CLI Agent", href: "/cli-agent", icon: Terminal },
  { name: "Editor Integration", href: "/editor-integration", icon: Code2 },
  { name: "Audio Test", href: "/audio-test", icon: Mic },
  { name: "Mobile Editor", href: "/mobile-editor", icon: Smartphone },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-background">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
