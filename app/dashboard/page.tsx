import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Fetch user's projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            My Projects
          </h1>

          {!projects || projects.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-slate-600 mb-4">No projects yet</p>
              <p className="text-sm text-slate-500">
                Book a service to get started with your construction approval
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {project.project_type} - {project.location}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {project.city}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      project.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      project.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {project.current_stage && (
                    <p className="text-sm text-slate-600 mb-4">
                      Current Stage: <span className="font-medium">{project.current_stage}</span>
                    </p>
                  )}

                  <div className="flex gap-4 text-sm text-slate-600">
                    <div>
                      Plot Area: <span className="font-medium">{project.plot_area} sq.ft</span>
                    </div>
                    {project.estimated_timeline_days && (
                      <div>
                        Timeline: <span className="font-medium">{project.estimated_timeline_days} days</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
