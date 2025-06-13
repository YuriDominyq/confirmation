import { supabase } from "lib/supabase";
import { useEffect, useState } from "react"

export default function Confirmation() {
  const [message, setMessage] = useState<string>('Confirming your account')

  useEffect(() => {
    const confirmUser = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#', ''))
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      if (!access_token || !refresh_token) {
        setMessage('Invalid confirmation link')
      }

      const error = await supabase.auth.setSession({
        access_token: access_token as string,
        refresh_token: refresh_token as string,
      })

      if (error) {
        setMessage('Confirmation failed' + error)
      } else {
        setMessage('✅ Email confirmed! You can now log in.')
      }
    }

    confirmUser()
  }, [])

  return (
    <div className="flex justify-center items-center">
      <div className="flex-column m-4 p-4">
        <img src='/david.jpg' alt="David" className="w-[300px] h-[300px]" />

        <p className="text-2xl text-green-600">{message}</p>
      </div>
    </div>
  )
}