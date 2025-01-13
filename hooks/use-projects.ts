import { useState, useEffect } from 'react'
import { Project, ApiResponse } from '@/lib/api/types'
import { getProjects, getProject, createProject } from '@/lib/api/projects'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects()
        setProjects(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await getProject(id)
        setProject(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch project')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  return { project, loading, error }
} 