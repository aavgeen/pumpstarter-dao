import { API_CONFIG, getApiUrl } from './config'
import { Project, CreateProjectInput, ApiResponse } from './types'
import mockProjects from './mock-data.json'

export async function getProjects(): Promise<ApiResponse<Project[]>> {
  if (API_CONFIG.USE_MOCK_DATA) {
    return { data: mockProjects.projects as Project[] }
  }

  try {
    const response = await fetch(getApiUrl('/projects'))
    const data = await response.json()
    return data
  } catch (error) {
    return {
      data: [],
      error: 'Failed to fetch projects'
    }
  }
}

export async function getProject(id: string): Promise<ApiResponse<Project | null>> {
  if (API_CONFIG.USE_MOCK_DATA) {
    const project = mockProjects.projects.find(p => p.id === id)
    return { data: project || null }
  }

  try {
    const response = await fetch(getApiUrl(`/projects/${id}`))
    const data = await response.json()
    return data
  } catch (error) {
    return {
      data: null,
      error: 'Failed to fetch project'
    }
  }
}

export async function createProject(input: CreateProjectInput): Promise<ApiResponse<Project>> {
  if (API_CONFIG.USE_MOCK_DATA) {
    const newProject: Project = {
      id: String(mockProjects.projects.length + 1),
      title: input.title,
      description: input.description,
      shortDescription: input.description.substring(0, 100) + '...',
      contractAddress: '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 10),
      creator: {
        address: '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 10),
        name: input.creatorName || '',
      },
      funding: {
        current: 0,
        goal: input.fundingGoal,
        contributors: 0,
        endDate: input.endDate,
      },
      stats: [],
      transactions: [],
      category: input.category,
      tags: input.tags,
      imageUrl: '/placeholder.jpg',
    }
    mockProjects.projects.push(newProject);
    return { data: newProject }
  }

  try {
    const response = await fetch(getApiUrl('/projects'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
    const data: ApiResponse<Project> = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to create project')
  }
} 