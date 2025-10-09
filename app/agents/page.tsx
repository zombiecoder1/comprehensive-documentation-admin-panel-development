"use client"

import { useEffect, useState } from "react"
import { Bot, Loader2, Terminal, RefreshCw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Agent {
  id: string
  name: string
  status: "active" | "inactive" | "error"
  host?: string
  port?: number
  type?: string
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [command, setCommand] = useState("")
  const [sending, setSending] = useState(false)

  const fetchAgents = async () => {
    try {
      const response = await fetch("/api/proxy/agents")
      if (response.ok) {
        const data = await response.json()
        setAgents(Array.isArray(data) ? data : [])
      } else {
        setAgents([])
      }
    } catch (error) {
      console.log("[v0] Failed to fetch agents:", error)
      setAgents([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAgents()
    const interval = setInterval(fetchAgents, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchAgents()
  }

  const handleSendCommand = async () => {
    if (!selectedAgent || !command.trim()) return

    setSending(true)
    try {
      const response = await fetch(`/api/proxy/agents/${selectedAgent}/command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmd: command }),
      })

      if (response.ok) {
        setCommand("")
      }
    } catch (error) {
      console.log("[v0] Failed to send command:", error)
    } finally {
      setSending(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    switch (status) {
      case "active":
        return `${baseClasses} bg-success/10 text-success`
      case "inactive":
        return `${baseClasses} bg-muted text-muted-foreground`
      case "error":
        return `${baseClasses} bg-destructive/10 text-destructive`
      default:
        return `${baseClasses} bg-muted text-muted-foreground`
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Agents</h1>
          <p className="mt-2 text-sm text-muted-foreground">View and control your agent instances</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline" size="sm">
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading agents...</span>
          </div>
        </div>
      ) : agents.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No agents found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Make sure your UAS backend is running and agents are configured
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`cursor-pointer rounded-lg border bg-card p-6 transition-colors ${
                    selectedAgent === agent.id ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-primary/10 p-2">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{agent.name}</h3>
                        {agent.type && <p className="text-sm text-muted-foreground">{agent.type}</p>}
                      </div>
                    </div>
                    <span className={getStatusBadge(agent.status)}>{agent.status}</span>
                  </div>

                  {agent.host && (
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Host</span>
                        <span className="font-mono text-xs">{agent.host}</span>
                      </div>
                      {agent.port && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Port</span>
                          <span className="font-mono text-xs">{agent.port}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Send Command</h3>
            </div>

            {selectedAgent ? (
              <div className="space-y-4">
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm text-muted-foreground">Selected Agent</p>
                  <p className="mt-1 font-medium">{agents.find((a) => a.id === selectedAgent)?.name}</p>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter command..."
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !sending) {
                        handleSendCommand()
                      }
                    }}
                    disabled={sending}
                  />
                  <Button onClick={handleSendCommand} disabled={!command.trim() || sending} size="icon">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Commands will be sent to the selected agent for execution
                </p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">Select an agent to send commands</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
