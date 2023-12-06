import { redirect } from 'next/navigation'
import { UsersToVerifyTable } from '@/components/features/admin/users-to-verify'
import { appRouting } from '@/lib/app-routing'
import { createClient } from '@/lib/supabase/serverComponentClient'

export default async function Page() {
  //ensure that user who wants to access admin page is indeed admin
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData || !userData.user) redirect(appRouting.articles.default)
  const { data: validationData } = await supabase.from('profiles').select().eq('id', userData.user.id)
  if (!validationData) redirect(appRouting.articles.default)
  if (validationData[0].role !== 'admin') redirect(appRouting.articles.default)

  return (
    <div className='mx-6 pt-16'>
      <UsersToVerifyTable />
    </div>
  )
}
